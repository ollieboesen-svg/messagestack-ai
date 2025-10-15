"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import Logo, { LogoIcon, LogoCompact } from "@/components/Logo";

export default function LogoDemo() {
  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              MessageStack AI Logo System
            </h1>
            <p className="text-lg text-slate-600">
              Custom logo variations with your brand colors and animated AI text
            </p>
          </div>

          <div className="space-y-8">
            {/* Full Logo Variations */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Complete Logo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3">
                    <Logo size="sm" />
                  </div>
                  <p className="text-sm text-slate-600">Small</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3">
                    <Logo size="md" />
                  </div>
                  <p className="text-sm text-slate-600">Medium</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3">
                    <Logo size="lg" />
                  </div>
                  <p className="text-sm text-slate-600">Large</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3">
                    <Logo size="xl" />
                  </div>
                  <p className="text-sm text-slate-600">Extra Large</p>
                </div>
              </div>
            </Card>

            {/* Icon Only Variations */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Icon Only</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3 flex justify-center">
                    <LogoIcon size="sm" />
                  </div>
                  <p className="text-sm text-slate-600">Small Icon</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3 flex justify-center">
                    <LogoIcon size="md" />
                  </div>
                  <p className="text-sm text-slate-600">Medium Icon</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3 flex justify-center">
                    <LogoIcon size="lg" />
                  </div>
                  <p className="text-sm text-slate-600">Large Icon</p>
                </div>
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3 flex justify-center">
                    <LogoIcon size="xl" />
                  </div>
                  <p className="text-sm text-slate-600">Extra Large Icon</p>
                </div>
              </div>
            </Card>

            {/* Compact Navigation Version */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Navigation Version</h2>
              <div className="bg-white p-6 rounded-lg border-2 border-slate-200 inline-block">
                <LogoCompact />
              </div>
              <p className="text-sm text-slate-600 mt-3">Used in headers and navigation bars</p>
            </Card>

            {/* Background Variations */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Background Variations</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-white p-6 rounded-lg border-2 border-slate-200 mb-3">
                    <LogoCompact />
                  </div>
                  <p className="text-sm text-slate-600">Light Background</p>
                </div>
                <div className="text-center">
                  <div className="bg-slate-800 p-6 rounded-lg border-2 border-slate-600 mb-3">
                    <LogoCompact className="text-white" />
                  </div>
                  <p className="text-sm text-slate-600">Dark Background</p>
                </div>
                <div className="text-center">
                  <div className="p-6 rounded-lg border-2 border-teal-200 mb-3" style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}>
                    <LogoCompact className="text-white" />
                  </div>
                  <p className="text-sm text-slate-600">Brand Background</p>
                </div>
              </div>
            </Card>

            {/* Features Showcase */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Brand Colors</h3>
                      <p className="text-sm text-slate-600">Uses your teal/cyan gradient (#1DD1A1 to #1BC4B2)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Animated ".ai"</h3>
                      <p className="text-sm text-slate-600">Subtle glow animation on the AI text</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Multiple Sizes</h3>
                      <p className="text-sm text-slate-600">Small, medium, large, and extra-large variants</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Hover Effects</h3>
                      <p className="text-sm text-slate-600">Shimmer animation on icon hover</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Stacked Design</h3>
                      <p className="text-sm text-slate-600">Maintains the message "stack" concept with layered elements</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">Responsive</h3>
                      <p className="text-sm text-slate-600">Works on all screen sizes and devices</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Implementation Guide */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold text-slate-900 mb-6">Usage Guide</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Headers & Navigation</h3>
                  <p className="text-sm text-slate-600 mb-3">Use LogoCompact for consistent header branding</p>
                  <code className="text-xs bg-slate-100 p-2 rounded block">
                    {`<LogoCompact />`}
                  </code>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Icon Only</h3>
                  <p className="text-sm text-slate-600 mb-3">Use LogoIcon when space is limited</p>
                  <code className="text-xs bg-slate-100 p-2 rounded block">
                    {`<LogoIcon size="md" />`}
                  </code>
                </div>
                <div>
                  <h3 className="font-medium text-slate-900 mb-2">Full Logo</h3>
                  <p className="text-sm text-slate-600 mb-3">Use Logo for landing pages and marketing</p>
                  <code className="text-xs bg-slate-100 p-2 rounded block">
                    {`<Logo size="lg" />`}
                  </code>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600">
              The logo is now integrated across all your pages with consistent branding and animations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
