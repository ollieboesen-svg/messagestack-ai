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
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar,
  Bell,
  Search,
  FileText,
  BarChart3,
  Target,
  Briefcase
} from "lucide-react";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  company: string;
  projects: number;
  status: 'active' | 'pending' | 'completed';
  revenue: number;
  nextMeeting?: Date;
}

const mockClients: Client[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    company: "TechFlow Inc",
    projects: 2,
    status: "active",
    revenue: 45000,
    nextMeeting: new Date(Date.now() + 86400000)
  },
  {
    id: "2",
    name: "Michael Chen",
    company: "DataVista",
    projects: 1,
    status: "active",
    revenue: 28000,
    nextMeeting: new Date(Date.now() + 172800000)
  },
  {
    id: "3",
    name: "Emma Williams",
    company: "CloudScale",
    projects: 3,
    status: "active",
    revenue: 62000
  },
  {
    id: "4",
    name: "James Lee",
    company: "MarketPro",
    projects: 1,
    status: "pending",
    revenue: 0
  }
];

export default function ConsultantDashboard() {
  const [clients] = useState<Client[]>(mockClients);

  const totalRevenue = clients.reduce((sum, client) => sum + client.revenue, 0);
  const activeClients = clients.filter(c => c.status === 'active').length;
  const totalProjects = clients.reduce((sum, client) => sum + client.projects, 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-blue-100 text-blue-700';
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
                <h1 className="text-xl font-bold text-slate-900">Consultant Dashboard</h1>
                <p className="text-sm text-slate-600">Welcome back, Alex</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search clients..."
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
            {/* Revenue Stats */}
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <Badge className="bg-green-100 text-green-700 text-xs">+18%</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">${(totalRevenue / 1000).toFixed(0)}K</p>
                <p className="text-sm text-slate-600">Total Revenue</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">Active</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">{activeClients}</p>
                <p className="text-sm text-slate-600">Active Clients</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="text-xs">{totalProjects}</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">{totalProjects}</p>
                <p className="text-sm text-slate-600">Active Projects</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <Badge className="bg-purple-100 text-purple-700 text-xs">+12%</Badge>
                </div>
                <p className="text-2xl font-bold text-slate-900">94%</p>
                <p className="text-sm text-slate-600">Client Satisfaction</p>
              </Card>
            </div>

            {/* Clients */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Your Clients</h2>
                <Button className="text-white" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Client
                </Button>
              </div>

              <div className="space-y-4">
                {clients.map(client => (
                  <Card key={client.id} className="p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold text-lg">
                            {client.name.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-bold text-slate-900">{client.name}</h3>
                            <Badge className={`text-xs ${getStatusColor(client.status)}`}>
                              {client.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{client.company}</p>

                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center text-slate-600">
                              <Briefcase className="h-4 w-4 mr-1" />
                              <span>{client.projects} {client.projects === 1 ? 'project' : 'projects'}</span>
                            </div>
                            <div className="flex items-center text-slate-600">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span>${(client.revenue / 1000).toFixed(0)}K revenue</span>
                            </div>
                            {client.nextMeeting && (
                              <div className="flex items-center text-teal-600">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>Meeting {client.nextMeeting > new Date() ? 'in' : ''} {Math.abs(Math.floor((client.nextMeeting.getTime() - Date.now()) / 86400000))}d</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          View
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>

                    {client.projects > 0 && (
                      <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-slate-100">
                        <Link href="/project/demo/analytics">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <BarChart3 className="h-3 w-3 mr-1" />
                            Analytics
                          </Button>
                        </Link>
                        <Link href="/project/demo/analytics">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <Target className="h-3 w-3 mr-1" />
                            Strategy
                          </Button>
                        </Link>
                        <Link href="/project/demo/copy-engine">
                          <Button variant="ghost" size="sm" className="text-xs">
                            <FileText className="h-3 w-3 mr-1" />
                            Copy and Content
                          </Button>
                        </Link>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* This Week */}
            <Card className="p-6 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
              <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-teal-600" />
                This Week
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Client Review</p>
                    <p className="text-xs text-slate-600">TechFlow Inc • Tomorrow 2PM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Strategy Session</p>
                    <p className="text-xs text-slate-600">DataVista • Wed 10AM</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Deadline</p>
                    <p className="text-xs text-slate-600">CloudScale deliverables • Fri</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/project/demo/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Analytics and Strategy
                  </Button>
                </Link>
                <Link href="/project/demo/copy-engine">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Copy and Content
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Team
                </Button>
              </div>
            </Card>

            {/* Performance */}
            <Card className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">This Month</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Projects Completed</span>
                    <span className="text-sm font-semibold text-slate-900">8/10</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '80%'}} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Revenue Target</span>
                    <span className="text-sm font-semibold text-slate-900">${(totalRevenue/1000).toFixed(0)}K/$150K</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-teal-500 h-2 rounded-full" style={{width: `${(totalRevenue/150000)*100}%`}} />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-600">Client Satisfaction</span>
                    <span className="text-sm font-semibold text-slate-900">94%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{width: '94%'}} />
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
