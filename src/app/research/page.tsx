"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockSurveyResponses, getResponseStatistics, getResponsesByStakeholderType, type SurveyResponse } from "@/lib/mockData";
import {
  Users,
  ArrowLeft,
  Plus,
  Search,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  X,
  Send,
  Upload,
  Download,
  Eye,
  Trash2,
  ChevronDown,
  User,
  Building2,
  ShoppingBag,
  TrendingUp,
  Lightbulb,
  List,
  Type,
  CheckSquare,
  Star,
  ThumbsUp,
  ArrowUpDown,
  Edit3,
  Save,
  Clock,
  Mail,
  Link as LinkIcon,
  AlertTriangle,
  Copy,
  Check
} from "lucide-react";
import Link from "next/link";

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
  status: "draft" | "active" | "completed";
  responses: number;
  createdAt: Date;
  lastModified: Date;
}

interface ResearchFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
}

const stakeholderTypes = [
  { value: "customer", label: "Customer/User", icon: User, description: "People who use our product/service" },
  { value: "employee", label: "Employee", icon: Building2, description: "Internal team members and staff" },
  { value: "prospect", label: "Prospect", icon: ShoppingBag, description: "Potential customers considering our solution" },
  { value: "market", label: "Market Voice", icon: TrendingUp, description: "Industry experts, analysts, partners" }
];

const rolesByType = {
  customer: [
    "End User", "Decision Maker", "Administrator", "Power User", "Occasional User"
  ],
  employee: [
    "Executive Leadership", "Marketing Team", "Sales Team", "Product Team", "Customer Success", "Support Team"
  ],
  prospect: [
    "Evaluator", "Budget Owner", "Technical Decision Maker", "End User", "Influencer"
  ],
  market: [
    "Industry Analyst", "Partner", "Vendor", "Consultant", "Media/Press", "Investor"
  ]
};

const questionTypes = [
  { value: "text", label: "Free Text", icon: Type, description: "Open-ended response" },
  { value: "multiple_choice", label: "Multiple Choice", icon: CheckSquare, description: "Select one or more options" },
  { value: "rating", label: "Rating Scale", icon: Star, description: "1-5 or 1-10 scale" },
  { value: "ranking", label: "Ranking", icon: ArrowUpDown, description: "Order items by importance" },
  { value: "yes_no", label: "Yes/No", icon: ThumbsUp, description: "Simple binary choice" },
  { value: "likert", label: "Agreement Scale", icon: BarChart3, description: "Strongly agree to strongly disagree" }
];

const questionTopics = {
  positioning: [
    "How would you describe our position in the market?",
    "What makes us different from competitors?",
    "What words come to mind when you think of our brand?",
    "How do we compare to alternatives you've considered?"
  ],
  value_proposition: [
    "What's the primary value you get from our solution?",
    "What problem does our product solve for you?",
    "What would you miss most if you couldn't use our product?",
    "How has our solution improved your workflow/business?"
  ],
  messaging: [
    "What messaging resonates most with your audience?",
    "How would you explain our product to a colleague?",
    "What concerns or objections do you typically hear?",
    "What proof points are most convincing to buyers?"
  ],
  competitive: [
    "Who do you consider our main competitors?",
    "What advantages do we have over competitors?",
    "Where do competitors outperform us?",
    "What would make you choose us over alternatives?"
  ],
  experience: [
    "What's your overall satisfaction with our solution?",
    "What aspects of our product work best for you?",
    "What areas need the most improvement?",
    "How likely are you to recommend us?"
  ]
};

const scaleOptions = [
  { value: "1-5", label: "1-5 Scale", min: 1, max: 5 },
  { value: "1-10", label: "1-10 Scale", min: 1, max: 10 },
  { value: "0-10", label: "0-10 Scale (NPS)", min: 0, max: 10 }
];

const likertOptions = [
  "Strongly Disagree",
  "Disagree",
  "Neutral",
  "Agree",
  "Strongly Agree"
];

export default function Research() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [researchFiles, setResearchFiles] = useState<ResearchFile[]>([]);
  const [showCreateSurvey, setShowCreateSurvey] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showPreviewSurvey, setShowPreviewSurvey] = useState(false);
  const [showSendModal, setShowSendModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [editingSurveyId, setEditingSurveyId] = useState<string | null>(null);
  const [previewSurvey, setPreviewSurvey] = useState<Survey | null>(null);
  const [sendingSurvey, setSendingSurvey] = useState<Survey | null>(null);
  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(null);
  const [emailForm, setEmailForm] = useState({
    emails: "",
    subject: "",
    message: ""
  });
  const [linkCopied, setLinkCopied] = useState(false);
  const [emailSending, setEmailSending] = useState(false);
  const [selectedSuggestedQuestions, setSelectedSuggestedQuestions] = useState<Set<string>>(new Set());
  const [questionSearch, setQuestionSearch] = useState("");
  const [showQuestionPreview, setShowQuestionPreview] = useState(false);
  const [previewQuestion, setPreviewQuestion] = useState<Question | null>(null);
  const [questionHistory, setQuestionHistory] = useState<Question[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [surveyForm, setSurveyForm] = useState({
    title: "",
    description: "",
    stakeholderType: "",
    role: ""
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = useState<Question>({
    id: "",
    text: "",
    type: "text",
    options: [],
    required: true,
    config: {}
  });

  // Response viewer state
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);

  // Response viewing function
  const handleViewResponse = (response: SurveyResponse) => {
    setSelectedResponse(response);
    setShowResponseModal(true);
  };

  // Helper functions for undo/redo functionality
  const handleStakeholderTypeChange = (type: string) => {
    setSurveyForm(prev => ({
      ...prev,
      stakeholderType: type,
      role: ""
    }));
  };

  const saveToHistory = (newQuestions: Question[]) => {
    setQuestionHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push([...newQuestions]);
      return newHistory.slice(-10); // Keep only last 10 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 9));
  };

  const undoQuestion = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const previousState = questionHistory[historyIndex - 1];
      setQuestions([...previousState]);

      // Update selected questions to match the previous state
      const selectedTexts = new Set(previousState.map(q => q.text));
      setSelectedSuggestedQuestions(selectedTexts);
    }
  };

  const redoQuestion = () => {
    if (historyIndex < questionHistory.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextState = questionHistory[historyIndex + 1];
      setQuestions([...nextState]);

      // Update selected questions to match the next state
      const selectedTexts = new Set(nextState.map(q => q.text));
      setSelectedSuggestedQuestions(selectedTexts);
    }
  };

  // Filter suggested questions based on search
  const filterQuestions = (topicQuestions: string[]) => {
    if (!questionSearch.trim()) return topicQuestions;
    return topicQuestions.filter(question =>
      question.toLowerCase().includes(questionSearch.toLowerCase())
    );
  };

  const handleRoleChange = (role: string) => {
    setSurveyForm(prev => ({
      ...prev,
      role,
      title: prev.title || `${stakeholderTypes.find(t => t.value === surveyForm.stakeholderType)?.label} - ${role} Survey`,
      description: prev.description || `Collect positioning and messaging insights from ${role.toLowerCase()}s to inform our strategy.`
    }));
  };

  const handleCreateSurvey = () => {
    if (surveyForm.title.trim() && surveyForm.stakeholderType && surveyForm.role && questions.length > 0) {
      const now = new Date();

      if (editingSurveyId) {
        // Update existing survey
        setSurveys(prev => prev.map(survey =>
          survey.id === editingSurveyId
            ? {
                ...survey,
                title: surveyForm.title,
                description: surveyForm.description,
                stakeholderType: surveyForm.stakeholderType,
                role: surveyForm.role,
                questions: questions,
                status: "active" as const,
                lastModified: now
              }
            : survey
        ));
      } else {
        // Create new survey
        const survey: Survey = {
          id: Date.now().toString(),
          title: surveyForm.title,
          description: surveyForm.description,
          stakeholderType: surveyForm.stakeholderType,
          role: surveyForm.role,
          questions: questions,
          status: "active",
          responses: 0,
          createdAt: now,
          lastModified: now
        };
        setSurveys(prev => [...prev, survey]);
      }

      resetSurveyForm();
    }
  };

  const handleSaveDraft = () => {
    if (surveyForm.title.trim() && surveyForm.stakeholderType && surveyForm.role) {
      const now = new Date();

      if (editingSurveyId) {
        // Update existing draft
        setSurveys(prev => prev.map(survey =>
          survey.id === editingSurveyId
            ? {
                ...survey,
                title: surveyForm.title,
                description: surveyForm.description,
                stakeholderType: surveyForm.stakeholderType,
                role: surveyForm.role,
                questions: questions,
                lastModified: now
              }
            : survey
        ));
      } else {
        // Create new draft
        const survey: Survey = {
          id: Date.now().toString(),
          title: surveyForm.title,
          description: surveyForm.description,
          stakeholderType: surveyForm.stakeholderType,
          role: surveyForm.role,
          questions: questions,
          status: "draft",
          responses: 0,
          createdAt: now,
          lastModified: now
        };
        setSurveys(prev => [...prev, survey]);
      }

      resetSurveyForm();
    }
  };

  const handleEditSurvey = (survey: Survey) => {
    setEditingSurveyId(survey.id);
    setSurveyForm({
      title: survey.title,
      description: survey.description,
      stakeholderType: survey.stakeholderType,
      role: survey.role
    });
    setQuestions(survey.questions);
    setShowCreateSurvey(true);
  };

  const handlePreviewSurvey = (survey: Survey) => {
    setPreviewSurvey(survey);
    setShowPreviewSurvey(true);
  };

  const handleSendSurvey = (survey: Survey) => {
    setSendingSurvey(survey);
    setEmailForm({
      emails: "",
      subject: `Survey: ${survey.title}`,
      message: `Hi there,

I'd like to invite you to participate in a brief survey titled "${survey.title}".

${survey.description}

This survey has ${survey.questions.length} questions and should take about ${Math.ceil(survey.questions.length * 0.5)} minutes to complete.

Please click the link below to get started:
[Survey Link]

Thank you for your time and insights!

Best regards,
[Your Name]`
    });
    setShowSendModal(true);
  };

  const handleDeleteSurvey = (surveyId: string) => {
    setSurveys(prev => prev.filter(survey => survey.id !== surveyId));
    setShowDeleteConfirm(null);
  };

  const handleSendEmail = async () => {
    if (!emailForm.emails.trim() || !sendingSurvey) return;

    setEmailSending(true);

    // Simulate email sending
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // In a real app, you would call your email API here
      console.log('Sending survey email:', {
        survey: sendingSurvey.title,
        emails: emailForm.emails.split(',').map(email => email.trim()),
        subject: emailForm.subject,
        message: emailForm.message
      });

      setShowSendModal(false);
      setEmailForm({ emails: "", subject: "", message: "" });

      // Show success message (you could add a toast notification here)
      alert(`Survey "${sendingSurvey.title}" sent successfully to ${emailForm.emails.split(',').length} recipient(s)!`);

    } catch (error) {
      alert('Failed to send email. Please try again.');
    } finally {
      setEmailSending(false);
    }
  };

  const handleCopyLink = async () => {
    if (!sendingSurvey) return;

    const surveyLink = `${window.location.origin}/survey/${sendingSurvey.id}`;

    try {
      await navigator.clipboard.writeText(surveyLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = surveyLink;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    }
  };

  const resetSurveyForm = () => {
    setSurveyForm({
      title: "",
      description: "",
      stakeholderType: "",
      role: ""
    });
    setQuestions([]);
    setSelectedSuggestedQuestions(new Set());
    setQuestionHistory([]);
    setHistoryIndex(-1);
    setQuestionSearch("");
    setEditingSurveyId(null);
    setEditingQuestionId(null);
    setShowCreateSurvey(false);
  };

  const addSuggestedQuestion = (questionText: string, topic: string) => {
    // Check if this question is already added
    if (selectedSuggestedQuestions.has(questionText)) {
      return; // Don't add duplicate questions
    }

    const question: Question = {
      id: Date.now().toString() + Math.random(),
      text: questionText,
      type: "text",
      required: true,
      config: {}
    };
    const newQuestions = [...questions, question];
    setQuestions(newQuestions);
    setSelectedSuggestedQuestions(prev => new Set([...prev, questionText]));
    saveToHistory(newQuestions);
  };

  const editSuggestedQuestion = (questionText: string, topic: string) => {
    setNewQuestion({
      id: "",
      text: questionText,
      type: "text",
      options: [],
      required: true,
      config: {}
    });
    setShowAddQuestion(true);
  };

  const previewCustomQuestion = (questionText: string, topic: string) => {
    const question: Question = {
      id: "preview",
      text: questionText,
      type: "text",
      required: true,
      config: {}
    };
    setPreviewQuestion(question);
    setShowQuestionPreview(true);
  };

  const addCustomQuestion = () => {
    if (newQuestion.text.trim()) {
      const question: Question = {
        ...newQuestion,
        id: editingQuestionId || (Date.now().toString() + Math.random())
      };

      let newQuestions: Question[];
      if (editingQuestionId) {
        newQuestions = questions.map(q => q.id === editingQuestionId ? question : q);
        setQuestions(newQuestions);
        setEditingQuestionId(null);
      } else {
        newQuestions = [...questions, question];
        setQuestions(newQuestions);
      }

      saveToHistory(newQuestions);

      setNewQuestion({
        id: "",
        text: "",
        type: "text",
        options: [],
        required: true,
        config: {}
      });
      setShowAddQuestion(false);
    }
  };

  const editQuestion = (question: Question) => {
    setEditingQuestionId(question.id);
    setNewQuestion({ ...question });
    setShowAddQuestion(true);
  };

  const removeQuestion = (questionId: string) => {
    // Find the question being removed to get its text
    const questionToRemove = questions.find(q => q.id === questionId);

    const newQuestions = questions.filter(q => q.id !== questionId);
    setQuestions(newQuestions);
    saveToHistory(newQuestions);

    // Also remove from selected suggested questions if it was a suggested question
    if (questionToRemove) {
      setSelectedSuggestedQuestions(prev => {
        const newSet = new Set(prev);
        newSet.delete(questionToRemove.text);
        return newSet;
      });
    }
  };

  const updateQuestion = (questionId: string, updates: Partial<Question>) => {
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, ...updates } : q));
  };

  const addOption = () => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), ""]
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.map((opt, i) => i === index ? value : opt) || []
    }));
  };

  const removeOption = (index: number) => {
    setNewQuestion(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }));
  };

  const updateQuestionType = (type: Question["type"]) => {
    let config = {};
    let options: string[] = [];

    switch (type) {
      case "rating":
        config = { scale: { min: 1, max: 5 } };
        break;
      case "likert":
        options = [...likertOptions];
        break;
      case "yes_no":
        options = ["Yes", "No"];
        break;
      case "multiple_choice":
      case "ranking":
        options = [""];
        break;
    }

    setNewQuestion(prev => ({
      ...prev,
      type,
      options,
      config
    }));
  };

  const updateRatingScale = (scaleType: string) => {
    const scale = scaleOptions.find(s => s.value === scaleType);
    if (scale) {
      setNewQuestion(prev => ({
        ...prev,
        config: {
          ...prev.config,
          scale: { min: scale.min, max: scale.max }
        }
      }));
    }
  };

  const handleUploadResearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const researchFile: ResearchFile = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          type: file.type || "Unknown",
          size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          uploadedAt: new Date()
        };
        setResearchFiles(prev => [...prev, researchFile]);
      });
    }
    setShowUploadModal(false);
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case "rating":
        const scale = question.config?.scale || { min: 1, max: 5 };
        return (
          <div className="flex space-x-2 mt-2">
            {Array.from({ length: scale.max - scale.min + 1 }, (_, i) => (
              <div key={i} className="w-8 h-8 border border-slate-300 rounded flex items-center justify-center text-sm">
                {scale.min + i}
              </div>
            ))}
          </div>
        );
      case "multiple_choice":
      case "ranking":
        return (
          <div className="space-y-1 mt-2">
            {question.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-slate-300 rounded"></div>
                <span className="text-sm text-slate-600">{option}</span>
              </div>
            ))}
          </div>
        );
      case "yes_no":
        return (
          <div className="flex space-x-4 mt-2">
            <label className="flex items-center space-x-2">
              <input type="radio" name="preview" disabled />
              <span className="text-sm">Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="preview" disabled />
              <span className="text-sm">No</span>
            </label>
          </div>
        );
      case "likert":
        return (
          <div className="space-y-1 mt-2">
            {likertOptions.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 border border-slate-300 rounded-full"></div>
                <span className="text-sm text-slate-600">{option}</span>
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div className="mt-2">
            <div className="w-full h-8 border border-slate-300 rounded bg-slate-50"></div>
          </div>
        );
    }
  };

  // Calculate statistics including mock data
  const mockStats = getResponseStatistics();
  const totalResponses = surveys.reduce((sum, survey) => sum + survey.responses, 0) + mockSurveyResponses.length;
  const activeSurveys = surveys.filter(s => s.status === "active").length + 15; // Add mock active surveys
  const draftSurveys = surveys.filter(s => s.status === "draft").length + 3; // Add mock draft surveys

  const selectedStakeholderType = stakeholderTypes.find(t => t.value === surveyForm.stakeholderType);
  const availableRoles = surveyForm.stakeholderType ? rolesByType[surveyForm.stakeholderType as keyof typeof rolesByType] : [];
  const needsOptions = ["multiple_choice", "ranking"].includes(newQuestion.type);
  const isRatingType = newQuestion.type === "rating";
  const selectedQuestionType = questionTypes.find(t => t.value === newQuestion.type);

  const canCreateSurvey = surveyForm.title.trim() && surveyForm.stakeholderType && surveyForm.role && questions.length > 0;
  const canSaveDraft = surveyForm.title.trim() && surveyForm.stakeholderType && surveyForm.role;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Journey
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}>
                  <Users className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Insight Hub</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Collect and synthesize <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}>stakeholder insights</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Gather comprehensive research and analysis across different perspectives to build a foundation for strategic messaging.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-teal-600" />
                  Stakeholder Surveys
                </h3>
                <Badge variant="secondary" className="text-xs" style={{background: "#1DD1A120", color: "#1DD1A1"}}>
                  Smart
                </Badge>
              </div>
              <p className="text-slate-600 mb-4">Create targeted surveys with suggested questions and multiple formats for better positioning insights.</p>
              <Button
                className="w-full"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
                onClick={() => setShowCreateSurvey(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Smart Survey
              </Button>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <Search className="h-5 w-5 mr-2 text-teal-600" />
                  Market Research
                </h3>
                <Badge variant="secondary" className="text-xs" style={{background: "#1DD1A120", color: "#1DD1A1"}}>
                  Pro
                </Badge>
              </div>
              <p className="text-slate-600 mb-4">Import and analyze existing market research, competitor analysis, and customer feedback.</p>
              <Button
                variant="outline"
                className="w-full border-teal-200 text-teal-700 hover:bg-teal-50"
                onClick={() => setShowUploadModal(true)}
              >
                <FileText className="h-4 w-4 mr-2" />
                Upload Research
              </Button>
            </Card>
          </div>

          {/* Research Dashboard */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-teal-600" />
              Research Dashboard
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 mb-2">{activeSurveys}</div>
                <div className="text-sm text-slate-600">Active Surveys</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 mb-2">{draftSurveys}</div>
                <div className="text-sm text-slate-600">Draft Surveys</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 mb-2">{totalResponses}</div>
                <div className="text-sm text-slate-600">Responses Collected</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 mb-2">{researchFiles.length}</div>
                <div className="text-sm text-slate-600">Research Files</div>
              </div>
            </div>
          </Card>

          {/* Surveys List */}
          {surveys.length > 0 && (
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Surveys</h3>
              <div className="space-y-4">
                {surveys.map((survey) => {
                  const stakeholderTypeData = stakeholderTypes.find(t => t.value === survey.stakeholderType);
                  const StakeholderIcon = stakeholderTypeData?.icon;

                  return (
                    <div key={survey.id} className="border border-slate-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-slate-900">{survey.title}</h4>
                            <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700 flex items-center">
                              {StakeholderIcon && <StakeholderIcon className="h-3 w-3 mr-1" />}
                              {survey.role}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mt-1">{survey.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <Badge variant="secondary" className={`text-xs ${
                              survey.status === 'active' ? 'bg-green-100 text-green-700' :
                              survey.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                              'bg-orange-100 text-orange-700'
                            }`}>
                              {survey.status === 'draft' && <Clock className="h-3 w-3 mr-1" />}
                              {survey.status}
                            </Badge>
                            <span className="text-xs text-slate-500">{survey.responses} responses</span>
                            <span className="text-xs text-slate-500">{survey.questions.length} questions</span>
                            <span className="text-xs text-slate-500">
                              Modified {survey.lastModified.toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditSurvey(survey)}
                            title="Edit survey"
                          >
                            <Edit3 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            title="Preview survey"
                            onClick={() => handlePreviewSurvey(survey)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {survey.status === 'active' && (
                            <Button
                              variant="outline"
                              size="sm"
                              title="Send survey"
                              onClick={() => handleSendSurvey(survey)}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(survey.id)}
                            title="Delete survey"
                            className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          )}

          {/* Survey Responses Overview */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-teal-600" />
              Survey Responses ({mockSurveyResponses.length} total)
            </h3>

            {/* Response Statistics */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-100">
                <div className="text-2xl font-bold text-teal-700 mb-1">{mockStats.byStakeholder.customer || 0}</div>
                <div className="text-sm text-slate-600">Customer Responses</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                <div className="text-2xl font-bold text-blue-700 mb-1">{mockStats.byStakeholder.internal || 0}</div>
                <div className="text-sm text-slate-600">Internal Responses</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-100">
                <div className="text-2xl font-bold text-purple-700 mb-1">{mockStats.byStakeholder.partner || 0}</div>
                <div className="text-sm text-slate-600">Partner Responses</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg border border-orange-100">
                <div className="text-2xl font-bold text-orange-700 mb-1">{mockStats.avgCompletionTime} min</div>
                <div className="text-sm text-slate-600">Avg. Completion</div>
              </div>
            </div>

            {/* Sample Responses */}
            <div className="space-y-4">
              <h4 className="font-medium text-slate-900 mb-3">Recent Responses</h4>
              {mockSurveyResponses.slice(0, 5).map((response) => (
                <div key={response.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-medium text-slate-900">{response.respondent.name}</h5>
                        <Badge variant="secondary" className="text-xs bg-teal-100 text-teal-700">
                          {response.role}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {response.respondent.company}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{response.surveyTitle}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{response.responses.length} questions answered</span>
                        <span>{response.completionTime} min completion</span>
                        <span>{new Date(response.submittedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleViewResponse(response)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              ))}

              <div className="text-center pt-4">
                <Link href="/analytics">
                  <Button variant="outline" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View All Responses & Analytics
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Research Files */}
          {researchFiles.length > 0 && (
            <Card className="p-6 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Research Files</h3>
              <div className="space-y-3">
                {researchFiles.map((file) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-slate-500" />
                      <div>
                        <p className="font-medium text-slate-900">{file.name}</p>
                        <p className="text-xs text-slate-500">{file.size} • {file.type}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setResearchFiles(files => files.filter(f => f.id !== file.id))}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Next Step */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Ready to move to the next phase?</p>
            <Link href="/brief">
              <Button size="lg" className="text-white shadow-lg hover:shadow-xl transition-all duration-300" style={{background: 'linear-gradient(90deg, #1BC4B2 0%, #1A8FD1 100%)'}}>
                Create Strategic Brief
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Create Smart Survey Modal */}
      {showCreateSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {editingSurveyId ? 'Edit Survey' : 'Create Smart Survey'}
                </h3>
                <p className="text-sm text-slate-600">Build surveys with suggested questions and multiple formats</p>
              </div>
              <Button variant="outline" size="sm" onClick={resetSurveyForm}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Survey Setup */}
              <div className="space-y-6">
                {/* Step 1: Stakeholder Type */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Who are you surveying?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {stakeholderTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => handleStakeholderTypeChange(type.value)}
                          className={`p-3 border-2 rounded-lg text-left transition-all duration-200 ${
                            surveyForm.stakeholderType === type.value
                              ? 'border-teal-300 bg-teal-50'
                              : 'border-slate-200 hover:border-teal-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon className="h-4 w-4 text-teal-600" />
                            <span className="font-medium text-slate-900 text-sm">{type.label}</span>
                          </div>
                          <p className="text-xs text-slate-600">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Role */}
                {surveyForm.stakeholderType && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-3">What's their role?</label>
                    <div className="relative">
                      <select
                        value={surveyForm.role}
                        onChange={(e) => handleRoleChange(e.target.value)}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option value="">Select a role...</option>
                        {availableRoles.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                    </div>
                  </div>
                )}

                {/* Step 3: Survey Details */}
                {surveyForm.role && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Survey Title</label>
                      <input
                        type="text"
                        value={surveyForm.title}
                        onChange={(e) => setSurveyForm(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                      <textarea
                        value={surveyForm.description}
                        onChange={(e) => setSurveyForm(prev => ({ ...prev, description: e.target.value }))}
                        className="w-full h-20 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Right Column - Questions */}
              {surveyForm.role && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-slate-900">Questions ({questions.length})</h4>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={undoQuestion}
                        disabled={historyIndex <= 0}
                        title="Undo last question change"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={redoQuestion}
                        disabled={historyIndex >= questionHistory.length - 1}
                        title="Redo last question change"
                      >
                        <ArrowLeft className="h-4 w-4 rotate-180" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddQuestion(true)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add Question
                      </Button>
                    </div>
                  </div>

                  {/* Suggested Topics */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-sm font-medium text-slate-700 flex items-center">
                        <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                        Suggested Questions by Topic
                      </h5>
                    </div>

                    {/* Search Input */}
                    <div className="relative mb-4">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        value={questionSearch}
                        onChange={(e) => setQuestionSearch(e.target.value)}
                        placeholder="Search suggested questions..."
                        className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                      {questionSearch && (
                        <button
                          onClick={() => setQuestionSearch("")}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-4 max-h-40 overflow-y-auto">
                      {Object.entries(questionTopics).map(([topic, topicQuestions]) => {
                        const filteredQuestions = filterQuestions(topicQuestions);
                        if (filteredQuestions.length === 0) return null;

                        return (
                        <div key={topic}>
                          <h6 className="text-xs font-medium text-slate-600 mb-2 capitalize">
                            {topic.replace('_', ' ')} ({filteredQuestions.length})
                          </h6>
                          <div className="space-y-1">
                            {filteredQuestions.map((question, index) => {
                              const isSelected = selectedSuggestedQuestions.has(question);
                              return (
                                <div key={index} className="group flex items-center space-x-2">
                                  <button
                                    onClick={() => addSuggestedQuestion(question, topic)}
                                    disabled={isSelected}
                                    title={isSelected ? "Question already added to survey" : "Click to add this question to your survey as-is"}
                                    className={`flex-1 text-left p-3 text-xs rounded-lg border transition-all duration-200 ${
                                      isSelected
                                        ? 'bg-teal-50 border-teal-200 text-teal-700 cursor-not-allowed'
                                        : 'text-slate-600 hover:bg-slate-50 border-slate-200 hover:border-teal-200 hover:text-slate-700'
                                    }`}
                                  >
                                    <div className="flex items-center space-x-2">
                                      {isSelected && <Check className="h-3 w-3 text-teal-600" />}
                                      <span className={isSelected ? 'font-medium' : ''}>{question}</span>
                                    </div>
                                    {isSelected && (
                                      <div className="text-xs text-teal-600 mt-1">✓ Added to survey</div>
                                    )}
                                  </button>
                                  <div className="flex space-x-1">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => previewCustomQuestion(question, topic)}
                                      className="h-8 px-2 text-xs bg-slate-50 hover:bg-white border-slate-200 hover:border-blue-200"
                                      title="Preview how this question will look in the survey"
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      Preview
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => editSuggestedQuestion(question, topic)}
                                      className="h-8 px-2 text-xs bg-slate-50 hover:bg-white border-slate-200 hover:border-teal-200"
                                      title="Edit and customize this question before adding to survey"
                                    >
                                      <Edit3 className="h-3 w-3 mr-1" />
                                      Customize
                                    </Button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        );
                      })}

                      {/* No results message */}
                      {questionSearch && Object.entries(questionTopics).every(([topic, topicQuestions]) =>
                        filterQuestions(topicQuestions).length === 0
                      ) && (
                        <div className="text-center py-8">
                          <Search className="h-8 w-8 text-slate-300 mx-auto mb-2" />
                          <p className="text-sm text-slate-500">No questions found for "{questionSearch}"</p>
                          <p className="text-xs text-slate-400 mt-1">Try different keywords or browse all topics</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Added Questions */}
                  {questions.length > 0 && (
                    <div>
                      <h5 className="text-sm font-medium text-slate-700 mb-3">Added Questions</h5>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {questions.map((question, index) => (
                          <div key={question.id} className="group flex items-start space-x-2 p-2 bg-slate-50 rounded border">
                            <span className="text-xs text-slate-500 mt-1">{index + 1}.</span>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-slate-700">{question.text}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <Badge variant="secondary" className="text-xs">
                                  {questionTypes.find(t => t.value === question.type)?.label}
                                </Badge>
                                {question.required && (
                                  <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                                    Required
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex space-x-1 opacity-0 group-hover:opacity-100">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editQuestion(question)}
                                className="h-6 w-6 p-0"
                                title="Edit question"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeQuestion(question.id)}
                                className="h-6 w-6 p-0"
                                title="Remove question"
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {surveyForm.role && (
              <div className="flex space-x-3 mt-6 pt-6 border-t">
                {canSaveDraft && (
                  <Button
                    onClick={handleSaveDraft}
                    variant="outline"
                    className="flex items-center"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                )}
                {canCreateSurvey && (
                  <Button onClick={handleCreateSurvey} className="flex-1" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}>
                    {editingSurveyId ? 'Update Survey' : 'Create Survey'}
                  </Button>
                )}
                <Button variant="outline" onClick={resetSurveyForm}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Question Modal */}
      {showAddQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[60]">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingQuestionId ? 'Edit Question' : 'Add Custom Question'}
              </h3>
              <Button variant="outline" size="sm" onClick={() => {
                setShowAddQuestion(false);
                setEditingQuestionId(null);
                setNewQuestion({
                  id: "",
                  text: "",
                  type: "text",
                  options: [],
                  required: true,
                  config: {}
                });
              }}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left Column - Question Setup */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Question Text</label>
                  <textarea
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, text: e.target.value }))}
                    placeholder="Enter your question..."
                    className="w-full h-20 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Question Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    {questionTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.value}
                          onClick={() => updateQuestionType(type.value as Question["type"])}
                          className={`p-3 border-2 rounded-lg text-left transition-all duration-200 ${
                            newQuestion.type === type.value
                              ? 'border-teal-300 bg-teal-50'
                              : 'border-slate-200 hover:border-teal-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon className="h-4 w-4 text-teal-600" />
                            <span className="font-medium text-slate-900 text-sm">{type.label}</span>
                          </div>
                          <p className="text-xs text-slate-600">{type.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Rating Scale Configuration */}
                {isRatingType && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Rating Scale</label>
                    <div className="space-y-2">
                      {scaleOptions.map((scale) => (
                        <button
                          key={scale.value}
                          onClick={() => updateRatingScale(scale.value)}
                          className={`w-full p-3 border-2 rounded-lg text-left transition-all duration-200 ${
                            newQuestion.config?.scale?.min === scale.min && newQuestion.config?.scale?.max === scale.max
                              ? 'border-teal-300 bg-teal-50'
                              : 'border-slate-200 hover:border-teal-200'
                          }`}
                        >
                          <span className="font-medium text-slate-900 text-sm">{scale.label}</span>
                          <div className="flex space-x-1 mt-1">
                            {Array.from({ length: scale.max - scale.min + 1 }, (_, i) => (
                              <div key={i} className="w-6 h-6 border border-slate-300 rounded flex items-center justify-center text-xs">
                                {scale.min + i}
                              </div>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Options for Multiple Choice and Ranking */}
                {needsOptions && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Options</label>
                    <div className="space-y-2">
                      {newQuestion.options?.map((option, index) => (
                        <div key={index} className="flex space-x-2">
                          <input
                            type="text"
                            value={option}
                            onChange={(e) => updateOption(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                          <Button variant="outline" size="sm" onClick={() => removeOption(index)}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button variant="outline" size="sm" onClick={addOption}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newQuestion.required}
                    onChange={(e) => setNewQuestion(prev => ({ ...prev, required: e.target.checked }))}
                    className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                  />
                  <label htmlFor="required" className="text-sm text-slate-700">
                    Required question
                  </label>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-slate-700 mb-3">Question Preview</h4>
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex items-start space-x-2">
                      <span className="text-sm font-medium text-slate-900">1.</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {newQuestion.text || "Enter your question..."}
                          {newQuestion.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        {renderQuestionPreview(newQuestion)}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedQuestionType && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="text-sm font-medium text-blue-900 mb-2">
                      {selectedQuestionType.label} Tips
                    </h5>
                    <p className="text-xs text-blue-700">
                      {selectedQuestionType.value === 'rating' && 'Great for measuring satisfaction, likelihood, or performance on a numerical scale.'}
                      {selectedQuestionType.value === 'multiple_choice' && 'Perfect for offering specific options. Enable multi-select for choosing multiple answers.'}
                      {selectedQuestionType.value === 'ranking' && 'Ideal for understanding priorities or preferences in order.'}
                      {selectedQuestionType.value === 'text' && 'Best for detailed feedback and open-ended insights.'}
                      {selectedQuestionType.value === 'yes_no' && 'Simple binary questions for quick decision points.'}
                      {selectedQuestionType.value === 'likert' && 'Standard agreement scale perfect for opinion measurement.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <Button onClick={addCustomQuestion} className="flex-1" style={{background: 'linear-gradient(90px, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}>
                {editingQuestionId ? 'Update Question' : 'Add Question'}
              </Button>
              <Button variant="outline" onClick={() => {
                setShowAddQuestion(false);
                setEditingQuestionId(null);
                setNewQuestion({
                  id: "",
                  text: "",
                  type: "text",
                  options: [],
                  required: true,
                  config: {}
                });
              }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Survey Modal */}
      {showPreviewSurvey && previewSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Survey Preview</h3>
              <Button variant="outline" size="sm" onClick={() => setShowPreviewSurvey(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-slate-900">{previewSurvey.title}</h4>
                <p className="text-slate-600 mt-2">{previewSurvey.description}</p>
                <div className="flex items-center space-x-4 mt-3">
                  <Badge variant="secondary" className="text-xs">
                    {stakeholderTypes.find(t => t.value === previewSurvey.stakeholderType)?.label}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {previewSurvey.role}
                  </Badge>
                  <span className="text-xs text-slate-500">{previewSurvey.questions.length} questions</span>
                </div>
              </div>

              <div className="space-y-4">
                {previewSurvey.questions.map((question, index) => (
                  <div key={question.id} className="border border-slate-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <span className="text-sm font-medium text-slate-900">{index + 1}.</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {question.text}
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </p>
                        <Badge variant="secondary" className="text-xs mt-2">
                          {questionTypes.find(t => t.value === question.type)?.label}
                        </Badge>
                        {renderQuestionPreview(question)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Survey Modal */}
      {showSendModal && sendingSurvey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Send Survey</h3>
              <Button variant="outline" size="sm" onClick={() => {
                setShowSendModal(false);
                setEmailForm({ emails: "", subject: "", message: "" });
                setLinkCopied(false);
              }}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-slate-900">{sendingSurvey.title}</h4>
                <p className="text-sm text-slate-600 mt-1">{sendingSurvey.questions.length} questions • Est. {Math.ceil(sendingSurvey.questions.length * 0.5)} minutes</p>
              </div>

              {/* Email Option */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h5 className="font-medium text-slate-900 mb-3 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  Send via Email
                </h5>

                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email Addresses</label>
                    <input
                      type="text"
                      value={emailForm.emails}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, emails: e.target.value }))}
                      placeholder="Enter emails separated by commas"
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                    <p className="text-xs text-slate-500 mt-1">Separate multiple emails with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={emailForm.subject}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                      value={emailForm.message}
                      onChange={(e) => setEmailForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full h-32 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm resize-none"
                    />
                  </div>

                  <Button
                    onClick={handleSendEmail}
                    disabled={!emailForm.emails.trim() || emailSending}
                    className="w-full"
                    style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
                  >
                    {emailSending ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Email
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Link Option */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h5 className="font-medium text-slate-900 mb-3 flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  Share Link
                </h5>

                <div className="space-y-3">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-xs text-slate-600 mb-2">Survey Link:</p>
                    <p className="text-sm font-mono text-slate-800 break-all">
                      {`${typeof window !== 'undefined' ? window.location.origin : 'https://your-domain.com'}/survey/${sendingSurvey.id}`}
                    </p>
                  </div>

                  <div className="mt-3">
                    <Link href={`/survey/${sendingSurvey.id}`} target="_blank">
                      <Button variant="outline" size="sm" className="w-full">
                        <Eye className="h-4 w-4 mr-2" />
                        Preview Survey Experience
                      </Button>
                    </Link>
                  </div>

                  <Button
                    onClick={handleCopyLink}
                    variant="outline"
                    className="w-full"
                  >
                    {linkCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-600" />
                        Link Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Link
                      </>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-slate-500 text-center">
                Survey responses will appear in your dashboard once submitted
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Delete Survey</h3>
                <p className="text-sm text-slate-600">This action cannot be undone.</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleDeleteSurvey(showDeleteConfirm)}
              >
                Delete Survey
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Upload Research</h3>
              <Button variant="outline" size="sm" onClick={() => setShowUploadModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">Select research files to upload</p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                onChange={handleUploadResearch}
                className="hidden"
                id="research-upload"
              />
              <label htmlFor="research-upload" className="cursor-pointer">
                <Button type="button" variant="outline">
                  Choose Files
                </Button>
              </label>
              <p className="text-xs text-slate-500 mt-2">PDF, DOC, PPT, XLS, TXT files supported</p>
            </div>
          </div>
        </div>
      )}

      {/* Question Preview Modal */}
      {showQuestionPreview && previewQuestion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Question Preview</h3>
              <Button variant="outline" size="sm" onClick={() => setShowQuestionPreview(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-50 rounded-lg p-6">
                <p className="text-sm text-slate-600 mb-4">Preview how this question will appear in your survey:</p>

                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <span className="text-sm font-medium text-slate-900">1.</span>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">
                        {previewQuestion.text}
                        {previewQuestion.required && <span className="text-red-500 ml-1">*</span>}
                      </p>
                      {renderQuestionPreview(previewQuestion)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  onClick={() => {
                    addSuggestedQuestion(previewQuestion.text, "preview");
                    setShowQuestionPreview(false);
                  }}
                  className="flex-1"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
                  disabled={selectedSuggestedQuestions.has(previewQuestion.text)}
                >
                  {selectedSuggestedQuestions.has(previewQuestion.text) ? (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Already Added
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Survey
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setNewQuestion({
                      id: "",
                      text: previewQuestion.text,
                      type: "text",
                      options: [],
                      required: true,
                      config: {}
                    });
                    setShowQuestionPreview(false);
                    setShowAddQuestion(true);
                  }}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  Customize
                </Button>
                <Button variant="outline" onClick={() => setShowQuestionPreview(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Survey Response Modal */}
      {showResponseModal && selectedResponse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Survey Response Details</h3>
                <div className="flex items-center space-x-3">
                  <h4 className="text-lg font-semibold text-slate-800">{selectedResponse.respondent.name}</h4>
                  <Badge variant="secondary" className="bg-teal-100 text-teal-700">
                    {selectedResponse.role}
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    {selectedResponse.respondent.company}
                  </Badge>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResponseModal(false)}
                className="text-slate-500 hover:text-slate-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Respondent Information */}
            <Card className="p-4 mb-6 bg-slate-50">
              <h5 className="font-medium text-slate-900 mb-3">Respondent Information</h5>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Company:</span>
                  <span className="ml-2 text-slate-900">{selectedResponse.respondent.company}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Industry:</span>
                  <span className="ml-2 text-slate-900">{selectedResponse.respondent.industry}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Company Size:</span>
                  <span className="ml-2 text-slate-900">{selectedResponse.respondent.companySize}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Completion Time:</span>
                  <span className="ml-2 text-slate-900">{selectedResponse.completionTime} minutes</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Submitted:</span>
                  <span className="ml-2 text-slate-900">{new Date(selectedResponse.submittedAt).toLocaleDateString()}</span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">Survey Type:</span>
                  <span className="ml-2 text-slate-900">{selectedResponse.surveyTitle}</span>
                </div>
              </div>
            </Card>

            {/* Survey Responses */}
            <div className="space-y-6">
              <h5 className="font-medium text-slate-900">Survey Responses</h5>
              {selectedResponse.responses.map((response, index: number) => (
                <Card key={index} className="p-4">
                  <div className="mb-3">
                    <h6 className="font-medium text-slate-900 mb-2">
                      Question {index + 1}: {response.question}
                    </h6>
                    <Badge variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                      {response.type.replace('_', ' ')}
                    </Badge>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-3">
                    {response.type === 'multiple_choice' && Array.isArray(response.answer) ? (
                      <div className="space-y-1">
                        {response.answer.map((choice: string, i: number) => (
                          <div key={i} className="flex items-center">
                            <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                            <span className="text-slate-900">{choice}</span>
                          </div>
                        ))}
                      </div>
                    ) : response.type === 'rating' ? (
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-semibold text-slate-900">{response.answer}</span>
                        <span className="text-slate-600">out of 5</span>
                        <div className="flex space-x-1 ml-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <div
                              key={i}
                              className={`w-4 h-4 rounded-full ${
                                i < Number(response.answer) ? 'bg-teal-500' : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : response.type === 'yes_no' ? (
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          response.answer === 'Yes' ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                        <span className="font-medium text-slate-900">{response.answer}</span>
                      </div>
                    ) : response.type === 'likert' ? (
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-slate-900">{response.answer}</span>
                        <div className="text-xs text-slate-500">
                          (Likert Scale Response)
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-900 leading-relaxed">{response.answer}</p>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-slate-200">
              <Button variant="outline" onClick={() => setShowResponseModal(false)}>
                Close
              </Button>
              <Button
                className="text-white"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                <Download className="h-4 w-4 mr-2" />
                Export Response
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
