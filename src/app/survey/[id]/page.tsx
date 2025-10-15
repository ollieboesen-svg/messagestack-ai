"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Star,
  ThumbsUp,
  ThumbsDown,
  User,
  Building2,
  CheckCircle,
  Sparkles,
  Clock,
  Shield,
  Eye,
  EyeOff,
  Lock
} from "lucide-react";
import { useParams } from "next/navigation";
import {
  submitSurveySecurely,
  SurveyPrivacySettings,
  ConsentOptions
} from "@/lib/surveyData";
import { getSecureToken, validateSession, UserSession } from "@/lib/auth";
import { LogoIcon } from "@/components/Logo";

export default function SurveyResponse() {
  const params = useParams();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<Response[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Privacy and consent state
  const [privacySettings, setPrivacySettings] = useState<SurveyPrivacySettings>({
    allowAIProcessing: false,
    allowPublicInsights: false,
    allowDataRetention: true,
    retentionPeriodDays: 90,
    anonymizeResponses: true
  });

  const [consent, setConsent] = useState<ConsentOptions>({
    dataProcessing: false,
    aiAnalysis: false,
    publicInsights: false,
    marketingCommunications: false,
    dataRetention: false
  });

  useEffect(() => {
    // Check if user is authenticated
    const token = getSecureToken();
    if (token) {
      const session = validateSession(token);
      if (session.isValid && session.user) {
        setCurrentUser(session.user);
      }
    }

    // Simulate loading survey data
    setTimeout(() => {
      setSurvey(mockSurvey);
      setIsLoading(false);
    }, 1000);
  }, [params.id]);

  const currentQuestion = survey?.questions[currentQuestionIndex];
  const currentResponse = responses.find(r => r.questionId === currentQuestion?.id);
  const progress = survey ? ((currentQuestionIndex + 1) / survey.questions.length) * 100 : 0;

  const handleResponse = (questionId: string, answer: string | string[] | number) => {
    setResponses(prev => {
      const existing = prev.findIndex(r => r.questionId === questionId);
      const newResponse = { questionId, answer };

      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newResponse;
        return updated;
      } else {
        return [...prev, newResponse];
      }
    });
  };

  const canProceed = () => {
    if (!currentQuestion) return false;
    if (!currentQuestion.required) return true;

    const response = responses.find(r => r.questionId === currentQuestion.id);
    if (!response) return false;

    if (Array.isArray(response.answer)) {
      return response.answer.length > 0;
    }

    return response.answer !== "" && response.answer !== null && response.answer !== undefined;
  };

  const handleNext = () => {
    if (survey && currentQuestionIndex < survey.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if required consent is given
    if (!consent.dataProcessing) {
      alert('Data processing consent is required to submit responses');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare responses for submission
      const surveyResponses = responses.map(response => ({
        questionId: response.questionId,
        answer: response.answer,
        type: survey?.questions.find(q => q.id === response.questionId)?.type || 'text'
      }));

      // Submit securely
      const result = await submitSurveySecurely(
        survey?.id || 'unknown',
        surveyResponses,
        consent,
        privacySettings,
        currentUser?.id,
        undefined, // IP address - would be captured server-side
        navigator.userAgent
      );

      if (result.success) {
        setIsSubmitted(true);
        console.log('Survey submitted securely with ID:', result.responseId);
      } else {
        alert('Failed to submit survey: ' + (result.errors?.join(', ') || 'Unknown error'));
      }

    } catch (error) {
      console.error('Survey submission error:', error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderQuestionInput = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case "text":
        return (
          <textarea
            value={(currentResponse?.answer as string) || ""}
            onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
            placeholder="Please share your thoughts..."
            className="w-full h-32 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
          />
        );

      case "multiple_choice":
        const selectedOptions = (currentResponse?.answer as string[]) || [];
        return (
          <div className="space-y-3">
            {currentQuestion.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type={currentQuestion.config?.multiSelect ? "checkbox" : "radio"}
                  name={currentQuestion.id}
                  checked={
                    currentQuestion.config?.multiSelect
                      ? selectedOptions.includes(option)
                      : currentResponse?.answer === option
                  }
                  onChange={(e) => {
                    if (currentQuestion.config?.multiSelect) {
                      const updated = e.target.checked
                        ? [...selectedOptions, option]
                        : selectedOptions.filter(o => o !== option);
                      handleResponse(currentQuestion.id, updated);
                    } else {
                      handleResponse(currentQuestion.id, option);
                    }
                  }}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "rating":
        const scale = currentQuestion.config?.scale || { min: 1, max: 5 };
        const selectedRating = currentResponse?.answer as number;
        return (
          <div className="flex space-x-3 justify-center">
            {Array.from({ length: scale.max - scale.min + 1 }, (_, i) => {
              const value = scale.min + i;
              return (
                <button
                  key={value}
                  onClick={() => handleResponse(currentQuestion.id, value)}
                  className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                    selectedRating === value
                      ? 'border-teal-500 bg-teal-500 text-white'
                      : 'border-slate-300 text-slate-600 hover:border-teal-300 hover:bg-teal-50'
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        );

      case "likert":
        const selectedLikert = currentResponse?.answer as string;
        return (
          <div className="space-y-3">
            {likertOptions.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <input
                  type="radio"
                  name={currentQuestion.id}
                  checked={selectedLikert === option}
                  onChange={() => handleResponse(currentQuestion.id, option)}
                  className="rounded-full border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="text-slate-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "yes_no":
        const selectedYesNo = currentResponse?.answer as string;
        return (
          <div className="flex space-x-6 justify-center">
            <button
              onClick={() => handleResponse(currentQuestion.id, "Yes")}
              className={`px-8 py-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                selectedYesNo === "Yes"
                  ? 'border-green-500 bg-green-500 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-green-300 hover:bg-green-50'
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>Yes</span>
            </button>
            <button
              onClick={() => handleResponse(currentQuestion.id, "No")}
              className={`px-8 py-3 rounded-lg border-2 transition-all duration-200 flex items-center space-x-2 ${
                selectedYesNo === "No"
                  ? 'border-red-500 bg-red-500 text-white'
                  : 'border-slate-300 text-slate-600 hover:border-red-300 hover:bg-red-50'
              }`}
            >
              <ThumbsDown className="h-5 w-5" />
              <span>No</span>
            </button>
          </div>
        );

      case "ranking":
        const rankedOptions = (currentResponse?.answer as string[]) || [];
        const availableOptions = currentQuestion.options?.filter(opt => !rankedOptions.includes(opt)) || [];

        return (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <h4 className="font-medium text-slate-900 mb-3">Your Ranking:</h4>
              <div className="space-y-2">
                {rankedOptions.map((option, index) => (
                  <div key={option} className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg">
                    <span className="w-6 h-6 bg-teal-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-slate-700">{option}</span>
                    <button
                      onClick={() => {
                        const updated = rankedOptions.filter(o => o !== option);
                        handleResponse(currentQuestion.id, updated);
                      }}
                      className="ml-auto text-slate-400 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {availableOptions.length > 0 && (
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Available Options:</h4>
                <div className="space-y-2">
                  {availableOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        const updated = [...rankedOptions, option];
                        handleResponse(currentQuestion.id, updated);
                      }}
                      className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  if (!survey) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Survey Not Found</h2>
          <p className="text-slate-600">The survey you're looking for doesn't exist or has been removed.</p>
        </Card>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Card className="p-8 max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Thank you for your feedback!</h2>
          <p className="text-slate-600 mb-6">
            Your responses have been submitted successfully. Your insights will help us improve our messaging and better serve our customers.
          </p>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-sm text-slate-500">
              Survey completed for <strong>{survey.companyName}</strong>
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <LogoIcon size="md" />
              <div>
                <h1 className="font-bold text-slate-900">{survey.companyName}</h1>
                <p className="text-sm text-slate-500">Research Survey</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <Clock className="h-4 w-4" />
                <span>~{survey.estimatedTime} min</span>
              </div>
              <Badge className="bg-blue-100 text-blue-700">
                {survey.stakeholderType === "customer" && <User className="h-3 w-3 mr-1" />}
                {survey.stakeholderType === "employee" && <Building2 className="h-3 w-3 mr-1" />}
                {survey.role}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Survey Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">{survey.title}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{survey.description}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">
                Question {currentQuestionIndex + 1} of {survey.questions.length}
              </span>
              <span className="text-sm text-slate-500">{Math.round(progress)}% complete</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'
                }}
              ></div>
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 mb-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {currentQuestion?.text}
                {currentQuestion?.required && <span className="text-red-500 ml-1">*</span>}
              </h3>
              {currentQuestion?.type === "multiple_choice" && currentQuestion.config?.multiSelect && (
                <p className="text-sm text-slate-500">You can select multiple options</p>
              )}
            </div>

            {renderQuestionInput()}
          </Card>

          {/* Privacy and Consent Section */}
          {currentQuestionIndex === survey.questions.length - 1 && (
            <Card className="p-6 mb-6 border-blue-200 bg-blue-50">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-slate-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Privacy & Data Processing Consent
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Before submitting your responses, please review and provide consent for how your data will be processed.
                </p>
              </div>

              <div className="space-y-4">
                {/* Required Consent */}
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Required Consent</h4>
                  <label className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={consent.dataProcessing}
                      onChange={(e) => setConsent(prev => ({ ...prev, dataProcessing: e.target.checked }))}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Data Processing Consent *</span>
                      <p className="text-xs text-slate-600">I consent to the processing of my survey responses for research and analysis purposes.</p>
                    </div>
                  </label>
                </div>

                {/* Optional Consent */}
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Optional Consent</h4>

                  <label className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={consent.aiAnalysis}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setConsent(prev => ({ ...prev, aiAnalysis: checked }));
                        setPrivacySettings(prev => ({ ...prev, allowAIProcessing: checked }));
                      }}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">AI Analysis</span>
                      <p className="text-xs text-slate-600">Allow AI to analyze my responses for insights and improvements (data will be anonymized).</p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={consent.publicInsights}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setConsent(prev => ({ ...prev, publicInsights: checked }));
                        setPrivacySettings(prev => ({ ...prev, allowPublicInsights: checked }));
                      }}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Public Insights</span>
                      <p className="text-xs text-slate-600">Allow anonymized insights from my responses to be used in public reports and case studies.</p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-white cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={consent.dataRetention}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        setConsent(prev => ({ ...prev, dataRetention: checked }));
                        setPrivacySettings(prev => ({ ...prev, allowDataRetention: checked }));
                      }}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-slate-900">Extended Data Retention</span>
                      <p className="text-xs text-slate-600">Allow data to be retained for longer-term trend analysis (up to 1 year, anonymized after 90 days).</p>
                    </div>
                  </label>
                </div>

                {/* Privacy Settings */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setShowPrivacySettings(!showPrivacySettings)}
                    className="flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-700"
                  >
                    {showPrivacySettings ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span>{showPrivacySettings ? 'Hide' : 'Show'} Advanced Privacy Settings</span>
                  </button>

                  {showPrivacySettings && (
                    <div className="p-4 bg-slate-50 rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">Data Anonymization</span>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={privacySettings.anonymizeResponses}
                            onChange={(e) => setPrivacySettings(prev => ({ ...prev, anonymizeResponses: e.target.checked }))}
                            className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm text-slate-600">Anonymize my responses</span>
                        </label>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">Data Retention Period</span>
                        <select
                          value={privacySettings.retentionPeriodDays}
                          onChange={(e) => setPrivacySettings(prev => ({ ...prev, retentionPeriodDays: parseInt(e.target.value) }))}
                          className="text-sm border border-slate-300 rounded px-2 py-1"
                        >
                          <option value={30}>30 days</option>
                          <option value={90}>90 days</option>
                          <option value={180}>180 days</option>
                          <option value={365}>1 year</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* Security Notice */}
                <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <Lock className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-green-900">Your data is secure</p>
                      <p className="text-xs text-green-700">All responses are encrypted and stored securely. You can request data deletion at any time.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex space-x-3">
              {currentQuestionIndex === survey.questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || !consent.dataProcessing || isLoading}
                  className="text-white px-8"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Submitting Securely...
                    </>
                  ) : (
                    <>
                      <Shield className="h-4 w-4 mr-2" />
                      <span>Submit Survey Securely</span>
                      <Check className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="text-white flex items-center space-x-2"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface Question {
  id: string;
  text: string;
  type: "text" | "multiple_choice" | "rating" | "ranking" | "yes_no" | "likert";
  options?: string[];
  required?: boolean;
  config?: {
    scale?: { min: number; max: number; labels?: string[] };
    multiSelect?: boolean;
  };
}

interface Survey {
  id: string;
  title: string;
  description: string;
  stakeholderType: string;
  role: string;
  questions: Question[];
  companyName?: string;
  estimatedTime?: number;
}

interface Response {
  questionId: string;
  answer: string | string[] | number;
}

const likertOptions = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];

// Mock survey data - in real app this would come from API
const mockSurvey: Survey = {
  id: "survey-123",
  title: "Customer - End User Survey",
  description: "Help us understand your experience and gather insights to improve our messaging and positioning.",
  stakeholderType: "customer",
  role: "End User",
  companyName: "Message Stack",
  estimatedTime: 3,
  questions: [
    {
      id: "q1",
      text: "How would you describe our position in the market?",
      type: "text",
      required: true
    },
    {
      id: "q2",
      text: "What's the primary value you get from our solution?",
      type: "multiple_choice",
      options: [
        "Faster messaging development",
        "Better strategic alignment",
        "Improved team collaboration",
        "Cost savings",
        "Higher quality output"
      ],
      config: { multiSelect: true },
      required: true
    },
    {
      id: "q3",
      text: "How satisfied are you with our overall solution?",
      type: "rating",
      config: { scale: { min: 1, max: 5 } },
      required: true
    },
    {
      id: "q4",
      text: "Our solution helps my team create better messaging",
      type: "likert",
      required: true
    },
    {
      id: "q5",
      text: "Would you recommend our solution to a colleague?",
      type: "yes_no",
      required: true
    },
    {
      id: "q6",
      text: "Please rank these features by importance to you",
      type: "ranking",
      options: [
        "Survey creation tools",
        "Strategic brief generator",
        "Message grid framework",
        "AI copy generation"
      ],
      required: false
    }
  ]
};
