"use client";

import React from "react";
import { Card } from "@/components/ui/card";

// Version 1: Speech bubble with CSS shapes
const LogoV1 = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      {/* Main bubble */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
      >
        {/* Stack of elements */}
        <div className="flex flex-col space-y-1">
          {/* Top bar */}
          <div className="w-6 h-1.5 bg-white rounded-full"></div>
          {/* Middle chevron */}
          <div
            className="w-5 h-1 bg-white"
            style={{clipPath: "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%)"}}
          ></div>
          {/* Bottom chevron */}
          <div
            className="w-5 h-1 bg-white"
            style={{clipPath: "polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%, 30% 50%)"}}
          ></div>
        </div>
      </div>
      {/* Speech bubble tail */}
      <div
        className="absolute -bottom-1 left-2 w-3 h-3 rotate-45"
        style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
      ></div>
    </div>

    {/* Text */}
    <div className="text-xl font-bold text-slate-900">
      message stack<span className="text-teal-500">.ai</span>
    </div>
  </div>
);

// Version 2: Using CSS borders for chevrons
const LogoV2 = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center"
        style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
      >
        <div className="flex flex-col items-center space-y-1">
          {/* Top bar */}
          <div className="w-6 h-1.5 bg-white rounded-full"></div>
          {/* Chevrons using borders */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[3px] border-t-white border-b-[3px] border-b-white border-r-[8px] border-r-white"></div>
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[3px] border-t-white border-b-[3px] border-b-white border-r-[8px] border-r-white"></div>
        </div>
      </div>
      <div
        className="absolute -bottom-1 left-2 w-3 h-3 rotate-45"
        style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
      ></div>
    </div>
    <div className="text-xl font-bold text-slate-900">
      message stack<span className="text-teal-500">.ai</span>
    </div>
  </div>
);

// Version 3: SVG approach
const LogoV3 = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <svg width="48" height="48" viewBox="0 0 48 48" className="relative z-10">
        <defs>
          <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1DD1A1"/>
            <stop offset="100%" stopColor="#1BC4B2"/>
          </linearGradient>
        </defs>
        {/* Main bubble */}
        <rect x="0" y="0" width="48" height="48" rx="16" fill="url(#bubbleGrad)"/>

        {/* Content inside bubble */}
        {/* Top bar */}
        <rect x="12" y="12" width="24" height="6" rx="3" fill="white"/>
        {/* Middle chevron */}
        <path d="M12 22 L20 22 L26 26 L20 30 L12 30 L18 26 Z" fill="white"/>
        {/* Bottom chevron */}
        <path d="M12 32 L20 32 L26 36 L20 40 L12 40 L18 36 Z" fill="white"/>
      </svg>
      {/* Speech bubble tail */}
      <div
        className="absolute -bottom-1 left-2 w-3 h-3 rotate-45"
        style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
      ></div>
    </div>
    <div className="text-xl font-bold text-slate-900">
      message stack<span className="text-teal-500">.ai</span>
    </div>
  </div>
);

// Version 4: More accurate bubble tail
const LogoV4 = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <svg width="48" height="54" viewBox="0 0 48 54">
        <defs>
          <linearGradient id="bubbleGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1DD1A1"/>
            <stop offset="100%" stopColor="#1BC4B2"/>
          </linearGradient>
        </defs>
        {/* Main bubble */}
        <rect x="0" y="0" width="48" height="48" rx="16" fill="url(#bubbleGrad4)"/>
        {/* Speech bubble tail - more accurate */}
        <path d="M8 48 Q 8 52 12 52 L 16 52 Q 20 52 16 48 Z" fill="url(#bubbleGrad4)"/>

        {/* Top horizontal bar */}
        <rect x="12" y="12" width="24" height="4" rx="2" fill="white"/>

        {/* Stack chevrons - more like the reference */}
        <g fill="white">
          {/* Middle chevron */}
          <path d="M12 22 L22 22 L28 26 L22 30 L12 30 L16 26 Z"/>
          {/* Bottom chevron */}
          <path d="M12 32 L22 32 L28 36 L22 40 L12 40 L16 36 Z"/>
        </g>
      </svg>
    </div>
    <div className="text-xl font-bold text-slate-900">
      message stack<span className="text-teal-500">.ai</span>
    </div>
  </div>
);

// Version 5: Simpler, cleaner approach
const LogoV5 = () => (
  <div className="flex items-center space-x-3">
    <div className="relative">
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center relative"
        style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
      >
        <div className="flex flex-col space-y-1.5">
          {/* Top horizontal line */}
          <div className="w-7 h-1 bg-white rounded-full"></div>
          {/* Two chevron shapes pointing right */}
          <div className="flex items-center">
            <div className="w-2 h-1 bg-white"></div>
            <div className="w-0 h-0 border-l-[4px] border-l-white border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"></div>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-1 bg-white"></div>
            <div className="w-0 h-0 border-l-[4px] border-l-white border-t-[2px] border-t-transparent border-b-[2px] border-b-transparent"></div>
          </div>
        </div>
      </div>
      {/* Simpler tail */}
      <div
        className="absolute bottom-0 left-3 w-2 h-2 rotate-45 -mb-1"
        style={{background: "#1BC4B2"}}
      ></div>
    </div>
    <div className="text-xl font-bold text-slate-900">
      message stack<span className="text-teal-500">.ai</span>
    </div>
  </div>
);

export default function LogoTest() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Logo Variations</h1>
        <p className="text-slate-600 mb-4">Based on your reference image with teal colors</p>

        <div className="mb-8 p-4 bg-teal-50 border border-teal-200 rounded-lg">
          <h3 className="font-semibold text-teal-900 mb-2">📄 PDF Version Available</h3>
          <p className="text-teal-700 text-sm mb-3">View all logo variations in a professional PDF format with brand guidelines.</p>
          <a
            href="/logo-pdf"
            className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
          >
            View PDF Version →
          </a>
        </div>

        <div className="space-y-8">
          <Card className="p-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Version 1: CSS ClipPath Chevrons</h2>
            <LogoV1 />
          </Card>

          <Card className="p-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Version 2: CSS Border Chevrons</h2>
            <LogoV2 />
          </Card>

          <Card className="p-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Version 3: SVG Approach</h2>
            <LogoV3 />
          </Card>

          <Card className="p-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Version 4: Better Bubble Tail</h2>
            <LogoV4 />
          </Card>

          <Card className="p-8">
            <h2 className="text-lg font-semibold mb-4 text-slate-700">Version 5: Cleaner Approach</h2>
            <LogoV5 />
          </Card>
        </div>
      </div>
    </div>
  );
}
