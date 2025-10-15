"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  MessageSquare,
  BarChart3,
  Settings,
  Eye,
  Plus,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Mail,
  Phone,
  Globe,
  LogOut
} from "lucide-react";
import { useAuth } from "@/components/AuthGuard";
import { useRouter } from "next/navigation";
import { removeSecureToken } from "@/lib/auth";
import { LogoCompact } from "@/components/Logo";
import NewClientProject from "./NewClientProject";
import AnalyticsDashboard from "./AnalyticsDashboard";
import PlatformSettings from "./PlatformSettings";

interface ClientProject {
  id: string;
  clientName: string;
  company: string;
  email: string;
  status: 'active' | 'completed' | 'paused';
  currentStep: 1 | 2 | 3 | 4;
  stepNames: string[];
  progress: number;
  startDate: Date;
  lastActivity: Date;
  surveysActive: number;
  responsesCollected: number;
  teamMembers: number;
}

const mockProjects: ClientProject[] = [
  {
    id: 'proj-1',
    clientName: 'John Doe',
    company: 'Demo Company',
    email: 'user@demo.com',
    status: 'active',
    currentStep: 2,
    stepNames: ['Stakeholder insights', 'Analysis and strategy', 'Message grids', 'Copy and content'],
    progress: 45,
    startDate: new Date('2024-01-15'),
    lastActivity: new Date('2024-01-25'),
    surveysActive: 2,
    responsesCollected: 27,
    teamMembers: 3
  },
  {
    id: 'proj-2',
    clientName: 'Sarah Johnson',
    company: 'TechCorp Solutions',
    email: 'sarah@techcorp.com',
    status: 'active',
    currentStep: 3,
    stepNames: ['Stakeholder insights', 'Analysis and strategy', 'Message grids', 'Copy and content'],
    progress: 75,
    startDate: new Date('2024-01-10'),
    lastActivity: new Date('2024-01-24'),
    surveysActive: 1,
    responsesCollected: 43,
    teamMembers: 5
  },
  {
    id: 'proj-3',
    clientName: 'Michael Chen',
    company: 'Growth Startup',
    email: 'mike@growthstartup.io',
    status: 'completed',
    currentStep: 4,
    stepNames: ['Stakeholder insights', 'Analysis and strategy', 'Message grids', 'Copy and content'],
    progress: 100,
    startDate: new Date('2023-12-01'),
    lastActivity: new Date('2024-01-20'),
    surveysActive: 0,
    responsesCollected: 67,
    teamMembers: 4
  },
  {
    id: 'proj-4',
    clientName: 'Emma Wilson',
    company: 'FinanceFlow Inc',
    email: 'emma@financeflow.com',
    status: 'paused',
    currentStep: 1,
    stepNames: ['Stakeholder insights', 'Analysis and strategy', 'Message grids', 'Copy and content'],
    progress: 15,
    startDate: new Date('2024-01-22'),
    lastActivity: new Date('2024-01-23'),
    surveysActive: 0,
    responsesCollected: 5,
    teamMembers: 2
  }
];

export default function ConsultantDashboard() {
  const auth = useAuth();
  const router = useRouter();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [viewAsClient, setViewAsClient] = useState<string | null>(null);

  // Modal states
  const [showNewProject, setShowNewProject] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    removeSecureToken();
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'paused': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStepColor = (step: number) => {
    const colors = [
      'from-teal-500 to-teal-600',
      'from-blue-500 to-blue-600',
      'from-purple-500 to-purple-600',
      'from-green-500 to-green-600'
    ];
    return colors[step - 1] || colors[0];
  };

  const handleViewAsClient = (projectId: string, clientEmail: string) => {
    setViewAsClient(clientEmail);
    // In a real app, this would switch the session to impersonate the client
    console.log(`Viewing as client: ${clientEmail} for project: ${projectId}`);
    // Could redirect to dashboard with special impersonation mode
    router.push(`/dashboard?impersonate=${clientEmail}`);
  };

  const handleNewProject = (projectData: any) => {
    console.log('Creating new project:', projectData);
    // Here you would make an API call to create the project
    setShowNewProject(false);
    // Refresh the projects list
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Enhanced Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LogoCompact />
              <div className="h-6 w-px bg-slate-300"></div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Consultant Portal</h1>
                <p className="text-sm text-slate-600">Welcome back, {auth.user?.firstName}!</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="bg-purple-100 text-purple-700">
                <UserCheck className="h-3 w-3 mr-1" />
                Consultant Access
              </Badge>

              <Button
                onClick={() => setShowAnalytics(true)}
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Analytics
              </Button>

              <Button
                onClick={() => setShowSettings(true)}
                variant="outline"
                size="sm"
                className="border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>

              <Button
                onClick={() => setShowNewProject(true)}
                className="text-white"
                style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Client Project
              </Button>

              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Projects</p>
                  <p className="text-2xl font-bold text-slate-900">{mockProjects.filter(p => p.status === 'active').length}</p>
                </div>
                <Building2 className="h-8 w-8 text-teal-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Clients</p>
                  <p className="text-2xl font-bold text-slate-900">{mockProjects.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Surveys</p>
                  <p className="text-2xl font-bold text-slate-900">{mockProjects.reduce((sum, p) => sum + p.surveysActive, 0)}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Total Responses</p>
                  <p className="text-2xl font-bold text-slate-900">{mockProjects.reduce((sum, p) => sum + p.responsesCollected, 0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </Card>
          </div>

          {/* Client Projects Table */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-900">Client Projects</h2>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  This Month
                </Button>
                <Button
                  onClick={() => setShowAnalytics(true)}
                  variant="outline"
                  size="sm"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {mockProjects.map((project) => (
                <div key={project.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center text-white font-medium">
                        {project.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900">{project.clientName}</h3>
                        <p className="text-slate-600">{project.company}</p>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {project.email}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-3 w-3 mr-1" />
                            {project.teamMembers} members
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status}</span>
                      </Badge>
                      <Button
                        onClick={() => handleViewAsClient(project.id, project.email)}
                        variant="outline"
                        size="sm"
                        className="border-teal-200 text-teal-700 hover:bg-teal-50"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View as Client
                      </Button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">
                        Step {project.currentStep}: {project.stepNames[project.currentStep - 1]}
                      </span>
                      <span className="text-sm text-slate-500">{project.progress}% complete</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full bg-gradient-to-r ${getStepColor(project.currentStep)} transition-all duration-300`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Active Surveys</p>
                      <p className="text-lg font-semibold text-slate-900">{project.surveysActive}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Responses</p>
                      <p className="text-lg font-semibold text-slate-900">{project.responsesCollected}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-500">Last Activity</p>
                      <p className="text-lg font-semibold text-slate-900">
                        {Math.floor((Date.now() - project.lastActivity.getTime()) / (1000 * 60 * 60 * 24))}d ago
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowNewProject(true)}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Plus className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Add New Client</h3>
                  <p className="text-sm text-slate-600">Set up a new messaging project</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowAnalytics(true)}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Analytics Overview</h3>
                  <p className="text-sm text-slate-600">View all client analytics</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowSettings(true)}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Settings className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Platform Settings</h3>
                  <p className="text-sm text-slate-600">Manage global configurations</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showNewProject && (
        <NewClientProject
          onClose={() => setShowNewProject(false)}
          onSubmit={handleNewProject}
        />
      )}

      {showAnalytics && (
        <AnalyticsDashboard
          onClose={() => setShowAnalytics(false)}
        />
      )}

      {showSettings && (
        <PlatformSettings
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
