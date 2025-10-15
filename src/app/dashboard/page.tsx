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
  LogOut,
  User,
  Building2,
  Bell,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Target,
  Grid3X3,
  Copy,
  Calendar,
  Activity,
  Eye,
  Shield
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthGuard, { useAuth, SecurityStatus } from "@/components/AuthGuard";
import { removeSecureToken } from "@/lib/auth";
import { LogoCompact } from "@/components/Logo";
import ConsultantDashboard from "@/components/ConsultantDashboard";

function DashboardContent() {
  const router = useRouter();
  const auth = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    removeSecureToken();
    router.push("/");
  };

  if (!auth.user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  const userData = auth.user;

  // Show consultant dashboard for consultant users
  if (userData.isConsultant) {
    return <ConsultantDashboard />;
  }

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <LogoCompact />
            </div>

            <div className="flex items-center space-x-4">
              <SecurityStatus />

              <Button variant="outline" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {userData.role === "consultant" && (
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin Panel
                  </Button>
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center text-white text-sm font-medium">
                    {userData.firstName[0]}{userData.lastName[0]}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-sm font-medium text-slate-900">{userData.firstName} {userData.lastName}</p>
                    <p className="text-xs text-slate-500">{userData.company}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-10">
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      Preferences
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {getWelcomeMessage()}, {userData.firstName}! 👋
            </h1>
            <p className="text-lg text-slate-600">
              Let's get messaging. Ready to create strategic messaging that resonates?
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Active Surveys</p>
                  <p className="text-2xl font-bold text-slate-900">3</p>
                </div>
                <MessageSquare className="h-8 w-8 text-teal-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Responses</p>
                  <p className="text-2xl font-bold text-slate-900">127</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Briefs Created</p>
                  <p className="text-2xl font-bold text-slate-900">5</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">Messages Generated</p>
                  <p className="text-2xl font-bold text-slate-900">42</p>
                </div>
                <Copy className="h-8 w-8 text-purple-600" />
              </div>
            </Card>
          </div>

          {/* Quick Test Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Quick Test & Navigation</h2>
            <p className="text-slate-600 mb-6">
              Test survey functionality and navigate to different parts of the platform.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <Eye className="h-5 w-5 text-teal-600" />
                  <h3 className="font-semibold text-slate-900">Test Survey Experience</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">Experience how end users fill out surveys</p>
                <Button
                  onClick={() => router.push("/survey/test-survey-123")}
                  className="w-full text-sm"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
                >
                  View Test Survey
                </Button>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Research Hub</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">Create and manage surveys & questions</p>
                <Link href="/research">
                  <Button variant="outline" className="w-full text-sm border-blue-200 text-blue-700 hover:bg-blue-50">
                    Go to Research
                  </Button>
                </Link>
              </Card>

              <Card className="p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <Settings className="h-5 w-5 text-purple-600" />
                  <h3 className="font-semibold text-slate-900">Admin Panel</h3>
                </div>
                <p className="text-sm text-slate-600 mb-4">Manage users and platform settings</p>
                <Link href="/admin">
                  <Button variant="outline" className="w-full text-sm border-purple-200 text-purple-700 hover:bg-purple-50">
                    Admin Panel
                  </Button>
                </Link>
              </Card>
            </div>
          </div>

          {/* Your Messaging Journey */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Your messaging journey</h2>
            <p className="text-slate-600 mb-8">
              Follow our proven methodology to create compelling messaging that drives results.
            </p>

            <div className="space-y-6">
              {/* Step 1: Insight Hub */}
              <Card className="p-6 border-l-4 border-l-teal-500">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}>
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-900">Insight Hub</h3>
                        <Badge className="bg-green-100 text-green-700">In Progress</Badge>
                      </div>
                      <p className="text-slate-600 mb-3">
                        Collect and synthesize stakeholder insights across different perspectives through comprehensive research and analysis.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-slate-500">
                        <span className="flex items-center">
                          <Activity className="h-4 w-4 mr-1" />
                          3 active surveys
                        </span>
                        <span className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          127 responses collected
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link href="/research">
                    <Button className="text-white shadow-lg hover:shadow-xl transition-all duration-300" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)'}}>
                      Continue
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Step 2: Strategic Brief */}
              <Card className="p-6 border-l-4 border-l-slate-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100">
                      <FileText className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-600">Strategic Brief</h3>
                        <Badge variant="secondary">Coming Next</Badge>
                      </div>
                      <p className="text-slate-500 mb-3">
                        Create strategic brief that synthesizes insights into positioning requirements and imperatives.
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-slate-400">
                        <span>Unlock with completed research</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" disabled>
                    Locked
                  </Button>
                </div>
              </Card>

              {/* Step 3: Message Grid */}
              <Card className="p-6 border-l-4 border-l-slate-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100">
                      <Grid3X3 className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-600">Message Grid</h3>
                        <Badge variant="secondary">Step 3</Badge>
                      </div>
                      <p className="text-slate-500 mb-3">
                        Visual framework for mapping audiences, value drivers, and proof points with strategic precision.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" disabled>
                    Locked
                  </Button>
                </div>
              </Card>

              {/* Step 4: Copy Engine */}
              <Card className="p-6 border-l-4 border-l-slate-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-slate-100">
                      <Copy className="h-6 w-6 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-slate-600">Copy Engine</h3>
                        <Badge variant="secondary">Step 4</Badge>
                      </div>
                      <p className="text-slate-500 mb-3">
                        AI-assisted copy generation, tailored to channels and tones. Turn strategy into powerful words.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" disabled>
                    Locked
                  </Button>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Customer Survey completed</p>
                  <p className="text-xs text-slate-500">32 responses collected • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">New survey created: "Employee Feedback"</p>
                  <p className="text-xs text-slate-500">Survey sent to 45 recipients • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900">Research file uploaded</p>
                  <p className="text-xs text-slate-500">competitor-analysis.pdf • 3 days ago</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Quick Links */}
          <Card className="p-6 mt-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Preview</h3>
            <div className="space-y-3">
              <Link href="/survey/demo-survey-123">
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Survey Experience (End User View)
                </Button>
              </Link>
              <p className="text-xs text-slate-500">See what your surveys look like to respondents</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  );
}
