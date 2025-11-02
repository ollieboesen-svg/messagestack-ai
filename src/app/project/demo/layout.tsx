"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  FileText,
  Grid3X3,
  BarChart3,
  Sparkles,
  Home,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { demoProject } from "@/lib/demo-data";

const navigation = [
  { name: "Overview", href: "/project/demo", icon: Home, color: "#1DD1A1" },
  { name: "Research and Insights", href: "/project/demo/research", icon: Users, color: "#1DD1A1" },
  { name: "Analytics and Strategy", href: "/project/demo/analytics", icon: BarChart3, color: "#17A2B8" },
  { name: "Message Frameworks", href: "/project/demo/message-grid", icon: Grid3X3, color: "#1E6EEB" },
  {
    name: "Copy and Content",
    href: "/project/demo/copy-engine",
    icon: () => (
      <div className="flex flex-col space-y-0.5">
        <div className="w-4 h-0.5 bg-current rounded-full"></div>
        <div className="w-4 h-0.5 bg-current rounded-full"></div>
        <div className="w-4 h-0.5 bg-current rounded-full"></div>
      </div>
    ),
    color: "#2563EB"
  }
];

export default function ProjectDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-40">
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
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Exit Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden md:block w-64 bg-white border-r min-h-screen sticky top-[73px] h-[calc(100vh-73px)]">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="font-bold text-slate-900 text-lg mb-1">{demoProject.name}</h2>
              <p className="text-sm text-slate-600">{demoProject.company}</p>
              <Badge className="mt-2 bg-teal-100 text-teal-700">Demo Project</Badge>
            </div>

            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.name} href={item.href}>
                    <div
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer ${
                        isActive
                          ? "bg-gradient-to-r from-teal-50 to-blue-50 text-slate-900 font-medium"
                          : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                          isActive ? "shadow-sm" : ""
                        }`}
                        style={{
                          background: isActive
                            ? item.color
                            : "#f1f5f9",
                          color: isActive ? "white" : "#94a3b8"
                        }}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="flex-1">{item.name}</span>
                      {isActive && <ChevronRight className="h-4 w-4 text-slate-400" />}
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r">
              <div className="p-6">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="font-bold text-slate-900 text-lg mb-1">
                      {demoProject.name}
                    </h2>
                    <Badge className="mt-2 bg-teal-100 text-teal-700">Demo Project</Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <nav className="space-y-1">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                      <Link key={item.name} href={item.href}>
                        <div
                          onClick={() => setSidebarOpen(false)}
                          className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-200 group cursor-pointer ${
                            isActive
                              ? "bg-gradient-to-r from-teal-50 to-blue-50 text-slate-900 font-medium"
                              : "text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                              isActive ? "shadow-sm" : ""
                            }`}
                            style={{
                              background: isActive ? item.color : "#f1f5f9",
                              color: isActive ? "white" : "#94a3b8"
                            }}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <span className="flex-1">{item.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}
