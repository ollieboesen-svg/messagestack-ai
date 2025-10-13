"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MessageSquare,
  Clock,
  Target,
  DollarSign,
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Building2,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Eye,
  Plus,
  Activity,
  Percent,
  UserCheck,
  Mail,
  CreditCard,
  Globe,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Award
} from "lucide-react";

interface AnalyticsData {
  totalClients: number;
  totalCompanies: number;
  totalUsers: number;
  activeProjects: number;
  totalRevenue: number;
  avgProjectDuration: number;
  surveyCompletionRate: number;
  clientSatisfaction: number;
  monthlyGrowth: number;
  totalSurveys: number;
  totalResponses: number;
  avgUsersPerCompany: number;
  churnRate: number;
  avgDealSize: number;
}

interface CompanyAnalytics {
  id: string;
  company: string;
  domain: string;
  industry: string;
  plan: string;
  userCount: number;
  maxUsers: number;
  projectsActive: number;
  projectsCompleted: number;
  monthlyRevenue: number;
  totalRevenue: number;
  satisfaction: number;
  surveyResponses: number;
  joinDate: Date;
  lastActivity: Date;
  status: 'active' | 'at_risk' | 'churned' | 'trial';
  utilizationRate: number;
  engagementScore: number;
  renewalDate?: Date;
  customPricing: boolean;
}

interface RevenueData {
  month: string;
  revenue: number;
  newClients: number;
  churn: number;
  netRevenue: number;
}

interface AnalyticsDashboardProps {
  onClose: () => void;
}

const mockAnalytics: AnalyticsData = {
  totalClients: 47,
  totalCompanies: 42,
  totalUsers: 287,
  activeProjects: 23,
  totalRevenue: 89650,
  avgProjectDuration: 6.3,
  surveyCompletionRate: 87,
  clientSatisfaction: 4.6,
  monthlyGrowth: 23,
  totalSurveys: 156,
  totalResponses: 2847,
  avgUsersPerCompany: 6.8,
  churnRate: 8.5,
  avgDealSize: 2134
};

const mockCompanyAnalytics: CompanyAnalytics[] = [
  {
    id: '1',
    company: 'TechCorp Solutions',
    domain: 'techcorp.messagestack.ai',
    industry: 'Technology',
    plan: 'Enterprise',
    userCount: 24,
    maxUsers: 50,
    projectsActive: 3,
    projectsCompleted: 4,
    monthlyRevenue: 1999,
    totalRevenue: 23970,
    satisfaction: 4.8,
    surveyResponses: 342,
    joinDate: new Date('2023-08-15'),
    lastActivity: new Date('2024-01-25'),
    status: 'active',
    utilizationRate: 89,
    engagementScore: 94,
    renewalDate: new Date('2024-08-15'),
    customPricing: false
  },
  {
    id: '2',
    company: 'Growth Startup',
    domain: 'growth.messagestack.ai',
    industry: 'Technology',
    plan: 'Professional',
    userCount: 12,
    maxUsers: 15,
    projectsActive: 2,
    projectsCompleted: 2,
    monthlyRevenue: 999,
    totalRevenue: 11988,
    satisfaction: 4.5,
    surveyResponses: 187,
    joinDate: new Date('2023-12-01'),
    lastActivity: new Date('2024-01-24'),
    status: 'active',
    utilizationRate: 76,
    engagementScore: 82,
    renewalDate: new Date('2024-12-01'),
    customPricing: false
  },
  {
    id: '3',
    company: 'Demo Company',
    domain: 'demo.messagestack.ai',
    industry: 'Consulting',
    plan: 'Professional',
    userCount: 3,
    maxUsers: 15,
    projectsActive: 1,
    projectsCompleted: 1,
    monthlyRevenue: 999,
    totalRevenue: 8991,
    satisfaction: 4.2,
    surveyResponses: 89,
    joinDate: new Date('2023-10-01'),
    lastActivity: new Date('2024-01-20'),
    status: 'at_risk',
    utilizationRate: 45,
    engagementScore: 67,
    renewalDate: new Date('2024-10-01'),
    customPricing: false
  },
  {
    id: '4',
    company: 'FinanceFlow Inc',
    domain: 'financeflow.messagestack.ai',
    industry: 'Finance',
    plan: 'Starter',
    userCount: 2,
    maxUsers: 5,
    projectsActive: 0,
    projectsCompleted: 0,
    monthlyRevenue: 499,
    totalRevenue: 1497,
    satisfaction: 3.8,
    surveyResponses: 12,
    joinDate: new Date('2024-01-01'),
    lastActivity: new Date('2024-01-23'),
    status: 'trial',
    utilizationRate: 20,
    engagementScore: 34,
    renewalDate: new Date('2024-02-01'),
    customPricing: false
  },
  {
    id: '5',
    company: 'MegaCorp Enterprises',
    domain: 'megacorp.messagestack.ai',
    industry: 'Manufacturing',
    plan: 'Enterprise',
    userCount: 45,
    maxUsers: 100,
    projectsActive: 5,
    projectsCompleted: 12,
    monthlyRevenue: 2999,
    totalRevenue: 47984,
    satisfaction: 4.9,
    surveyResponses: 1247,
    joinDate: new Date('2023-03-01'),
    lastActivity: new Date('2024-01-26'),
    status: 'active',
    utilizationRate: 95,
    engagementScore: 98,
    renewalDate: new Date('2024-03-01'),
    customPricing: true
  }
];

const mockRevenueData: RevenueData[] = [
  { month: 'Jul 2023', revenue: 45230, newClients: 8, churn: 1, netRevenue: 42850 },
  { month: 'Aug 2023', revenue: 52110, newClients: 12, churn: 2, netRevenue: 48760 },
  { month: 'Sep 2023', revenue: 58940, newClients: 15, churn: 1, netRevenue: 57420 },
  { month: 'Oct 2023', revenue: 67200, newClients: 18, churn: 3, netRevenue: 64380 },
  { month: 'Nov 2023', revenue: 73150, newClients: 14, churn: 2, netRevenue: 71250 },
  { month: 'Dec 2023', revenue: 79860, newClients: 19, churn: 1, netRevenue: 78940 },
  { month: 'Jan 2024', revenue: 89650, newClients: 23, churn: 4, netRevenue: 85420 }
];

export default function AnalyticsDashboard({ onClose }: AnalyticsDashboardProps) {
  const [timeRange, setTimeRange] = useState('last-30-days');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [activeTab, setActiveTab] = useState('overview');
  const [searchCompanies, setSearchCompanies] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPlan, setFilterPlan] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'at_risk': return 'bg-orange-100 text-orange-700';
      case 'churned': return 'bg-red-100 text-red-700';
      case 'trial': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'at_risk': return <AlertCircle className="h-4 w-4" />;
      case 'churned': return <TrendingDown className="h-4 w-4" />;
      case 'trial': return <Clock className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'starter': return 'bg-slate-100 text-slate-700';
      case 'professional': return 'bg-blue-100 text-blue-700';
      case 'enterprise': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredCompanies = mockCompanyAnalytics.filter(company => {
    const matchesSearch = company.company.toLowerCase().includes(searchCompanies.toLowerCase()) ||
                         company.domain.toLowerCase().includes(searchCompanies.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchCompanies.toLowerCase());
    const matchesStatus = filterStatus === 'all' || company.status === filterStatus;
    const matchesPlan = filterPlan === 'all' || company.plan.toLowerCase() === filterPlan.toLowerCase();

    return matchesSearch && matchesStatus && matchesPlan;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'companies', label: 'Companies', icon: Building2 },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'engagement', label: 'Engagement', icon: Activity },
    { id: 'trends', label: 'Trends', icon: TrendingUp }
  ];

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(mockAnalytics.totalRevenue)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+{mockAnalytics.monthlyGrowth}% this month</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Companies</p>
              <p className="text-2xl font-bold text-slate-900">{mockAnalytics.totalCompanies}</p>
              <div className="flex items-center mt-2">
                <Users className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">{mockAnalytics.totalUsers} total users</span>
              </div>
            </div>
            <Building2 className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Avg. Deal Size</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(mockAnalytics.avgDealSize)}</p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm text-slate-600">{formatPercent(mockAnalytics.churnRate)} churn rate</span>
              </div>
            </div>
            <Target className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Survey Responses</p>
              <p className="text-2xl font-bold text-slate-900">{mockAnalytics.totalResponses.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <MessageSquare className="h-4 w-4 text-purple-500 mr-1" />
                <span className="text-sm text-purple-600">{formatPercent(mockAnalytics.surveyCompletionRate)} completion</span>
              </div>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Growth</h3>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Revenue trend visualization</p>
              <p className="text-sm text-slate-500 mt-2">
                Monthly growth: +{mockAnalytics.monthlyGrowth}% | YTD: {formatCurrency(mockAnalytics.totalRevenue)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">User Engagement</h3>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Engagement metrics visualization</p>
              <p className="text-sm text-slate-500 mt-2">
                Avg. users per company: {mockAnalytics.avgUsersPerCompany} | Satisfaction: {mockAnalytics.clientSatisfaction}/5.0
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Plan Distribution</h4>
          <div className="space-y-3">
            {['Enterprise', 'Professional', 'Starter'].map((plan) => {
              const count = mockCompanyAnalytics.filter(c => c.plan === plan).length;
              const percentage = (count / mockCompanyAnalytics.length) * 100;
              return (
                <div key={plan} className="flex items-center justify-between">
                  <span className="text-slate-600">{plan}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-slate-200 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          plan === 'Enterprise' ? 'bg-purple-500' :
                          plan === 'Professional' ? 'bg-blue-500' : 'bg-slate-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-slate-900">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Health Metrics</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Active Companies</span>
              <span className="font-medium text-green-600">
                {mockCompanyAnalytics.filter(c => c.status === 'active').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">At Risk</span>
              <span className="font-medium text-orange-600">
                {mockCompanyAnalytics.filter(c => c.status === 'at_risk').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Trial Period</span>
              <span className="font-medium text-blue-600">
                {mockCompanyAnalytics.filter(c => c.status === 'trial').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600">Avg. Satisfaction</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                <span className="font-medium text-slate-900">{mockAnalytics.clientSatisfaction}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">New enterprise client</p>
                <p className="text-xs text-slate-500">MegaCorp Enterprises joined</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Revenue milestone</p>
                <p className="text-xs text-slate-500">$90K monthly recurring revenue</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Feature adoption</p>
                <p className="text-xs text-slate-500">AI generation usage up 45%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCompaniesTab = () => (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchCompanies}
              onChange={(e) => setSearchCompanies(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              placeholder="Search companies, domains, or industries..."
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="at_risk">At Risk</option>
            <option value="trial">Trial</option>
            <option value="churned">Churned</option>
          </select>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="all">All Plans</option>
            <option value="starter">Starter</option>
            <option value="professional">Professional</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>
      </Card>

      {/* Companies Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Company Analytics ({filteredCompanies.length} companies)
          </h3>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="py-3 px-4 font-medium text-slate-700">Company</th>
                <th className="py-3 px-4 font-medium text-slate-700">Plan</th>
                <th className="py-3 px-4 font-medium text-slate-700">Users</th>
                <th className="py-3 px-4 font-medium text-slate-700">Utilization</th>
                <th className="py-3 px-4 font-medium text-slate-700">Engagement</th>
                <th className="py-3 px-4 font-medium text-slate-700">Revenue</th>
                <th className="py-3 px-4 font-medium text-slate-700">Status</th>
                <th className="py-3 px-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-600 rounded-lg flex items-center justify-center text-white font-medium text-sm">
                        {company.company.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">{company.company}</p>
                        <p className="text-sm text-slate-500">{company.domain}</p>
                        <p className="text-xs text-slate-400">{company.industry}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getPlanColor(company.plan)}>
                        {company.plan}
                      </Badge>
                      {company.customPricing && (
                        <Badge variant="outline" className="bg-purple-100 text-purple-700 text-xs">
                          Custom
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <span className="font-medium text-slate-900">{company.userCount}</span>
                      <span className="text-slate-500">/{company.maxUsers}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full">
                        <div
                          className={`h-2 rounded-full ${
                            company.utilizationRate >= 80 ? 'bg-green-500' :
                            company.utilizationRate >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${company.utilizationRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-slate-600">{company.utilizationRate}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${getEngagementColor(company.engagementScore)}`}>
                      {company.engagementScore}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm">
                      <p className="font-medium text-slate-900">{formatCurrency(company.monthlyRevenue)}/mo</p>
                      <p className="text-slate-500">{formatCurrency(company.totalRevenue)} total</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge className={getStatusColor(company.status)}>
                      {getStatusIcon(company.status)}
                      <span className="ml-1 capitalize">{company.status.replace('_', ' ')}</span>
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderRevenueTab = () => (
    <div className="space-y-6">
      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Monthly Recurring Revenue</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(89650)}</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600">+23% vs last month</span>
              </div>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Annual Run Rate</p>
              <p className="text-2xl font-bold text-slate-900">{formatCurrency(89650 * 12)}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-blue-500 mr-1" />
                <span className="text-sm text-blue-600">Projected growth</span>
              </div>
            </div>
            <BarChart3 className="h-8 w-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Churn Rate</p>
              <p className="text-2xl font-bold text-slate-900">{formatPercent(mockAnalytics.churnRate)}</p>
              <div className="flex items-center mt-2">
                <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                <span className="text-sm text-red-600">Monthly churn</span>
              </div>
            </div>
            <Percent className="h-8 w-8 text-red-600" />
          </div>
        </Card>
      </div>

      {/* Revenue Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue by Plan</h3>
          <div className="space-y-4">
            {['Enterprise', 'Professional', 'Starter'].map((plan) => {
              const companies = mockCompanyAnalytics.filter(c => c.plan === plan);
              const revenue = companies.reduce((sum, c) => sum + c.monthlyRevenue, 0);
              const percentage = (revenue / mockAnalytics.totalRevenue) * 100;

              return (
                <div key={plan} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">{plan}</span>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{formatCurrency(revenue)}</span>
                      <span className="text-sm text-slate-500 ml-2">{formatPercent(percentage)}</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        plan === 'Enterprise' ? 'bg-purple-500' :
                        plan === 'Professional' ? 'bg-blue-500' : 'bg-slate-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-slate-500">{companies.length} companies</p>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Revenue Trends</h3>
          <div className="h-64 bg-slate-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600">Revenue trend chart</p>
              <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                <div>
                  <p className="text-slate-500">This Month</p>
                  <p className="font-bold">{formatCurrency(89650)}</p>
                </div>
                <div>
                  <p className="text-slate-500">Last Month</p>
                  <p className="font-bold">{formatCurrency(79860)}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Revenue Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Revenue History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-medium text-slate-700">Month</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">New Clients</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Churn</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Net Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Growth</th>
              </tr>
            </thead>
            <tbody>
              {mockRevenueData.map((data, index) => {
                const prevMonth = index > 0 ? mockRevenueData[index - 1] : null;
                const growth = prevMonth ? ((data.revenue - prevMonth.revenue) / prevMonth.revenue) * 100 : 0;

                return (
                  <tr key={data.month} className="border-b border-slate-100">
                    <td className="py-3 px-4 font-medium text-slate-900">{data.month}</td>
                    <td className="py-3 px-4">{formatCurrency(data.revenue)}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <Plus className="h-3 w-3 text-green-500 mr-1" />
                        {data.newClients}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        {data.churn}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(data.netRevenue)}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {growth >= 0 ? '+' : ''}{formatPercent(growth)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'companies': return renderCompaniesTab();
      case 'revenue': return renderRevenueTab();
      case 'engagement':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-500">Engagement analytics coming soon...</p>
          </div>
        );
      case 'trends':
        return (
          <div className="flex items-center justify-center h-64">
            <p className="text-slate-500">Trend analysis coming soon...</p>
          </div>
        );
      default: return renderOverviewTab();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="border-b p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
            <p className="text-slate-600">Comprehensive insights across all client companies and projects</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm"
            >
              <option value="last-7-days">Last 7 days</option>
              <option value="last-30-days">Last 30 days</option>
              <option value="last-90-days">Last 90 days</option>
              <option value="last-12-months">Last 12 months</option>
            </select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={onClose}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Close
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
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
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
