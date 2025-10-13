import CryptoJS from 'crypto-js';
import { encryptData, decryptData, sanitizeInput } from './auth';

// Environment variables - in production these should be in environment variables
const SURVEY_ENCRYPTION_KEY = process.env.SURVEY_ENCRYPTION_KEY || 'survey-encryption-key-change-in-production';

export interface SurveyResponse {
  id: string;
  surveyId: string;
  userId?: string; // Optional for anonymous surveys
  responses: EncryptedResponse[];
  submittedAt: Date;
  ipHash?: string; // Hashed IP for security monitoring
  userAgent?: string;
  isAnonymized: boolean;
  consentGiven: boolean;
  aiProcessingConsent: boolean;
}

export interface EncryptedResponse {
  questionId: string;
  encryptedAnswer: string;
  answerType: 'text' | 'multiple_choice' | 'rating' | 'ranking' | 'yes_no' | 'likert';
  isPublic: boolean; // Whether this response can be used for public insights
}

export interface PlainResponse {
  questionId: string;
  answer: string | string[] | number;
  answerType: 'text' | 'multiple_choice' | 'rating' | 'ranking' | 'yes_no' | 'likert';
  isPublic: boolean;
}

export interface SurveyPrivacySettings {
  allowAIProcessing: boolean;
  allowPublicInsights: boolean;
  allowDataRetention: boolean;
  retentionPeriodDays: number;
  anonymizeResponses: boolean;
}

export interface ConsentOptions {
  dataProcessing: boolean;
  aiAnalysis: boolean;
  publicInsights: boolean;
  marketingCommunications: boolean;
  dataRetention: boolean;
}

// Encryption utilities for survey data
export const encryptSurveyAnswer = (answer: string | string[] | number): string => {
  try {
    const answerString = Array.isArray(answer) ? JSON.stringify(answer) : String(answer);
    return CryptoJS.AES.encrypt(answerString, SURVEY_ENCRYPTION_KEY).toString();
  } catch (error) {
    throw new Error('Failed to encrypt survey answer');
  }
};

export const decryptSurveyAnswer = (encryptedAnswer: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedAnswer, SURVEY_ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    throw new Error('Failed to decrypt survey answer');
  }
};

// Data anonymization utilities
export const anonymizeTextResponse = (text: string): string => {
  return text
    .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, '[EMAIL]') // Remove emails
    .replace(/\b\d{3}-?\d{3}-?\d{4}\b/g, '[PHONE]') // Remove phone numbers
    .replace(/\b\d{3}-?\d{2}-?\d{4}\b/g, '[SSN]') // Remove SSN-like patterns
    .replace(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g, '[NAME]') // Remove potential names
    .replace(/\b\d{1,5}\s\w+\s(?:Street|St|Avenue|Ave|Road|Rd|Drive|Dr|Lane|Ln|Boulevard|Blvd)\b/gi, '[ADDRESS]'); // Remove addresses
};

export const hashIP = (ip: string): string => {
  return CryptoJS.SHA256(ip + 'salt').toString();
};

// Consent management
export const validateConsent = (consent: ConsentOptions): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!consent.dataProcessing) {
    errors.push('Data processing consent is required to submit responses');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Survey response validation and sanitization
export const validateAndSanitizeSurveyResponse = (
  responses: { questionId: string; answer: string | string[] | number; type: string }[]
): { isValid: boolean; sanitizedResponses: PlainResponse[]; errors: string[] } => {
  const errors: string[] = [];
  const sanitizedResponses: PlainResponse[] = [];

  for (const response of responses) {
    try {
      let sanitizedAnswer: string | string[] | number;

      switch (response.type) {
        case 'text':
          sanitizedAnswer = sanitizeInput(response.answer as string);
          break;
        case 'multiple_choice':
          if (Array.isArray(response.answer)) {
            sanitizedAnswer = response.answer.map(option => sanitizeInput(option));
          } else {
            sanitizedAnswer = sanitizeInput(response.answer as string);
          }
          break;
        case 'rating':
        case 'ranking':
          sanitizedAnswer = response.answer;
          break;
        case 'yes_no':
        case 'likert':
          sanitizedAnswer = sanitizeInput(response.answer as string);
          break;
        default:
          errors.push(`Invalid response type: ${response.type}`);
          continue;
      }

      sanitizedResponses.push({
        questionId: response.questionId,
        answer: sanitizedAnswer,
        answerType: response.type as any,
        isPublic: false // Default to private, user can opt-in
      });

    } catch (error) {
      errors.push(`Failed to process response for question ${response.questionId}`);
    }
  }

  return {
    isValid: errors.length === 0,
    sanitizedResponses,
    errors
  };
};

// Secure survey submission
export const submitSurveySecurely = async (
  surveyId: string,
  responses: { questionId: string; answer: string | string[] | number; type: string }[],
  consent: ConsentOptions,
  privacySettings: SurveyPrivacySettings,
  userId?: string,
  ipAddress?: string,
  userAgent?: string
): Promise<{ success: boolean; responseId?: string; errors?: string[] }> => {
  try {
    // Validate consent
    const consentValidation = validateConsent(consent);
    if (!consentValidation.isValid) {
      return { success: false, errors: consentValidation.errors };
    }

    // Validate and sanitize responses
    const validation = validateAndSanitizeSurveyResponse(responses);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // Encrypt responses
    const encryptedResponses: EncryptedResponse[] = validation.sanitizedResponses.map(response => {
      let answerToEncrypt = response.answer;

      // Anonymize text responses if requested
      if (privacySettings.anonymizeResponses && response.answerType === 'text') {
        answerToEncrypt = anonymizeTextResponse(response.answer as string);
      }

      return {
        questionId: response.questionId,
        encryptedAnswer: encryptSurveyAnswer(answerToEncrypt),
        answerType: response.answerType,
        isPublic: response.isPublic && privacySettings.allowPublicInsights
      };
    });

    // Create survey response object
    const surveyResponse: SurveyResponse = {
      id: `response-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      surveyId,
      userId: privacySettings.anonymizeResponses ? undefined : userId,
      responses: encryptedResponses,
      submittedAt: new Date(),
      ipHash: ipAddress ? hashIP(ipAddress) : undefined,
      userAgent: userAgent,
      isAnonymized: privacySettings.anonymizeResponses,
      consentGiven: consent.dataProcessing,
      aiProcessingConsent: consent.aiAnalysis && privacySettings.allowAIProcessing
    };

    // Store securely (in production, this would be a secure database)
    await storeEncryptedSurveyResponse(surveyResponse);

    // Log for audit trail (without sensitive data)
    console.log('Survey response submitted securely:', {
      responseId: surveyResponse.id,
      surveyId: surveyResponse.surveyId,
      submittedAt: surveyResponse.submittedAt,
      isAnonymized: surveyResponse.isAnonymized,
      consentGiven: surveyResponse.consentGiven,
      aiProcessingConsent: surveyResponse.aiProcessingConsent,
      responseCount: encryptedResponses.length
    });

    return { success: true, responseId: surveyResponse.id };

  } catch (error) {
    console.error('Survey submission error:', error);
    return { success: false, errors: ['Failed to submit survey response securely'] };
  }
};

// Mock secure storage (in production, this would be a real secure database)
const encryptedSurveyResponses: SurveyResponse[] = [];

const storeEncryptedSurveyResponse = async (response: SurveyResponse): Promise<void> => {
  // In production, this would be stored in a secure database with proper access controls
  encryptedSurveyResponses.push(response);
};

// Retrieve and decrypt survey responses (admin only)
export const retrieveSurveyResponses = async (
  surveyId: string,
  userRole: 'admin' | 'user',
  includePersonalData: boolean = false
): Promise<{ success: boolean; responses?: any[]; error?: string }> => {
  try {
    if (userRole !== 'admin') {
      return { success: false, error: 'Unauthorized access' };
    }

    const surveyResponses = encryptedSurveyResponses.filter(r => r.surveyId === surveyId);

    const decryptedResponses = surveyResponses.map(response => {
      const decryptedAnswers = response.responses.map(encResponse => {
        try {
          const decryptedAnswer = decryptSurveyAnswer(encResponse.encryptedAnswer);

          // Parse JSON if it's an array
          let parsedAnswer;
          try {
            parsedAnswer = JSON.parse(decryptedAnswer);
          } catch {
            parsedAnswer = decryptedAnswer;
          }

          return {
            questionId: encResponse.questionId,
            answer: parsedAnswer,
            answerType: encResponse.answerType,
            isPublic: encResponse.isPublic
          };
        } catch (error) {
          return {
            questionId: encResponse.questionId,
            answer: '[DECRYPTION_ERROR]',
            answerType: encResponse.answerType,
            isPublic: false
          };
        }
      });

      return {
        id: response.id,
        surveyId: response.surveyId,
        userId: includePersonalData ? response.userId : undefined,
        responses: decryptedAnswers,
        submittedAt: response.submittedAt,
        isAnonymized: response.isAnonymized,
        consentGiven: response.consentGiven,
        aiProcessingConsent: response.aiProcessingConsent
      };
    });

    return { success: true, responses: decryptedResponses };

  } catch (error) {
    console.error('Error retrieving survey responses:', error);
    return { success: false, error: 'Failed to retrieve survey responses' };
  }
};

// AI data processing utilities
export const prepareDataForAIProcessing = (
  responses: SurveyResponse[],
  anonymizeAll: boolean = true
): { success: boolean; processedData?: any[]; error?: string } => {
  try {
    // Only process responses where AI consent was given
    const consentedResponses = responses.filter(r => r.aiProcessingConsent);

    const processedData = consentedResponses.map(response => {
      const processedAnswers = response.responses
        .filter(r => r.isPublic || !anonymizeAll) // Only public responses or if explicitly allowed
        .map(encResponse => {
          try {
            let decryptedAnswer = decryptSurveyAnswer(encResponse.encryptedAnswer);

            // Additional anonymization for AI processing
            if (encResponse.answerType === 'text') {
              decryptedAnswer = anonymizeTextResponse(decryptedAnswer);
            }

            return {
              questionId: encResponse.questionId,
              answer: decryptedAnswer,
              type: encResponse.answerType
            };
          } catch (error) {
            return null;
          }
        })
        .filter(Boolean);

      return {
        responseId: anonymizeAll ? `anon-${Math.random().toString(36).substr(2, 9)}` : response.id,
        responses: processedAnswers,
        submittedAt: response.submittedAt
      };
    });

    return { success: true, processedData };

  } catch (error) {
    console.error('Error preparing data for AI processing:', error);
    return { success: false, error: 'Failed to prepare data for AI processing' };
  }
};

// Data retention management
export const cleanupExpiredResponses = async (retentionPeriodDays: number = 365): Promise<{ success: boolean; deletedCount?: number; error?: string }> => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionPeriodDays);

    const initialCount = encryptedSurveyResponses.length;

    // Remove expired responses
    for (let i = encryptedSurveyResponses.length - 1; i >= 0; i--) {
      if (encryptedSurveyResponses[i].submittedAt < cutoffDate) {
        encryptedSurveyResponses.splice(i, 1);
      }
    }

    const deletedCount = initialCount - encryptedSurveyResponses.length;

    console.log(`Data retention cleanup completed: ${deletedCount} expired responses deleted`);

    return { success: true, deletedCount };

  } catch (error) {
    console.error('Error during data cleanup:', error);
    return { success: false, error: 'Failed to cleanup expired responses' };
  }
};
