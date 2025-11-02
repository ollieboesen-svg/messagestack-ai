"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  MessageSquare,
  Star,
  Circle,
  Plus,
  X,
  GripVertical,
  Trash2,
  Search,
  Filter,
  ArrowUpDown
} from "lucide-react";

interface Question {
  id: string;
  type: 'open-ended' | 'multiple-choice' | 'rating' | 'scale';
  question: string;
  options?: string[];
  scaleMin?: number;
  scaleMax?: number;
  scaleLabels?: { min: string; max: string };
}

interface SurveyResponse {
  respondentName: string;
  respondentRole: string;
  respondentCompany: string;
  date: Date;
  answers: { [questionId: string]: string | number };
}

interface Survey {
  id: string;
  name: string;
  audience: string;
  description: string;
  status: 'completed' | 'in-progress' | 'draft';
  totalResponses: number;
  targetResponses: number;
  questions: Question[];
  responses: SurveyResponse[];
}

const surveys: Survey[] = [
  {
    id: "exec-survey",
    name: "Executive Stakeholder Survey",
    audience: "C-Suite Executives",
    description: "Strategic priorities and messaging concerns from executive leadership",
    status: "completed",
    totalResponses: 12,
    targetResponses: 12,
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "How important is speed-to-market for your messaging initiatives?",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Not Important", max: "Critical" }
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What is your biggest concern with the current messaging development process?",
        options: [
          "Takes too long (3-6 months is unacceptable)",
          "Too expensive with consultants and agencies",
          "Lack of strategic rigor and data-driven approach",
          "Poor alignment across departments",
          "Quality inconsistency when trying to move fast"
        ]
      },
      {
        id: "q3",
        type: "scale",
        question: "How would you rate your current messaging ROI?",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: { min: "Poor ROI", max: "Excellent ROI" }
      },
      {
        id: "q4",
        type: "open-ended",
        question: "What would an ideal messaging development platform enable your team to do?"
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "How much time would you allocate for a complete messaging overhaul?",
        options: [
          "Less than 2 weeks",
          "2-4 weeks",
          "1-2 months",
          "3-6 months",
          "More than 6 months"
        ]
      }
    ],
    responses: [
      {
        respondentName: "Sarah Chen",
        respondentRole: "CEO",
        respondentCompany: "TechVentures Inc.",
        date: new Date(Date.now() - 172800000),
        answers: {
          q1: 5,
          q2: "Takes too long (3-6 months is unacceptable)",
          q3: 4,
          q4: "Launch new messaging in weeks, not months. Get real customer insights fast. Align sales, marketing, and product teams without endless meetings.",
          q5: "2-4 weeks"
        }
      },
      {
        respondentName: "Michael Rodriguez",
        respondentRole: "CMO",
        respondentCompany: "GlobalSoft",
        date: new Date(Date.now() - 158400000),
        answers: {
          q1: 5,
          q2: "Too expensive with consultants and agencies",
          q3: 3,
          q4: "Reduce dependency on expensive agencies. Empower our internal team to create strategic messaging. Maintain quality while cutting costs by 60%+.",
          q5: "2-4 weeks"
        }
      },
      {
        respondentName: "Jennifer Park",
        respondentRole: "VP Strategy",
        respondentCompany: "Innovate Labs",
        date: new Date(Date.now() - 144000000),
        answers: {
          q1: 4,
          q2: "Lack of strategic rigor and data-driven approach",
          q3: 5,
          q4: "Ground all messaging in real customer research, not gut feel. Create a systematic process that's repeatable. Make evidence-based decisions.",
          q5: "1-2 months"
        }
      }
    ]
  },
  {
    id: "customer-survey",
    name: "Current Customer Survey",
    audience: "Active Platform Users",
    description: "Product feedback and value realization from existing customers",
    status: "completed",
    totalResponses: 24,
    targetResponses: 25,
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "How satisfied are you with the platform overall?",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Very Unsatisfied", max: "Very Satisfied" }
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What was your primary reason for choosing our platform?",
        options: [
          "Speed - needed results in weeks, not months",
          "Cost - significantly cheaper than agencies",
          "Quality - AI-powered but strategically rigorous",
          "Integration - all tools in one workflow",
          "Ease of use - intuitive interface"
        ]
      },
      {
        id: "q3",
        type: "scale",
        question: "How likely are you to recommend us to a colleague? (NPS)",
        scaleMin: 0,
        scaleMax: 10,
        scaleLabels: { min: "Not at all likely", max: "Extremely likely" }
      },
      {
        id: "q4",
        type: "open-ended",
        question: "What specific result or outcome has made the biggest impact for your team?"
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Which feature do you use most frequently?",
        options: [
          "Survey & Research Collection",
          "Analytics & Insights",
          "Strategy Development",
          "Message Grid",
          "Copy Engine"
        ]
      }
    ],
    responses: [
      {
        respondentName: "Amanda Foster",
        respondentRole: "Marketing Director",
        respondentCompany: "CloudScale",
        date: new Date(Date.now() - 86400000),
        answers: {
          q1: 5,
          q2: "Speed - needed results in weeks, not months",
          q3: 9,
          q4: "We repositioned our entire product line in 3 weeks. Previous agency wanted 4 months and $80K. We did it for a fraction of the cost and launched before our competitor.",
          q5: "Strategy Development"
        }
      },
      {
        respondentName: "Robert Kim",
        respondentRole: "Product Marketing Lead",
        respondentCompany: "SaaS Ventures",
        date: new Date(Date.now() - 82800000),
        answers: {
          q1: 5,
          q2: "Integration - all tools in one workflow",
          q3: 10,
          q4: "No more juggling 5 different tools. Survey, analyze, strategize, and create copy all in one place. My team's productivity has doubled.",
          q5: "Survey & Research Collection"
        }
      }
    ]
  },
  {
    id: "prospect-survey",
    name: "Target Market Survey",
    audience: "Marketing Leaders (Prospects)",
    description: "Pain points and requirements from potential customers",
    status: "in-progress",
    totalResponses: 8,
    targetResponses: 15,
    questions: [
      {
        id: "q1",
        type: "rating",
        question: "How satisfied are you with your current messaging development process?",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Very Unsatisfied", max: "Very Satisfied" }
      },
      {
        id: "q2",
        type: "multiple-choice",
        question: "What is your current approach to developing strategic messaging?",
        options: [
          "In-house team only",
          "External agency/consultants",
          "Mix of in-house and agency",
          "DIY with AI tools (ChatGPT, etc.)",
          "No formal process"
        ]
      },
      {
        id: "q3",
        type: "scale",
        question: "What's your typical budget for a messaging project?",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Under $10K", max: "Over $100K" }
      },
      {
        id: "q4",
        type: "open-ended",
        question: "What frustrates you most about creating strategic messaging today?"
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "How important is AI/automation in your ideal messaging workflow?",
        options: [
          "Critical - must have AI",
          "Important - nice to have",
          "Neutral - depends on quality",
          "Skeptical - prefer human work",
          "Not interested in AI"
        ]
      }
    ],
    responses: [
      {
        respondentName: "Marcus Thompson",
        respondentRole: "VP Marketing",
        respondentCompany: "Enterprise SaaS Co",
        date: new Date(Date.now() - 43200000),
        answers: {
          q1: 2,
          q2: "External agency/consultants",
          q3: 4,
          q4: "Agencies take forever and cost a fortune. By the time we get deliverables, the market has shifted. Plus we're just handed a deck - we don't really own the process or insights.",
          q5: "Important - nice to have"
        }
      }
    ]
  },
  {
    id: "sales-survey",
    name: "Sales Team Feedback",
    audience: "Internal Sales Team",
    description: "Frontline insights on messaging effectiveness and objections",
    status: "completed",
    totalResponses: 15,
    targetResponses: 15,
    questions: [
      {
        id: "q1",
        type: "multiple-choice",
        question: "What objection do you hear most often from prospects?",
        options: [
          "Concerns about AI quality vs human expertise",
          "Price - seems expensive compared to ChatGPT",
          "Price - seems cheap, must be low quality",
          "Implementation complexity",
          "Don't see the ROI clearly"
        ]
      },
      {
        id: "q2",
        type: "rating",
        question: "How effective is our current messaging in closing deals?",
        scaleMin: 1,
        scaleMax: 5,
        scaleLabels: { min: "Not Effective", max: "Very Effective" }
      },
      {
        id: "q3",
        type: "open-ended",
        question: "What message or value prop gets prospects most excited?"
      },
      {
        id: "q4",
        type: "scale",
        question: "How well do prospects understand our differentiation from agencies?",
        scaleMin: 1,
        scaleMax: 10,
        scaleLabels: { min: "Very Confused", max: "Completely Clear" }
      },
      {
        id: "q5",
        type: "multiple-choice",
        question: "Which buyer persona is easiest to close?",
        options: [
          "CMO / VP Marketing",
          "Product Marketing Manager",
          "CEO / Founder",
          "VP Strategy",
          "Marketing Director"
        ]
      }
    ],
    responses: [
      {
        respondentName: "Marcus Johnson",
        respondentRole: "Account Executive",
        respondentCompany: "MessageStack",
        date: new Date(Date.now() - 3600000),
        answers: {
          q1: "Concerns about AI quality vs human expertise",
          q2: 4,
          q3: "2-4 weeks vs 3-6 months. When I show the timeline comparison, that's when they lean in. Speed is everything.",
          q4: 7,
          q5: "CMO / VP Marketing"
        }
      },
      {
        respondentName: "Priya Sharma",
        respondentRole: "Sales Manager",
        respondentCompany: "MessageStack",
        date: new Date(Date.now() - 7200000),
        answers: {
          q1: "Don't see the ROI clearly",
          q2: 5,
          q3: "Evidence-based positioning from real stakeholder research. This differentiates us from pure AI tools. They love that we start with systematic research, not just prompt engineering.",
          q4: 8,
          q5: "Product Marketing Manager"
        }
      }
    ]
  }
];

export default function ResearchPage() {
  const [expandedSurvey, setExpandedSurvey] = useState<string | null>(null);
  const [selectedResponse, setSelectedResponse] = useState<{ surveyId: string; responseIndex: number } | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Filtering and sorting state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAudience, setFilterAudience] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'responses'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  // Survey builder state
  const [surveyName, setSurveyName] = useState("");
  const [surveyAudience, setSurveyAudience] = useState("");
  const [surveyDescription, setSurveyDescription] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [draggedQuestionIndex, setDraggedQuestionIndex] = useState<number | null>(null);

  const toggleSurvey = (surveyId: string) => {
    setExpandedSurvey(expandedSurvey === surveyId ? null : surveyId);
  };

  const completedSurveys = surveys.filter(s => s.status === 'completed').length;
  const totalResponses = surveys.reduce((sum, s) => sum + s.totalResponses, 0);

  // Get unique audiences for filter
  const uniqueAudiences = Array.from(new Set(surveys.map(s => s.audience)));
  const uniqueStatuses = Array.from(new Set(surveys.map(s => s.status)));

  // Filter and sort surveys
  const filteredAndSortedSurveys = surveys
    .filter(survey => {
      // Search filter
      const matchesSearch = searchQuery === "" ||
        survey.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        survey.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Audience filter
      const matchesAudience = !filterAudience || survey.audience === filterAudience;

      // Status filter
      const matchesStatus = !filterStatus || survey.status === filterStatus;

      return matchesSearch && matchesAudience && matchesStatus;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch(sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'responses':
          comparison = a.totalResponses - b.totalResponses;
          break;
        case 'date':
          // For demo purposes, using id as proxy for date
          comparison = parseInt(a.id.split('-')[1] || '0') - parseInt(b.id.split('-')[1] || '0');
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

  // Question templates
  const questionTemplates: Question[] = [
    {
      id: `temp-${Date.now()}-1`,
      type: 'rating',
      question: 'How would you rate...',
      scaleMin: 1,
      scaleMax: 5,
      scaleLabels: { min: 'Poor', max: 'Excellent' }
    },
    {
      id: `temp-${Date.now()}-2`,
      type: 'multiple-choice',
      question: 'Select your preference...',
      options: ['Option 1', 'Option 2', 'Option 3']
    },
    {
      id: `temp-${Date.now()}-3`,
      type: 'scale',
      question: 'On a scale of 1-10...',
      scaleMin: 1,
      scaleMax: 10,
      scaleLabels: { min: 'Not likely', max: 'Very likely' }
    },
    {
      id: `temp-${Date.now()}-4`,
      type: 'open-ended',
      question: 'Please describe...'
    }
  ];

  const addQuestion = (template: Question) => {
    const newQuestion = {
      ...template,
      id: `q-${Date.now()}`
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const updateQuestion = (index: number, field: keyof Question, value: string | number | string[] | { min?: string; max?: string } | undefined) => {
    const updated = [...questions];
    updated[index] = { ...updated[index], [field]: value } as Question;
    setQuestions(updated);
  };

  const handleDragStart = (index: number) => {
    setDraggedQuestionIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedQuestionIndex === null || draggedQuestionIndex === index) return;

    const newQuestions = [...questions];
    const draggedQuestion = newQuestions[draggedQuestionIndex];
    newQuestions.splice(draggedQuestionIndex, 1);
    newQuestions.splice(index, 0, draggedQuestion);

    setQuestions(newQuestions);
    setDraggedQuestionIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedQuestionIndex(null);
  };

  const createSurvey = () => {
    // Here you would save the survey
    console.log({
      name: surveyName,
      audience: surveyAudience,
      description: surveyDescription,
      questions
    });

    // Reset and close
    setSurveyName("");
    setSurveyAudience("");
    setSurveyDescription("");
    setQuestions([]);
    setShowCreateModal(false);
  };

  const renderQuestionPreview = (question: Question) => {
    switch (question.type) {
      case 'rating':
        return (
          <div className="flex items-center space-x-1 text-amber-500">
            {[...Array(question.scaleMax || 5)].map((_, i) => (
              <Star key={i} className="h-4 w-4" fill="currentColor" />
            ))}
            <span className="text-xs text-slate-500 ml-2">
              {question.scaleLabels?.min} - {question.scaleLabels?.max}
            </span>
          </div>
        );
      case 'multiple-choice':
        return (
          <div className="space-y-1">
            {question.options?.slice(0, 3).map((option, i) => (
              <div key={i} className="flex items-center space-x-2 text-sm text-slate-600">
                <Circle className="h-3 w-3" />
                <span>{option}</span>
              </div>
            ))}
            {(question.options?.length || 0) > 3 && (
              <span className="text-xs text-slate-500">+{(question.options?.length || 0) - 3} more options</span>
            )}
          </div>
        );
      case 'scale':
        return (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              {[...Array(question.scaleMax || 10)].map((_, i) => (
                <div key={i} className="w-8 h-6 border border-slate-300 rounded text-xs flex items-center justify-center text-slate-600">
                  {i + 1}
                </div>
              ))}
            </div>
            <div className="flex flex-col text-xs text-slate-500">
              <span>{question.scaleLabels?.min}</span>
              <span>{question.scaleLabels?.max}</span>
            </div>
          </div>
        );
      case 'open-ended':
        return (
          <div className="bg-slate-50 border border-slate-200 rounded p-2 text-sm text-slate-500 italic">
            Open-ended text response
          </div>
        );
    }
  };

  const renderAnswer = (question: Question, answer: string | number) => {
    switch (question.type) {
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            {[...Array(question.scaleMax || 5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Number(answer) ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`}
              />
            ))}
            <span className="ml-2 font-semibold text-slate-900">{answer}/{question.scaleMax}</span>
          </div>
        );
      case 'scale':
        return (
          <div className="space-y-2">
            <div className="flex items-center space-x-1">
              {[...Array(question.scaleMax || 10)].map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-6 border rounded text-xs flex items-center justify-center ${
                    i + 1 === Number(answer)
                      ? 'bg-teal-500 text-white border-teal-600 font-bold'
                      : 'border-slate-300 text-slate-600'
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <span className="text-sm text-slate-600">{answer}/{question.scaleMax}</span>
          </div>
        );
      case 'multiple-choice':
        return (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <CheckCircle className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
              <span className="text-slate-900">{answer}</span>
            </div>
          </div>
        );
      case 'open-ended':
        return (
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="text-slate-700 leading-relaxed">{answer}</p>
          </div>
        );
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rating': return 'bg-amber-100 text-amber-700';
      case 'scale': return 'bg-blue-100 text-blue-700';
      case 'multiple-choice': return 'bg-purple-100 text-purple-700';
      case 'open-ended': return 'bg-teal-100 text-teal-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'rating': return 'Rating';
      case 'scale': return 'Scale';
      case 'multiple-choice': return 'Multiple Choice';
      case 'open-ended': return 'Open-Ended';
      default: return type;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
        <Link href="/project/demo" className="hover:text-teal-600">Projects</Link>
        <span>/</span>
        <Link href="/project/demo" className="hover:text-teal-600">Demo Project</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Research and Insights</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ background: "#1DD1A1" }}
            >
              <Users className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Research and Insights</h1>
              <p className="text-slate-600">Multi-format surveys across stakeholder groups</p>
            </div>
          </div>
          <Button
            onClick={() => setShowCreateModal(true)}
            style={{ background: 'linear-gradient(90deg, #1DD1A1 0%, #17A2B8 100%)' }}
            className="text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Survey
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-teal-600" />
            <Badge className="bg-teal-100 text-teal-700">Active</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900">{surveys.length}</div>
          <div className="text-sm text-slate-600">Total Surveys</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <Badge className="bg-green-100 text-green-700">Complete</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900">{completedSurveys}/{surveys.length}</div>
          <div className="text-sm text-slate-600">Surveys Completed</div>
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <Badge className="bg-blue-100 text-blue-700">Collected</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900">{totalResponses}</div>
          <div className="text-sm text-slate-600">Total Responses</div>
        </Card>
      </div>

      {/* Search, Filter & Sort Bar */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? 'bg-teal-50 border-teal-300' : ''}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {(filterAudience || filterStatus) && (
              <Badge className="ml-2 bg-teal-600 text-white">
                {[filterAudience, filterStatus].filter(Boolean).length}
              </Badge>
            )}
          </Button>

          {/* Sort */}
          <div className="flex items-center space-x-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'responses')}
              className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
              <option value="responses">Sort by Responses</option>
            </select>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              <ArrowUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-slate-200 grid md:grid-cols-2 gap-4">
            {/* Audience Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Audience</label>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterAudience(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filterAudience === null
                      ? 'bg-teal-100 text-teal-700 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  All Audiences
                </button>
                {uniqueAudiences.map(audience => (
                  <button
                    key={audience}
                    onClick={() => setFilterAudience(audience)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filterAudience === audience
                        ? 'bg-teal-100 text-teal-700 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {audience}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Status</label>
              <div className="space-y-2">
                <button
                  onClick={() => setFilterStatus(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filterStatus === null
                      ? 'bg-teal-100 text-teal-700 font-medium'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  All Statuses
                </button>
                {uniqueStatuses.map(status => (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      filterStatus === status
                        ? 'bg-teal-100 text-teal-700 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Results Count */}
      <div className="mb-4 text-sm text-slate-600">
        Showing {filteredAndSortedSurveys.length} of {surveys.length} surveys
      </div>

      {/* Surveys */}
      <div className="space-y-6">
        {filteredAndSortedSurveys.map(survey => (
          <Card key={survey.id} className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{survey.name}</h3>
                    <Badge className={survey.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                      {survey.status}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-3">{survey.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-slate-600">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {survey.audience}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {survey.totalResponses}/{survey.targetResponses} responses
                    </span>
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {survey.questions.length} questions
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600">Response Progress</span>
                      <span className="font-semibold text-slate-900">
                        {Math.round((survey.totalResponses / survey.targetResponses) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${(survey.totalResponses / survey.targetResponses) * 100}%`,
                          background: 'linear-gradient(90deg, #1DD1A1 0%, #17A2B8 100%)'
                        }}
                      />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  onClick={() => toggleSurvey(survey.id)}
                >
                  {expandedSurvey === survey.id ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>

              {/* Expanded Survey Details */}
              {expandedSurvey === survey.id && (
                <div className="mt-6 pt-6 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-900 mb-4">Survey Questions ({survey.questions.length})</h4>
                  <div className="space-y-6 mb-8">
                    {survey.questions.map((question, idx) => (
                      <div key={question.id} className="bg-slate-50 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-semibold text-slate-600">Q{idx + 1}</span>
                              <Badge className={`text-xs ${getTypeColor(question.type)}`}>
                                {getTypeLabel(question.type)}
                              </Badge>
                            </div>
                            <h5 className="font-medium text-slate-900 mb-3">{question.question}</h5>
                          </div>
                        </div>
                        {renderQuestionPreview(question)}
                      </div>
                    ))}
                  </div>

                  <h4 className="font-semibold text-slate-900 mb-4">
                    Responses ({survey.totalResponses})
                  </h4>
                  <div className="space-y-3">
                    {survey.responses.map((response, idx) => (
                      <Card
                        key={idx}
                        className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedResponse({ surveyId: survey.id, responseIndex: idx })}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                              {response.respondentName.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <h5 className="font-semibold text-slate-900">{response.respondentName}</h5>
                              <p className="text-sm text-slate-600">{response.respondentRole} • {response.respondentCompany}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-slate-500">
                              {response.date.toLocaleDateString()}
                            </p>
                            <Badge variant="outline" className="text-xs mt-1">
                              View Responses
                            </Badge>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}

        {filteredAndSortedSurveys.length === 0 && (
          <Card className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 mb-2">No surveys found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your filters or search query</p>
            <Button variant="outline" onClick={() => {
              setSearchQuery("");
              setFilterAudience(null);
              setFilterStatus(null);
            }}>
              Clear Filters
            </Button>
          </Card>
        )}
      </div>

      {/* Next Steps */}
      <Card className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">Research and Insights Complete</h3>
            <p className="text-sm text-slate-600">
              {totalResponses} responses collected across {surveys.length} surveys. Ready to analyze insights.
            </p>
          </div>
          <Link href="/project/demo/analytics">
            <Button style={{ background: 'linear-gradient(90deg, #1DD1A1 0%, #17A2B8 100%)' }} className="text-white">
              Analyze Data
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Card>

      {/* Response Detail Modal */}
      {selectedResponse && (() => {
        const survey = surveys.find(s => s.id === selectedResponse.surveyId);
        const response = survey?.responses[selectedResponse.responseIndex];
        if (!survey || !response) return null;

        return (
          <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedResponse(null)}
          >
            <Card
              className="w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-white border-b p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {response.respondentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">{response.respondentName}</h3>
                      <p className="text-slate-600">{response.respondentRole}</p>
                      <p className="text-sm text-slate-500">{response.respondentCompany}</p>
                    </div>
                  </div>
                  <Button variant="ghost" onClick={() => setSelectedResponse(null)}>
                    <ChevronUp className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {survey.questions.map((question, idx) => (
                  <div key={question.id} className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-semibold text-teal-700">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-semibold text-slate-900">{question.question}</h5>
                          <Badge className={`text-xs ${getTypeColor(question.type)}`}>
                            {getTypeLabel(question.type)}
                          </Badge>
                        </div>
                        {renderAnswer(question, response.answers[question.id])}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        );
      })()}

      {/* Survey Creation Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
          onClick={() => setShowCreateModal(false)}
        >
          <Card
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">Create New Survey</h2>
                  <p className="text-slate-600">Build your survey with drag-and-drop questions</p>
                </div>
                <Button variant="ghost" onClick={() => setShowCreateModal(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 p-6">
              {/* Left Column - Survey Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Survey Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Survey Name *
                      </label>
                      <input
                        type="text"
                        value={surveyName}
                        onChange={(e) => setSurveyName(e.target.value)}
                        placeholder="e.g., Customer Feedback Survey"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Target Audience *
                      </label>
                      <input
                        type="text"
                        value={surveyAudience}
                        onChange={(e) => setSurveyAudience(e.target.value)}
                        placeholder="e.g., Marketing Leaders"
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Description
                      </label>
                      <textarea
                        value={surveyDescription}
                        onChange={(e) => setSurveyDescription(e.target.value)}
                        placeholder="Brief description of the survey purpose..."
                        rows={3}
                        className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Question Templates */}
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Question Templates</h3>
                  <div className="space-y-2">
                    {questionTemplates.map((template, idx) => (
                      <button
                        key={idx}
                        onClick={() => addQuestion(template)}
                        className="w-full text-left p-3 border border-slate-200 rounded-lg hover:bg-teal-50 hover:border-teal-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge className={`text-xs ${getTypeColor(template.type)}`}>
                              {getTypeLabel(template.type)}
                            </Badge>
                          </div>
                          <Plus className="h-4 w-4 text-slate-400" />
                        </div>
                        <p className="text-sm text-slate-600 mt-1">{template.question}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Question Builder */}
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-900">
                    Questions ({questions.length})
                  </h3>
                  {questions.length > 0 && (
                    <p className="text-sm text-slate-500">Drag to reorder</p>
                  )}
                </div>

                {questions.length === 0 ? (
                  <Card className="p-12 text-center border-dashed">
                    <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">No questions yet</h4>
                    <p className="text-slate-600">
                      Click on a question template to add it to your survey
                    </p>
                  </Card>
                ) : (
                  <div className="space-y-3">
                    {questions.map((question, index) => (
                      <Card
                        key={question.id}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(e) => handleDragOver(e, index)}
                        onDragEnd={handleDragEnd}
                        className={`p-4 cursor-move transition-all ${
                          draggedQuestionIndex === index ? 'opacity-50 scale-95' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <GripVertical className="h-5 w-5 text-slate-400 flex-shrink-0 mt-1" />

                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="text-sm font-semibold text-slate-600">Q{index + 1}</span>
                              <Badge className={`text-xs ${getTypeColor(question.type)}`}>
                                {getTypeLabel(question.type)}
                              </Badge>
                            </div>

                            <input
                              type="text"
                              value={question.question}
                              onChange={(e) => updateQuestion(index, 'question', e.target.value)}
                              className="w-full mb-3 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 font-medium text-slate-900"
                              placeholder="Enter your question..."
                            />

                            {/* Question type specific inputs */}
                            {question.type === 'multiple-choice' && (
                              <div className="space-y-2">
                                {question.options?.map((option, optIndex) => (
                                  <input
                                    key={optIndex}
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [...(question.options || [])];
                                      newOptions[optIndex] = e.target.value;
                                      updateQuestion(index, 'options', newOptions);
                                    }}
                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                                    placeholder={`Option ${optIndex + 1}`}
                                  />
                                ))}
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const newOptions = [...(question.options || []), ''];
                                    updateQuestion(index, 'options', newOptions);
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" />
                                  Add Option
                                </Button>
                              </div>
                            )}

                            {(question.type === 'rating' || question.type === 'scale') && (
                              <div className="grid grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  value={question.scaleLabels?.min || ''}
                                  onChange={(e) => updateQuestion(index, 'scaleLabels', {
                                    ...question.scaleLabels,
                                    min: e.target.value
                                  })}
                                  className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                                  placeholder="Min label"
                                />
                                <input
                                  type="text"
                                  value={question.scaleLabels?.max || ''}
                                  onChange={(e) => updateQuestion(index, 'scaleLabels', {
                                    ...question.scaleLabels,
                                    max: e.target.value
                                  })}
                                  className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500"
                                  placeholder="Max label"
                                />
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-white border-t p-6">
              <div className="flex justify-between items-center">
                <p className="text-sm text-slate-600">
                  {questions.length} question{questions.length !== 1 ? 's' : ''} added
                </p>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowCreateModal(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={createSurvey}
                    disabled={!surveyName || !surveyAudience || questions.length === 0}
                    style={{ background: 'linear-gradient(90deg, #1DD1A1 0%, #17A2B8 100%)' }}
                    className="text-white"
                  >
                    Create Survey
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
