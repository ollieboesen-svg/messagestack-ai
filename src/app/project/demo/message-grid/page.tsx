"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Plus,
  Edit3,
  Trash2,
  Save,
  Download,
  ArrowLeft,
  ArrowRight,
  Users,
  Target,
  Award,
  Grid3X3,
  MessageSquare,
  Lightbulb,
  RefreshCw,
  CheckCircle,
  Wand2,
  Zap,
  Rocket,
  Layers,
  TrendingUp,
  type LucideIcon
} from "lucide-react";
import Link from "next/link";

interface GridCell {
  id: string;
  content: string;
}

interface GridRow {
  id: string;
  audience: string;
  valueDriver: GridCell;
  keyMessage: GridCell;
  proofPoint: GridCell;
}

interface FrameworkType {
  id: string;
  name: string;
  description: string;
  bestFor: string;
  icon: LucideIcon;
  color: string;
  columns: string[];
}

const frameworkTypes: FrameworkType[] = [
  {
    id: 'value-led',
    name: 'Value-Led Framework',
    description: 'Audience-centric messaging focused on value drivers and proof points',
    bestFor: 'Sales enablement, solution selling, and customer-centric positioning',
    icon: Target,
    color: '#1E6EEB',
    columns: ['Audience', 'Value Driver', 'Key Message', 'Proof Point']
  },
  {
    id: 'gtm-launch',
    name: 'GTM Launch Framework',
    description: 'Product and brand positioning with differentiation pillars',
    bestFor: 'Product launches, brand positioning, and go-to-market campaigns',
    icon: Rocket,
    color: '#9333EA',
    columns: ['What We Have', 'What We Do', 'How We\'re Different', 'Value for Customers']
  },
  {
    id: 'competitive',
    name: 'Competitive Positioning',
    description: 'Market positioning with competitive advantages and unique benefits',
    bestFor: 'Competitive differentiation, market positioning, and category creation',
    icon: TrendingUp,
    color: '#0E7DB8',
    columns: ['Market Need', 'Our Approach', 'Key Differentiator', 'Customer Benefit']
  },
  {
    id: 'pillar-based',
    name: 'Message Pillar Framework',
    description: 'Thematic pillars with supporting messages and evidence',
    bestFor: 'Brand narrative, thought leadership, and integrated campaigns',
    icon: Layers,
    color: '#17A2B8',
    columns: ['Message Pillar', 'Core Narrative', 'Supporting Points', 'Proof & Examples']
  }
];

const initialRows: GridRow[] = [
  {
    id: "1",
    audience: "C-Suite Executives",
    valueDriver: { id: "v1", content: "Strategic speed to market" },
    keyMessage: { id: "k1", content: "Complete messaging in 2-4 weeks vs 3-6 months" },
    proofPoint: { id: "p1", content: "Fortune 500 clients reduce time-to-market by 70%" }
  },
  {
    id: "2",
    audience: "Marketing Teams",
    valueDriver: { id: "v2", content: "Eliminate repetitive work" },
    keyMessage: { id: "k2", content: "AI-powered copy generation from strategic frameworks" },
    proofPoint: { id: "p2", content: "Teams save 15+ hours per week on content creation" }
  },
  {
    id: "3",
    audience: "Product Managers",
    valueDriver: { id: "v3", content: "Evidence-based positioning" },
    keyMessage: { id: "k3", content: "Multi-stakeholder research drives every decision" },
    proofPoint: { id: "p3", content: "87% improvement in message-market fit" }
  }
];

export default function MessageGridPage() {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [frameworkGenerated, setFrameworkGenerated] = useState(false);
  const [rows, setRows] = useState<GridRow[]>(initialRows);
  const [activeAudience, setActiveAudience] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingSuggestion, setGeneratingSuggestion] = useState<string | null>(null);

  const handleGenerateGrid = async () => {
    if (!selectedFramework) return;

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));

    // Simulate AI-generated rows based on framework type
    const aiGeneratedRows: GridRow[] = [
      {
        id: "ai-1",
        audience: "VP of Marketing",
        valueDriver: { id: "vai-1", content: "Faster GTM execution without sacrificing quality" },
        keyMessage: { id: "kai-1", content: "Launch positioning 75% faster with AI-enhanced strategic rigor" },
        proofPoint: { id: "pai-1", content: "Mid-market companies achieve enterprise-level messaging in 2 weeks" }
      },
      {
        id: "ai-2",
        audience: "Growth-Stage Founders",
        valueDriver: { id: "vai-2", content: "Affordable enterprise-grade positioning" },
        keyMessage: { id: "kai-2", content: "Strategic messaging without $100K+ consulting fees" },
        proofPoint: { id: "pai-2", content: "60-80% cost reduction vs traditional consulting" }
      },
      {
        id: "ai-3",
        audience: "Content Marketers",
        valueDriver: { id: "vai-3", content: "Consistent, on-brand messaging at scale" },
        keyMessage: { id: "kai-3", content: "One strategic framework powers all your content" },
        proofPoint: { id: "pai-3", content: "Generate 50+ content variations in minutes, not days" }
      },
      {
        id: "ai-4",
        audience: "Sales Teams",
        valueDriver: { id: "vai-4", content: "Battle-tested sales narratives" },
        keyMessage: { id: "kai-4", content: "Research-backed messaging that resonates with buyers" },
        proofPoint: { id: "pai-4", content: "42% improvement in discovery call conversion rates" }
      }
    ];

    const allRows = [...initialRows, ...aiGeneratedRows];
    setRows(allRows);
    setIsGenerating(false);
    setFrameworkGenerated(true);
    // Set first audience as active
    if (allRows.length > 0) {
      setActiveAudience(allRows[0].audience);
    }
  };

  const handleSwitchFramework = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
    // Optionally regenerate with new framework
  };

  const startEdit = (cellId: string, currentContent: string) => {
    setEditingCell(cellId);
    setEditValue(currentContent);
  };

  const saveEdit = (rowId: string, field: 'valueDriver' | 'keyMessage' | 'proofPoint') => {
    setRows(rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          [field]: { ...row[field], content: editValue }
        };
      }
      return row;
    }));
    setEditingCell(null);
    setEditValue("");
  };

  const deleteRow = (rowId: string) => {
    const newRows = rows.filter(row => row.id !== rowId);
    setRows(newRows);
    // Update active audience if current one was deleted
    if (newRows.length > 0 && !newRows.find(r => r.audience === activeAudience)) {
      setActiveAudience(newRows[0].audience);
    }
  };

  const addRow = () => {
    const newAudience = "New Audience";
    const newRow: GridRow = {
      id: `new-${Date.now()}`,
      audience: newAudience,
      valueDriver: { id: `v-${Date.now()}`, content: "Enter value driver..." },
      keyMessage: { id: `k-${Date.now()}`, content: "Enter key message..." },
      proofPoint: { id: `p-${Date.now()}`, content: "Enter proof point..." }
    };
    setRows([...rows, newRow]);
    setActiveAudience(newAudience);
  };

  const generateSuggestion = async (rowId: string, field: 'valueDriver' | 'keyMessage' | 'proofPoint') => {
    setGeneratingSuggestion(`${rowId}-${field}`);
    await new Promise(resolve => setTimeout(resolve, 1500));

    const suggestions: { [key: string]: string } = {
      valueDriver: "AI-driven efficiency and strategic depth",
      keyMessage: "Combine the speed of automation with the rigor of traditional consulting",
      proofPoint: "Customers see 3x faster messaging development with 85% cost savings"
    };

    setRows(rows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          [field]: { ...row[field], content: suggestions[field] }
        };
      }
      return row;
    }));

    setGeneratingSuggestion(null);
  };

  const handleExport = () => {
    const csvContent = [
      ['Audience', 'Value Driver', 'Key Message', 'Proof Point'],
      ...rows.map(row => [
        row.audience,
        row.valueDriver.content,
        row.keyMessage.content,
        row.proofPoint.content
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'message-grid.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const selectedFrameworkData = frameworkTypes.find(f => f.id === selectedFramework);

  // Get unique audiences for tabs
  const audiences = Array.from(new Set(rows.map(r => r.audience)));
  const currentRow = rows.find(r => r.audience === activeAudience);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
        <Link href="/project/demo" className="hover:text-teal-600">Projects</Link>
        <span>/</span>
        <Link href="/project/demo" className="hover:text-teal-600">Demo Project</Link>
        <span>/</span>
        <span className="text-slate-900 font-medium">Message Frameworks</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ background: "#1E6EEB" }}
            >
              <Grid3X3 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Message Frameworks</h1>
              <p className="text-slate-600">Choose your framework and generate strategic messaging</p>
            </div>
          </div>
          {frameworkGenerated && (
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Framework Selection */}
      {!frameworkGenerated && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Choose Your Framework Type</h2>
            <p className="text-slate-600 mb-6">
              Different frameworks work better for different goals. Select the approach that fits your needs.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {frameworkTypes.map(framework => {
                const Icon = framework.icon;
                const isSelected = selectedFramework === framework.id;

                return (
                  <Card
                    key={framework.id}
                    className={`p-6 cursor-pointer transition-all duration-300 ${
                      isSelected
                        ? 'shadow-lg scale-[1.02]'
                        : 'hover:shadow-md hover:scale-[1.01]'
                    }`}
                    style={{
                      border: isSelected ? `2px solid ${framework.color}` : '1px solid #e2e8f0'
                    }}
                    onClick={() => setSelectedFramework(framework.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ background: framework.color }}
                        >
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">{framework.name}</h3>
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: framework.color }}>
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    <p className="text-slate-700 mb-4">{framework.description}</p>

                    <div className="bg-slate-50 rounded-lg p-3 mb-4">
                      <p className="text-xs font-semibold text-slate-700 mb-1">Best for:</p>
                      <p className="text-sm text-slate-600">{framework.bestFor}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {framework.columns.map((col, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {col}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Generate Button */}
          <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Wand2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Generate Message Framework</h2>
                    <p className="text-slate-600">
                      {selectedFrameworkData
                        ? `Generate ${selectedFrameworkData.name} from your research & strategy`
                        : 'Select a framework type to get started'}
                    </p>
                  </div>
                </div>
                <div className="ml-15 space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Based on 248 research responses and strategic imperatives</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Multi-audience messaging framework with proof points</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span>Fully editable and customizable after generation</span>
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                onClick={handleGenerateGrid}
                disabled={!selectedFramework || isGenerating}
                style={{ background: 'linear-gradient(90deg, #1E6EEB 0%, #9333EA 100%)' }}
                className="text-white px-8"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Framework
                  </>
                )}
              </Button>
            </div>
          </Card>
        </>
      )}

      {/* Framework Generated - Show Grid with Audience Tabs */}
      {frameworkGenerated && selectedFrameworkData && currentRow && (
        <>
          {/* Framework Type Badge and Switch Option */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge
                className="text-white px-4 py-2"
                style={{ background: selectedFrameworkData.color }}
              >
                <selectedFrameworkData.icon className="h-4 w-4 mr-2" />
                {selectedFrameworkData.name}
              </Badge>
              <p className="text-sm text-slate-600">{selectedFrameworkData.bestFor}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFrameworkGenerated(false);
                setSelectedFramework(null);
              }}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Switch Framework
            </Button>
          </div>

          {/* Audience Tabs */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-900">Select Audience</h2>
              <Button onClick={addRow} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Audience
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
              {audiences.map(audience => (
                <button
                  key={audience}
                  onClick={() => setActiveAudience(audience)}
                  className={`px-4 py-2 rounded-t-lg font-medium transition-all text-sm ${
                    activeAudience === audience
                      ? 'bg-white text-slate-900 border-b-2 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  style={{
                    borderBottomColor: activeAudience === audience ? selectedFrameworkData.color : 'transparent'
                  }}
                >
                  <Users className="h-4 w-4 inline mr-2" />
                  {audience}
                </button>
              ))}
            </div>
          </div>

          {/* Audience Framework Content */}
          <Card className="p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900">{activeAudience}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => deleteRow(currentRow.id)}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Audience
              </Button>
            </div>

            <div className="space-y-6">
              {/* Column 1 */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: selectedFrameworkData.color }}
                  >
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedFrameworkData.columns[1]}</h4>
                </div>

                {editingCell === `${currentRow.id}-valueDriver` ? (
                  <div className="space-y-2">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 text-sm"
                      style={{
                        borderColor: selectedFrameworkData.color
                      }}
                      rows={3}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => saveEdit(currentRow.id, 'valueDriver')}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingCell(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 leading-relaxed">{currentRow.valueDriver.content}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => startEdit(`${currentRow.id}-valueDriver`, currentRow.valueDriver.content)}
                        className="p-2 hover:bg-white rounded-lg shadow-sm transition-all"
                      >
                        <Edit3 className="h-4 w-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => generateSuggestion(currentRow.id, 'valueDriver')}
                        disabled={generatingSuggestion === `${currentRow.id}-valueDriver`}
                        className="p-2 hover:bg-white rounded-lg shadow-sm transition-all"
                      >
                        {generatingSuggestion === `${currentRow.id}-valueDriver` ? (
                          <RefreshCw className="h-4 w-4 text-purple-600 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Column 2 */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: selectedFrameworkData.color }}
                  >
                    <MessageSquare className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedFrameworkData.columns[2]}</h4>
                </div>

                {editingCell === `${currentRow.id}-keyMessage` ? (
                  <div className="space-y-2">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-lg text-sm"
                      style={{
                        borderColor: selectedFrameworkData.color
                      }}
                      rows={3}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => saveEdit(currentRow.id, 'keyMessage')}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingCell(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 leading-relaxed">{currentRow.keyMessage.content}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => startEdit(`${currentRow.id}-keyMessage`, currentRow.keyMessage.content)}
                        className="p-2 hover:bg-white rounded-lg shadow-sm transition-all"
                      >
                        <Edit3 className="h-4 w-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => generateSuggestion(currentRow.id, 'keyMessage')}
                        disabled={generatingSuggestion === `${currentRow.id}-keyMessage`}
                        className="p-2 hover:bg-white rounded-lg shadow-sm transition-all"
                      >
                        {generatingSuggestion === `${currentRow.id}-keyMessage` ? (
                          <RefreshCw className="h-4 w-4 text-purple-600 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Column 3 */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: selectedFrameworkData.color }}
                  >
                    <Award className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedFrameworkData.columns[3]}</h4>
                </div>

                {editingCell === `${currentRow.id}-proofPoint` ? (
                  <div className="space-y-2">
                    <textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-4 py-3 border-2 rounded-lg text-sm"
                      style={{
                        borderColor: selectedFrameworkData.color
                      }}
                      rows={3}
                      autoFocus
                    />
                    <div className="flex space-x-2">
                      <Button size="sm" onClick={() => saveEdit(currentRow.id, 'proofPoint')}>
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingCell(null)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="group relative bg-slate-50 rounded-lg p-4">
                    <p className="text-slate-700 leading-relaxed">{currentRow.proofPoint.content}</p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                      <button
                        onClick={() => startEdit(`${currentRow.id}-proofPoint`, currentRow.proofPoint.content)}
                        className="p-2 hover:bg-white rounded-lg shadow-sm transition-all"
                      >
                        <Edit3 className="h-4 w-4 text-slate-600" />
                      </button>
                      <button
                        onClick={() => generateSuggestion(currentRow.id, 'proofPoint')}
                        disabled={generatingSuggestion === `${currentRow.id}-proofPoint`}
                        className="p-2 hover:bg-white rounded-lg shadow-sm transition-all"
                      >
                        {generatingSuggestion === `${currentRow.id}-proofPoint` ? (
                          <RefreshCw className="h-4 w-4 text-purple-600 animate-spin" />
                        ) : (
                          <Sparkles className="h-4 w-4 text-purple-600" />
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Export Button */}
          <div className="flex justify-end mb-6">
            <Button onClick={handleExport} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export All Audiences
            </Button>
          </div>
        </>
      )}

      {/* Next Steps */}
      {frameworkGenerated && (
        <Card className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Message Framework Complete</h3>
              <p className="text-sm text-slate-600">
                Your messaging framework is ready with {audiences.length} audience{audiences.length !== 1 ? 's' : ''}. Generate copy variations for different channels.
              </p>
            </div>
            <Link href="/project/demo/copy-engine">
              <Button style={{ background: 'linear-gradient(90deg, #1E6EEB 0%, #9333EA 100%)' }} className="text-white">
                Generate Copy
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
