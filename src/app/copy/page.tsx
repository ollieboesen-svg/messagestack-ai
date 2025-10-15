"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  PenTool,
  ArrowLeft,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Target,
  MessageSquare,
  FileText,
  Share2,
  Settings,
  Zap
} from "lucide-react";
import Link from "next/link";

const copyTypes = [
  {
    id: "email",
    name: "Email Campaign",
    description: "Subject lines, headlines, and body copy optimized for email marketing",
    icon: MessageSquare,
    color: "#1DD1A1"
  },
  {
    id: "social",
    name: "Social Media",
    description: "Engaging posts for LinkedIn, Twitter, and other social platforms",
    icon: Share2,
    color: "#1BC4B2"
  },
  {
    id: "web",
    name: "Website Copy",
    description: "Headlines, CTAs, and page content that converts visitors",
    icon: FileText,
    color: "#1A8FD1"
  },
  {
    id: "ads",
    name: "Ad Copy",
    description: "Compelling ad copy for Google, Facebook, and other platforms",
    icon: Target,
    color: "#2563EB"
  }
];

const toneOptions = [
  "Professional", "Conversational", "Bold", "Friendly", "Authoritative", "Playful"
];

export default function CopyEngine() {
  const [selectedType, setSelectedType] = useState("email");
  const [selectedTone, setSelectedTone] = useState("Professional");
  const [prompt, setPrompt] = useState("");
  const [generatedCopy, setGeneratedCopy] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const sampleCopy = {
        email: `Subject: Transform Your Marketing Strategy in 30 Days

Dear [Name],

Your marketing strategy is the foundation of your business growth. But if you're like most leaders, you're struggling to create messaging that truly resonates with your audience.

Message Stack changes that. Our intelligent platform brings together research, strategy, and AI-powered copy creation to help you move from insight to market with unprecedented speed and clarity.

✓ 3x faster message development
✓ Higher audience resonance
✓ Consistent brand messaging

Ready to see the difference? Start your free trial today.

Best regards,
[Your Name]`,
        social: `🚀 Marketing leaders: Stop struggling with inconsistent messaging.

Message Stack's intelligent platform unites research, strategy, and AI-powered creation in one place.

The result? 3x faster development, higher resonance, and messaging that actually converts.

Ready to transform your approach? 👇

#Marketing #Strategy #AI #MessageStack`,
        web: `# Transform Your Marketing Strategy with AI-Powered Intelligence

## The Complete Platform for Positioning and Messaging

Stop wasting time on messaging that doesn't resonate. Message Stack brings together every element of the messaging process into one powerful platform.

### Why Marketing Leaders Choose Message Stack:

- **3x Faster Development** - Move from insight to market in days, not months
- **Higher Precision** - AI-powered insights ensure every message hits the mark
- **Complete Integration** - Research, strategy, and creation in one seamless workflow

**Ready to revolutionize your messaging?**

[Get Started Free] [Book a Demo]`,
        ads: `Headline: Stop Guessing. Start Converting.

Description: Message Stack's AI-powered platform helps marketing leaders create messaging that actually resonates. Join 500+ companies using our intelligent approach to move from insight to market 3x faster.

✓ Strategic messaging framework
✓ AI-assisted copy generation
✓ Proven ROI improvement

Start your free trial today - no credit card required.

[Try Message Stack Free]`
      };

      setGeneratedCopy(sampleCopy[selectedType as keyof typeof sampleCopy]);
      setIsGenerating(false);
    }, 2000);
  };

  const selectedTypeData = copyTypes.find(type => type.id === selectedType);

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
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)"}}>
                  <PenTool className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Copy Engine</h1>
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
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Turn strategy into <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}>powerful words</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              AI-assisted copy generation, tailored to channels and tones. Create compelling content that resonates with your audience.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Panel - Copy Type Selection */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-teal-600" />
                  Copy Type
                </h3>
                <div className="space-y-3">
                  {copyTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                          selectedType === type.id
                            ? 'border-teal-300 bg-teal-50 shadow-md'
                            : 'border-slate-200 hover:border-teal-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{backgroundColor: `${type.color}20`}}>
                            <Icon className="h-4 w-4" style={{color: type.color}} />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-slate-900">{type.name}</h4>
                            <p className="text-sm text-slate-600 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Tone Selection */}
              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-teal-600" />
                  Tone of Voice
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setSelectedTone(tone)}
                      className={`p-2 rounded-lg border text-sm transition-all duration-300 ${
                        selectedTone === tone
                          ? 'border-teal-300 bg-teal-50 text-teal-700'
                          : 'border-slate-200 hover:border-teal-200 text-slate-600'
                      }`}
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Panel - Copy Generation */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                    <PenTool className="h-5 w-5 mr-2" style={{color: selectedTypeData?.color}} />
                    {selectedTypeData?.name} Generator
                  </h3>
                  <Badge variant="secondary" className="text-xs px-3 py-1" style={{background: `${selectedTypeData?.color}20`, color: selectedTypeData?.color}}>
                    {selectedTone}
                  </Badge>
                </div>

                {/* Prompt Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Describe what you want to communicate:
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., Promote our new AI platform that helps marketing teams create better messaging faster..."
                    className="w-full h-24 p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full mb-6 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      Generate Copy
                    </>
                  )}
                </Button>

                {/* Generated Copy Output */}
                {generatedCopy && (
                  <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium text-slate-900">Generated Copy</h4>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(generatedCopy)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 font-mono bg-white p-4 rounded border">
                      {generatedCopy}
                    </pre>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
