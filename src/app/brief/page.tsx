"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowLeft,
  Download,
  Target,
  Users,
  Save,
  Edit3,
  Plus,
  Trash2,
  Check,
  X,
  Shield,
  Globe,
  Briefcase,
  Heart,
  Star,
  Rocket,
  ArrowRight,
  RefreshCw
} from "lucide-react";

interface StrategicImperative {
  id: string;
  text: string;
  approved: boolean;
}

interface BriefSection {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  imperatives: StrategicImperative[];
  description: string;
}

export default function Brief() {
  const [generatingBrief, setGeneratingBrief] = useState(false);
  const [briefGenerated, setBriefGenerated] = useState(false);
  const [editingImperative, setEditingImperative] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  // Strategic Brief - Focused imperatives for approval
  const [briefSections, setBriefSections] = useState<BriefSection[]>([
    {
      id: 'competitive-position',
      title: 'Competitive Alternatives',
      icon: Shield,
      color: 'from-blue-500 to-indigo-600',
      description: 'How we position vs. current alternatives',
      imperatives: [
        { id: 'cp1', text: 'AI-powered intelligence vs. manual consulting processes', approved: false },
        { id: 'cp2', text: 'Strategic methodology vs. basic survey collection', approved: false },
        { id: 'cp3', text: 'Speed + quality vs. slow/expensive or fast/basic alternatives', approved: false }
      ]
    },
    {
      id: 'unique-attributes',
      title: 'Key Unique Attributes',
      icon: Star,
      color: 'from-purple-500 to-pink-600',
      description: 'What makes us distinctly different',
      imperatives: [
        { id: 'ua1', text: 'AI-powered insights that augment human strategic thinking', approved: false },
        { id: 'ua2', text: 'End-to-end workflow from research to brief to message grid', approved: false },
        { id: 'ua3', text: 'Multi-stakeholder systematic methodology with intelligent analysis', approved: false }
      ]
    },
    {
      id: 'customer-value',
      title: 'Value for Customer',
      icon: Heart,
      color: 'from-green-500 to-teal-600',
      description: 'Key benefits for decision makers',
      imperatives: [
        { id: 'cv1', text: '75% faster than traditional consulting engagements', approved: false },
        { id: 'cv2', text: '60-80% cost reduction while maintaining strategic quality', approved: false },
        { id: 'cv3', text: 'Cross-team alignment and consistent messaging framework', approved: false }
      ]
    },
    {
      id: 'end-user-value',
      title: 'Value for End User',
      icon: Users,
      color: 'from-orange-500 to-red-600',
      description: 'Benefits for practitioners and teams',
      imperatives: [
        { id: 'euv1', text: 'Professional-grade strategy without consulting complexity', approved: false },
        { id: 'euv2', text: 'AI-guided process with intelligent recommendations', approved: false },
        { id: 'euv3', text: 'Actionable, implementation-ready strategic outputs', approved: false }
      ]
    },
    {
      id: 'ideal-customers',
      title: 'Ideal Customers',
      icon: Target,
      color: 'from-teal-500 to-cyan-600',
      description: 'Who we serve best',
      imperatives: [
        { id: 'ic1', text: 'Growth companies (50-500 employees) needing strategic messaging', approved: false },
        { id: 'ic2', text: 'Marketing teams without access to strategy consulting budgets', approved: false },
        { id: 'ic3', text: 'Agencies wanting to deliver consultant-quality strategic work', approved: false }
      ]
    },
    {
      id: 'market-focus',
      title: 'Market We Win',
      icon: Globe,
      color: 'from-indigo-500 to-purple-600',
      description: 'Our competitive sweet spot',
      imperatives: [
        { id: 'mf1', text: 'Mid-market B2B SaaS and technology companies', approved: false },
        { id: 'mf2', text: 'Marketing agencies serving growth-stage clients', approved: false },
        { id: 'mf3', text: 'Companies prioritizing strategic messaging and positioning', approved: false }
      ]
    },
    {
      id: 'gtm-strategy',
      title: 'GTM Strategy',
      icon: Rocket,
      color: 'from-pink-500 to-rose-600',
      description: 'How we reach and acquire customers',
      imperatives: [
        { id: 'gtm1', text: 'Thought leadership in AI-powered messaging strategy category', approved: false },
        { id: 'gtm2', text: 'Strategic partnerships with agencies and marketing consultants', approved: false },
        { id: 'gtm3', text: 'Product-led growth with freemium onboarding experience', approved: false }
      ]
    },
    {
      id: 'product-strategy',
      title: 'Product Strategy',
      icon: Briefcase,
      color: 'from-emerald-500 to-green-600',
      description: 'Platform development priorities',
      imperatives: [
        { id: 'ps1', text: 'Enhance AI intelligence and strategic recommendations', approved: false },
        { id: 'ps2', text: 'Expand integrations with marketing and sales tools', approved: false },
        { id: 'ps3', text: 'Build advanced analytics and competitive intelligence features', approved: false }
      ]
    }
  ]);

  const generateBrief = async () => {
    setGeneratingBrief(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setBriefGenerated(true);
    setGeneratingBrief(false);
  };

  const handleEditImperative = (imperativeId: string, currentText: string) => {
    setEditingImperative(imperativeId);
    setEditText(currentText);
  };

  const saveImperative = (sectionId: string, imperativeId: string) => {
    setBriefSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
            ...section,
            imperatives: section.imperatives.map(imp =>
              imp.id === imperativeId
                ? { ...imp, text: editText }
                : imp
            )
          }
        : section
    ));
    setEditingImperative(null);
    setEditText("");
  };

  const toggleApproval = (sectionId: string, imperativeId: string) => {
    setBriefSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
            ...section,
            imperatives: section.imperatives.map(imp =>
              imp.id === imperativeId
                ? { ...imp, approved: !imp.approved }
                : imp
            )
          }
        : section
    ));
  };

  const addImperative = (sectionId: string) => {
    setBriefSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
            ...section,
            imperatives: [
              ...section.imperatives,
              {
                id: `${sectionId}-${Date.now()}`,
                text: 'New strategic imperative',
                approved: false
              }
            ]
          }
        : section
    ));
  };

  const deleteImperative = (sectionId: string, imperativeId: string) => {
    setBriefSections(prev => prev.map(section =>
      section.id === sectionId
        ? {
            ...section,
            imperatives: section.imperatives.filter(imp => imp.id !== imperativeId)
          }
        : section
    ));
  };

  const exportBrief = () => {
    const briefContent = `# Message Stack Strategic Brief\n\n${briefSections.map((section, index) =>
      `## ${index + 1}. ${section.title}\n\n${section.imperatives.map(imp => `✓ ${imp.text}${imp.approved ? ' [APPROVED]' : ' [PENDING]'}`).join('\n')}\n\n`
    ).join('\n')}`;

    const blob = new Blob([briefContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `message-stack-strategic-brief-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalImperatives = briefSections.reduce((sum, section) => sum + section.imperatives.length, 0);
  const approvedImperatives = briefSections.reduce((sum, section) =>
    sum + section.imperatives.filter(imp => imp.approved).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/analytics">
                <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analytics
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Strategic Brief</h1>
                <p className="text-slate-600">Review and approve strategic imperatives for positioning and messaging</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {briefGenerated && (
                <Button variant="outline" onClick={exportBrief} className="border-blue-200 text-blue-700 hover:bg-blue-50">
                  <Download className="h-4 w-4 mr-2" />
                  Export Brief
                </Button>
              )}
              <Button variant="outline" className="border-slate-200">
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {!briefGenerated ? (
          /* Brief Generation Interface */
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)'}}>
                <Target className="h-8 w-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Ready to Create Your Strategic Brief
              </h2>

              <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                Based on your research analysis, our AI will generate strategic imperatives across 8 key areas for your positioning and messaging strategy. Review and approve each imperative to build your foundation for the message grid.
              </p>

              <Button
                onClick={generateBrief}
                disabled={generatingBrief}
                size="lg"
                className="text-white shadow-lg hover:shadow-xl transition-all"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                {generatingBrief ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Generating Strategic Brief...
                  </>
                ) : (
                  <>
                    <Target className="h-5 w-5 mr-2" />
                    Generate Strategic Brief
                  </>
                )}
              </Button>
            </Card>
          </div>
        ) : (
          /* Strategic Brief Content */
          <div>
            {/* Brief Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Strategic Brief</h2>
                  <p className="text-slate-600 mt-2">Review and approve strategic imperatives for Message Stack positioning and messaging</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-slate-900">{approvedImperatives}/{totalImperatives}</div>
                  <div className="text-sm text-slate-600">Imperatives Approved</div>
                </div>
              </div>

              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${totalImperatives > 0 ? (approvedImperatives / totalImperatives) * 100 : 0}%`,
                    background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'
                  }}
                ></div>
              </div>
            </div>

            {/* Brief Sections - Clean, numbered layout */}
            <div className="space-y-6">
              {briefSections.map((section, index) => (
                <Card key={section.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    {/* Section Number */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 bg-gradient-to-br ${section.color}`}>
                      {index + 1}
                    </div>

                    {/* Section Content */}
                    <div className="flex-1">
                      <div className="mb-4">
                        <h3 className="text-xl font-semibold text-slate-900">{section.title}</h3>
                        <p className="text-sm text-slate-600">{section.description}</p>
                      </div>

                      {/* Imperatives List */}
                      <div className="space-y-3">
                        {section.imperatives.map((imperative) => (
                          <div key={imperative.id} className="group">
                            {editingImperative === imperative.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={editText}
                                  onChange={(e) => setEditText(e.target.value)}
                                  className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                  rows={2}
                                />
                                <div className="flex space-x-2">
                                  <Button
                                    size="sm"
                                    onClick={() => saveImperative(section.id, imperative.id)}
                                    className="bg-green-600 hover:bg-green-700 text-white"
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingImperative(null)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <div className={`flex items-start space-x-3 p-3 rounded-lg border-2 transition-all ${
                                imperative.approved
                                  ? 'border-green-200 bg-green-50'
                                  : 'border-slate-200 hover:border-blue-200'
                              }`}>
                                <button
                                  onClick={() => toggleApproval(section.id, imperative.id)}
                                  className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                                    imperative.approved
                                      ? 'border-green-500 bg-green-500'
                                      : 'border-slate-300 hover:border-green-400'
                                  }`}
                                >
                                  {imperative.approved && <Check className="h-3 w-3 text-white" />}
                                </button>

                                <span className={`flex-1 ${
                                  imperative.approved ? 'text-green-800 font-medium' : 'text-slate-700'
                                }`}>
                                  {imperative.text}
                                </span>

                                <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleEditImperative(imperative.id, imperative.text)}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Edit3 className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => deleteImperative(section.id, imperative.id)}
                                    className="h-6 w-6 p-0 hover:bg-red-50 hover:border-red-200"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => addImperative(section.id)}
                          className="w-full border-dashed border-slate-300 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Imperative
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 text-center">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800 font-medium">
                    {approvedImperatives === totalImperatives
                      ? "🎉 All strategic imperatives approved! Ready to create your message grid."
                      : `Review and approve ${totalImperatives - approvedImperatives} remaining imperatives to proceed.`
                    }
                  </p>
                </div>

                {approvedImperatives === totalImperatives && (
                  <Link href="/message-grid">
                    <Button
                      size="lg"
                      className="text-white shadow-lg hover:shadow-xl transition-all"
                      style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                    >
                      <ArrowRight className="h-5 w-5 mr-2" />
                      Create Message Grid
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
