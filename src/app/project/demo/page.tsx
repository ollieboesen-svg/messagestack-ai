"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Grid3X3,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Clock,
  TrendingUp,
  Target
} from "lucide-react";
import { demoProject } from "@/lib/demo-data";

const phases = [
  {
    name: "Research and Insights",
    status: "completed",
    href: "/project/demo/research",
    icon: Users,
    color: "#1DD1A1",
    progress: 100,
    description: "Multi-format surveys across stakeholder groups"
  },
  {
    name: "Analytics and Strategy",
    status: "completed",
    href: "/project/demo/analytics",
    icon: BarChart3,
    color: "#17A2B8",
    progress: 100,
    description: "Data insights and strategic recommendations"
  },
  {
    name: "Message Frameworks",
    status: "in-progress",
    href: "/project/demo/message-grid",
    icon: Grid3X3,
    color: "#1E6EEB",
    progress: 60,
    description: "Structured messaging framework"
  },
  {
    name: "Copy and Content",
    status: "not-started",
    href: "/project/demo/copy-engine",
    icon: () => (
      <div className="flex flex-col space-y-0.5">
        <div className="w-4 h-0.5 bg-current rounded-full"></div>
        <div className="w-4 h-0.5 bg-current rounded-full"></div>
        <div className="w-4 h-0.5 bg-current rounded-full"></div>
      </div>
    ),
    color: "#2563EB",
    progress: 30,
    description: "AI-powered content generation"
  }
];

export default function ProjectDashboard() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-slate-600 mb-3">
          <span>Projects</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">Demo Project</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          {demoProject.name}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl">
          {demoProject.description}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-teal-600" />
            <Badge className="bg-teal-100 text-teal-700">Research</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {demoProject.stats.surveyResponses}
          </div>
          <div className="text-sm text-slate-600">Survey Responses</div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-5 w-5 text-cyan-600" />
            <Badge className="bg-cyan-100 text-cyan-700">Strategy</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {demoProject.stats.strategicImperatives}
          </div>
          <div className="text-sm text-slate-600">Strategic Imperatives</div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <Grid3X3 className="h-5 w-5 text-blue-600" />
            <Badge className="bg-blue-100 text-blue-700">Messaging</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {demoProject.stats.messagePillars}
          </div>
          <div className="text-sm text-slate-600">Message Pillars</div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <Badge className="bg-indigo-100 text-indigo-700">Content</Badge>
          </div>
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {demoProject.stats.copyAssets}
          </div>
          <div className="text-sm text-slate-600">Copy Assets Created</div>
        </Card>
      </div>

      {/* Progress Tracker */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Project Progress</h2>
        <div className="space-y-4">
          {phases.map((phase, index) => {
            const Icon = phase.icon;
            const statusConfig = {
              completed: { label: "Completed", color: "text-green-600", bg: "bg-green-100" },
              "in-progress": { label: "In Progress", color: "text-blue-600", bg: "bg-blue-100" },
              "not-started": { label: "Ready to Start", color: "text-slate-600", bg: "bg-slate-100" }
            };
            const config = statusConfig[phase.status as keyof typeof statusConfig];

            return (
              <div key={phase.name} className="flex items-center space-x-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: phase.color }}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-900">{phase.name}</h3>
                    </div>
                    <Badge className={`${config.bg} ${config.color}`}>
                      {config.label}
                    </Badge>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all duration-500"
                      style={{
                        width: `${phase.progress}%`,
                        background: phase.color
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Navigation Cards */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Navigate Your Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {phases.map((phase) => {
            const Icon = phase.icon;
            return (
              <Link key={phase.name} href={phase.href}>
                <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group border-2 border-transparent hover:border-teal-200">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ background: phase.color }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-teal-700 transition-colors">
                    {phase.name}
                  </h3>
                  <div className="w-full bg-slate-200 rounded-full h-1.5 mb-3">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${phase.progress}%`,
                        background: phase.color
                      }}
                    />
                  </div>
                  <p className="text-sm text-slate-600">
                    {phase.status === "completed" && "View completed research and insights"}
                    {phase.status === "in-progress" && "Continue building your strategy"}
                    {phase.status === "not-started" && "Ready to generate compelling copy"}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Next Steps */}
      <Card className="mt-8 p-6 bg-gradient-to-r from-teal-50 to-blue-50 border-teal-200">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <CheckCircle className="h-5 w-5 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 mb-2">Ready for the Next Step?</h3>
            <p className="text-slate-700 mb-4">
              Your research and analytics are complete. Continue to build your message framework and create your messaging strategy.
            </p>
            <Link href="/project/demo/research">
              <Button
                className="text-white shadow-lg hover:shadow-xl transition-all duration-300"
                style={{ background: "linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)" }}
              >
                Start with Research
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
