"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Play,
  Calendar,
  Zap,
  Users,
  Building2,
  Mail,
  Phone,
  Globe,
  Star,
  Clock,
  Shield,
  Sparkles,
  Target,
  MessageSquare,
  BarChart3,
  CheckCircle,
  Gift,
  Award,
  Rocket
} from "lucide-react";
import Link from "next/link";

interface LeadForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  companySize: string;
  industry: string;
  useCase: string;
  source: string;
}

const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Consulting',
  'Marketing Agency',
  'Other'
];

const useCaseOptions = [
  'Product launch messaging',
  'Brand positioning',
  'Sales enablement',
  'Marketing campaigns',
  'Internal communications',
  'Competitive differentiation',
  'Other'
];

export default function GetStarted() {
  // ... existing code ... <state declarations>
  const [step, setStep] = useState(1);
  const [selectedPath, setSelectedPath] = useState<'trial' | 'demo' | 'tour' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<LeadForm>({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
    phone: '',
    companySize: '',
    industry: '',
    useCase: '',
    source: 'website'
  });

  const handleInputChange = (field: keyof LeadForm, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return form.firstName && form.lastName && form.email && form.company && form.jobTitle;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call to save lead
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Move to path selection
      setStep(2);
    } catch (error) {
      console.error('Failed to submit lead:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePathSelection = async (path: 'trial' | 'demo' | 'tour') => {
    setSelectedPath(path);
    setIsSubmitting(true);

    try {
      // Simulate setting up the selected path
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep(3);
    } catch (error) {
      console.error('Failed to set up path:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
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
              <Link href="/">
                <Button variant="outline" size="sm" className="border-slate-200 text-slate-700 hover:bg-slate-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">

          {/* Step 1: Lead Capture */}
          {step === 1 && (
            <>
              {/* Hero Section */}
              <div className="text-center mb-12">
                <Badge className="mb-6 bg-teal-100 text-teal-700 px-6 py-3 text-base">
                  <Gift className="h-5 w-5 mr-2" />
                  Start Your Free Trial
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                  Get started for <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}>free</span> today
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
                  Join hundreds of marketing teams who are transforming their messaging process.
                  No credit card required • 7-day free trial • Full platform access
                </p>
              </div>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="p-6 text-center border-teal-200 bg-teal-50">
                  <Rocket className="h-12 w-12 text-teal-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">7-Day Free Trial</h3>
                  <p className="text-sm text-slate-600">Full platform access with 1 project and 3 team members</p>
                </Card>
                <Card className="p-6 text-center border-blue-200 bg-blue-50">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">15-Min Demo</h3>
                  <p className="text-sm text-slate-600">Personal walkthrough with a messaging strategist</p>
                </Card>
                <Card className="p-6 text-center border-purple-200 bg-purple-50">
                  <Play className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-slate-900 mb-2">Interactive Tour</h3>
                  <p className="text-sm text-slate-600">Self-guided exploration of platform features</p>
                </Card>
              </div>

              {/* Lead Form */}
              <Card className="p-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Tell us about yourself</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                      <input
                        type="text"
                        value={form.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                      <input
                        type="text"
                        value={form.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Work Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company *</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                        <input
                          type="text"
                          value={form.company}
                          onChange={(e) => handleInputChange('company', e.target.value)}
                          className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Acme Corp"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Job Title *</label>
                      <input
                        type="text"
                        value={form.jobTitle}
                        onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="VP of Marketing"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone (Optional)</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Company Size</label>
                      <select
                        value={form.companySize}
                        onChange={(e) => handleInputChange('companySize', e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select size</option>
                        {companySizeOptions.map(size => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                      <select
                        value={form.industry}
                        onChange={(e) => handleInputChange('industry', e.target.value)}
                        className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="">Select industry</option>
                        {industryOptions.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Primary Use Case</label>
                    <select
                      value={form.useCase}
                      onChange={(e) => handleInputChange('useCase', e.target.value)}
                      className="w-full px-3 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">What's your main messaging challenge?</option>
                      {useCaseOptions.map(useCase => (
                        <option key={useCase} value={useCase}>{useCase}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={!isFormValid() || isSubmitting}
                  className="w-full mt-8 py-4 text-lg font-medium text-white"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Setting up your experience...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-slate-500 text-center mt-4">
                  By continuing, you agree to our Terms of Service and Privacy Policy.
                  No spam, unsubscribe anytime.
                </p>
              </Card>
            </>
          )}

          {/* Step 2: Path Selection */}
          {step === 2 && (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  Perfect! How would you like to start?
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                  Choose the experience that works best for you, {form.firstName}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {/* 7-Day Trial */}
                <Card className="p-8 relative hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-teal-300"
                      onClick={() => handlePathSelection('trial')}>
                  <Badge className="absolute -top-2 left-4 bg-teal-600 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Most Popular
                  </Badge>

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Rocket className="h-8 w-8 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">7-Day Free Trial</h3>
                    <p className="text-slate-600">Get full access to explore the platform</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      Complete platform access
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      1 messaging project
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      Up to 3 team members
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      AI-powered features
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-teal-500 mr-2 flex-shrink-0" />
                      Email support
                    </div>
                  </div>

                  <Button
                    className="w-full text-white"
                    style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                    disabled={isSubmitting && selectedPath === 'trial'}
                  >
                    {isSubmitting && selectedPath === 'trial' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      'Start Free Trial'
                    )}
                  </Button>
                </Card>

                {/* Demo */}
                <Card className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-300"
                      onClick={() => handlePathSelection('demo')}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="h-8 w-8 text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Book a Demo</h3>
                    <p className="text-slate-600">15-minute personal walkthrough</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      Personal consultation
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      Customized demo
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      Strategy discussion
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      ROI analysis
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                      Implementation planning
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    disabled={isSubmitting && selectedPath === 'demo'}
                  >
                    {isSubmitting && selectedPath === 'demo' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    ) : (
                      'Schedule Demo'
                    )}
                  </Button>
                </Card>

                {/* Tour */}
                <Card className="p-8 hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-purple-300"
                      onClick={() => handlePathSelection('tour')}>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Play className="h-8 w-8 text-purple-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Interactive Tour</h3>
                    <p className="text-slate-600">Self-guided platform exploration</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                      Interactive walkthrough
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                      Sample data included
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                      Feature explanations
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                      Go at your own pace
                    </div>
                    <div className="flex items-center text-sm text-slate-700">
                      <Check className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                      5-10 minutes
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full border-purple-200 text-purple-700 hover:bg-purple-50"
                    disabled={isSubmitting && selectedPath === 'tour'}
                  >
                    {isSubmitting && selectedPath === 'tour' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                    ) : (
                      'Start Tour'
                    )}
                  </Button>
                </Card>
              </div>
            </>
          )}

          {/* Step 3: Success/Next Steps */}
          {step === 3 && (
            <>
              <div className="max-w-2xl mx-auto text-center">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>

                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                  You're all set, {form.firstName}!
                </h1>

                {selectedPath === 'trial' && (
                  <>
                    <p className="text-xl text-slate-600 mb-8">
                      Your 7-day free trial is ready. We've sent login details to <strong>{form.email}</strong>
                    </p>

                    <Card className="p-6 bg-teal-50 border-teal-200 mb-8">
                      <h3 className="font-semibold text-teal-900 mb-4">What's included in your trial:</h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-teal-800">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          1 messaging project
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          Up to 3 team members
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          All platform features
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          Email support
                        </div>
                      </div>
                    </Card>

                    <div className="space-y-4">
                      <Link href="/login">
                        <Button size="lg" className="text-white mr-4" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}>
                          Start Your Trial
                          <ArrowRight className="h-5 w-5 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </>
                )}

                {selectedPath === 'demo' && (
                  <>
                    <p className="text-xl text-slate-600 mb-8">
                      Perfect! We'll be in touch within 24 hours to schedule your personalized demo.
                    </p>

                    <Card className="p-6 bg-blue-50 border-blue-200 mb-8">
                      <h3 className="font-semibold text-blue-900 mb-4">What to expect:</h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          15-minute personalized walkthrough
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          Discussion of your specific messaging challenges
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          ROI analysis for your use case
                        </div>
                        <div className="flex items-center">
                          <Check className="h-4 w-4 mr-2" />
                          Implementation planning
                        </div>
                      </div>
                    </Card>
                  </>
                )}

                {selectedPath === 'tour' && (
                  <>
                    <p className="text-xl text-slate-600 mb-8">
                      Your interactive tour is ready! Explore the platform at your own pace.
                    </p>

                    <Link href="/project/demo">
                      <Button size="lg" className="text-white" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}>
                        Start Interactive Tour
                        <Play className="h-5 w-5 ml-2" />
                      </Button>
                    </Link>
                  </>
                )}

                <p className="text-sm text-slate-500 mt-8">
                  Questions? Email us at <a href="mailto:support@messagestack.ai" className="text-teal-600 hover:underline">support@messagestack.ai</a>
                </p>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
