"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { mockSurveyResponses, getResponseStatistics, type SurveyResponse } from "@/lib/mockData";
import Link from "next/link";
import {
  Search,
  Filter,
  Download,
  Eye,
  BarChart3,
  TrendingUp,
  Users,
  Star,
  MessageSquare,
  Clock,
  CheckCircle2,
  Target,
  Brain,
  Lightbulb,
  Building2,
  Globe,
  DollarSign,
  ArrowRight,
  RefreshCw,
  Trophy,
  Zap,
  Shield,
  Rocket
} from "lucide-react";

interface AnalysisTab {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

export default function Analytics() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stakeholderFilter, setStakeholderFilter] = useState("all");
  const [selectedResponse, setSelectedResponse] = useState<SurveyResponse | null>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [generatingAnalysis, setGeneratingAnalysis] = useState(false);
  const [analysisGenerated, setAnalysisGenerated] = useState(false);
  const [activeAnalysisTab, setActiveAnalysisTab] = useState('overview');

  // Analyze survey data for insights
  const analysis = useMemo(() => {
    const stats = getResponseStatistics();
    const totalResponses = mockSurveyResponses.length;

    // Satisfaction analysis
    const ratingResponses = mockSurveyResponses.flatMap(r =>
      r.responses.filter(resp => resp.type === 'rating').map(resp => Number(resp.answer))
    );
    const avgSatisfaction = ratingResponses.reduce((sum, rating) => sum + rating, 0) / ratingResponses.length;

    // Recommendation analysis
    const yesNoResponses = mockSurveyResponses.flatMap(r =>
      r.responses.filter(resp => resp.type === 'yes_no' && resp.question.includes('recommend'))
    );
    const recommendations = yesNoResponses.filter(resp => resp.answer === 'Yes').length;
    const recommendationRate = (recommendations / yesNoResponses.length) * 100;

    // Value proposition analysis
    const valueProps = mockSurveyResponses.flatMap(r =>
      r.responses.filter(resp => resp.type === 'multiple_choice')
        .flatMap(resp => resp.answer as string[])
    );

    const valueCounts = valueProps.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topValues = Object.entries(valueCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([value, count]) => ({ value, count, percentage: Math.round((count / valueProps.length) * 100) }));

    // Stakeholder insights
    const stakeholderInsights = Object.entries(stats.byStakeholder).map(([type, count]) => ({
      type: type.charAt(0).toUpperCase() + type.slice(1),
      count,
      percentage: Math.round((count / totalResponses) * 100)
    }));

    return {
      totalResponses,
      avgSatisfaction: Math.round(avgSatisfaction * 10) / 10,
      recommendationRate: Math.round(recommendationRate),
      topValues,
      stakeholderInsights
    };
  }, []);

  // Analysis tabs configuration
  const analysisTabs: AnalysisTab[] = [
    { id: 'overview', title: 'Overview', icon: BarChart3, color: 'from-blue-500 to-indigo-600' },
    { id: 'positioning', title: 'Market Position', icon: Target, color: 'from-purple-500 to-pink-600' },
    { id: 'competitive', title: 'Competitive', icon: Shield, color: 'from-green-500 to-teal-600' },
    { id: 'stakeholders', title: 'Stakeholders', icon: Users, color: 'from-orange-500 to-red-600' },
    { id: 'value', title: 'Value Drivers', icon: Star, color: 'from-yellow-500 to-orange-600' },
    { id: 'insights', title: 'Key Insights', icon: Lightbulb, color: 'from-teal-500 to-cyan-600' }
  ];

  const generateAnalysis = async () => {
    setGeneratingAnalysis(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setAnalysisGenerated(true);
    setShowAnalysis(true);
    setGeneratingAnalysis(false);
  };

  // Filter and search logic
  const filteredResponses = useMemo(() => {
    return mockSurveyResponses.filter(response => {
      const matchesSearch = searchTerm === "" ||
        response.stakeholderType.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.responses.some(r =>
          r.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          r.answer.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesStakeholder = stakeholderFilter === "all" || response.stakeholderType === stakeholderFilter;

      return matchesSearch && matchesStakeholder;
    });
  }, [searchTerm, stakeholderFilter]);

  const uniqueStakeholders = Array.from(new Set(mockSurveyResponses.map(r => r.stakeholderType)));
  const stats = getResponseStatistics();

  // Render analysis tab content
  const renderAnalysisContent = () => {
    switch (activeAnalysisTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-500 flex items-center justify-center">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-blue-700 mb-1">{analysis.totalResponses}</div>
                <div className="text-sm text-blue-600">Total Responses</div>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-500 flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-green-700 mb-1">{analysis.avgSatisfaction}/5</div>
                <div className="text-sm text-green-600">Avg Satisfaction</div>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-100">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-purple-500 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-1">{analysis.recommendationRate}%</div>
                <div className="text-sm text-purple-600">Recommend Rate</div>
              </Card>

              <Card className="p-6 text-center bg-gradient-to-br from-orange-50 to-red-50 border-orange-100">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-500 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-orange-700 mb-1">87%</div>
                <div className="text-sm text-orange-600">Category Leader</div>
              </Card>
            </div>

            {/* Executive Summary */}
            <Card className="p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Brain className="h-6 w-6 mr-3 text-blue-600" />
                Executive Summary
              </h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-lg leading-relaxed text-slate-700">
                  Message Stack demonstrates <strong>strong product-market fit</strong> with a {analysis.recommendationRate}% recommendation rate and {analysis.avgSatisfaction}/5 satisfaction score across {analysis.totalResponses} stakeholder responses.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">🎯 Key Finding</h4>
                    <p className="text-blue-800 text-sm">Positioned to create new category in AI-powered messaging strategy platforms</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <h4 className="font-semibold text-green-900 mb-2">💰 Market Opportunity</h4>
                    <p className="text-green-800 text-sm">$12B+ marketing strategy consulting market with underserved mid-market</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Insights */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-teal-500 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-teal-900">Speed Advantage</h4>
                </div>
                <p className="text-teal-800 text-sm">75% faster than traditional consulting with maintained quality</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-purple-900">Cost Efficiency</h4>
                </div>
                <p className="text-purple-800 text-sm">60-80% cost reduction vs traditional consulting approaches</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <h4 className="font-semibold text-blue-900">AI Intelligence</h4>
                </div>
                <p className="text-blue-800 text-sm">Strategic rigor enhanced by AI vs manual survey tools</p>
              </Card>
            </div>
          </div>
        );

      case 'positioning':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Target className="h-6 w-6 mr-3 text-purple-600" />
              Market Position & Opportunity
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">🎯 Category Position</h4>
                <div className="space-y-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="font-medium text-blue-900">AI-Powered Platform</div>
                    <div className="text-sm text-blue-700">vs Manual Consulting</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <div className="font-medium text-green-900">Strategic Framework</div>
                    <div className="text-sm text-green-700">vs Basic Survey Tools</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-3">
                    <div className="font-medium text-purple-900">Speed + Quality</div>
                    <div className="text-sm text-purple-700">vs Slow/Expensive or Fast/Basic</div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">💰 Market Sizing</h4>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-900">$12B+</div>
                    <div className="text-sm text-slate-600">Total Addressable Market</div>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 text-center">
                    <div className="font-medium text-orange-900">Mid-Market Gap</div>
                    <div className="text-sm text-orange-700">50-500 employee companies underserved</div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50">
              <h4 className="font-semibold text-slate-900 mb-4">🚀 Strategic Recommendation</h4>
              <p className="text-lg text-slate-700 mb-4">
                Lead with <strong>category creation messaging</strong> rather than competing in existing survey or consulting categories.
              </p>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                <strong className="text-blue-900">"The intelligent evolution of messaging strategy development"</strong>
              </div>
            </Card>
          </div>
        );

      case 'competitive':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Shield className="h-6 w-6 mr-3 text-green-600" />
              Competitive Landscape
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-red-200 bg-red-50">
                <h4 className="font-semibold text-red-900 mb-3">Strategy Consulting</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-red-700">Cost:</span>
                    <span className="font-medium text-red-900">$50K-200K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Timeline:</span>
                    <span className="font-medium text-red-900">3-6 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Access:</span>
                    <span className="font-medium text-red-900">Enterprise only</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-yellow-200 bg-yellow-50">
                <h4 className="font-semibold text-yellow-900 mb-3">Survey Platforms</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Framework:</span>
                    <span className="font-medium text-yellow-900">Basic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-700">AI Intelligence:</span>
                    <span className="font-medium text-yellow-900">Limited</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yellow-700">Strategy:</span>
                    <span className="font-medium text-yellow-900">Minimal</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-green-200 bg-green-50">
                <h4 className="font-semibold text-green-900 mb-3">Message Stack</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-green-700">Cost:</span>
                    <span className="font-medium text-green-900">60-80% less</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Timeline:</span>
                    <span className="font-medium text-green-900">2-4 weeks</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Access:</span>
                    <span className="font-medium text-green-900">All companies</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50">
              <h4 className="font-semibold text-slate-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2 text-blue-600" />
                Blue Ocean Opportunity
              </h4>
              <p className="text-slate-700 mb-4">
                No direct competitors offer AI-powered strategic messaging platform combining systematic methodology with intelligent automation.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-3">
                  <div className="font-medium text-blue-900">First-Mover Advantage</div>
                  <div className="text-sm text-blue-700">Creating new category</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="font-medium text-teal-900">Market Gap</div>
                  <div className="text-sm text-teal-700">Mid-market underserved</div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'stakeholders':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Users className="h-6 w-6 mr-3 text-orange-600" />
              Stakeholder Value Analysis
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              {analysis.stakeholderInsights.map((stakeholder, index) => {
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500'];
                const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50'];
                const textColors = ['text-blue-900', 'text-green-900', 'text-purple-900', 'text-orange-900'];

                return (
                  <Card key={stakeholder.type} className={`p-6 ${bgColors[index % 4]}`}>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`w-10 h-10 rounded-full ${colors[index % 4]} flex items-center justify-center`}>
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${textColors[index % 4]}`}>{stakeholder.type}</h4>
                        <div className="text-sm text-slate-600">{stakeholder.count} responses ({stakeholder.percentage}%)</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {stakeholder.type === 'Customer' && (
                        <>
                          <div className="text-sm text-slate-700">• "Enterprise-level strategy in weeks, not months"</div>
                          <div className="text-sm text-slate-700">• "Strategic alignment across all teams"</div>
                          <div className="text-sm text-slate-700">• "Professional results without consultant overhead"</div>
                        </>
                      )}
                      {stakeholder.type === 'Internal' && (
                        <>
                          <div className="text-sm text-slate-700">• "Professional strategy without complexity"</div>
                          <div className="text-sm text-slate-700">• "AI guides process and recommendations"</div>
                          <div className="text-sm text-slate-700">• "Actionable outputs ready for implementation"</div>
                        </>
                      )}
                      {stakeholder.type === 'Partner' && (
                        <>
                          <div className="text-sm text-slate-700">• "Consultant-quality at agency speed"</div>
                          <div className="text-sm text-slate-700">• "Enhanced client value and satisfaction"</div>
                          <div className="text-sm text-slate-700">• "Systematic methodology improves consistency"</div>
                        </>
                      )}
                      {stakeholder.type === 'Investor' && (
                        <>
                          <div className="text-sm text-slate-700">• "Creating new category in $12B+ market"</div>
                          <div className="text-sm text-slate-700">• "Scalable SaaS model vs consulting labor"</div>
                          <div className="text-sm text-slate-700">• "Strong product-market fit indicators"</div>
                        </>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="p-6 bg-gradient-to-r from-teal-50 to-cyan-50">
              <h4 className="font-semibold text-slate-900 mb-4">🎯 Cross-Stakeholder Alignment</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-teal-700">92%</div>
                  <div className="text-sm text-teal-600">Consistency Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-700">4</div>
                  <div className="text-sm text-cyan-600">Stakeholder Types</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700">High</div>
                  <div className="text-sm text-blue-600">Value Convergence</div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'value':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Star className="h-6 w-6 mr-3 text-yellow-600" />
              Value Proposition Analysis
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">🎯 Top Value Drivers</h4>
                <div className="space-y-3">
                  {analysis.topValues.map((value, index) => (
                    <div key={value.value} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">
                          {index + 1}
                        </div>
                        <span className="font-medium text-slate-900">{value.value}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{value.percentage}%</div>
                        <div className="text-xs text-slate-600">{value.count} mentions</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">⚡ Differentiation Themes</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <div className="font-medium text-blue-900">AI Intelligence</div>
                    <div className="text-sm text-blue-700">90% value AI as key advantage</div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                    <div className="font-medium text-green-900">Speed Benefits</div>
                    <div className="text-sm text-green-700">92% cite faster development</div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <div className="font-medium text-purple-900">Category Leadership</div>
                    <div className="text-sm text-purple-700">87% see as category-defining</div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
                    <div className="font-medium text-orange-900">Strategic Rigor</div>
                    <div className="text-sm text-orange-700">85% value methodology</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );

      case 'insights':
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-900 flex items-center">
              <Lightbulb className="h-6 w-6 mr-3 text-teal-600" />
              Strategic Insights & Recommendations
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <h4 className="font-semibold text-green-900 mb-4 flex items-center">
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  Market Validation
                </h4>
                <ul className="space-y-2 text-sm text-green-800">
                  <li>• Strong product-market fit across all stakeholder groups</li>
                  <li>• Recommendation rate exceeds SaaS benchmarks (72%)</li>
                  <li>• Cross-stakeholder alignment enables multi-channel GTM</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Positioning Strategy
                </h4>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li>• Lead with category creation vs competition</li>
                  <li>• Position as "intelligent evolution" of messaging</li>
                  <li>• Target underserved mid-market segment</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <h4 className="font-semibold text-purple-900 mb-4 flex items-center">
                  <Rocket className="h-5 w-5 mr-2" />
                  Go-to-Market
                </h4>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li>• Partner channel shows high potential for scale</li>
                  <li>• Product-led growth with freemium model</li>
                  <li>• Thought leadership in AI messaging category</li>
                </ul>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <h4 className="font-semibold text-orange-900 mb-4 flex items-center">
                  <Building2 className="h-5 w-5 mr-2" />
                  Product Development
                </h4>
                <ul className="space-y-2 text-sm text-orange-800">
                  <li>• Enhance AI intelligence and recommendations</li>
                  <li>• Expand marketing and sales tool integrations</li>
                  <li>• Build advanced analytics and competitive intel</li>
                </ul>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-r from-teal-50 via-blue-50 to-purple-50 border-2 border-teal-200">
              <h4 className="font-semibold text-slate-900 mb-4 text-xl flex items-center">
                <Trophy className="h-6 w-6 mr-3 text-teal-600" />
                Key Strategic Recommendation
              </h4>
              <div className="bg-white rounded-lg p-6 border-l-4 border-teal-500">
                <p className="text-lg text-slate-800 font-medium mb-3">
                  Position Message Stack as the category creator in "AI-Powered Messaging Strategy Platforms"
                </p>
                <p className="text-slate-700">
                  Rather than competing in existing survey or consulting categories, lead the market by defining a new category that bridges strategic consulting quality with software platform accessibility and AI intelligence.
                </p>
              </div>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Research Analytics</h1>
              <p className="text-slate-600">Comprehensive analysis of survey insights and strategic intelligence</p>
            </div>
            <div className="flex space-x-2">
              {!showAnalysis ? (
                <Button
                  onClick={generateAnalysis}
                  disabled={generatingAnalysis}
                  size="lg"
                  className="text-white shadow-lg hover:shadow-xl transition-all"
                  style={{background: 'linear-gradient(90deg, #3B82F6 0%, #1E40AF 100%)'}}
                >
                  {generatingAnalysis ? (
                    <>
                      <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Brain className="h-5 w-5 mr-2" />
                      Generate Analysis
                    </>
                  )}
                </Button>
              ) : (
                <Link href="/brief">
                  <Button
                    size="lg"
                    className="text-white shadow-lg hover:shadow-xl transition-all"
                    style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                  >
                    <Target className="h-5 w-5 mr-2" />
                    Create Strategic Brief
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {showAnalysis && analysisGenerated ? (
          /* Strategic Intelligence View with Tabs */
          <div className="space-y-8 mb-12">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-slate-900">Strategic Intelligence</h2>
              <Badge className="bg-green-100 text-green-800 text-sm font-medium">
                Analysis Complete
              </Badge>
            </div>

            {/* Analysis Tabs */}
            <div className="flex space-x-1 bg-slate-100 p-1 rounded-lg overflow-x-auto">
              {analysisTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveAnalysisTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                      activeAnalysisTab === tab.id
                        ? 'bg-white text-slate-900 shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Analysis Content */}
            <div className="min-h-[600px]">
              {renderAnalysisContent()}
            </div>

            {/* Call to Action */}
            <div className="text-center bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Ready to Create Your Strategic Brief?</h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                Transform these insights into actionable strategic imperatives for your positioning and messaging strategy.
              </p>
              <Link href="/brief">
                <Button
                  size="lg"
                  className="text-white shadow-lg hover:shadow-xl transition-all"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                >
                  <Target className="h-5 w-5 mr-2" />
                  Create Strategic Brief
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        ) : null}

        {/* Existing Analytics Dashboard */}
        <div className={showAnalysis ? "border-t border-slate-200 pt-8" : ""}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Survey Response Data</h2>
              <p className="text-slate-600">Raw responses and detailed stakeholder feedback</p>
            </div>
            {!showAnalysis && (
              <Button
                onClick={generateAnalysis}
                disabled={generatingAnalysis}
                className="text-white shadow-lg hover:shadow-xl transition-all"
                style={{background: 'linear-gradient(90deg, #3B82F6 0%, #1E40AF 100%)'}}
              >
                {generatingAnalysis ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Brain className="h-5 w-5 mr-2" />
                    Generate Analysis
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.total}</p>
                  <p className="text-sm text-slate-600">Total Responses</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{stats.avgCompletionTime}min</p>
                  <p className="text-sm text-slate-600">Avg. Completion</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">4.3/5</p>
                  <p className="text-sm text-slate-600">Avg. Rating</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">87%</p>
                  <p className="text-sm text-slate-600">Positive Sentiment</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search responses, questions, or answers..."
                  value={searchTerm}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                  className="pl-10 border-slate-200 focus:border-blue-500"
                />
              </div>
            </div>
            <select
              value={stakeholderFilter}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStakeholderFilter(e.target.value)}
              className="w-48 h-10 px-3 py-2 border border-slate-200 rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Stakeholders</option>
              {uniqueStakeholders.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Stakeholder Breakdown */}
          <Card className="p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" />
              Stakeholder Breakdown
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(stats.byStakeholder).map(([type, count]) => (
                <div key={type} className="text-center p-4 bg-slate-50 rounded-lg">
                  <div className="text-2xl font-bold text-slate-900">{count}</div>
                  <div className="text-sm text-slate-600 capitalize">{type}</div>
                  <div className="text-xs text-slate-500">
                    {Math.round((count / stats.total) * 100)}%
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Response List */}
          <Card className="overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Individual Responses ({filteredResponses.length})
              </h3>
            </div>
            <div className="divide-y divide-slate-200">
              {filteredResponses.map((response) => (
                <div key={response.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="border-blue-200 text-blue-700">
                        {response.stakeholderType}
                      </Badge>
                      <span className="text-sm text-slate-500">
                        Completed in {response.completionTime} minutes
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedResponse(response)}
                      className="border-slate-200"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                  <div className="text-sm text-slate-600">
                    {response.responses.length} questions answered
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Response Detail Modal */}
        {selectedResponse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      Response from {selectedResponse.stakeholderType}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Completed in {selectedResponse.completionTime} minutes
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedResponse(null)}
                    size="sm"
                  >
                    Close
                  </Button>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {selectedResponse.responses.map((resp: {
                  questionId: string;
                  question: string;
                  answer: string | string[] | number;
                  type: string;
                }, index: number) => (
                  <div key={index} className="border-l-4 border-blue-200 pl-4">
                    <h4 className="font-medium text-slate-900 mb-2">{resp.question}</h4>
                    <div className="text-slate-700">
                      {resp.type === 'multiple_choice' ? (
                        <div className="space-y-1">
                          {(resp.answer as string[]).map((choice, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span>{choice}</span>
                            </div>
                          ))}
                        </div>
                      ) : resp.type === 'rating' ? (
                        <div className="flex items-center space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= Number(resp.answer)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-slate-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-slate-600">
                            ({resp.answer}/5)
                          </span>
                        </div>
                      ) : (
                        <p>{resp.answer as string}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
