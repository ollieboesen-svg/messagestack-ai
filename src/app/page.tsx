"use client";

import React, { useState, useEffect, useRef } from "react";
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
    id: "research-collection",
    title: "Research Collection in Action",
    description: "See how to create multi-stakeholder surveys and collect research insights across different audiences.",
    duration: "2:30",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    features: ["Smart question suggestions", "Multi-stakeholder targeting", "Research collection"]
  },
  {
    id: "analytics-strategy",
    title: "Analytics & Strategy",
    description: "Start with analytics to analyze your research, then move to strategy to generate imperatives and create your positioning brief.",
    duration: "3:15",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder
    features: ["Analytics first", "Then strategy", "Finally brief generation"]
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

const benefits = [
  {
    id: 0,
    title: "Rapid time to market",
    description: "Complete messaging in 2-4 weeks vs 3-6 months with traditional approaches.",
    icon: Clock,
    gradient: "teal", // Matches Research collection
    color: "#1DD1A1"
  },
  {
    id: 1,
    title: "Dramatically lower cost",
    description: "60-80% less investment than traditional consulting and agency fees.",
    icon: TrendingDown,
    gradient: "cyan", // Matches Analytics
    color: "#17A2B8"
  },
  {
    id: 2,
    title: "AI-powered workflow",
    description: "Automate from research insights to final copy in one connected platform.",
    icon: Zap,
    gradient: "light-blue", // Matches Message frameworks
    color: "#0E7DB8"
  },
  {
    id: 3,
    title: "Systematic input collection",
    description: "Built-in stakeholder research replaces ad-hoc feedback loops.",
    icon: Users,
    gradient: "blue", // Matches Copy and content
    color: "#2563EB"
  },
  {
    id: 4,
    title: "Strategic alignment built-in",
    description: "Evidence-based positioning drives every messaging decision.",
    icon: Target,
    gradient: "teal", // Cycle back to teal
    color: "#1DD1A1"
  },
  {
    id: 5,
    title: "Instant iteration",
    description: "Real-time updates and changes vs weeks-long revision cycles.",
    icon: RefreshCw,
    gradient: "cyan", // Cycle back to cyan
    color: "#17A2B8"
  }
];

export default function HomePage() {
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<DemoVideo | null>(null);
  const [hoveredBenefit, setHoveredBenefit] = useState(0);
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const handleWatchDemo = (video: DemoVideo) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  // Scroll animation logic
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Benefits entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBenefitsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (benefitsRef.current) {
      observer.observe(benefitsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate benefits every 5 seconds
  useEffect(() => {
    if (isUserHovering) return;

    const interval = setInterval(() => {
      setHoveredBenefit((prev) => (prev + 1) % benefits.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isUserHovering]);

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
              <Link href="/dashboard/client">
                <Button size="sm" className="text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>
                  Try Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-teal-100 text-teal-700 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Messaging Platform
            </Badge>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-slate-800">
              The <span className="bg-clip-text text-transparent animate-gradient-wave" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>intelligent platform</span> for strategic positioning and messaging
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              MessageStack brings together the complete positioning and messaging process in one powerful platform, combining strategic rigour with the speed and precision of AI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/dashboard/client">
                <Button size="lg" className="text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-translate-y-1" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}>
                  Try Live Demo
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
                <div className="flex flex-col items-center space-y-2 relative z-10 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{background: 'linear-gradient(135deg, #1DD1A1 0%, #1AAE8E 100%)'}}>
                    <Users className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-slate-700 text-center transition-colors duration-300 group-hover:text-teal-600">Research and insights</span>
                </div>

                <div className="flex flex-col items-center space-y-2 relative z-10 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{background: 'linear-gradient(135deg, #17A2B8 0%, #0E7DB8 100%)'}}>
                    <FileText className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-slate-700 text-center transition-colors duration-300 group-hover:text-cyan-600">Analytics and strategy</span>
                </div>

                <div className="flex flex-col items-center space-y-2 relative z-10 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{background: 'linear-gradient(135deg, #0E7DB8 0%, #1E6EEB 100%)'}}>
                    <Grid3X3 className="h-4 w-4 text-white transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <span className="font-medium text-slate-700 text-center transition-colors duration-300 group-hover:text-blue-500">Message frameworks</span>
                </div>

                <div className="flex flex-col items-center space-y-2 relative z-10 group cursor-pointer">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-sm border-2 border-white transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg" style={{background: 'linear-gradient(135deg, #1E6EEB 0%, #2563EB 100%)'}}>
                    <div className="flex flex-col space-y-0.5 transition-transform duration-300 group-hover:scale-110">
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                      <div className="w-3 h-0.5 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <span className="font-medium text-slate-700 text-center transition-colors duration-300 group-hover:text-blue-600">Copy and content</span>
                </div>
              </div>
            </div>

            <style jsx>{`
              :root {
                --gradient-0: #14B8A6;
                --gradient-1: #3B82F6;
                --gradient-2: #A855F7;
                --gradient-3: #22C55E;
                --gradient-4: #F97316;
                --gradient-5: #06B6D4;
              }

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
              @keyframes slideInFromLeft {
                0% {
                  opacity: 0;
                  transform: translateX(-3rem);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0);
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

              /* Scroll-triggered animations */
              .scroll-animate {
                opacity: 0;
                transform: translateY(2rem) scale(0.95);
                transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
                transition-delay: var(--animation-delay, 0s);
              }

              .scroll-animate.animate-in {
                opacity: 1;
                transform: translateY(0) scale(1);
              }

              /* Icon animation on scroll */
              .scroll-animate .benefit-icon {
                transform: scale(0.8);
                opacity: 0.5;
                transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                transition-delay: calc(var(--animation-delay, 0s) + 0.2s);
              }

              .scroll-animate.animate-in .benefit-icon {
                transform: scale(1);
                opacity: 1;
              }

              /* Text content animation on scroll */
              .scroll-animate .benefit-text {
                opacity: 0;
                transform: translateX(-1rem);
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                transition-delay: calc(var(--animation-delay, 0s) + 0.3s);
              }

              .scroll-animate.animate-in .benefit-text {
                opacity: 1;
                transform: translateX(0);
              }

              /* Benefit hover animations */
              @keyframes fadeInRight {
                from {
                  opacity: 0;
                  transform: translateX(2rem);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              /* Progress dot animation */
              @keyframes progressFill {
                from {
                  transform: scaleX(0);
                }
                to {
                  transform: scaleX(1);
                }
              }
            `}</style>
          </div>
        </div>
      </section>

      {/* Benefits with Stats - Interactive Hover */}
      <section ref={benefitsRef} className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className={`max-w-6xl mx-auto transition-all duration-700 ${
            benefitsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Faster, smarter, more strategic messaging</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Column 1: Benefits 1-3 */}
              <div
                className="space-y-1 md:space-y-0.5"
                onMouseEnter={() => setIsUserHovering(true)}
                onMouseLeave={() => setIsUserHovering(false)}
              >
                {benefits.slice(0, 3).map((benefit) => {
                  const isActive = hoveredBenefit === benefit.id;
                  const color = benefit.color;

                  return (
                    <button
                      key={benefit.id}
                      onClick={() => {
                        setHoveredBenefit(benefit.id);
                        setIsUserHovering(true);
                      }}
                      onMouseEnter={() => setHoveredBenefit(benefit.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 group border-l-4 ${
                        isActive ? 'bg-white shadow-lg scale-[1.02]' : 'bg-transparent hover:bg-slate-50'
                      }`}
                      style={{
                        borderLeftColor: isActive ? color : 'transparent'
                      }}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isActive ? 'scale-110 shadow-lg' : ''
                          }`}
                          style={{
                            background: isActive ? color : '#f1f5f9'
                          }}
                        >
                          <benefit.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'} transition-colors`} />
                        </div>
                        <span className={`text-sm font-semibold transition-colors leading-tight ${
                          isActive ? 'text-slate-900' : 'text-slate-700'
                        }`}>
                          {benefit.title}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Column 2: Benefits 4-6 */}
              <div
                className="space-y-1 md:space-y-0.5"
                onMouseEnter={() => setIsUserHovering(true)}
                onMouseLeave={() => setIsUserHovering(false)}
              >
                {benefits.slice(3, 6).map((benefit) => {
                  const isActive = hoveredBenefit === benefit.id;
                  const color = benefit.color;

                  return (
                    <button
                      key={benefit.id}
                      onClick={() => {
                        setHoveredBenefit(benefit.id);
                        setIsUserHovering(true);
                      }}
                      onMouseEnter={() => setHoveredBenefit(benefit.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg transition-all duration-300 group border-l-4 ${
                        isActive ? 'bg-white shadow-lg scale-[1.02]' : 'bg-transparent hover:bg-slate-50'
                      }`}
                      style={{
                        borderLeftColor: isActive ? color : 'transparent'
                      }}
                    >
                      <div className="flex items-center space-x-2.5">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isActive ? 'scale-110 shadow-lg' : ''
                          }`}
                          style={{
                            background: isActive ? color : '#f1f5f9'
                          }}
                        >
                          <benefit.icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'} transition-colors`} />
                        </div>
                        <span className={`text-sm font-semibold transition-colors leading-tight ${
                          isActive ? 'text-slate-900' : 'text-slate-700'
                        }`}>
                          {benefit.title}
                        </span>
                      </div>
                    </button>
                  );
                })}

                {/* Benefit Counter */}
                <div className="pt-5 mt-4 border-t border-slate-200">
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-600 mb-2">
                    <span className="font-semibold text-slate-900">{hoveredBenefit + 1}</span>
                    <span>/</span>
                    <span>{benefits.length}</span>
                  </div>
                  <div className="flex space-x-1.5 justify-center">
                    {benefits.map((_, idx) => (
                      <div
                        key={idx}
                        className={`relative h-1 rounded-full transition-all duration-300 ${
                          idx === hoveredBenefit ? 'w-6' : 'w-1'
                        }`}
                      >
                        {/* Background */}
                        <div className={`absolute inset-0 rounded-full ${
                          idx === hoveredBenefit ? 'bg-teal-200' : 'bg-slate-300'
                        }`} />
                        {/* Progress fill */}
                        {idx === hoveredBenefit && (
                          <div
                            key={`progress-${hoveredBenefit}`}
                            className="absolute inset-0 rounded-full bg-teal-500 shadow-md origin-left"
                            style={{
                              animation: isUserHovering ? 'none' : 'progressFill 5s linear',
                            }}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile: Benefit Description - Shows below the list on mobile only */}
              <div className="md:hidden mt-6">
                {benefits.map((benefit) => {
                  const gradientMap: Record<string, string> = {
                    'teal': 'linear-gradient(135deg, #1DD1A1, #1AAE8E)',
                    'cyan': 'linear-gradient(135deg, #17A2B8, #0E7DB8)',
                    'light-blue': 'linear-gradient(135deg, #0E7DB8, #1E6EEB)',
                    'blue': 'linear-gradient(135deg, #1E6EEB, #2563EB)'
                  };
                  const gradient = gradientMap[benefit.gradient] || gradientMap['teal'];

                  return (
                    <div
                      key={benefit.id}
                      className={`transition-all duration-500 ${
                        hoveredBenefit === benefit.id
                          ? 'opacity-100 block'
                          : 'opacity-0 hidden'
                      }`}
                    >
                      <Card
                        className="p-5 border-0 text-white overflow-hidden relative shadow-2xl rounded-2xl"
                        style={{ background: gradient }}
                      >
                        <div className="relative z-10">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                              <benefit.icon className="h-5 w-5 text-white drop-shadow" />
                            </div>
                            <h3 className="text-base font-bold drop-shadow-md">{benefit.title}</h3>
                          </div>
                          <p className="text-sm leading-relaxed text-white/95 drop-shadow-sm">
                            {benefit.description}
                          </p>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-12 -mb-12" />
                      </Card>
                    </div>
                  );
                })}
              </div>

              {/* Column 3: Expanded Content - Hidden on mobile, shown on tablet+ */}
              <div className="hidden md:block relative min-h-[200px]">
                  {benefits.map((benefit) => {
                    const gradientMap: Record<string, string> = {
                      'teal': 'linear-gradient(135deg, #1DD1A1, #1AAE8E)',
                      'cyan': 'linear-gradient(135deg, #17A2B8, #0E7DB8)',
                      'light-blue': 'linear-gradient(135deg, #0E7DB8, #1E6EEB)',
                      'blue': 'linear-gradient(135deg, #1E6EEB, #2563EB)'
                    };
                    const gradient = gradientMap[benefit.gradient] || gradientMap['teal'];

                    return (
                      <div
                        key={benefit.id}
                        className={`absolute inset-0 transition-all duration-500 ${
                          hoveredBenefit === benefit.id
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-8 pointer-events-none'
                        }`}
                      >
                        <Card
                          className="p-6 border-0 text-white overflow-hidden relative shadow-2xl rounded-2xl"
                          style={{ background: gradient }}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                                <benefit.icon className="h-5 w-5 text-white drop-shadow" />
                              </div>
                              <h3 className="text-lg font-bold drop-shadow-md">{benefit.title}</h3>
                            </div>
                            <p className="text-sm leading-relaxed text-white/95 drop-shadow-sm">
                              {benefit.description}
                            </p>
                          </div>
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl -ml-12 -mb-12" />
                        </Card>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your Messaging Journey */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-4 animate-slideInUp" style={{animationDelay: '0s', animationFillMode: 'both'}}>Your messaging journey</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto animate-slideInUp" style={{animationDelay: '0.2s', animationFillMode: 'both'}}>
                Collect research, analyze insights to generate strategic imperatives, build message grids, and rapidly generate on-brand copy and content for any audience or channel.
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

              {/* Step 1: Research and Insights */}
              <Card className="p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ml-4 scroll-animate" style={{'--animation-delay': '0s'} as React.CSSProperties}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center benefit-icon" style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1AAE8E 100%)"}}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 benefit-text">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900 md:font-bold">Research and Insights</h3>
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
                        Collect stakeholder insights and research across different perspectives and audiences
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Multi-stakeholder surveys</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Insight collection</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Research gathering</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 2: Analytics and Strategy */}
              <Card className="p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ml-4 scroll-animate" style={{'--animation-delay': '0.1s'} as React.CSSProperties}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center benefit-icon" style={{background: "linear-gradient(135deg, #17A2B8 0%, #0E7DB8 100%)"}}>
                      <FileText className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 benefit-text">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Analytics and Strategy</h3>
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
                        Analyze your research to generate strategic recommendations, then create tactical positioning decisions
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Strategic recommendations</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Positioning decisions</Badge>
                        <Badge variant="secondary" className="bg-teal-50 text-teal-700 text-xs">✓ Evidence-backed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Step 3: Message Frameworks */}
              <Card className="p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ml-4 scroll-animate" style={{'--animation-delay': '0.2s'} as React.CSSProperties}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center benefit-icon" style={{background: "linear-gradient(135deg, #0E7DB8 0%, #1E6EEB 100%)"}}>
                      <Grid3X3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 benefit-text">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Message Frameworks</h3>
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
                        Visual frameworks for mapping audiences, value drivers, and proof points
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

              {/* Step 4: Copy and Content */}
              <Card className="p-4 hover:shadow-lg transition-shadow duration-300 relative overflow-hidden ml-4 scroll-animate" style={{'--animation-delay': '0.3s'} as React.CSSProperties}>
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center benefit-icon" style={{background: "linear-gradient(135deg, #1E6EEB 0%, #2563EB 100%)"}}>
                      <div className="flex flex-col space-y-1">
                        <div className="w-5 h-0.5 bg-white rounded-full"></div>
                        <div className="w-5 h-0.5 bg-white rounded-full"></div>
                        <div className="w-5 h-0.5 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex-1 benefit-text">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <h3 className="text-xl font-bold text-slate-900">Copy and Content</h3>
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-blue-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to get started?</h2>
            <p className="text-xl text-teal-100 mb-8">
              Unite research, strategy, and AI-powered creation in one intelligent platform
            </p>
            <Link href="/dashboard/client">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-white hover:shadow-xl text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                Try Live Demo
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
