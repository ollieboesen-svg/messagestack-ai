"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Settings,
  Users,
  Shield,
  Bell,
  Palette,
  Globe,
  Database,
  Key,
  Mail,
  Zap,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Copy,
  Download,
  Upload,
  Trash2,
  Plus,
  X,
  Crown,
  DollarSign,
  Clock,
  BarChart3
} from "lucide-react";

interface PlatformConfig {
  general: {
    platformName: string;
    supportEmail: string;
    timezone: string;
    defaultLanguage: string;
  };
  security: {
    sessionTimeout: number;
    enforceSSL: boolean;
    twoFactorRequired: boolean;
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
    };
  };
  features: {
    aiProcessing: boolean;
    advancedAnalytics: boolean;
    customBranding: boolean;
    whiteLabel: boolean;
    apiAccess: boolean;
  };
  limits: {
    maxClientsPerConsultant: number;
    maxUsersPerClient: number;
    maxSurveysPerProject: number;
    maxResponsesPerSurvey: number;
  };
  pricing: {
    starterPrice: number;
    professionalPrice: number;
    enterprisePrice: number;
    customPricingEnabled: boolean;
  };
  notifications: {
    emailNotifications: boolean;
    slackIntegration: boolean;
    webhookUrl: string;
  };
}

interface PlatformSettingsProps {
  onClose: () => void;
}

const initialConfig: PlatformConfig = {
  general: {
    platformName: "MessageStack AI",
    supportEmail: "support@messagestack.ai",
    timezone: "America/New_York",
    defaultLanguage: "en"
  },
  security: {
    sessionTimeout: 24,
    enforceSSL: true,
    twoFactorRequired: false,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    }
  },
  features: {
    aiProcessing: true,
    advancedAnalytics: true,
    customBranding: true,
    whiteLabel: false,
    apiAccess: true
  },
  limits: {
    maxClientsPerConsultant: 50,
    maxUsersPerClient: 25,
    maxSurveysPerProject: 100,
    maxResponsesPerSurvey: 1000
  },
  pricing: {
    starterPrice: 499,
    professionalPrice: 999,
    enterprisePrice: 1999,
    customPricingEnabled: true
  },
  notifications: {
    emailNotifications: true,
    slackIntegration: false,
    webhookUrl: ""
  }
};

export default function PlatformSettings({ onClose }: PlatformSettingsProps) {
  const [activeTab, setActiveTab] = useState('general');
  const [config, setConfig] = useState<PlatformConfig>(initialConfig);
  const [isSaving, setIsSaving] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'limits', label: 'Limits', icon: BarChart3 },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Globe },
    { id: 'backup', label: 'Backup', icon: Database }
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSaveMessage('Settings saved successfully!');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Error saving settings');
    } finally {
      setIsSaving(false);
    }
  };

  const updateConfig = (section: keyof PlatformConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedConfig = (section: keyof PlatformConfig, parentField: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [parentField]: {
          ...(prev[section] as any)[parentField],
          [field]: value
        }
      }
    }));
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Platform Name</label>
            <input
              type="text"
              value={config.general.platformName}
              onChange={(e) => updateConfig('general', 'platformName', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Support Email</label>
            <input
              type="email"
              value={config.general.supportEmail}
              onChange={(e) => updateConfig('general', 'supportEmail', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
            <select
              value={config.general.timezone}
              onChange={(e) => updateConfig('general', 'timezone', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
              <option value="UTC">UTC</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Default Language</label>
            <select
              value={config.general.defaultLanguage}
              onChange={(e) => updateConfig('general', 'defaultLanguage', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Configuration</h3>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Session Timeout (hours)</label>
              <input
                type="number"
                value={config.security.sessionTimeout}
                onChange={(e) => updateConfig('security', 'sessionTimeout', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                min="1"
                max="168"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.security.enforceSSL}
                onChange={(e) => updateConfig('security', 'enforceSSL', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-sm text-slate-700">Enforce SSL/HTTPS</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={config.security.twoFactorRequired}
                onChange={(e) => updateConfig('security', 'twoFactorRequired', e.target.checked)}
                className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-sm text-slate-700">Require Two-Factor Authentication</span>
            </label>
          </div>

          <div>
            <h4 className="font-medium text-slate-900 mb-3">Password Policy</h4>
            <div className="space-y-3 pl-4 border-l-2 border-slate-200">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Minimum Length</label>
                <input
                  type="number"
                  value={config.security.passwordPolicy.minLength}
                  onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min="6"
                  max="32"
                />
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.security.passwordPolicy.requireUppercase}
                  onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'requireUppercase', e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-slate-700">Require uppercase letters</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.security.passwordPolicy.requireNumbers}
                  onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'requireNumbers', e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-slate-700">Require numbers</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={config.security.passwordPolicy.requireSpecialChars}
                  onChange={(e) => updateNestedConfig('security', 'passwordPolicy', 'requireSpecialChars', e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
                <span className="ml-2 text-sm text-slate-700">Require special characters</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFeaturesSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Features</h3>

        <div className="space-y-4">
          {Object.entries(config.features).map(([key, value]) => (
            <Card key={key} className="p-4">
              <label className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-slate-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">
                    {key === 'aiProcessing' && 'Enable AI-powered content generation and analysis'}
                    {key === 'advancedAnalytics' && 'Detailed reporting and insights dashboard'}
                    {key === 'customBranding' && 'Allow clients to customize their branding'}
                    {key === 'whiteLabel' && 'Remove MessageStack branding entirely'}
                    {key === 'apiAccess' && 'Enable REST API access for integrations'}
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => updateConfig('features', key, e.target.checked)}
                  className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                />
              </label>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLimitsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Platform Limits</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max Clients per Consultant</label>
            <input
              type="number"
              value={config.limits.maxClientsPerConsultant}
              onChange={(e) => updateConfig('limits', 'maxClientsPerConsultant', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max Users per Client</label>
            <input
              type="number"
              value={config.limits.maxUsersPerClient}
              onChange={(e) => updateConfig('limits', 'maxUsersPerClient', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max Surveys per Project</label>
            <input
              type="number"
              value={config.limits.maxSurveysPerProject}
              onChange={(e) => updateConfig('limits', 'maxSurveysPerProject', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Max Responses per Survey</label>
            <input
              type="number"
              value={config.limits.maxResponsesPerSurvey}
              onChange={(e) => updateConfig('limits', 'maxResponsesPerSurvey', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPricingSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Pricing Configuration</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Starter Plan ($)</label>
            <input
              type="number"
              value={config.pricing.starterPrice}
              onChange={(e) => updateConfig('pricing', 'starterPrice', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Professional Plan ($)</label>
            <input
              type="number"
              value={config.pricing.professionalPrice}
              onChange={(e) => updateConfig('pricing', 'professionalPrice', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Enterprise Plan ($)</label>
            <input
              type="number"
              value={config.pricing.enterprisePrice}
              onChange={(e) => updateConfig('pricing', 'enterprisePrice', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              min="1"
            />
          </div>
        </div>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={config.pricing.customPricingEnabled}
            onChange={(e) => updateConfig('pricing', 'customPricingEnabled', e.target.checked)}
            className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
          />
          <span className="ml-2 text-sm text-slate-700">Enable custom pricing for enterprise clients</span>
        </label>
      </div>
    </div>
  );

  const renderNotificationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Notification Settings</h3>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notifications.emailNotifications}
              onChange={(e) => updateConfig('notifications', 'emailNotifications', e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-slate-700">Enable email notifications</span>
          </label>

          <label className="flex items-center">
            <input
              type="checkbox"
              checked={config.notifications.slackIntegration}
              onChange={(e) => updateConfig('notifications', 'slackIntegration', e.target.checked)}
              className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="ml-2 text-sm text-slate-700">Enable Slack integration</span>
          </label>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Webhook URL</label>
            <input
              type="url"
              value={config.notifications.webhookUrl}
              onChange={(e) => updateConfig('notifications', 'webhookUrl', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="https://hooks.slack.com/..."
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderIntegrationsSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">API & Integrations</h3>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-medium text-slate-900">API Key</h4>
              <p className="text-sm text-slate-500">Use this key for API access</p>
            </div>
            <Button
              onClick={() => setShowApiKey(!showApiKey)}
              variant="outline"
              size="sm"
            >
              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type={showApiKey ? "text" : "password"}
              value="sk_live_1234567890abcdef"
              readOnly
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg bg-slate-50"
            />
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderBackupSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Backup & Recovery</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h4 className="font-medium text-slate-900 mb-3">Export Data</h4>
            <p className="text-sm text-slate-500 mb-4">Download a complete backup of all platform data</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
          </Card>

          <Card className="p-4">
            <h4 className="font-medium text-slate-900 mb-3">Import Data</h4>
            <p className="text-sm text-slate-500 mb-4">Restore from a previous backup file</p>
            <Button variant="outline" className="w-full">
              <Upload className="h-4 w-4 mr-2" />
              Import Backup
            </Button>
          </Card>
        </div>

        <Card className="p-4 border-red-200 bg-red-50">
          <h4 className="font-medium text-red-900 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Danger Zone
          </h4>
          <p className="text-sm text-red-700 mb-4">Permanently delete all platform data. This action cannot be undone.</p>
          <Button variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete All Data
          </Button>
        </Card>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return renderGeneralSettings();
      case 'security': return renderSecuritySettings();
      case 'features': return renderFeaturesSettings();
      case 'limits': return renderLimitsSettings();
      case 'pricing': return renderPricingSettings();
      case 'notifications': return renderNotificationsSettings();
      case 'integrations': return renderIntegrationsSettings();
      case 'backup': return renderBackupSettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Platform Settings</h2>
            <p className="text-slate-600">Configure your MessageStack AI platform</p>
          </div>
          <div className="flex items-center space-x-3">
            {saveMessage && (
              <div className="flex items-center space-x-2 text-green-600">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">{saveMessage}</span>
              </div>
            )}
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="text-white"
              style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
            >
              {isSaving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Sidebar */}
          <div className="w-64 border-r bg-slate-50 overflow-y-auto">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-teal-100 text-teal-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
