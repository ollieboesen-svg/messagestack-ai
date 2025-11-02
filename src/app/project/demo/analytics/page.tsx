"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  TrendingUp,
  Users,
  MessageSquare,
  Target,
  ArrowRight,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Save,
  Edit3,
  Plus,
  Sparkles,
  PieChart,
  Activity,
  ThumbsUp,
  ThumbsDown
} from "lucide-react";

interface Insight {
  id: string;
  category: string;
  finding: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  importance: 'high' | 'medium' | 'low';
  count: number;
}

interface Imperative {
  id: string;
  title: string;
  description: string;
  rationale: string;
  priority: 'high' | 'medium' | 'low';
}

interface PositioningElement {
  id: string;
  category: string;
  content: string;
}

const mockInsights: Insight[] = [
  {
    id: "1",
    category: "Speed to Market",
    finding: "87% of respondents cite time-to-market as a critical success factor",
    sentiment: "positive",
    importance: "high",
    count: 87
  },
  {
    id: "2",
    category: "Cost Efficiency",
    finding: "Traditional consulting costs identified as major barrier (73%)",
    sentiment: "negative",
    importance: "high",
    count: 73
  },
  {
    id: "3",
    category: "Collaboration",
    finding: "Teams struggle with stakeholder alignment in messaging process",
    sentiment: "negative",
    importance: "medium",
    count: 65
  },
  {
    id: "4",
    category: "AI Adoption",
    finding: "92% of marketing leaders plan to increase AI tool usage",
    sentiment: "positive",
    importance: "high",
    count: 92
  },
  {
    id: "5",
    category: "Strategic Rigor",
    finding: "Concern about maintaining quality with faster processes",
    sentiment: "neutral",
    importance: "medium",
    count: 58
  }
];

const mockImperatives: Imperative[] = [
  {
    id: "1",
    title: "Lead with Speed to Market",
    description: "Position MessageStack as the fastest path to strategic messaging",
    rationale: "87% of research respondents cite time-to-market as critical. Traditional 3-6 month timelines are a major pain point.",
    priority: "high"
  },
  {
    id: "2",
    title: "De-risk with AI-Human Balance",
    description: "Address quality concerns by emphasizing strategic rigor + AI speed",
    rationale: "58% express concern about maintaining quality with faster processes. Position AI as enhancement, not replacement.",
    priority: "high"
  },
  {
    id: "3",
    title: "Democratize Strategic Messaging",
    description: "Make enterprise-grade messaging accessible to mid-market teams",
    rationale: "73% cite traditional consulting costs as barrier. Opportunity to expand addressable market.",
    priority: "medium"
  }
];

const mockPositioning: PositioningElement[] = [
  { id: "1", category: "Target Market", content: "B2B marketing and product teams at growth-stage companies who need strategic messaging but can't afford traditional consulting" },
  { id: "2", category: "Problem Statement", content: "Marketing teams struggle to create evidence-based, strategically aligned messaging quickly enough to keep pace with market demands" },
  { id: "3", category: "Unique Value", content: "Only platform that combines rigorous strategic methodology with AI-powered execution across the entire messaging workflow" },
  { id: "4", category: "Key Differentiator", content: "Research-to-copy in one platform vs. fragmented tools and consultants" },
  { id: "5", category: "Proof Points", content: "2-4 weeks vs 3-6 months; 60-80% cost reduction; 87% message-market fit improvement" }
];

export default function AnalyticsStrategyPage() {
  const [analyticsTab, setAnalyticsTab] = useState<'overview' | 'sentiment' | 'categories' | 'trends'>('overview');
  const [insights] = useState<Insight[]>(mockInsights);
  const [imperatives, setImperatives] = useState<Imperative[]>(mockImperatives);
  const [positioning, setPositioning] = useState<PositioningElement[]>(mockPositioning);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategyGenerated, setStrategyGenerated] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsAnalyzing(false);
  };

  const handleGenerateStrategy = async () => {
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setStrategyGenerated(true);
  };

  const startEdit = (id: string, currentValue: string) => {
    setEditingId(id);
    setEditValue(currentValue);
  };

  const saveEdit = (id: string, type: 'imperative' | 'positioning') => {
    if (type === 'imperative') {
      setImperatives(imperatives.map(imp =>
        imp.id === id ? { ...imp, description: editValue } : imp
      ));
    } else {
      setPositioning(positioning.map(pos =>
        pos.id === id ? { ...pos, content: editValue } : pos
      ));
    }
    setEditingId(null);
    setEditValue("");
  };

  const filteredInsights = selectedCategory
    ? insights.filter(i => i.category === selectedCategory)
    : insights;

  const categories = Array.from(new Set(insights.map(i => i.category)));

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'negative':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-50 border-green-200 text-green-700';
      case 'negative':
        return 'bg-red-50 border-red-200 text-red-700';
      default:
        return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
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
        <span className="text-slate-900 font-medium">Analytics and Strategy</span>
      </div>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ background: "#17A2B8" }}
          >
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics and Strategy</h1>
            <p className="text-slate-600">Data insights and strategic recommendations</p>
          </div>
        </div>
      </div>

      {/* Generate Analytics Section */}
      <Card className="mb-8 p-8 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-teal-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Generate Analytics</h2>
                <p className="text-slate-600">AI-powered insights from your research data</p>
              </div>
            </div>
            <div className="ml-15 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-teal-600" />
                <span>248 research responses collected</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-teal-600" />
                <span>3 active surveys across different audiences</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-teal-600" />
                <span>Ready for AI-powered analysis</span>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            style={{ background: 'linear-gradient(90deg, #17A2B8 0%, #1E6EEB 100%)' }}
            className="text-white px-8"
          >
            {isAnalyzing ? (
              <>
                <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Generate Analytics
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Analytics Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Analytics Tabs */}
        <div className="flex items-center space-x-2 mb-6 border-b border-slate-200">
          <button
            onClick={() => setAnalyticsTab('overview')}
            className={`px-4 py-2 font-medium transition-all text-sm ${
              analyticsTab === 'overview'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </div>
          </button>
          <button
            onClick={() => setAnalyticsTab('sentiment')}
            className={`px-4 py-2 font-medium transition-all text-sm ${
              analyticsTab === 'sentiment'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <ThumbsUp className="h-4 w-4" />
              <span>Sentiment</span>
            </div>
          </button>
          <button
            onClick={() => setAnalyticsTab('categories')}
            className={`px-4 py-2 font-medium transition-all text-sm ${
              analyticsTab === 'categories'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <PieChart className="h-4 w-4" />
              <span>Categories</span>
            </div>
          </button>
          <button
            onClick={() => setAnalyticsTab('trends')}
            className={`px-4 py-2 font-medium transition-all text-sm ${
              analyticsTab === 'trends'
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>Trends</span>
            </div>
          </button>
        </div>

        {/* Overview Tab */}
        {analyticsTab === 'overview' && (
          <>
            {/* Overview Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">{insights.length}</p>
                <p className="text-sm text-slate-600">Key Insights</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">High</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">85%</p>
                <p className="text-sm text-slate-600">Confidence Score</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-orange-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">+8%</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">92%</p>
                <p className="text-sm text-slate-600">Strategic Alignment</p>
              </Card>
            </div>

            {/* Insights List */}
            <div className="space-y-4">
              {insights.map(insight => (
                <Card key={insight.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getSentimentIcon(insight.sentiment)}
                      <Badge variant="outline" className="text-xs">
                        {insight.category}
                      </Badge>
                      {insight.importance === 'high' && (
                        <Badge className="bg-red-100 text-red-700 text-xs">
                          High Priority
                        </Badge>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-teal-600">{insight.count}%</p>
                      <p className="text-xs text-slate-500">of respondents</p>
                    </div>
                  </div>
                  <p className="text-slate-900 font-medium mb-2">{insight.finding}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <Badge className={`text-xs ${getSentimentColor(insight.sentiment)}`}>
                      {insight.sentiment.charAt(0).toUpperCase() + insight.sentiment.slice(1)}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Sentiment Tab */}
        {analyticsTab === 'sentiment' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-green-50 border-green-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <ThumbsUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-green-700">
                      {insights.filter(i => i.sentiment === 'positive').length}
                    </p>
                    <p className="text-sm text-green-700">Positive Insights</p>
                  </div>
                </div>
                <div className="w-full bg-green-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{
                      width: `${(insights.filter(i => i.sentiment === 'positive').length / insights.length) * 100}%`
                    }}
                  />
                </div>
              </Card>

              <Card className="p-6 bg-red-50 border-red-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <ThumbsDown className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-red-700">
                      {insights.filter(i => i.sentiment === 'negative').length}
                    </p>
                    <p className="text-sm text-red-700">Challenges</p>
                  </div>
                </div>
                <div className="w-full bg-red-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{
                      width: `${(insights.filter(i => i.sentiment === 'negative').length / insights.length) * 100}%`
                    }}
                  />
                </div>
              </Card>

              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <AlertCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-yellow-700">
                      {insights.filter(i => i.sentiment === 'neutral').length}
                    </p>
                    <p className="text-sm text-yellow-700">Neutral</p>
                  </div>
                </div>
                <div className="w-full bg-yellow-200 rounded-full h-3">
                  <div
                    className="bg-yellow-500 h-3 rounded-full"
                    style={{
                      width: `${(insights.filter(i => i.sentiment === 'neutral').length / insights.length) * 100}%`
                    }}
                  />
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Sentiment Breakdown</h3>
              <div className="space-y-4">
                {['positive', 'negative', 'neutral'].map(sentiment => {
                  const sentimentInsights = insights.filter(i => i.sentiment === sentiment);
                  return (
                    <div key={sentiment}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700 capitalize">{sentiment}</span>
                        <span className="text-sm text-slate-600">{sentimentInsights.length} insights</span>
                      </div>
                      {sentimentInsights.map(insight => (
                        <Card key={insight.id} className={`p-4 mb-2 ${getSentimentColor(insight.sentiment)}`}>
                          <p className="text-sm font-medium">{insight.finding}</p>
                          <p className="text-xs mt-1">{insight.count}% of respondents</p>
                        </Card>
                      ))}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* Categories Tab */}
        {analyticsTab === 'categories' && (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map(category => {
                const categoryInsights = insights.filter(i => i.category === category);
                const avgCount = Math.round(categoryInsights.reduce((sum, i) => sum + i.count, 0) / categoryInsights.length);
                return (
                  <Card key={category} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-bold text-slate-900">{category}</h3>
                      <Badge className="bg-teal-100 text-teal-700">{categoryInsights.length}</Badge>
                    </div>
                    <p className="text-3xl font-bold text-teal-600 mb-2">{avgCount}%</p>
                    <p className="text-sm text-slate-600 mb-4">Average response rate</p>
                    <div className="space-y-2">
                      {categoryInsights.map(insight => (
                        <div key={insight.id} className="text-xs text-slate-700 flex items-center space-x-2">
                          {getSentimentIcon(insight.sentiment)}
                          <span>{insight.finding.substring(0, 50)}...</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Trends Tab */}
        {analyticsTab === 'trends' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Top Trending Topics</h3>
              <div className="space-y-4">
                {insights.sort((a, b) => b.count - a.count).map((insight, idx) => (
                  <div key={insight.id} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-teal-700">{idx + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-900">{insight.category}</span>
                        <span className="text-sm font-bold text-teal-600">{insight.count}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${insight.count}%`,
                            background: 'linear-gradient(90deg, #17A2B8 0%, #1E6EEB 100%)'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">High Priority Insights</h3>
                <div className="space-y-3">
                  {insights.filter(i => i.importance === 'high').map(insight => (
                    <Card key={insight.id} className="p-4 bg-red-50 border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className="bg-red-100 text-red-700 text-xs">High Priority</Badge>
                        <span className="text-lg font-bold text-red-700">{insight.count}%</span>
                      </div>
                      <p className="text-sm text-slate-900">{insight.finding}</p>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-bold text-slate-900 mb-4">Category Distribution</h3>
                <div className="space-y-3">
                  {categories.map(category => {
                    const categoryInsights = insights.filter(i => i.category === category);
                    return (
                      <div key={category}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-700">{category}</span>
                          <span className="text-sm font-semibold text-slate-900">{categoryInsights.length}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full"
                            style={{
                              width: `${(categoryInsights.length / insights.length) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Generate Strategy CTA */}
      <Card className="mb-12 p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Generate Strategic Recommendations</h2>
                <p className="text-slate-600">Transform analytics into actionable strategic imperatives</p>
              </div>
            </div>
            <div className="ml-15 space-y-2">
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>Based on {insights.length} key insights from your research</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>Evidence-based recommendations with rationale</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-slate-700">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span>Positioning brief and strategic imperatives</span>
              </div>
            </div>
          </div>
          <Button
            size="lg"
            onClick={handleGenerateStrategy}
            disabled={isGenerating}
            style={{ background: 'linear-gradient(90deg, #9333EA 0%, #1E6EEB 100%)' }}
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
                Generate Strategy
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Strategic Imperatives - Show after generation */}
      {strategyGenerated && (
        <>
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Strategic Imperatives</h2>
                <p className="text-slate-600">Evidence-based strategic recommendations</p>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Strategy
              </Button>
            </div>

            <div className="space-y-4">
              {imperatives.map((imperative, idx) => (
                <Card key={imperative.id} className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Target className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="outline" className="text-xs">Imperative {idx + 1}</Badge>
                          <Badge className={`text-xs ${getPriorityColor(imperative.priority)}`}>
                            {imperative.priority} priority
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{imperative.title}</h3>

                        {editingId === `imp-${imperative.id}` ? (
                          <div className="space-y-2">
                            <textarea
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 text-sm"
                              rows={2}
                              autoFocus
                            />
                            <div className="flex space-x-2">
                              <Button size="sm" onClick={() => saveEdit(imperative.id, 'imperative')}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-slate-700 mb-3">{imperative.description}</p>
                        )}

                        <div className="bg-slate-50 rounded-lg p-3 mt-3">
                          <p className="text-xs font-semibold text-slate-700 mb-1">Rationale</p>
                          <p className="text-sm text-slate-600">{imperative.rationale}</p>
                        </div>
                      </div>
                    </div>

                    {editingId !== `imp-${imperative.id}` && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(`imp-${imperative.id}`, imperative.description)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Positioning Brief */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Positioning Brief</h2>
                <p className="text-slate-600">Core positioning elements for your messaging</p>
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Element
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {positioning.map(element => (
                <Card key={element.id} className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Lightbulb className="h-4 w-4 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-slate-900">{element.category}</h3>
                    </div>

                    {editingId !== `pos-${element.id}` && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => startEdit(`pos-${element.id}`, element.content)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {editingId === `pos-${element.id}` ? (
                    <div className="space-y-2">
                      <textarea
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full px-3 py-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm"
                        rows={3}
                        autoFocus
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => saveEdit(element.id, 'positioning')}>
                          Save
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-700">{element.content}</p>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 mb-2">
              {strategyGenerated ? 'Strategy Complete' : 'Analytics Ready'}
            </h3>
            <p className="text-sm text-slate-600">
              {strategyGenerated
                ? 'Your strategic foundation is set. Build your message framework next.'
                : 'Generate strategic recommendations to proceed to message frameworks'}
            </p>
          </div>
          <Link href="/project/demo/message-grid">
            <Button
              style={{ background: 'linear-gradient(90deg, #17A2B8 0%, #1E6EEB 100%)' }}
              className="text-white"
              disabled={!strategyGenerated}
            >
              Build Message Framework
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
