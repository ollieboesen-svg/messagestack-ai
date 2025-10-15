"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Save,
  Edit3,
  Plus,
  Trash2,
  Check,
  X,
  Users,
  Target,
  Star,
  Lightbulb,
  Building2,
  Heart,
  Zap,
  Shield,
  Globe,
  Eye,
  RefreshCw,
  Grid3X3,
  MessageSquare,
  ArrowRight,
  Copy,
  Settings,
  Sparkles
} from "lucide-react";

interface MessageCell {
  id: string;
  category: string;
  primaryMessage: string;
  keyPoints: string[];
  approved: boolean;
}

interface AudienceMessaging {
  audienceId: string;
  messages: MessageCell[];
}

interface Audience {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  priority: 'primary' | 'secondary';
}

export default function MessageGrid() {
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [editArray, setEditArray] = useState<string[]>([]);
  const [gridGenerated, setGridGenerated] = useState(true); // Set to true to show grid
  const [generatingGrid, setGeneratingGrid] = useState(false);
  const [activeAudienceTab, setActiveAudienceTab] = useState('customers');

  // Define messaging categories for each audience
  const messagingCategories = [
    { id: 'challenges-solve', title: 'Challenges We Solve', description: 'Key problems we address', color: 'from-red-500 to-orange-500' },
    { id: 'what-we-have', title: 'What We Have', description: 'Our core capabilities and assets', color: 'from-blue-500 to-indigo-500' },
    { id: 'what-we-do', title: 'What We Do', description: 'Our primary functions and services', color: 'from-green-500 to-teal-500' },
    { id: 'how-different', title: 'How We\'re Different', description: 'Our unique differentiators', color: 'from-purple-500 to-pink-500' },
    { id: 'value-primary', title: 'Value for Decision Makers', description: 'Executive-level value proposition', color: 'from-emerald-500 to-cyan-500' },
    { id: 'value-secondary', title: 'Value for Teams', description: 'Operational-level benefits', color: 'from-yellow-500 to-orange-500' }
  ];

  // Define value propositions with priority levels
  const valuePropositions = [
    { id: 'speed', title: 'Speed & Efficiency', priority: 'high', description: '75% faster than traditional consulting', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'cost', title: 'Cost Effectiveness', priority: 'high', description: '60-80% cost reduction vs agencies', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'ai-intelligence', title: 'AI Intelligence', priority: 'high', description: 'Consultant-quality strategic rigor', color: 'bg-red-100 text-red-800 border-red-200' },
    { id: 'scalability', title: 'Scalability', priority: 'medium', description: 'Built for growth and expansion', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'consistency', title: 'Consistency', priority: 'medium', description: 'Cross-team alignment and messaging', color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'accessibility', title: 'Accessibility', priority: 'medium', description: 'No strategy background required', color: 'bg-amber-100 text-amber-800 border-amber-200' }
  ];

  // Generate initial audience messaging with challenges column
  const [audienceMessaging, setAudienceMessaging] = useState<AudienceMessaging[]>([
    {
      audienceId: 'customers',
      messages: [
        {
          id: 'customers-challenges-solve',
          category: 'challenges-solve',
          primaryMessage: 'Slow, expensive messaging development',
          keyPoints: [
            'Months-long consulting engagements',
            'Inconsistent messaging across teams',
            'High dependency on external agencies',
            'Lack of strategic messaging framework'
          ],
          approved: false
        },
        {
          id: 'customers-what-we-have',
          category: 'what-we-have',
          primaryMessage: 'AI-powered messaging platform',
          keyPoints: [
            'Strategic methodology refined with top consultants',
            'Multi-stakeholder research framework',
            'Intelligent analysis and recommendations'
          ],
          approved: false
        },
        {
          id: 'customers-what-we-do',
          category: 'what-we-do',
          primaryMessage: 'Strategic messaging development',
          keyPoints: [
            'Comprehensive stakeholder research',
            'Strategic brief creation',
            'Message grid framework',
            'AI-assisted copy generation'
          ],
          approved: false
        },
        {
          id: 'customers-how-different',
          category: 'how-different',
          primaryMessage: 'Speed + quality combined',
          keyPoints: [
            '75% faster than traditional consulting',
            '60-80% cost reduction',
            'Consultant-quality strategic rigor',
            'AI-enhanced intelligence'
          ],
          approved: false
        },
        {
          id: 'customers-value-primary',
          category: 'value-primary',
          primaryMessage: 'Executive strategic advantage',
          keyPoints: [
            'Enterprise-level strategy in weeks not months',
            'Predictable costs and timelines',
            'Cross-team alignment and consistency',
            'Competitive messaging positioning'
          ],
          approved: false
        },
        {
          id: 'customers-value-secondary',
          category: 'value-secondary',
          primaryMessage: 'Operational excellence',
          keyPoints: [
            'Ready-to-implement messaging framework',
            'Reduced dependency on external consultants',
            'Scalable process for future campaigns',
            'Data-driven strategic insights'
          ],
          approved: false
        }
      ]
    },
    {
      audienceId: 'users',
      messages: [
        {
          id: 'users-challenges-solve',
          category: 'challenges-solve',
          primaryMessage: 'Complex strategy tools and processes',
          keyPoints: [
            'Overwhelming strategic frameworks',
            'Lack of guided process',
            'Need for strategy expertise',
            'Time-consuming manual work'
          ],
          approved: false
        },
        {
          id: 'users-what-we-have',
          category: 'what-we-have',
          primaryMessage: 'User-friendly strategic platform',
          keyPoints: [
            'Intuitive interface design',
            'Guided workflow process',
            'AI-powered assistance',
            'Professional templates and frameworks'
          ],
          approved: false
        },
        {
          id: 'users-what-we-do',
          category: 'what-we-do',
          primaryMessage: 'Simplify strategy development',
          keyPoints: [
            'Guide through strategic process',
            'Provide intelligent recommendations',
            'Generate professional outputs',
            'Enable collaboration and iteration'
          ],
          approved: false
        },
        {
          id: 'users-how-different',
          category: 'how-different',
          primaryMessage: 'Professional without complexity',
          keyPoints: [
            'No strategy background required',
            'AI guides every step',
            'Built-in best practices',
            'Consultant-quality results'
          ],
          approved: false
        },
        {
          id: 'users-value-primary',
          category: 'value-primary',
          primaryMessage: 'Career development',
          keyPoints: [
            'Develop strategic thinking skills',
            'Deliver high-impact results',
            'Gain confidence in strategy work',
            'Build professional credibility'
          ],
          approved: false
        },
        {
          id: 'users-value-secondary',
          category: 'value-secondary',
          primaryMessage: 'Daily workflow improvement',
          keyPoints: [
            'Faster project completion',
            'Less rework and revisions',
            'Clear direction and focus',
            'Reduced stress and uncertainty'
          ],
          approved: false
        }
      ]
    },
    {
      audienceId: 'partners',
      messages: [
        {
          id: 'partners-challenges-solve',
          category: 'challenges-solve',
          primaryMessage: 'Limited strategic service offerings',
          keyPoints: [
            'Difficulty scaling strategy expertise',
            'High cost of senior consultants',
            'Inconsistent client deliverables',
            'Limited strategic differentiation'
          ],
          approved: false
        },
        {
          id: 'partners-what-we-have',
          category: 'what-we-have',
          primaryMessage: 'Scalable strategy capability',
          keyPoints: [
            'White-label platform option',
            'Partner training and certification',
            'Revenue sharing program',
            'Co-marketing opportunities'
          ],
          approved: false
        },
        {
          id: 'partners-what-we-do',
          category: 'what-we-do',
          primaryMessage: 'Enhance agency offerings',
          keyPoints: [
            'Expand service portfolio',
            'Improve client satisfaction',
            'Increase project margins',
            'Enable strategic positioning'
          ],
          approved: false
        },
        {
          id: 'partners-how-different',
          category: 'how-different',
          primaryMessage: 'Agency-friendly platform',
          keyPoints: [
            'Built for agency workflows',
            'Client collaboration features',
            'Professional client reports',
            'Scalable across clients'
          ],
          approved: false
        },
        {
          id: 'partners-value-primary',
          category: 'value-primary',
          primaryMessage: 'Business growth',
          keyPoints: [
            '40% revenue increase potential',
            'Higher-value client relationships',
            'Expanded market opportunity',
            'Competitive differentiation'
          ],
          approved: false
        },
        {
          id: 'partners-value-secondary',
          category: 'value-secondary',
          primaryMessage: 'Operational efficiency',
          keyPoints: [
            'Faster project delivery',
            'Reduced consultant dependencies',
            'Consistent quality outputs',
            'Improved team productivity'
          ],
          approved: false
        }
      ]
    },
    {
      audienceId: 'investors',
      messages: [
        {
          id: 'investors-challenges-solve',
          category: 'challenges-solve',
          primaryMessage: 'Underserved mid-market strategy gap',
          keyPoints: [
            'Expensive consulting out of reach',
            'DIY tools lack strategic rigor',
            'Fragmented solution landscape',
            'No scalable strategy platform'
          ],
          approved: false
        },
        {
          id: 'investors-what-we-have',
          category: 'what-we-have',
          primaryMessage: 'Category-defining platform',
          keyPoints: [
            'First-mover in AI messaging strategy',
            'Proven product-market fit',
            'Scalable SaaS technology',
            'Strategic IP and methodology'
          ],
          approved: false
        },
        {
          id: 'investors-what-we-do',
          category: 'what-we-do',
          primaryMessage: 'Create new market category',
          keyPoints: [
            'Democratize enterprise strategy',
            'Build platform ecosystem',
            'Capture underserved mid-market',
            'Scale through partnerships'
          ],
          approved: false
        },
        {
          id: 'investors-how-different',
          category: 'how-different',
          primaryMessage: 'Blue ocean opportunity',
          keyPoints: [
            'No direct competitors',
            'Bridges consulting and software',
            'AI-enhanced human expertise',
            'Network effects potential'
          ],
          approved: false
        },
        {
          id: 'investors-value-primary',
          category: 'value-primary',
          primaryMessage: 'Market opportunity',
          keyPoints: [
            '$12B+ TAM in strategy consulting',
            'High-growth SaaS model',
            'Strong unit economics',
            'Multiple expansion paths'
          ],
          approved: false
        },
        {
          id: 'investors-value-secondary',
          category: 'value-secondary',
          primaryMessage: 'Strategic advantages',
          keyPoints: [
            'Defensible AI moat',
            'Sticky customer platform',
            'Partner ecosystem growth',
            'International expansion ready'
          ],
          approved: false
        }
      ]
    }
  ]);

  // Key messages that should be highlighted (mentioned frequently in research)
  const keyMessages = [
    'Speed + quality combined',
    '75% faster than traditional consulting',
    '60-80% cost reduction',
    'AI-powered messaging platform',
    'No strategy background required',
    'Consultant-quality strategic rigor',
    '$12B+ TAM in strategy consulting',
    '40% revenue increase potential'
  ];

  const isKeyMessage = (text: string) => {
    return keyMessages.some(key => text.includes(key) || key.includes(text));
  };

  const approveAllForAudience = (audienceId: string) => {
    setAudienceMessaging(prev => prev.map(audience =>
      audience.audienceId === audienceId
        ? {
            ...audience,
            messages: audience.messages.map(msg => ({ ...msg, approved: true }))
          }
        : audience
    ));
  };

  // Define audiences based on strategic brief
  const audiences: Audience[] = [
    {
      id: 'customers',
      name: 'Decision Makers',
      description: 'C-level executives and marketing leaders',
      icon: Building2,
      color: 'from-blue-500 to-indigo-600',
      priority: 'primary'
    },
    {
      id: 'users',
      name: 'End Users',
      description: 'Marketing teams and practitioners',
      icon: Users,
      color: 'from-green-500 to-teal-600',
      priority: 'primary'
    },
    {
      id: 'partners',
      name: 'Partners',
      description: 'Agencies and consultants',
      icon: Heart,
      color: 'from-purple-500 to-pink-600',
      priority: 'secondary'
    },
    {
      id: 'investors',
      name: 'Investors',
      description: 'VCs and stakeholders',
      icon: Star,
      color: 'from-orange-500 to-red-600',
      priority: 'secondary'
    }
  ];

  const generateGrid = async () => {
    setGeneratingGrid(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setGridGenerated(true);
    setGeneratingGrid(false);
  };

  const handleEditCell = (cellId: string, field: string, currentValue: string | string[]) => {
    setEditingCell(cellId);
    setEditingField(field);

    if (Array.isArray(currentValue)) {
      setEditArray([...currentValue]);
      setEditText("");
    } else {
      setEditText(currentValue);
      setEditArray([]);
    }
  };

  const saveEdit = () => {
    if (editingCell && editingField) {
      const newValue = editingField === 'keyPoints' ? editArray : editText;

      setAudienceMessaging(prev => prev.map(audience => ({
        ...audience,
        messages: audience.messages.map(cell =>
          cell.id === editingCell
            ? { ...cell, [editingField]: newValue }
            : cell
        )
      })));
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingCell(null);
    setEditingField(null);
    setEditText("");
    setEditArray([]);
  };

  const addArrayItem = () => {
    if (editText.trim()) {
      setEditArray([...editArray, editText.trim()]);
      setEditText("");
    }
  };

  const removeArrayItem = (index: number) => {
    setEditArray(editArray.filter((_, i) => i !== index));
  };

  const updateArrayItem = (index: number, value: string) => {
    const newArray = [...editArray];
    newArray[index] = value;
    setEditArray(newArray);
  };

  const toggleApproval = (cellId: string) => {
    setAudienceMessaging(prev => prev.map(audience => ({
      ...audience,
      messages: audience.messages.map(cell =>
        cell.id === cellId
          ? { ...cell, approved: !cell.approved }
          : cell
      )
    })));
  };

  const exportGrid = () => {
    const csvContent = [
      ['Audience', 'Category', 'Primary Message', 'Key Points', 'Status'],
      ...audienceMessaging.flatMap(audience =>
        audience.messages.map(cell => [
          audiences.find(a => a.id === audience.audienceId)?.name || audience.audienceId,
          messagingCategories.find(c => c.id === cell.category)?.title || cell.category,
          cell.primaryMessage,
          cell.keyPoints.join('; '),
          cell.approved ? 'Approved' : 'Pending'
        ])
      )
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `message-grid-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentAudience = audienceMessaging.find(a => a.audienceId === activeAudienceTab);
  const getAudienceById = (id: string) => audiences.find(a => a.id === id);

  const approvedMessages = audienceMessaging.reduce((sum, audience) =>
    sum + audience.messages.filter(cell => cell.approved).length, 0
  );
  const totalMessages = audienceMessaging.reduce((sum, audience) =>
    sum + audience.messages.length, 0
  );

  const currentAudienceApprovedCount = currentAudience?.messages.filter(m => m.approved).length || 0;
  const currentAudienceTotalCount = currentAudience?.messages.length || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/brief">
                <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Brief
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Message Grid</h1>
                <p className="text-slate-600">Visual framework for mapping audiences, value drivers, and messaging strategy</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {gridGenerated && (
                <>
                  <Button variant="outline" onClick={exportGrid} className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Download className="h-4 w-4 mr-2" />
                    Export Grid
                  </Button>
                  <Button variant="outline" className="border-slate-200">
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Message Grid Content */}
        <div>
          {/* Grid Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Message Grid</h2>
                <p className="text-slate-600 mt-2">Strategic messaging framework organized by audience and message category</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-slate-900">{approvedMessages}/{totalMessages}</div>
                <div className="text-sm text-slate-600">Messages Approved</div>
              </div>
            </div>

            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${totalMessages > 0 ? (approvedMessages / totalMessages) * 100 : 0}%`,
                  background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)'
                }}
              ></div>
            </div>
          </div>

          {/* Audience Tabs */}
          <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg mb-8 overflow-x-auto">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <button
                  key={audience.id}
                  onClick={() => setActiveAudienceTab(audience.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                    activeAudienceTab === audience.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{audience.name}</span>
                </button>
              );
            })}
          </div>

          {/* Message Grid for Selected Audience */}
          {currentAudience && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {getAudienceById(activeAudienceTab)?.name} Messaging
                  </h3>
                  <p className="text-slate-600">
                    {getAudienceById(activeAudienceTab)?.description}
                  </p>
                </div>
                <Button
                  onClick={() => approveAllForAudience(activeAudienceTab)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  disabled={currentAudienceApprovedCount === currentAudienceTotalCount}
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve All ({currentAudienceTotalCount})
                </Button>
              </div>

              {/* Compact Stacked Format */}
              <div className="space-y-4">
                {messagingCategories.map((category) => {
                  const message = currentAudience.messages.find(m => m.category === category.id);
                  if (!message) return null;

                  return (
                    <div key={category.id} className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                      {/* Compact Header */}
                      <div className={`p-4 border-l-4 ${
                        category.id === 'challenges-solve' ? 'border-l-red-500' :
                        category.id === 'what-we-have' ? 'border-l-blue-500' :
                        category.id === 'what-we-do' ? 'border-l-green-500' :
                        category.id === 'how-different' ? 'border-l-purple-500' :
                        category.id === 'value-primary' ? 'border-l-emerald-500' :
                        'border-l-yellow-500'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${category.color}`}></div>
                            <div>
                              <h4 className="font-semibold text-slate-900 text-sm">{category.title}</h4>
                              <p className="text-xs text-slate-600">{category.description}</p>
                            </div>
                          </div>

                          {/* Approval Checkbox */}
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-slate-600">
                              {message.approved ? 'Approved' : 'Pending'}
                            </span>
                            <button
                              onClick={() => toggleApproval(message.id)}
                              className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all transform hover:scale-110 ${
                                message.approved
                                  ? 'border-green-500 bg-green-500 shadow-sm'
                                  : 'border-slate-300 hover:border-green-400 hover:bg-green-50'
                              }`}
                            >
                              {message.approved && <Check className="h-4 w-4 text-white" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Compact Content */}
                      <div className="px-4 pb-4">
                        {/* Primary Message */}
                        <div className="mb-3">
                          <div
                            onClick={() => handleEditCell(message.id, 'primaryMessage', message.primaryMessage)}
                            className={`cursor-pointer hover:bg-slate-50 p-2 rounded transition-all group border-l-2 border-l-transparent hover:border-l-purple-400 ${
                              isKeyMessage(message.primaryMessage) ? 'bg-amber-50 border border-amber-200' : ''
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <p className="text-sm font-medium text-slate-900 leading-relaxed flex-1">{message.primaryMessage}</p>
                              <Edit3 className="h-3 w-3 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 flex-shrink-0" />
                            </div>
                          </div>
                        </div>

                        {/* Key Points - Compact Grid */}
                        <div>
                          <div
                            className="cursor-pointer hover:bg-slate-50 p-2 rounded transition-all group border-l-2 border-l-transparent hover:border-l-blue-400"
                            onClick={() => handleEditCell(message.id, 'keyPoints', message.keyPoints)}
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {message.keyPoints.map((point, index) => (
                                <div key={index} className={`text-xs text-slate-700 leading-relaxed p-2 rounded ${
                                  isKeyMessage(point) ? 'bg-amber-50 border border-amber-200 font-medium' : 'bg-slate-50'
                                }`}>
                                  {point}
                                </div>
                              ))}
                            </div>
                            <Edit3 className="h-3 w-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity mt-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 text-center">
            <div className="space-y-4">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <p className="text-purple-800 font-medium">
                  {approvedMessages === totalMessages
                    ? "🎉 All messages approved! Your strategic messaging framework is complete."
                    : `Review and approve ${totalMessages - approvedMessages} remaining messages to finalize your framework.`
                  }
                </p>
              </div>

              {approvedMessages === totalMessages && (
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={exportGrid}
                    size="lg"
                    className="text-white shadow-lg hover:shadow-xl transition-all"
                    style={{background: 'linear-gradient(90deg, #8B5CF6 0%, #7C3AED 100%)'}}
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Export Message Grid
                  </Button>
                  <Link href="/copy-engine">
                    <Button
                      size="lg"
                      className="text-white shadow-lg hover:shadow-xl transition-all"
                      style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                    >
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Generate Copy
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
