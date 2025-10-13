"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Users,
  Mail,
  Phone,
  Globe,
  Plus,
  X,
  Check,
  Crown,
  Zap,
  Star,
  AlertCircle,
  User,
  Search,
  Filter,
  Edit3,
  Trash2,
  Shield,
  Clock,
  DollarSign,
  Target,
  CheckCircle
} from "lucide-react";

interface PricingTier {
  id: string;
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  maxUsers: number;
  maxProjects: number;
  features: string[];
  popular?: boolean;
  enterprise?: boolean;
}

interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  department?: string;
  inviteStatus: 'pending' | 'accepted' | 'declined';
}

interface CompanyInfo {
  name: string;
  domain: string;
  industry: string;
  size: string;
  website: string;
  description: string;
  logo?: string;
}

interface PrimaryContact {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  title: string;
  department: string;
}

interface ProjectDetails {
  name: string;
  description: string;
  startDate: string;
  estimatedDuration: number;
  objectives: string[];
  targetAudiences: string[];
}

interface NewProjectForm {
  company: CompanyInfo;
  primaryContact: PrimaryContact;
  projectDetails: ProjectDetails;
  selectedTier: string;
  billingCycle: 'monthly' | 'annual';
  teamMembers: TeamMember[];
  customPricing?: {
    enabled: boolean;
    price: number;
    maxUsers: number;
  };
}

const pricingTiers: PricingTier[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 499,
    annualPrice: 4990,
    maxUsers: 5,
    maxProjects: 3,
    features: [
      'Up to 5 team members',
      'Up to 3 concurrent projects',
      'Basic surveys and research',
      'Standard message grid',
      'Email support',
      'Basic analytics',
      '100 AI generations/month'
    ]
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 999,
    annualPrice: 9990,
    maxUsers: 15,
    maxProjects: 10,
    features: [
      'Up to 15 team members',
      'Up to 10 concurrent projects',
      'Advanced surveys & multi-stakeholder research',
      'Custom message grids',
      'AI-powered copy generation',
      'Priority support',
      'Advanced analytics & reporting',
      'Brand customization',
      '500 AI generations/month',
      'API access'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 1999,
    annualPrice: 19990,
    maxUsers: 50,
    maxProjects: 999,
    features: [
      'Up to 50 team members',
      'Unlimited projects',
      'Unlimited surveys & research',
      'White-label platform',
      'Custom integrations',
      'Dedicated account manager',
      'Advanced AI features',
      'Custom training & onboarding',
      'Unlimited AI generations',
      'Full API access',
      'Custom SLA'
    ],
    enterprise: true
  }
];

const industryOptions = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Government',
  'Non-profit',
  'Consulting',
  'Media & Entertainment',
  'Real Estate',
  'Transportation',
  'Other'
];

const companySizeOptions = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

interface NewClientProjectProps {
  onClose: () => void;
  onSubmit: (project: NewProjectForm) => void;
}

export default function NewClientProject({ onClose, onSubmit }: NewClientProjectProps) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<NewProjectForm>({
    company: {
      name: '',
      domain: '',
      industry: '',
      size: '',
      website: '',
      description: ''
    },
    primaryContact: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      title: '',
      department: ''
    },
    projectDetails: {
      name: '',
      description: '',
      startDate: new Date().toISOString().split('T')[0],
      estimatedDuration: 12,
      objectives: [],
      targetAudiences: []
    },
    selectedTier: 'professional',
    billingCycle: 'monthly',
    teamMembers: [],
    customPricing: {
      enabled: false,
      price: 0,
      maxUsers: 0
    }
  });

  const [newMember, setNewMember] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'editor' as 'admin' | 'editor' | 'viewer',
    department: ''
  });

  const [newObjective, setNewObjective] = useState('');
  const [newAudience, setNewAudience] = useState('');
  const [searchMembers, setSearchMembers] = useState('');

  const selectedTier = pricingTiers.find(t => t.id === form.selectedTier);
  const maxUsersAllowed = form.customPricing?.enabled ? form.customPricing.maxUsers : (selectedTier?.maxUsers || 5);
  const currentPrice = form.customPricing?.enabled ? form.customPricing.price :
    (form.billingCycle === 'annual' ? (selectedTier?.annualPrice || 0) : (selectedTier?.monthlyPrice || 0));

  const addTeamMember = () => {
    if (newMember.firstName && newMember.lastName && newMember.email) {
      if (form.teamMembers.length < maxUsersAllowed) {
        setForm(prev => ({
          ...prev,
          teamMembers: [...prev.teamMembers, {
            id: `member-${Date.now()}`,
            ...newMember,
            inviteStatus: 'pending'
          }]
        }));
        setNewMember({ firstName: '', lastName: '', email: '', role: 'editor', department: '' });
      }
    }
  };

  const removeTeamMember = (id: string) => {
    setForm(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(m => m.id !== id)
    }));
  };

  const addObjective = () => {
    if (newObjective.trim()) {
      setForm(prev => ({
        ...prev,
        projectDetails: {
          ...prev.projectDetails,
          objectives: [...prev.projectDetails.objectives, newObjective.trim()]
        }
      }));
      setNewObjective('');
    }
  };

  const removeObjective = (index: number) => {
    setForm(prev => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        objectives: prev.projectDetails.objectives.filter((_, i) => i !== index)
      }
    }));
  };

  const addAudience = () => {
    if (newAudience.trim()) {
      setForm(prev => ({
        ...prev,
        projectDetails: {
          ...prev.projectDetails,
          targetAudiences: [...prev.projectDetails.targetAudiences, newAudience.trim()]
        }
      }));
      setNewAudience('');
    }
  };

  const removeAudience = (index: number) => {
    setForm(prev => ({
      ...prev,
      projectDetails: {
        ...prev.projectDetails,
        targetAudiences: prev.projectDetails.targetAudiences.filter((_, i) => i !== index)
      }
    }));
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return form.company.name && form.company.industry && form.primaryContact.firstName &&
               form.primaryContact.lastName && form.primaryContact.email;
      case 2:
        return form.projectDetails.name && form.selectedTier;
      case 3:
        return true; // Team members are optional
      case 4:
        return true; // Review step
      default:
        return false;
    }
  };

  const generateDomain = (companyName: string) => {
    if (companyName) {
      const domain = companyName.toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .substring(0, 20);
      setForm(prev => ({
        ...prev,
        company: { ...prev.company, domain: domain + '.messagestack.ai' }
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Create New Client Project</h2>
            <p className="text-slate-600">Step {step} of 4 - Set up a comprehensive messaging project</p>
          </div>
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s <= step ? 'bg-teal-500 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {s < step ? <Check className="h-4 w-4" /> : s}
                </div>
                {s < 4 && <div className={`w-12 h-1 ${s < step ? 'bg-teal-500' : 'bg-slate-200'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-slate-600">
            <span>Company Info</span>
            <span>Project & Pricing</span>
            <span>Team Setup</span>
            <span>Review</span>
          </div>
        </div>

        <div className="p-6">
          {/* Step 1: Company Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Company Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      value={form.company.name}
                      onChange={(e) => {
                        setForm(prev => ({ ...prev, company: { ...prev.company, name: e.target.value } }));
                        generateDomain(e.target.value);
                      }}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Acme Corporation"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subdomain</label>
                    <input
                      type="text"
                      value={form.company.domain}
                      onChange={(e) => setForm(prev => ({ ...prev, company: { ...prev.company, domain: e.target.value } }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-slate-50"
                      placeholder="acme.messagestack.ai"
                      readOnly
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-generated from company name</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
                    <input
                      type="url"
                      value={form.company.website}
                      onChange={(e) => setForm(prev => ({ ...prev, company: { ...prev.company, website: e.target.value } }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="https://acme.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Industry *</label>
                    <select
                      value={form.company.industry}
                      onChange={(e) => setForm(prev => ({ ...prev, company: { ...prev.company, industry: e.target.value } }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Industry</option>
                      {industryOptions.map(industry => (
                        <option key={industry} value={industry}>{industry}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Size</label>
                    <select
                      value={form.company.size}
                      onChange={(e) => setForm(prev => ({ ...prev, company: { ...prev.company, size: e.target.value } }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="">Select Size</option>
                      {companySizeOptions.map(size => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-2">Company Description</label>
                    <textarea
                      value={form.company.description}
                      onChange={(e) => setForm(prev => ({ ...prev, company: { ...prev.company, description: e.target.value } }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent h-24 resize-none"
                      placeholder="Brief description of the company and what they do..."
                    />
                  </div>
                </div>

                <h4 className="text-md font-semibold text-slate-900 mb-4">Primary Contact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      value={form.primaryContact.firstName}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        primaryContact: { ...prev.primaryContact, firstName: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      value={form.primaryContact.lastName}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        primaryContact: { ...prev.primaryContact, lastName: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.primaryContact.email}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        primaryContact: { ...prev.primaryContact, email: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="john@acme.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={form.primaryContact.phone}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        primaryContact: { ...prev.primaryContact, phone: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Job Title</label>
                    <input
                      type="text"
                      value={form.primaryContact.title}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        primaryContact: { ...prev.primaryContact, title: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="VP of Marketing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                    <input
                      type="text"
                      value={form.primaryContact.department}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        primaryContact: { ...prev.primaryContact, department: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Marketing"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Project & Pricing */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Project Details</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Name *</label>
                    <input
                      type="text"
                      value={form.projectDetails.name}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        projectDetails: { ...prev.projectDetails, name: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Q1 2024 Product Launch Messaging"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                    <textarea
                      value={form.projectDetails.description}
                      onChange={(e) => setForm(prev => ({
                        ...prev,
                        projectDetails: { ...prev.projectDetails, description: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent h-24 resize-none"
                      placeholder="Brief description of the messaging project goals and scope..."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
                      <input
                        type="date"
                        value={form.projectDetails.startDate}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          projectDetails: { ...prev.projectDetails, startDate: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Duration (weeks)</label>
                      <input
                        type="number"
                        value={form.projectDetails.estimatedDuration}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          projectDetails: { ...prev.projectDetails, estimatedDuration: parseInt(e.target.value) }
                        }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        min="1"
                        max="52"
                      />
                    </div>
                  </div>

                  {/* Project Objectives */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Project Objectives</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newObjective}
                        onChange={(e) => setNewObjective(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Add project objective..."
                        onKeyPress={(e) => e.key === 'Enter' && addObjective()}
                      />
                      <Button onClick={addObjective} variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.projectDetails.objectives.map((objective, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">{objective}</span>
                          <Button onClick={() => removeObjective(index)} variant="outline" size="sm">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Target Audiences */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Target Audiences</label>
                    <div className="flex space-x-2 mb-2">
                      <input
                        type="text"
                        value={newAudience}
                        onChange={(e) => setNewAudience(e.target.value)}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Add target audience..."
                        onKeyPress={(e) => e.key === 'Enter' && addAudience()}
                      />
                      <Button onClick={addAudience} variant="outline" size="sm">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {form.projectDetails.targetAudiences.map((audience, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">{audience}</span>
                          <Button onClick={() => removeAudience(index)} variant="outline" size="sm">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Pricing Plans */}
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Pricing Plan</h3>

                {/* Billing Cycle Toggle */}
                <div className="flex items-center justify-center mb-6">
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    <button
                      onClick={() => setForm(prev => ({ ...prev, billingCycle: 'monthly' }))}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        form.billingCycle === 'monthly'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setForm(prev => ({ ...prev, billingCycle: 'annual' }))}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                        form.billingCycle === 'annual'
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Annual
                      <Badge className="ml-2 bg-green-100 text-green-700 text-xs">Save 17%</Badge>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {pricingTiers.map((tier) => (
                    <div
                      key={tier.id}
                      onClick={() => setForm(prev => ({ ...prev, selectedTier: tier.id }))}
                      className={`relative cursor-pointer rounded-lg border-2 p-6 transition-all duration-200 ${
                        form.selectedTier === tier.id
                          ? 'border-teal-500 bg-teal-50 shadow-lg scale-105'
                          : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                      }`}
                    >
                      {tier.popular && (
                        <Badge className="absolute -top-2 left-4 bg-teal-600 text-white">
                          <Star className="h-3 w-3 mr-1" />
                          Most Popular
                        </Badge>
                      )}

                      {tier.enterprise && (
                        <Badge className="absolute -top-2 left-4 bg-purple-600 text-white">
                          <Crown className="h-3 w-3 mr-1" />
                          Enterprise
                        </Badge>
                      )}

                      <div className="text-center mb-6">
                        <h4 className="text-xl font-bold text-slate-900">{tier.name}</h4>
                        <div className="text-3xl font-bold text-slate-900 mt-4">
                          ${form.billingCycle === 'annual' ? Math.round(tier.annualPrice / 12) : tier.monthlyPrice}
                          <span className="text-sm font-normal text-slate-500">/month</span>
                        </div>
                        {form.billingCycle === 'annual' && (
                          <p className="text-sm text-green-600 mt-1">
                            ${tier.annualPrice} billed annually
                          </p>
                        )}
                      </div>

                      <ul className="space-y-3 text-sm text-slate-600 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-4 w-4 text-teal-500 mr-2 mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="flex items-center justify-between text-sm text-slate-600 pt-4 border-t border-slate-200">
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          Up to {tier.maxUsers} users
                        </div>
                        <div className="flex items-center">
                          <Target className="h-4 w-4 mr-1" />
                          {tier.maxProjects === 999 ? 'Unlimited' : tier.maxProjects} projects
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Pricing Option */}
                {selectedTier?.enterprise && (
                  <Card className="mt-6 p-4 border-purple-200 bg-purple-50">
                    <label className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={form.customPricing?.enabled || false}
                        onChange={(e) => setForm(prev => ({
                          ...prev,
                          customPricing: {
                            ...prev.customPricing!,
                            enabled: e.target.checked
                          }
                        }))}
                        className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm font-medium text-purple-900">Enable custom pricing for this client</span>
                    </label>

                    {form.customPricing?.enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">Custom Monthly Price ($)</label>
                          <input
                            type="number"
                            value={form.customPricing.price}
                            onChange={(e) => setForm(prev => ({
                              ...prev,
                              customPricing: {
                                ...prev.customPricing!,
                                price: parseInt(e.target.value)
                              }
                            }))}
                            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            min="1"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">Max Users</label>
                          <input
                            type="number"
                            value={form.customPricing.maxUsers}
                            onChange={(e) => setForm(prev => ({
                              ...prev,
                              customPricing: {
                                ...prev.customPricing!,
                                maxUsers: parseInt(e.target.value)
                              }
                            }))}
                            className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            min="1"
                          />
                        </div>
                      </div>
                    )}
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Team Setup */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Team Setup</h3>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-slate-600">
                    Add team members who will have access to this project.
                    <span className="font-medium"> You can add up to {maxUsersAllowed} users</span> with your selected plan.
                  </p>
                  <Badge variant="outline" className={`${
                    form.teamMembers.length >= maxUsersAllowed ? 'border-red-300 text-red-700' : 'border-green-300 text-green-700'
                  }`}>
                    {form.teamMembers.length}/{maxUsersAllowed} users
                  </Badge>
                </div>

                {/* Add Team Member Form */}
                <Card className="p-4 mb-6">
                  <h4 className="font-medium text-slate-900 mb-4">Add Team Member</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                      <input
                        type="text"
                        value={newMember.firstName}
                        onChange={(e) => setNewMember(prev => ({ ...prev, firstName: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        value={newMember.lastName}
                        onChange={(e) => setNewMember(prev => ({ ...prev, lastName: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={newMember.email}
                        onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                      <select
                        value={newMember.role}
                        onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value as 'admin' | 'editor' | 'viewer' }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Department</label>
                      <input
                        type="text"
                        value={newMember.department}
                        onChange={(e) => setNewMember(prev => ({ ...prev, department: e.target.value }))}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Marketing"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button
                      onClick={addTeamMember}
                      disabled={!newMember.firstName || !newMember.lastName || !newMember.email || form.teamMembers.length >= maxUsersAllowed}
                      className="text-white"
                      style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Member
                    </Button>
                    {form.teamMembers.length >= maxUsersAllowed && (
                      <p className="text-sm text-orange-600 mt-2 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        User limit reached for your selected plan
                      </p>
                    )}
                  </div>
                </Card>

                {/* Team Members List */}
                {form.teamMembers.length > 0 && (
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-slate-900">
                        Team Members ({form.teamMembers.length}/{maxUsersAllowed})
                      </h4>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          value={searchMembers}
                          onChange={(e) => setSearchMembers(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Search members..."
                        />
                      </div>
                    </div>
                    <div className="space-y-3">
                      {form.teamMembers
                        .filter(member =>
                          searchMembers === '' ||
                          `${member.firstName} ${member.lastName}`.toLowerCase().includes(searchMembers.toLowerCase()) ||
                          member.email.toLowerCase().includes(searchMembers.toLowerCase())
                        )
                        .map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-slate-300 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-slate-600" />
                              </div>
                              <div>
                                <p className="font-medium text-slate-900">{member.firstName} {member.lastName}</p>
                                <p className="text-sm text-slate-600">{member.email}</p>
                                {member.department && (
                                  <p className="text-xs text-slate-500">{member.department}</p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline" className="capitalize">
                                {member.role}
                              </Badge>
                              <Badge variant="outline" className={
                                member.inviteStatus === 'pending' ? 'border-orange-300 text-orange-700' :
                                member.inviteStatus === 'accepted' ? 'border-green-300 text-green-700' :
                                'border-red-300 text-red-700'
                              }>
                                {member.inviteStatus}
                              </Badge>
                              <Button
                                onClick={() => removeTeamMember(member.id)}
                                variant="outline"
                                size="sm"
                                className="text-red-600 border-red-200 hover:bg-red-50"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </Card>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-6">Review & Confirm</h3>

                {/* Project Summary */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Company Information</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Company:</span>
                        <span className="font-medium">{form.company.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Domain:</span>
                        <span className="font-medium">{form.company.domain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Industry:</span>
                        <span className="font-medium">{form.company.industry}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Primary Contact:</span>
                        <span className="font-medium">{form.primaryContact.firstName} {form.primaryContact.lastName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Email:</span>
                        <span className="font-medium">{form.primaryContact.email}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Project Details</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Project Name:</span>
                        <span className="font-medium">{form.projectDetails.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duration:</span>
                        <span className="font-medium">{form.projectDetails.estimatedDuration} weeks</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Start Date:</span>
                        <span className="font-medium">{new Date(form.projectDetails.startDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Objectives:</span>
                        <span className="font-medium">{form.projectDetails.objectives.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Target Audiences:</span>
                        <span className="font-medium">{form.projectDetails.targetAudiences.length}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Pricing & Plan</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Plan:</span>
                        <span className="font-medium">{selectedTier?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Billing:</span>
                        <span className="font-medium capitalize">{form.billingCycle}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Price:</span>
                        <span className="font-medium text-lg">${currentPrice}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Max Users:</span>
                        <span className="font-medium">{maxUsersAllowed}</span>
                      </div>
                      {form.customPricing?.enabled && (
                        <Badge className="bg-purple-100 text-purple-700">Custom Pricing Enabled</Badge>
                      )}
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Team Members</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Members:</span>
                        <span className="font-medium">{form.teamMembers.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Admins:</span>
                        <span className="font-medium">{form.teamMembers.filter(m => m.role === 'admin').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Editors:</span>
                        <span className="font-medium">{form.teamMembers.filter(m => m.role === 'editor').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Viewers:</span>
                        <span className="font-medium">{form.teamMembers.filter(m => m.role === 'viewer').length}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Confirmation */}
                <Card className="p-6 border-teal-200 bg-teal-50">
                  <h4 className="font-semibold text-teal-900 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Ready to Create Project
                  </h4>
                  <p className="text-teal-700 text-sm">
                    Please review all information above. Once created, you can modify most settings from the project dashboard.
                    Team member invitations will be sent automatically.
                  </p>
                </Card>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => step > 1 ? setStep(step - 1) : onClose()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {step > 1 ? 'Previous' : 'Cancel'}
          </Button>

          <div className="flex items-center space-x-3">
            {step < 4 ? (
              <Button
                onClick={() => setStep(step + 1)}
                disabled={!isStepValid()}
                className="text-white"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                Next Step
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="text-white px-8"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                <Check className="h-4 w-4 mr-2" />
                Create Project
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
