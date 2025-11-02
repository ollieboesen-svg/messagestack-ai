"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Download,
  Copy,
  Save,
  Star,
  Trash2,
  Edit3,
  RefreshCw,
  ArrowLeft,
  FileText,
  MessageSquare,
  Users,
  Target,
  Zap,
  BookOpen,
  Heart,
  Plus
} from "lucide-react";
import Link from "next/link";

interface CopyItem {
  id: string;
  title: string;
  content: string;
  channel: string;
  tone: string;
  audience: string;
  timestamp: Date;
  isFavorite: boolean;
}

interface Variation {
  id: string;
  content: string;
  rating?: number;
}

const channels = [
  { value: "email", label: "Email", icon: "📧" },
  { value: "social-linkedin", label: "LinkedIn Post", icon: "💼" },
  { value: "social-twitter", label: "Twitter/X", icon: "🐦" },
  { value: "website", label: "Website Copy", icon: "🌐" },
  { value: "blog", label: "Blog Post", icon: "📝" },
  { value: "ad", label: "Advertisement", icon: "📢" },
  { value: "press-release", label: "Press Release", icon: "📰" },
  { value: "video-script", label: "Video Script", icon: "🎥" },
  { value: "other", label: "Other", icon: "✨" }
];

const tones = [
  "Professional",
  "Conversational",
  "Enthusiastic",
  "Educational",
  "Persuasive",
  "Empathetic",
  "Bold",
  "Authoritative"
];

const audiences = [
  { value: "executives", label: "C-Suite Executives" },
  { value: "marketing", label: "Marketing Teams" },
  { value: "sales", label: "Sales Teams" },
  { value: "product", label: "Product Managers" },
  { value: "developers", label: "Developers" },
  { value: "customers", label: "End Customers" }
];

const lengths = [
  { value: "short", label: "Short (50-100 words)" },
  { value: "medium", label: "Medium (100-250 words)" },
  { value: "long", label: "Long (250-500 words)" },
  { value: "custom", label: "Custom length" }
];

// Audience-specific key messages
const keyMessagesByAudience: { [key: string]: string[] } = {
  executives: [
    "Speed to market - 2-4 weeks vs 3-6 months",
    "60-80% cost reduction vs traditional consulting",
    "Strategic speed without sacrificing quality",
    "Enterprise-grade messaging at scale",
    "ROI-driven positioning framework"
  ],
  marketing: [
    "Complete research-to-copy workflow in one platform",
    "AI-powered content generation from strategic frameworks",
    "Save 15+ hours per week on content creation",
    "Consistent, on-brand messaging at scale",
    "Multi-channel optimization built-in"
  ],
  sales: [
    "Battle-tested sales narratives backed by research",
    "42% improvement in discovery call conversion rates",
    "Research-backed messaging that resonates with buyers",
    "Consistent value proposition across all touchpoints",
    "Faster deal cycles with aligned messaging"
  ],
  product: [
    "Evidence-based positioning from real customer insights",
    "Multi-stakeholder research drives every decision",
    "87% improvement in message-market fit",
    "Launch positioning 75% faster",
    "Data-driven go-to-market strategy"
  ],
  developers: [
    "API-first platform for integration flexibility",
    "Built for technical teams who value efficiency",
    "Automated workflows reduce manual effort by 80%",
    "Open architecture, no vendor lock-in",
    "Scale messaging without scaling headcount"
  ],
  customers: [
    "Get strategic messaging without agency costs",
    "Launch faster with AI-powered guidance",
    "Professional results in days, not months",
    "All-in-one platform replaces 5+ tools",
    "Strategic rigor meets AI speed"
  ]
};

export default function CopyEnginePage() {
  const [selectedChannel, setSelectedChannel] = useState("");
  const [selectedTone, setSelectedTone] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("");
  const [selectedLength, setSelectedLength] = useState("");
  const [selectedKeyMessages, setSelectedKeyMessages] = useState<string[]>([]);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedCopy, setGeneratedCopy] = useState("");
  const [variations, setVariations] = useState<Variation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copyLibrary, setCopyLibrary] = useState<CopyItem[]>([
    {
      id: "1",
      title: "Product Launch Email",
      content: "Introducing MessageStack: The intelligent platform that transforms your messaging process...",
      channel: "email",
      tone: "Professional",
      audience: "executives",
      timestamp: new Date(Date.now() - 86400000),
      isFavorite: true
    },
    {
      id: "2",
      title: "LinkedIn Announcement",
      content: "🚀 Excited to share how MessageStack is revolutionizing strategic messaging...",
      channel: "social-linkedin",
      tone: "Enthusiastic",
      audience: "marketing",
      timestamp: new Date(Date.now() - 172800000),
      isFavorite: false
    }
  ]);
  const [showLibrary, setShowLibrary] = useState(false);

  // Get key messages for selected audience
  const availableKeyMessages = selectedAudience
    ? keyMessagesByAudience[selectedAudience] || []
    : [];

  // Reset selected messages when audience changes
  React.useEffect(() => {
    setSelectedKeyMessages([]);
  }, [selectedAudience]);

  const toggleKeyMessage = (message: string) => {
    if (selectedKeyMessages.includes(message)) {
      setSelectedKeyMessages(selectedKeyMessages.filter(m => m !== message));
    } else {
      setSelectedKeyMessages([...selectedKeyMessages, message]);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const audienceLabel = audiences.find(a => a.value === selectedAudience)?.label || "teams";
    const channelData = channels.find(c => c.value === selectedChannel);

    // Generate copy based on channel type
    let copy = "";

    if (selectedChannel === "email") {
      const subject = selectedTone === "Enthusiastic"
        ? "🚀 Transform Your Messaging in Weeks, Not Months"
        : "Strategic Messaging Made Simple";

      copy = `Subject: ${subject}

Hi there,

${customPrompt || `We understand that ${audienceLabel.toLowerCase()} face unique challenges in today's fast-paced market.`}

${selectedKeyMessages.length > 0
  ? `Here's what makes MessageStack different:\n\n${selectedKeyMessages.map(msg => `• ${msg}`).join('\n')}\n`
  : 'MessageStack combines strategic rigor with AI-powered speed to help you launch messaging in 2-4 weeks instead of 3-6 months.\n'}

${selectedTone === "Persuasive"
  ? "Don't let slow messaging cycles hold you back. Join leading teams who are already shipping strategic messaging 75% faster."
  : selectedTone === "Professional"
  ? "We'd be happy to discuss how MessageStack can support your strategic objectives."
  : "Ready to see how fast strategic messaging can be?"}

${selectedTone === "Conversational" ? "Let's chat!" : "Book a demo"}

Best regards,
The MessageStack Team`;

    } else if (selectedChannel === "social-linkedin") {
      copy = `${selectedTone === "Enthusiastic" ? "🎯 " : ""}${customPrompt || `For ${audienceLabel.toLowerCase()}: Time to rethink strategic messaging.`}

${selectedKeyMessages.length > 0
  ? selectedKeyMessages.slice(0, 3).map(msg => `✓ ${msg}`).join('\n')
  : '✓ 2-4 weeks vs 3-6 months\n✓ 60-80% cost reduction\n✓ AI-powered workflow'}

${selectedTone === "Bold"
  ? "The old way is broken. It's time for a better approach."
  : "Discover how leading teams are transforming their messaging process."}

Learn more: messagestack.ai

#Strategy #Marketing #AI`;

    } else if (selectedChannel === "social-twitter") {
      copy = `${customPrompt || `${audienceLabel} need messaging that moves at the speed of business.`}

MessageStack: ${selectedKeyMessages[0] || "Strategic messaging in weeks, not months"}

${selectedTone === "Enthusiastic" ? "🚀" : "→"} messagestack.ai`;

    } else if (selectedChannel === "website") {
      copy = `# ${customPrompt || "Strategic Messaging, Accelerated"}

${selectedTone === "Professional"
  ? `MessageStack is the intelligent platform for ${audienceLabel.toLowerCase()} who need to develop strategic positioning and messaging quickly without sacrificing quality.`
  : `Transform how you create strategic messaging. MessageStack brings together research, analytics, strategy, and AI-powered copy generation in one powerful platform.`}

## Why ${audienceLabel} Choose MessageStack

${selectedKeyMessages.length > 0
  ? selectedKeyMessages.map(msg => `- **${msg.split('-')[0].trim()}**: ${msg.split('-')[1]?.trim() || msg}`).join('\n')
  : '- **Speed**: Complete messaging in 2-4 weeks vs 3-6 months\n- **Cost**: 60-80% reduction vs traditional consulting\n- **Quality**: AI-powered strategic rigor'}

## Get Started Today

${selectedTone === "Persuasive"
  ? "Don't let traditional timelines slow you down. Join the teams already shipping strategic messaging 75% faster."
  : "Ready to accelerate your messaging process? Book a demo to see MessageStack in action."}`;

    } else if (selectedChannel === "blog") {
      copy = `# ${customPrompt || `How ${audienceLabel} Can Launch Strategic Messaging in Weeks, Not Months`}

${selectedTone === "Educational"
  ? "Traditional messaging development takes 3-6 months and costs tens of thousands of dollars. But it doesn't have to be this way."
  : "The messaging landscape has changed. Here's how forward-thinking teams are adapting."}

## The Old Way vs. The New Way

Traditional consulting and agency models are built for a different era. ${audienceLabel} today need:

${selectedKeyMessages.length > 0
  ? selectedKeyMessages.map((msg, i) => `${i + 1}. ${msg}`).join('\n')
  : '1. Speed to market - 2-4 weeks vs 3-6 months\n2. Cost efficiency - 60-80% reduction\n3. Strategic rigor combined with AI speed'}

## Why MessageStack Works

MessageStack brings together the complete positioning and messaging workflow in one platform. From multi-stakeholder research to AI-powered copy generation, everything you need is integrated and optimized for speed.

${selectedTone === "Authoritative"
  ? "Our methodology combines proven strategic frameworks with cutting-edge AI to deliver results that traditional approaches simply can't match."
  : "The result? Strategic messaging that's faster, more affordable, and just as rigorous as traditional consulting."}

## Ready to Get Started?

${customPrompt || `See how ${audienceLabel.toLowerCase()} are transforming their messaging process with MessageStack.`}`;

    } else if (selectedChannel === "ad") {
      copy = `${customPrompt || `${audienceLabel}: Stop Waiting Months for Strategic Messaging`}

${selectedKeyMessages[0] || "Launch strategic messaging in 2-4 weeks, not 3-6 months"}

${selectedTone === "Bold"
  ? "Break free from slow agency timelines."
  : "AI-powered platform. Strategic rigor. Rapid results."}

→ Start Free Trial | Book Demo`;

    } else if (selectedChannel === "press-release") {
      const today = new Date();
      const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      copy = `FOR IMMEDIATE RELEASE

${formattedDate}

${customPrompt || `MessageStack Launches AI-Powered Platform to Transform Strategic Messaging for ${audienceLabel}`}

Revolutionary platform reduces messaging development time by 75% while maintaining strategic rigor

[CITY, STATE] – MessageStack today announced the launch of its intelligent platform that transforms how organizations develop strategic positioning and messaging. ${selectedTone === "Bold"
  ? "The platform challenges traditional consulting models by combining AI-powered automation with rigorous strategic methodology."
  : "The platform addresses growing demand for faster, more affordable strategic messaging development."}

${customPrompt || `Designed specifically for ${audienceLabel.toLowerCase()}, MessageStack integrates the complete positioning and messaging workflow – from multi-stakeholder research to AI-powered copy generation – in a single platform.`}

Key capabilities include:

${selectedKeyMessages.length > 0
  ? selectedKeyMessages.map(msg => `• ${msg}`).join('\n')
  : '• Complete messaging development in 2-4 weeks vs 3-6 months\n• 60-80% cost reduction compared to traditional consulting\n• Evidence-based positioning driven by systematic research\n• AI-powered content generation from strategic frameworks'}

${selectedTone === "Authoritative"
  ? '"Traditional messaging development timelines are no longer viable in today\'s fast-paced market," said [Spokesperson Name], [Title] at MessageStack. "Our platform delivers the strategic rigor of top-tier consulting with the speed and efficiency that modern teams demand."'
  : '"We built MessageStack to solve a problem we experienced firsthand," said [Spokesperson Name], [Title]. "Teams need strategic messaging that\'s both fast and rigorous. Our platform delivers both."'}

Early adopters report significant improvements in time-to-market, cost efficiency, and messaging effectiveness.

About MessageStack
MessageStack is an AI-powered platform that transforms strategic positioning and messaging development. By combining rigorous strategic methodology with artificial intelligence, MessageStack enables teams to develop enterprise-grade messaging in weeks instead of months, at a fraction of traditional consulting costs.

For more information, visit messagestack.ai or contact:
[Contact Name]
[Email]
[Phone]

###`;

    } else if (selectedChannel === "video-script") {
      copy = `VIDEO SCRIPT: ${customPrompt || `MessageStack - Strategic Messaging Accelerated`}
Duration: ${selectedLength === "short" ? "30 seconds" : selectedLength === "medium" ? "60 seconds" : "90-120 seconds"}
Tone: ${selectedTone}

---

[VISUAL: Opening shot]

${selectedTone === "Enthusiastic"
  ? "NARRATOR (energetic): Tired of waiting months for strategic messaging?"
  : selectedTone === "Professional"
  ? "NARRATOR: Strategic messaging shouldn't take months to develop."
  : "NARRATOR: There's a better way to create strategic messaging."}

[VISUAL: Problem illustration]

${customPrompt || `NARRATOR: ${audienceLabel} face a common challenge: Traditional messaging development takes 3 to 6 months and costs tens of thousands of dollars.`}

[VISUAL: Solution - Platform demo]

NARRATOR: MessageStack changes that.

${selectedTone === "Bold"
  ? "[VISUAL: Fast-paced montage of platform features]\n\nNARRATOR: Our AI-powered platform combines strategic rigor with breakthrough speed."
  : "[VISUAL: Clean platform interface]\n\nNARRATOR: One intelligent platform. Complete messaging workflow. Research to final copy."}

[VISUAL: Key benefits appear on screen]

NARRATOR: ${selectedKeyMessages[0] || "Launch strategic messaging in 2-4 weeks, not months."}

${selectedKeyMessages.length > 1 ? `[VISUAL: Next benefit]\n\nNARRATOR: ${selectedKeyMessages[1]}` : ''}

${selectedKeyMessages.length > 2 ? `[VISUAL: Third benefit]\n\nNARRATOR: ${selectedKeyMessages[2]}` : ''}

[VISUAL: Customer testimonial or success metric]

${selectedTone === "Persuasive"
  ? "NARRATOR: Join the teams already shipping strategic messaging 75% faster."
  : "NARRATOR: Strategic messaging. Accelerated."}

[VISUAL: CTA screen with logo]

NARRATOR: MessageStack. Learn more at messagestack dot ai.

[END]

---

Production Notes:
- ${selectedTone === "Enthusiastic" ? "Upbeat, modern music throughout" : selectedTone === "Professional" ? "Sophisticated, minimal background music" : "Contemporary instrumental track"}
- Quick cuts, dynamic transitions
- ${selectedTone === "Bold" ? "Bold, confident voiceover" : "Clear, authoritative narration"}
- Show platform UI in action
- Include specific metrics and proof points on screen`;

    } else {
      copy = `${customPrompt || `Strategic messaging for ${audienceLabel.toLowerCase()}`}

${selectedKeyMessages.length > 0
  ? selectedKeyMessages.join('. ') + '.'
  : 'MessageStack combines strategic rigor with AI-powered speed to help you launch messaging in weeks, not months.'}

${selectedTone === "Professional"
  ? "We'd be pleased to discuss how MessageStack can support your objectives."
  : "Ready to transform your messaging process?"}`;
    }

    setGeneratedCopy(copy);

    // Generate variations
    const variations = [];

    // Variation 1: Original
    variations.push({ id: "1", content: copy });

    // Variation 2: Different tone
    let variation2 = copy;
    if (selectedTone === "Professional") {
      variation2 = copy.replace(/We'd be pleased to discuss/g, "Let's explore");
    } else if (selectedTone === "Enthusiastic") {
      variation2 = copy.replace(/🚀/g, "⚡").replace(/Transform/g, "Revolutionize");
    } else {
      variation2 = copy.replace(/strategic messaging/gi, "your messaging strategy");
    }
    variations.push({ id: "2", content: variation2 });

    // Variation 3: Different structure
    let variation3 = copy;
    if (selectedChannel === "email") {
      variation3 = copy.replace(/Hi there,/g, `Dear ${audienceLabel} Leader,`);
    } else if (selectedChannel.includes("social")) {
      variation3 = copy + "\n\nWhat's your biggest messaging challenge? 💬";
    } else {
      variation3 = copy.replace(/MessageStack/g, "Our platform");
    }
    variations.push({ id: "3", content: variation3 });

    setVariations(variations);
    setIsGenerating(false);
  };

  const handleExport = (format: string) => {
    const content = generatedCopy;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `copy-export.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveToLibrary = () => {
    const newItem: CopyItem = {
      id: Date.now().toString(),
      title: `${channels.find(c => c.value === selectedChannel)?.label} - ${new Date().toLocaleDateString()}`,
      content: generatedCopy,
      channel: selectedChannel,
      tone: selectedTone,
      audience: selectedAudience,
      timestamp: new Date(),
      isFavorite: false
    };
    setCopyLibrary([newItem, ...copyLibrary]);
  };

  const toggleFavorite = (id: string) => {
    setCopyLibrary(copyLibrary.map(item =>
      item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
    ));
  };

  const deleteFromLibrary = (id: string) => {
    setCopyLibrary(copyLibrary.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
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
              <div>
                <h1 className="text-xl font-bold text-slate-900">Copy and Content</h1>
                <p className="text-sm text-slate-600">AI-powered copy generation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLibrary(!showLibrary)}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Library ({copyLibrary.length})
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Copy Brief Builder */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
                <Target className="h-5 w-5 mr-2 text-teal-600" />
                Copy Brief
              </h2>

              <div className="space-y-4">
                {/* Audience Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Target Audience *
                  </label>
                  <select
                    value={selectedAudience}
                    onChange={(e) => setSelectedAudience(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select audience</option>
                    {audiences.map(audience => (
                      <option key={audience.value} value={audience.value}>
                        {audience.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Channel Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Channel *
                  </label>
                  <select
                    value={selectedChannel}
                    onChange={(e) => setSelectedChannel(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select channel</option>
                    {channels.map(channel => (
                      <option key={channel.value} value={channel.value}>
                        {channel.icon} {channel.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Tone Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Tone of Voice *
                  </label>
                  <select
                    value={selectedTone}
                    onChange={(e) => setSelectedTone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select tone</option>
                    {tones.map(tone => (
                      <option key={tone} value={tone}>
                        {tone}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Length Selector */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Length
                  </label>
                  <select
                    value={selectedLength}
                    onChange={(e) => setSelectedLength(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                  >
                    <option value="">Select length</option>
                    {lengths.map(length => (
                      <option key={length.value} value={length.value}>
                        {length.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Key Messages */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Key Messages {selectedAudience && `(${audiences.find(a => a.value === selectedAudience)?.label})`}
                  </label>
                  {!selectedAudience ? (
                    <p className="text-sm text-slate-500 italic py-4">
                      Select a target audience to see relevant key messages
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {availableKeyMessages.map((message, idx) => (
                        <label
                          key={idx}
                          className="flex items-start space-x-2 p-2 rounded hover:bg-slate-50 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedKeyMessages.includes(message)}
                            onChange={() => toggleKeyMessage(message)}
                            className="mt-1 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                          />
                          <span className="text-sm text-slate-700">{message}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Instructions */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Additional Instructions
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Add any specific requirements or context..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                    rows={3}
                  />
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!selectedAudience || !selectedChannel || !selectedTone || isGenerating}
                  className="w-full text-white"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Copy
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content - Generated Copy & Variations */}
          <div className="lg:col-span-2 space-y-6">
            {!generatedCopy && !showLibrary ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Ready to generate copy?</h3>
                  <p className="text-slate-600 mb-4">
                    Fill out the copy brief on the left and click "Generate Copy" to create AI-powered messaging tailored to your audience and channel.
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <Users className="h-5 w-5 text-teal-600 mx-auto mb-1" />
                      <p className="font-medium text-slate-900">Audience-first</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <MessageSquare className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                      <p className="font-medium text-slate-900">Channel-optimized</p>
                    </div>
                  </div>
                </div>
              </Card>
            ) : showLibrary ? (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-slate-900">Copy Library</h2>
                  <Badge className="bg-teal-100 text-teal-700">
                    {copyLibrary.length} saved
                  </Badge>
                </div>

                <div className="space-y-4">
                  {copyLibrary.map(item => (
                    <Card key={item.id} className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold text-slate-900">{item.title}</h3>
                            <Badge variant="outline" className="text-xs">
                              {channels.find(c => c.value === item.channel)?.label}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">
                            {item.content.substring(0, 150)}...
                          </p>
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>Audience: {audiences.find(a => a.value === item.audience)?.label}</span>
                            <span>Tone: {item.tone}</span>
                            <span>{item.timestamp.toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleFavorite(item.id)}
                          >
                            <Heart className={`h-4 w-4 ${item.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteFromLibrary(item.id)}
                          >
                            <Trash2 className="h-4 w-4 text-slate-400" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {/* Generated Copy */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Generated Copy</h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={handleSaveToLibrary}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedCopy)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <div className="relative group">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 hidden group-hover:block z-10">
                          <button
                            onClick={() => handleExport('txt')}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Export as TXT
                          </button>
                          <button
                            onClick={() => handleExport('md')}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Export as Markdown
                          </button>
                          <button
                            onClick={() => alert('Google Docs integration coming soon')}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Export to Google Docs
                          </button>
                          <button
                            onClick={() => alert('Notion integration coming soon')}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Export to Notion
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <textarea
                      value={generatedCopy}
                      onChange={(e) => setGeneratedCopy(e.target.value)}
                      className="w-full bg-transparent border-none focus:outline-none text-slate-900 resize-none"
                      rows={8}
                    />
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center space-x-2 text-sm text-slate-600">
                      <Badge variant="outline">{selectedChannel}</Badge>
                      <Badge variant="outline">{selectedTone}</Badge>
                      <Badge variant="outline">{audiences.find(a => a.value === selectedAudience)?.label}</Badge>
                    </div>
                  </div>
                </Card>

                {/* Variations */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Variations</h2>
                    <Button variant="outline" size="sm" onClick={handleGenerate}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Generate More
                    </Button>
                  </div>

                  <div className="grid gap-4">
                    {variations.map((variation, idx) => (
                      <Card key={variation.id} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Variation {idx + 1}
                          </Badge>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setGeneratedCopy(variation.content)}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(variation.content)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 whitespace-pre-wrap">{variation.content}</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
