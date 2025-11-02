"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Plus,
  ArrowRight,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  Grid3X3,
  MessageSquare,
  Clock,
  CheckCircle,
  Users,
  Target,
  TrendingUp,
  Calendar,
  Bell,
  Search
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  status: 'active' | 'completed' | 'draft';
  progress: number;
  lastUpdated: Date;
  stage: string;
}

const mockProjects: Project[] = [
  {
    id: "1",
    name: "Product Launch Messaging",
    status: "active",
    progress: 65,
    lastUpdated: new Date(Date.now() - 3600000),
    stage: "Strategy"
  },
  {
    id: "2",
    name: "Brand Refresh Campaign",
    status: "active",
    progress: 40,
    lastUpdated: new Date(Date.now() - 86400000),
    stage: "Analytics"
  },
  {
    id: "3",
    name: "Q4 Sales Enablement",
    status: "draft",
    progress: 15,
    lastUpdated: new Date(Date.now() - 172800000),
    stage: "Research"
  }
];

export default function ClientDashboard() {
  const [projects] = useState<Project[]>(mockProjects);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
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
                <h1 className="text-xl font-bold text-slate-900">Client Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, Sarah</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 text-sm w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Stats */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-teal-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">{projects.filter(p => p.status === 'active').length}</p>
                <p className="text-sm text-slate-600">Active Projects</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">On Track</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">85%</p>
                <p className="text-sm text-slate-600">Avg Progress</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">+12%</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">24</p>
                <p className="text-sm text-slate-600">Assets Created</p>
              </Card>
            </div>

            {/* Projects */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Your Projects</h2>
                <Button className="text-white" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Project
                </Button>
              </div>

              <div className="space-y-4">
                {projects.map(project => (
                  <Card key={project.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                          <Badge className={`text-xs ${getStatusColor(project.status)}`}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-600">
                          <span className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            Updated {Math.floor((Date.now() - project.lastUpdated.getTime()) / 3600000)}h ago
                          </span>
                          <Link
                            href={
                              project.stage === 'Research' ? '/project/demo/research' :
                              project.stage === 'Analytics' || project.stage === 'Strategy' ? '/project/demo/analytics' :
                              project.stage === 'Message Frameworks' ? '/project/demo/message-grid' :
                              '/project/demo/copy-engine'
                            }
                            className="flex items-center hover:text-teal-600 transition-colors"
                          >
                            <Target className="h-4 w-4 mr-1" />
                            {project.stage === 'Strategy' ? 'Analytics & Strategy' : project.stage}
                          </Link>
                        </div>
                      </div>
                      <Link
                        href={
                          project.stage === 'Research' ? '/project/demo/research' :
                          project.stage === 'Analytics' || project.stage === 'Strategy' ? '/project/demo/analytics' :
                          project.stage === 'Message Grid' ? '/project/demo/message-grid' :
                          '/project/demo/copy-engine'
                        }
                      >
                        <Button variant="outline" size="sm">
                          Open
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Progress</span>
                        <span className="font-semibold text-slate-900">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${project.progress}%`,
                            background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mt-4 pt-4 border-t border-slate-100">
                      <Link href="/project/demo/research">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          Research
                        </Button>
                      </Link>
                      <Link href="/project/demo/analytics">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Strategy
                        </Button>
                      </Link>
                      <Link href="/project/demo/message-grid">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <Grid3X3 className="h-3 w-3 mr-1" />
                          Frameworks
                        </Button>
                      </Link>
                      <Link href="/project/demo/copy-engine">
                        <Button variant="ghost" size="sm" className="text-xs">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Content
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/project/demo/research">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Research and Insights
                  </Button>
                </Link>
                <Link href="/project/demo/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics and Strategy
                  </Button>
                </Link>
                <Link href="/project/demo/message-grid">
                  <Button variant="outline" className="w-full justify-start">
                    <Grid3X3 className="h-4 w-4 mr-2" />
                    Message Frameworks
                  </Button>
                </Link>
                <Link href="/project/demo/copy-engine">
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Copy and Content
                  </Button>
                </Link>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900 font-medium">Copy approved</p>
                    <p className="text-xs text-slate-500">Product Launch Email • 2h ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900 font-medium">Strategy updated</p>
                    <p className="text-xs text-slate-500">Brand Refresh • 5h ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-900 font-medium">Team member added</p>
                    <p className="text-xs text-slate-500">John joined the project • 1d ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Upcoming */}
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                Upcoming
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Review Session</p>
                    <p className="text-xs text-slate-600">Tomorrow, 2:00 PM</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Tomorrow</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Launch Deadline</p>
                    <p className="text-xs text-slate-600">Dec 15, 2024</p>
                  </div>
                  <Badge variant="outline" className="text-xs">7 days</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
