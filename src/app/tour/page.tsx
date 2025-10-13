"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  Users,
  FileText,
  Grid3X3,
  Copy,
  BarChart3,
  MessageSquare,
  Target,
  Sparkles,
  CheckCircle,
  Eye,
  Settings
} from "lucide-react";
import Link from "next/link";
import { LogoCompact } from "@/components/Logo";

interface TourStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  features: string[];
  mockupImage?: string;
}

const tourSteps: TourStep[] = [
  {
    id: 'insight-hub',
    title: 'Insight Hub',
    description: 'Collect and synthesize stakeholder insights across different perspectives through comprehensive research and analysis.',
    icon: Users,
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    features: [
      'Multi-stakeholder surveys',
      'Smart question suggestions',
      'Automated response analysis',
      'Insight synthesis dashboard'
    ]
  },
  {
    id: 'strategic-brief',
    title: 'Strategic Brief',
    description: 'Transform research insights into actionable strategic positioning requirements and imperatives.',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    features: [
      'AI-powered insights synthesis',
      'Strategic framework templates',
      'Positioning requirements',
      'Collaborative editing'
    ]
  },
  {
    id: 'message-grid',
    title: 'Message Grid',
    description: 'Build your messaging framework with our visual grid for mapping audiences, value drivers, and proof points.',
    icon: Grid3X3,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    features: [
      'Visual framework builder',
      'Audience mapping tools',
      'Value proposition matrix',
      'Proof point organization'
    ]
  },
  {
    id: 'copy-engine',
    title: 'AI Copy Engine',
    description: 'Generate channel-optimized messaging and content using our AI-powered copy engine with strategic context.',
    icon: Copy,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    features: [
      'AI-powered content generation',
      'Channel optimization',
      'Brand voice consistency',
      'Multiple format outputs'
    ]
  }
];

export default function InteractiveTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const currentTourStep = tourSteps[currentStep];
  const progress = ((currentStep + 1) / tourSteps.length) * 100;

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setHasStarted(false);
  };

  const startTour = () => {
    setHasStarted(true);
    setIsPlaying(true);
  };

  if (!hasStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link href="/">
                <LogoCompact />
              </Link>
              <div className="flex items-center space-x-3">
                <Link href="/get-started">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Play className="h-12 w-12 text-purple-600" />
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-6">
              Interactive Platform Tour
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12">
              Explore MessageStack AI's powerful features through an interactive walkthrough.
              See how our 4-step process transforms your messaging strategy.
            </p>

            {/* Tour Preview */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {tourSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Card key={step.id} className={`p-6 ${step.bgColor} border-2`}>
                    <div className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${step.bgColor.replace('50', '100')} flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`h-6 w-6 ${step.color}`} />
                      </div>
                      <Badge className="mb-2">Step {index + 1}</Badge>
                      <h3 className="font-semibold text-slate-900 text-sm">{step.title}</h3>
                    </div>
                  </Card>
                );
              })}
            </div>

            <div className="space-y-4">
              <Button
                onClick={startTour}
                size="lg"
                className="text-white px-8 py-4 text-lg"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                <Play className="h-5 w-5 mr-2" />
                Start Interactive Tour
              </Button>

              <p className="text-sm text-slate-500">
                ⏱️ Takes about 5-10 minutes • 🖱️ Interactive elements • 📱 Works on all devices
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Tour Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LogoCompact />
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-lg font-bold text-slate-900">Interactive Tour</h1>
                <p className="text-sm text-slate-600">Step {currentStep + 1} of {tourSteps.length}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600">{Math.round(progress)}% complete</span>
                <div className="w-24 h-2 bg-slate-200 rounded-full">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'
                    }}
                  ></div>
                </div>
              </div>

              <Button onClick={handleRestart} variant="outline" size="sm">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">

          {/* Current Step Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Step Information */}
            <div>
              <Badge className={`mb-4 ${currentTourStep.bgColor} ${currentTourStep.color}`}>
                Step {currentStep + 1}: {currentTourStep.title}
              </Badge>

              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                {currentTourStep.title}
              </h2>

              <p className="text-lg text-slate-600 mb-8">
                {currentTourStep.description}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                <h3 className="font-semibold text-slate-900">Key Features:</h3>
                {currentTourStep.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-slate-700">
                    <CheckCircle className={`h-4 w-4 mr-3 ${currentTourStep.color}`} />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Interactive Elements */}
              <Card className="p-6 bg-gradient-to-r from-slate-50 to-white border-2 border-dashed">
                <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                  <Eye className="h-4 w-4 mr-2" />
                  Try it yourself:
                </h4>
                <p className="text-sm text-slate-600 mb-4">
                  {currentStep === 0 && "Click on sample survey questions to see how stakeholder input is collected and analyzed."}
                  {currentStep === 1 && "Explore how insights are automatically synthesized into strategic requirements."}
                  {currentStep === 2 && "Interact with the visual grid to map your messaging framework."}
                  {currentStep === 3 && "Generate sample content using our AI copy engine with different tones and channels."}
                </p>
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-teal-50">
                  <Settings className="h-4 w-4 mr-2" />
                  Interactive Demo
                </Button>
              </Card>
            </div>

            {/* Visual Mockup */}
            <div className="lg:order-2">
              <Card className="p-8 bg-white shadow-lg">
                <div className={`w-full h-96 ${currentTourStep.bgColor} rounded-lg flex items-center justify-center`}>
                  <div className="text-center">
                    {React.createElement(currentTourStep.icon, {
                      className: `h-24 w-24 ${currentTourStep.color} mx-auto mb-4`
                    })}
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{currentTourStep.title}</h3>
                    <p className="text-slate-600">Interactive mockup placeholder</p>
                    <div className="mt-6 space-y-2">
                      <div className="h-2 bg-slate-200 rounded w-3/4 mx-auto"></div>
                      <div className="h-2 bg-slate-200 rounded w-1/2 mx-auto"></div>
                      <div className="h-2 bg-slate-200 rounded w-2/3 mx-auto"></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>

            <div className="flex items-center space-x-4">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentStep ? 'bg-teal-500' :
                    index < currentStep ? 'bg-teal-300' : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>

            {currentStep === tourSteps.length - 1 ? (
              <div className="flex items-center space-x-3">
                <Link href="/get-started">
                  <Button
                    className="text-white"
                    style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                  >
                    Start Free Trial
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            ) : (
              <Button
                onClick={handleNext}
                className="text-white flex items-center space-x-2"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                <span>Next</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Tour Completion CTA */}
          {currentStep === tourSteps.length - 1 && (
            <Card className="mt-12 p-8 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  Ready to transform your messaging?
                </h3>
                <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                  You've seen how MessageStack AI can streamline your entire messaging process.
                  Start your free trial today and experience the platform hands-on.
                </p>
                <div className="flex items-center justify-center space-x-4">
                  <Link href="/get-started">
                    <Button size="lg" className="text-white" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}>
                      Start 7-Day Free Trial
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg">
                    Book a Demo
                  </Button>
                </div>
                <p className="text-sm text-slate-500 mt-4">
                  No credit card required • Full platform access • Cancel anytime
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
