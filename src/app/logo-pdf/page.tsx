"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";

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

export default function LogoPDF() {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // This will open the print dialog where user can save as PDF
    window.print();
  };

  return (
    <>
      {/* Floating Action Buttons - Hidden in print */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 print:hidden z-50">
        <Button
          onClick={handleDownloadPDF}
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          style={{background: 'linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)'}}
          title="Download as PDF"
        >
          <Download className="h-6 w-6 text-white" />
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-white"
          title="Print"
        >
          <Printer className="h-6 w-6" />
        </Button>
      </div>

      <div className="min-h-screen bg-white p-8" style={{fontFamily: 'system-ui, -apple-system, sans-serif'}}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">MessageStack AI Logo Variations</h1>
          <p className="text-lg text-slate-600 mb-2">Brand Identity Concepts</p>
          <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        {/* Logo Grid */}
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Version 1 */}
          <div className="border-b border-slate-200 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <LogoV1 />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-slate-900">Version 1</h3>
                <p className="text-sm text-slate-600">CSS ClipPath Chevrons</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Features a speech bubble design with CSS clip-path chevrons representing stacked messaging layers.
              Clean, modern approach with gradient background and subtle tail element.
            </p>
          </div>

          {/* Version 2 */}
          <div className="border-b border-slate-200 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <LogoV2 />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-slate-900">Version 2</h3>
                <p className="text-sm text-slate-600">CSS Border Chevrons</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Alternative implementation using CSS borders to create chevron shapes.
              Maintains the same visual concept while using different technical approach for better browser compatibility.
            </p>
          </div>

          {/* Version 3 */}
          <div className="border-b border-slate-200 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <LogoV3 />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-slate-900">Version 3</h3>
                <p className="text-sm text-slate-600">SVG Approach</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Pure SVG implementation offering superior scalability and print quality.
              Vector-based design ensures crisp rendering at any size while maintaining gradient effects.
            </p>
          </div>

          {/* Version 4 */}
          <div className="border-b border-slate-200 pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <LogoV4 />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-slate-900">Version 4</h3>
                <p className="text-sm text-slate-600">Enhanced Bubble Tail</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Refined SVG version with improved speech bubble tail using curved paths.
              More sophisticated geometric approach creates a more natural bubble appearance.
            </p>
          </div>

          {/* Version 5 */}
          <div className="pb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-6">
                <LogoV5 />
              </div>
              <div className="text-right">
                <h3 className="text-lg font-semibold text-slate-900">Version 5</h3>
                <p className="text-sm text-slate-600">Simplified Design</p>
              </div>
            </div>
            <p className="text-sm text-slate-600">
              Cleaner, minimalist approach focusing on essential elements.
              Simplified chevron design with better proportion balance and reduced visual complexity.
            </p>
          </div>
        </div>

        {/* Brand Colors */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Brand Colors</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="flex items-center space-x-4">
              <div
                className="w-16 h-16 rounded-lg border border-slate-200"
                style={{background: "#1DD1A1"}}
              ></div>
              <div>
                <h4 className="font-semibold text-slate-900">Primary Teal</h4>
                <p className="text-sm text-slate-600">#1DD1A1</p>
                <p className="text-xs text-slate-500">RGB(29, 209, 161)</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div
                className="w-16 h-16 rounded-lg border border-slate-200"
                style={{background: "#1BC4B2"}}
              ></div>
              <div>
                <h4 className="font-semibold text-slate-900">Secondary Teal</h4>
                <p className="text-sm text-slate-600">#1BC4B2</p>
                <p className="text-xs text-slate-500">RGB(27, 196, 178)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Guidelines */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Usage Guidelines</h2>
          <div className="space-y-4 text-sm text-slate-600">
            <p>• <strong>Minimum Size:</strong> Logo should not be displayed smaller than 24px in height for digital applications</p>
            <p>• <strong>Clear Space:</strong> Maintain clear space around logo equal to half the logo height</p>
            <p>• <strong>Background:</strong> Logo works best on white or very light backgrounds</p>
            <p>• <strong>Typography:</strong> "message stack" in bold weight, ".ai" in teal accent color</p>
            <p>• <strong>Gradient:</strong> Use linear gradient from #1DD1A1 to #1BC4B2 at 135-degree angle</p>
          </div>
        </div>

        {/* File Formats */}
        <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recommended File Formats</h2>
          <div className="grid grid-cols-2 gap-6 text-sm text-slate-600">
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Digital Use</h4>
              <p>• SVG for web and scalable applications</p>
              <p>• PNG with transparent background</p>
              <p>• High-resolution PNG for retina displays</p>
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 mb-2">Print Use</h4>
              <p>• EPS or AI vector files</p>
              <p>• High-resolution PDF</p>
              <p>• CMYK color profile for print</p>
            </div>
          </div>
        </div>

        {/* Print Styles */}
        <style jsx>{`
          @media print {
            body {
              margin: 0;
              padding: 20px;
              font-size: 12px;
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
            * {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
            .space-y-12 > * + * { margin-top: 2rem !important; }
            .space-y-6 > * + * { margin-top: 1rem !important; }
            .pb-8 { padding-bottom: 1.5rem !important; }
            .pt-8 { padding-top: 1.5rem !important; }
            .mb-12 { margin-bottom: 2rem !important; }
            .mb-6 { margin-bottom: 1rem !important; }
            .mt-16 { margin-top: 2.5rem !important; }
            .mt-12 { margin-top: 2rem !important; }
            .print\\:hidden { display: none !important; }

            /* Ensure gradients print correctly */
            [style*="background: linear-gradient"] {
              -webkit-print-color-adjust: exact;
              color-adjust: exact;
            }
          }

          @page {
            margin: 0.75in;
            size: letter;
          }
        `}</style>
      </div>
    </>
  );
}
