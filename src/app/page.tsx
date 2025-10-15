"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  ArrowRight,
  Plus,
  Search,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
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
  Check,
  Play,
  X,
  Sparkles,
  Grid3X3,
  Target,
  Zap,
  CheckCircle,
  TrendingDown,
  RefreshCw,
  AlertTriangle
} from "lucide-react";
import Link from "next/link";
import { LogoCompact } from "@/components/Logo";

interface DemoVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  features: string[];
}

const demoVideos: DemoVideo[] = [
  {
    id: "insight-hub",
    title: "Insight Hub in Action",
    description: "See how to create multi-stakeholder surveys and collect positioning insights across different audiences.",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    features: ["Smart question suggestions", "Multi-stakeholder targeting", "Response analytics"]
  },
  {
    id: "strategic-brief",
    title: "Strategic Brief Creation",
    description: "Transform research insights into actionable strategic positioning requirements and imperatives.",
    duration: "3:15",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    features: ["Insight synthesis", "Strategic framework", "Positioning clarity"]
  },
  {
    id: "message-grid",
    title: "Message Grid Framework",
    description: "Build your messaging framework with our visual grid for mapping audiences, value drivers, and proof points.",
    duration: "2:45",
    thumbnail: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    features: ["Visual framework", "Audience mapping", "Message precision"]
  },
  {
    id: "copy-engine",
    title: "AI Copy Engine",
    description: "Generate channel-optimized messaging and content using our AI-powered copy engine with strategic context.",
    duration: "3:00",
    thumbnail: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    features: ["AI-powered generation", "Channel optimization", "Brand consistency"]
  }
];

export default function HomePage() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);

  const handleWatchDemo = (video: DemoVideo) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Compact Logo */}
            <Link href="/">
              <div className="flex items-center cursor-pointer group">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"
                  }}
                >
                  <Sparkles className="h-5 w-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
              <Link href="/get-started">
                <Button size="sm" className="text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>
                  Get started for free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 via-white to-teal-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-teal-100 text-teal-700 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Messaging Platform
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
              The <span className="bg-clip-text text-transparent animate-gradient-wave" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>intelligent platform</span> for positioning and messaging
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Faster, smarter messaging. Brings together every element of the messaging process in one powerful platform, combining strategic rigour with the speed and precision of AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/get-started">
                <Button size="lg" className="text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>
                  Get started for free
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" onClick={() => handleWatchDemo(demoVideos[0])}>
                <Play className="h-5 w-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Process Flow */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 text-sm text-slate-600 relative max-w-4xl mx-auto">
              {/* Connecting Bar - Hidden on mobile, visible on desktop */}
              <div className="hidden md:block absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-200 via-cyan-200 via-blue-200 to-blue-300">
                <div
                  className="h-full transition-all duration-2000 ease-out"
                  style={{
                    background: "linear-gradient(90deg, #1DD1A1 0%, #17A2B8 25%, #0E7DB8 50%, #1E6EEB 75%, #2563EB 100%)",
                    width: "100%",
                    animation: "progressFlow 3s ease-in-out infinite"
                  }}
                ></div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-4 md:space-y-0">
                <div className="flex flex-col items-center space-y-2 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white" style={{background: 'linear-gradient(135deg, #1DD1A1 0%, #1AAE8E 100%)'}}>
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700 text-center">Stakeholder insights</span>
                </div>

                <div className="flex flex-col items-center space-y-2 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white" style={{background: 'linear-gradient(135deg, #17A2B8 0%, #0E7DB8 100%)'}}>
                    <FileText className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700 text-center">Analysis and strategy</span>
                </div>

                <div className="flex flex-col items-center space-y-2 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white" style={{background: 'linear-gradient(135deg, #0E7DB8 0%, #1E6EEB 100%)'}}>
                    <Grid3X3 className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-slate-700 text-center">Message frameworks</span>
                </div>

                <div className="flex flex-col items-center space-y-2 relative z-10">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white" style={{background: 'linear-gradient(135deg, #1E6EEB 0%, #2563EB 100%)'}}>
                    <div className="flex flex-col space-y-0.5">
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <span className="font-medium text-slate-700 text-center">Copy and content</span>
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes progressFlow {
                0% { width: 0%; opacity: 0.7; }
                70% { width: 100%; opacity: 1; }
                100% { width: 100%; opacity: 0.9; }
              }
              @keyframes connectedVerticalFlow {
                0% { height: 0%; opacity: 0.7; }
                70% { height: 100%; opacity: 1; }
                100% { height: 100%; opacity: 0.9; }
              }

              @keyframes slideInUp {
                0% {
                  opacity: 0;
                  transform: translateY(2rem);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
              @keyframes slideDown {
                0% {
                  transform: translateY(-100%);
                  opacity: 0.8;
                }
                50% {
                  opacity: 1;
                }
                100% {
                  transform: translateY(calc(100vh - 8rem));
                  opacity: 0.8;
                }
              }
              .animate-slideInUp {
                animation: slideInUp 0.8s ease-out;
                opacity: 0;
                transform: translateY(2rem);
              }
              .animate-slideDown {
                animation: slideDown 4s ease-in-out infinite;
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">


            <h2 className="text-3xl font-bold text-white mb-4">A smarter way to shape your messaging</h2>
            <p className="text-slate-300 mb-8">

            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 rounded-full bg-teal-600 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Faster message development</h4>
                  <p className="text-slate-300">Accelerate your messaging process from months to weeks with an intelligent AI-powered platform.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">More efficient internal processes</h4>
                  <p className="text-slate-300">Streamline collaboration and eliminate repetitive tasks with integrated workflows.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 rounded-full bg-purple-600 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Increased precision and resonance</h4>
                  <p className="text-slate-300">Create messaging that resonates deeply with your target audiences through data-driven insights.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Greater brand consistency</h4>
                  <p className="text-slate-300">Maintain coherent messaging across all channels and touchpoints with strategic frameworks.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 rounded-full bg-orange-600 flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Lower overall messaging investment</h4>
                  <p className="text-slate-300">Reduce costs and resources required for messaging development with streamlined processes and automation.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-16 h-12 rounded-full bg-cyan-600 flex items-center justify-center">
                  <RefreshCw className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Continuous updates to support strategy</h4>
                  <p className="text-slate-300">Keep your messaging fresh and relevant with ongoing insights and iterative improvements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Messaging Journey */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 animate-slideInUp" style={{animationDelay: '0s', animationFillMode: 'both'}}>Your messaging journey</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-slideInUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                Collect stakeholder insights, craft a strategic brief, build message grids, and rapidly generate on-brand copy and content for any audience or channel.
              </p>
            </div>

            <div className="space-y-6 relative">
              {/* Connected Vertical Progress Line */}
              <div className="absolute left-2 top-4 bottom-4 w-1 bg-gradient-to-b from-teal-200 via-cyan-200 via-blue-200 to-blue-300">
                <div
                  className="w-full transition-all duration-2000 ease-out"
                  style={{
                    background: "linear-gradient(180deg, #1DD1A1 0%, #17A2B8 25%, #0E7DB8 50%, #1E6EEB 75%, #2563EB 100%)",
                    height: "100%",
                    animation: "connectedVerticalFlow 3s ease-in-out infinite"
                  }}
                ></div>
              </div>

              {/* Step 1: Insight Hub */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 animate-slideInUp relative overflow-hidden ml-4" style={{animationDelay: '0.1s', animationFillMode: 'both'}}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1AAE8E 100%)"}}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Insight Hub</h3>
                          <Badge className="bg-teal-100 text-teal-700">Step 1</Badge>
                        </div>
                        <Button
                          onClick={() => handleWatchDemo(demoVideos[0])}
                          size="sm"
                          variant="outline"
                          className="border-teal-200 text-teal-700 hover:bg-teal-50 bg-white"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                      <p className="text-slate-600 mb-2 text-sm">
                        Collect and synthesise stakeholder insights across different perspectives
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ All your insights in one place</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Multi-stakeholder surveys</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Strategic synthesis</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2: Strategic Brief */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 animate-slideInUp relative overflow-hidden ml-4" style={{animationDelay: '0.3s', animationFillMode: 'both'}}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #17A2B8 0%, #0E7DB8 100%)"}}>
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Strategic Brief</h3>
                          <Badge className="bg-teal-100 text-teal-700">Step 2</Badge>
                        </div>
                        <Button
                          onClick={() => handleWatchDemo(demoVideos[1])}
                          size="sm"
                          variant="outline"
                          className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                      <p className="text-slate-600 mb-2 text-sm">
                        Synthesize insights into positioning requirements and strategic imperatives
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Insights synthesis</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Strategic imperatives</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Positioning checklist</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3: Message Grid */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 animate-slideInUp relative overflow-hidden ml-4" style={{animationDelay: '0.5s', animationFillMode: 'both'}}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #0E7DB8 0%, #1E6EEB 100%)"}}>
                      <Grid3X3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Message Grid</h3>
                          <Badge className="bg-teal-100 text-teal-700">Step 3</Badge>
                        </div>
                        <Button
                          onClick={() => handleWatchDemo(demoVideos[2])}
                          size="sm"
                          variant="outline"
                          className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                      <p className="text-slate-600 mb-2 text-sm">
                        Visual framework for mapping audiences, value drivers, and proof points
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Map your messaging with strategic precision</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Multi-column framework</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Strategic positioning</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 4: Copy Engine */}
              <Card className="p-4 hover:shadow-lg transition-all duration-300 animate-slideInUp relative overflow-hidden ml-4" style={{animationDelay: '0.7s', animationFillMode: 'both'}}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #1E6EEB 0%, #2563EB 100%)"}}>
                      <div className="flex flex-col space-y-1">
                        <div className="w-5 h-0.5 bg-white rounded-full"></div>
                        <div className="w-5 h-0.5 bg-white rounded-full"></div>
                        <div className="w-5 h-0.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Copy Engine</h3>
                          <Badge className="bg-teal-100 text-teal-700">Step 4</Badge>
                        </div>
                        <Button
                          onClick={() => handleWatchDemo(demoVideos[3])}
                          size="sm"
                          variant="outline"
                          className="border-teal-200 text-teal-700 hover:bg-teal-50"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Demo
                        </Button>
                      </div>
                      <p className="text-slate-600 mb-2 text-sm">
                        AI-assisted copy generation tailored to channels and tones
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Turn strategy into powerful words</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ AI-assisted generation</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Channel optimization</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Why choose <span className="bg-clip-text text-transparent animate-gradient-wave" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>MessageStack</span>?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                See how our intelligent platform compares to traditional messaging approaches.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-slate-200 rounded-xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <th className="text-left p-4 text-slate-700 font-semibold border-r border-slate-200">Capability</th>
                    <th className="text-center p-4 border-r border-slate-200">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}>
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm">Message Stack</span>
                      </div>
                    </th>
                    <th className="text-center p-4">
                      <div className="flex flex-col items-center space-y-1">
                        <div className="w-8 h-8 rounded-lg bg-slate-400 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-bold text-slate-900 text-sm">Traditional</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-slate-500" />
                        <span>Time to Market</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">2-4 weeks</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 font-semibold text-sm">3-6 months</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <span>Stakeholder Input</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">Systematic</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-orange-700 font-semibold text-sm">Ad-hoc</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-slate-500" />
                        <span>Strategic Alignment</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">Built-in</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 font-semibold text-sm">Variable</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <MessageSquare className="h-4 w-4 text-slate-500" />
                        <span>Content Generation</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">AI-Assisted</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 font-semibold text-sm">Manual</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <BarChart3 className="h-4 w-4 text-slate-500" />
                        <span>Analytics & Insights</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">Real-time</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <AlertTriangle className="h-4 w-4 text-orange-600" />
                        <span className="text-orange-700 font-semibold text-sm">Manual</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <RefreshCw className="h-4 w-4 text-slate-500" />
                        <span>Iteration Speed</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">Instant</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 font-semibold text-sm">Weeks</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-medium text-slate-900 border-r border-slate-200 text-sm">
                      <div className="flex items-center space-x-2">
                        <TrendingDown className="h-4 w-4 text-slate-500" />
                        <span>Total Investment</span>
                      </div>
                    </td>
                    <td className="p-3 text-center border-r border-slate-200">
                      <div className="flex items-center justify-center space-x-1.5">
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 font-semibold text-sm">60-80% Less</span>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <X className="h-4 w-4 text-red-600" />
                        <span className="text-red-700 font-semibold text-sm">High Cost</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="text-center mt-8">
              <Link href="/get-started">
                <Button size="lg" className="text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>
                  Experience the Difference
                  <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </Link>
              <p className="text-sm text-slate-500 mt-3">Start your free trial today • No credit card required</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
            <p className="text-xl text-teal-100 mb-8">
              Unite research, strategy, and AI-powered creation in one intelligent platform
            </p>
            <Link href="/get-started">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white hover:shadow-xl text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                Get started for free
                <ArrowRight className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedVideo.title}</h3>
                <p className="text-slate-600">{selectedVideo.description}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowVideoModal(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="aspect-video bg-slate-100 flex items-center justify-center">
              {/* Placeholder video player */}
              <div className="text-center">
                <Play className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                <p className="text-slate-600 mb-2">Demo Video Coming Soon</p>
                <p className="text-sm text-slate-500">Duration: {selectedVideo.duration}</p>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-semibold text-slate-900 mb-3">Key Features:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-teal-50 text-teal-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="mt-6 flex space-x-3">
                <Link href="/get-started">
                  <Button className="text-white hover:scale-105 transition-all duration-300" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>
                    Get Started Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" onClick={() => setShowVideoModal(false)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
