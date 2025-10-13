import { anonymizeTextResponse, SurveyResponse } from './surveyData';
import { sanitizeInput } from './auth';

export interface AIProcessingConsent {
  userId: string;
  consentGiven: boolean;
  consentDate: Date;
  purposes: AIProcessingPurpose[];
  dataTypes: AIDataType[];
  retentionPeriod: number; // days
  canRevoke: boolean;
  lastUpdated: Date;
}

export type AIProcessingPurpose =
  | 'message_optimization'
  | 'trend_analysis'
  | 'content_generation'
  | 'user_insights'
  | 'performance_analytics'
  | 'personalization';

export type AIDataType =
  | 'survey_responses'
  | 'user_preferences'
  | 'interaction_data'
  | 'demographic_data'
  | 'behavioral_data';

export interface AIPrivacySettings {
  enableAIProcessing: boolean;
  allowDataSharing: boolean;
  anonymizeData: boolean;
  optOutAvailable: boolean;
  auditTrailEnabled: boolean;
  dataRetentionDays: number;
  allowedPurposes: AIProcessingPurpose[];
  allowedDataTypes: AIDataType[];
}

export interface AIAuditLog {
  id: string;
  userId?: string;
  action: string;
  dataType: AIDataType;
  purpose: AIProcessingPurpose;
  timestamp: Date;
  anonymized: boolean;
  consentVerified: boolean;
  resultStored: boolean;
}

export interface AnonymizedUserData {
  anonymousId: string;
  data: any;
  dataType: AIDataType;
  processedFor: AIProcessingPurpose;
  timestamp: Date;
  originalDataHash: string; // For verification without storing original
}

// Default privacy settings (privacy-first approach)
export const getDefaultAIPrivacySettings = (): AIPrivacySettings => ({
  enableAIProcessing: false, // Opt-in required
  allowDataSharing: false,
  anonymizeData: true,
  optOutAvailable: true,
  auditTrailEnabled: true,
  dataRetentionDays: 90, // Conservative default
  allowedPurposes: [], // Explicit consent required for each purpose
  allowedDataTypes: []
});

// Consent management
const aiConsentDatabase: AIProcessingConsent[] = [];
const aiAuditLogs: AIAuditLog[] = [];
const anonymizedDataStore: AnonymizedUserData[] = [];

export const grantAIProcessingConsent = (
  userId: string,
  purposes: AIProcessingPurpose[],
  dataTypes: AIDataType[],
  retentionPeriod: number = 90
): { success: boolean; consentId?: string; error?: string } => {
  try {
    // Validate inputs
    if (!userId || purposes.length === 0 || dataTypes.length === 0) {
      return { success: false, error: 'Invalid consent parameters' };
    }

    if (retentionPeriod > 365) {
      return { success: false, error: 'Retention period cannot exceed 365 days' };
    }

    // Check if consent already exists
    const existingConsentIndex = aiConsentDatabase.findIndex(c => c.userId === userId);

    const consent: AIProcessingConsent = {
      userId,
      consentGiven: true,
      consentDate: new Date(),
      purposes,
      dataTypes,
      retentionPeriod,
      canRevoke: true,
      lastUpdated: new Date()
    };

    if (existingConsentIndex >= 0) {
      // Update existing consent
      aiConsentDatabase[existingConsentIndex] = consent;
    } else {
      // Create new consent
      aiConsentDatabase.push(consent);
    }

    // Log the consent action
    logAIAction(userId, 'consent_granted', 'user_preferences', 'user_insights', true, true);

    return { success: true, consentId: `consent-${userId}-${Date.now()}` };

  } catch (error) {
    console.error('Error granting AI processing consent:', error);
    return { success: false, error: 'Failed to grant consent' };
  }
};

export const revokeAIProcessingConsent = (userId: string): { success: boolean; error?: string } => {
  try {
    const consentIndex = aiConsentDatabase.findIndex(c => c.userId === userId);

    if (consentIndex === -1) {
      return { success: false, error: 'No consent found for user' };
    }

    // Mark consent as revoked
    aiConsentDatabase[consentIndex].consentGiven = false;
    aiConsentDatabase[consentIndex].lastUpdated = new Date();

    // Remove any stored anonymized data for this user
    removeAnonymizedDataForUser(userId);

    // Log the revocation
    logAIAction(userId, 'consent_revoked', 'user_preferences', 'user_insights', true, true);

    return { success: true };

  } catch (error) {
    console.error('Error revoking AI processing consent:', error);
    return { success: false, error: 'Failed to revoke consent' };
  }
};

export const checkAIProcessingConsent = (
  userId: string,
  purpose: AIProcessingPurpose,
  dataType: AIDataType
): { hasConsent: boolean; consent?: AIProcessingConsent; error?: string } => {
  try {
    const consent = aiConsentDatabase.find(c => c.userId === userId && c.consentGiven);

    if (!consent) {
      return { hasConsent: false, error: 'No valid consent found' };
    }

    // Check if consent covers the requested purpose and data type
    const hasPurposeConsent = consent.purposes.includes(purpose);
    const hasDataTypeConsent = consent.dataTypes.includes(dataType);

    // Check if consent is still valid (not expired)
    const expiryDate = new Date(consent.consentDate);
    expiryDate.setDate(expiryDate.getDate() + consent.retentionPeriod);
    const isExpired = new Date() > expiryDate;

    if (isExpired) {
      return { hasConsent: false, error: 'Consent has expired' };
    }

    return {
      hasConsent: hasPurposeConsent && hasDataTypeConsent,
      consent,
      error: !hasPurposeConsent || !hasDataTypeConsent ? 'Consent does not cover requested purpose or data type' : undefined
    };

  } catch (error) {
    console.error('Error checking AI processing consent:', error);
    return { hasConsent: false, error: 'Failed to verify consent' };
  }
};

// Data anonymization for AI processing
export const anonymizeDataForAI = (
  data: any,
  dataType: AIDataType,
  userId?: string
): { success: boolean; anonymizedData?: any; anonymousId?: string; error?: string } => {
  try {
    const anonymousId = `anon-${Math.random().toString(36).substr(2, 16)}`;
    let anonymizedData: any;

    switch (dataType) {
      case 'survey_responses':
        if (Array.isArray(data)) {
          anonymizedData = data.map(response => ({
            ...response,
            userId: undefined,
            answer: typeof response.answer === 'string'
              ? anonymizeTextResponse(response.answer)
              : response.answer
          }));
        } else {
          anonymizedData = {
            ...data,
            userId: undefined,
            answer: typeof data.answer === 'string'
              ? anonymizeTextResponse(data.answer)
              : data.answer
          };
        }
        break;

      case 'user_preferences':
        anonymizedData = {
          preferences: data.preferences,
          timestamp: data.timestamp,
          // Remove any identifying information
          userId: undefined,
          email: undefined,
          name: undefined
        };
        break;

      case 'interaction_data':
        anonymizedData = {
          ...data,
          userId: undefined,
          sessionId: undefined,
          ipAddress: undefined,
          userAgent: data.userAgent ? 'anonymized' : undefined
        };
        break;

      case 'demographic_data':
        anonymizedData = {
          industry: data.industry || 'undisclosed',
          companySize: data.companySize || 'undisclosed',
          role: data.role || 'undisclosed',
          // Remove specific company or personal information
          company: undefined,
          location: undefined,
          userId: undefined
        };
        break;

      case 'behavioral_data':
        anonymizedData = {
          actions: data.actions?.map((action: any) => ({
            type: action.type,
            timestamp: action.timestamp,
            category: action.category,
            // Remove identifying details
            details: undefined,
            userId: undefined
          })) || [],
          patterns: data.patterns || {},
          userId: undefined
        };
        break;

      default:
        return { success: false, error: 'Unsupported data type for anonymization' };
    }

    return {
      success: true,
      anonymizedData,
      anonymousId
    };

  } catch (error) {
    console.error('Error anonymizing data for AI:', error);
    return { success: false, error: 'Failed to anonymize data' };
  }
};

// Secure AI data processing
export const processDataWithAI = async (
  userId: string,
  data: any,
  purpose: AIProcessingPurpose,
  dataType: AIDataType,
  forceAnonymize: boolean = true
): Promise<{ success: boolean; result?: any; anonymousId?: string; error?: string }> => {
  try {
    // Check consent first
    const consentCheck = checkAIProcessingConsent(userId, purpose, dataType);
    if (!consentCheck.hasConsent) {
      return { success: false, error: consentCheck.error || 'No consent for AI processing' };
    }

    // Anonymize data if required
    let processedData = data;
    let anonymousId: string | undefined;

    if (forceAnonymize || consentCheck.consent?.purposes.includes(purpose)) {
      const anonymization = anonymizeDataForAI(data, dataType, userId);
      if (!anonymization.success) {
        return { success: false, error: anonymization.error };
      }
      processedData = anonymization.anonymizedData;
      anonymousId = anonymization.anonymousId;
    }

    // Store anonymized data
    if (anonymousId) {
      const anonymizedEntry: AnonymizedUserData = {
        anonymousId,
        data: processedData,
        dataType,
        processedFor: purpose,
        timestamp: new Date(),
        originalDataHash: hashData(JSON.stringify(data))
      };
      anonymizedDataStore.push(anonymizedEntry);
    }

    // Simulate AI processing (in production, this would call actual AI services)
    const aiResult = await simulateAIProcessing(processedData, purpose);

    // Log the processing action
    logAIAction(
      userId,
      'data_processed',
      dataType,
      purpose,
      forceAnonymize,
      consentCheck.hasConsent,
      !!aiResult
    );

    return {
      success: true,
      result: aiResult,
      anonymousId
    };

  } catch (error) {
    console.error('Error processing data with AI:', error);
    return { success: false, error: 'AI processing failed' };
  }
};

// Audit logging
export const logAIAction = (
  userId: string,
  action: string,
  dataType: AIDataType,
  purpose: AIProcessingPurpose,
  anonymized: boolean,
  consentVerified: boolean,
  resultStored: boolean = false
): void => {
  const logEntry: AIAuditLog = {
    id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    userId: anonymized ? undefined : userId,
    action,
    dataType,
    purpose,
    timestamp: new Date(),
    anonymized,
    consentVerified,
    resultStored
  };

  aiAuditLogs.push(logEntry);

  // In production, this would be stored in a secure audit database
  console.log('AI Action Logged:', {
    action: logEntry.action,
    dataType: logEntry.dataType,
    purpose: logEntry.purpose,
    timestamp: logEntry.timestamp,
    anonymized: logEntry.anonymized,
    consentVerified: logEntry.consentVerified
  });
};

// Utility functions
const hashData = (data: string): string => {
  // Simple hash function for demonstration
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

const removeAnonymizedDataForUser = (userId: string): void => {
  // In a real implementation, this would be more complex as we'd need to track
  // which anonymized entries belong to which user (perhaps through a separate mapping)
  console.log(`Removing anonymized data for user: ${userId}`);
};

// Simulated AI processing
const simulateAIProcessing = async (data: any, purpose: AIProcessingPurpose): Promise<any> => {
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 100));

  switch (purpose) {
    case 'message_optimization':
      return {
        suggestions: ['Improve clarity', 'Add emotional appeal', 'Simplify language'],
        confidence: 0.85
      };
    case 'trend_analysis':
      return {
        trends: ['Increasing satisfaction', 'Growing feature requests'],
        insights: 'Users want more automation features'
      };
    case 'content_generation':
      return {
        generatedContent: 'AI-generated content based on anonymized data',
        relevanceScore: 0.92
      };
    case 'user_insights':
      return {
        patterns: ['High engagement with surveys', 'Preference for visual content'],
        recommendations: 'Focus on interactive elements'
      };
    case 'performance_analytics':
      return {
        metrics: { engagement: 0.78, completion: 0.85, satisfaction: 0.82 },
        improvements: 'Reduce survey length'
      };
    case 'personalization':
      return {
        personalizedElements: ['Recommended questions', 'Tailored UI'],
        effectiveness: 0.73
      };
    default:
      return { processed: true, data: 'Generic AI result' };
  }
};

// Compliance and reporting
export const generatePrivacyReport = (userId: string): {
  success: boolean;
  report?: any;
  error?: string
} => {
  try {
    const userConsent = aiConsentDatabase.find(c => c.userId === userId);
    const userLogs = aiAuditLogs.filter(log => log.userId === userId);
    const anonymizedEntries = anonymizedDataStore.filter(entry =>
      entry.originalDataHash // This would need a proper mapping in production
    );

    const report = {
      userId,
      consentStatus: userConsent ? {
        granted: userConsent.consentGiven,
        date: userConsent.consentDate,
        purposes: userConsent.purposes,
        dataTypes: userConsent.dataTypes,
        retentionPeriod: userConsent.retentionPeriod,
        lastUpdated: userConsent.lastUpdated
      } : null,
      processingHistory: userLogs.map(log => ({
        action: log.action,
        dataType: log.dataType,
        purpose: log.purpose,
        timestamp: log.timestamp,
        anonymized: log.anonymized
      })),
      dataProcessed: anonymizedEntries.length,
      lastActivity: userLogs.length > 0 ? userLogs[userLogs.length - 1].timestamp : null
    };

    return { success: true, report };

  } catch (error) {
    console.error('Error generating privacy report:', error);
    return { success: false, error: 'Failed to generate privacy report' };
  }
};

// Data cleanup utilities
export const cleanupExpiredAIData = async (): Promise<{
  success: boolean;
  deletedLogs?: number;
  deletedData?: number;
  error?: string;
}> => {
  try {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 365); // Keep logs for 1 year

    // Cleanup old audit logs
    const initialLogCount = aiAuditLogs.length;
    for (let i = aiAuditLogs.length - 1; i >= 0; i--) {
      if (aiAuditLogs[i].timestamp < cutoffDate) {
        aiAuditLogs.splice(i, 1);
      }
    }

    // Cleanup old anonymized data based on consent retention periods
    const initialDataCount = anonymizedDataStore.length;
    for (let i = anonymizedDataStore.length - 1; i >= 0; i--) {
      const dataAge = Date.now() - anonymizedDataStore[i].timestamp.getTime();
      const maxAge = 90 * 24 * 60 * 60 * 1000; // 90 days in milliseconds

      if (dataAge > maxAge) {
        anonymizedDataStore.splice(i, 1);
      }
    }

    const deletedLogs = initialLogCount - aiAuditLogs.length;
    const deletedData = initialDataCount - anonymizedDataStore.length;

    console.log(`AI Data cleanup completed: ${deletedLogs} logs and ${deletedData} data entries deleted`);

    return {
      success: true,
      deletedLogs,
      deletedData
    };

  } catch (error) {
    console.error('Error during AI data cleanup:', error);
    return { success: false, error: 'Failed to cleanup AI data' };
  }
};
