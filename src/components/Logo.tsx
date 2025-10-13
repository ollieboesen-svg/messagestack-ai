"use client";

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl'
  };

  const svgSizes = {
    sm: { width: 24, height: 24, lines: { width: 14, height: 3, spacing: 3 } },
    md: { width: 32, height: 32, lines: { width: 18, height: 3, spacing: 3 } },
    lg: { width: 40, height: 40, lines: { width: 24, height: 4, spacing: 4 } },
    xl: { width: 48, height: 48, lines: { width: 28, height: 4, spacing: 5 } }
  };

  const currentSize = svgSizes[size];

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* SVG Icon */}
      <div className="relative">
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox={`0 0 ${currentSize.width} ${currentSize.height}`}
          className="relative z-10"
        >
          <defs>
            <linearGradient id={`bubbleGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1DD1A1"/>
              <stop offset="100%" stopColor="#1BC4B2"/>
            </linearGradient>
          </defs>

          {/* Main bubble */}
          <rect
            x="0"
            y="0"
            width={currentSize.width}
            height={currentSize.width}
            rx={currentSize.width * 0.33}
            fill={`url(#bubbleGrad-${size})`}
          />

          {/* Three horizontal lines */}
          <rect
            x={(currentSize.width - currentSize.lines.width) / 2}
            y={currentSize.width * 0.3}
            width={currentSize.lines.width}
            height={currentSize.lines.height}
            rx={1}
            fill="white"
            opacity="0.95"
          />
          <rect
            x={(currentSize.width - currentSize.lines.width) / 2}
            y={currentSize.width * 0.5 - currentSize.lines.height / 2}
            width={currentSize.lines.width}
            height={currentSize.lines.height}
            rx={1}
            fill="white"
            opacity="0.95"
          />
          <rect
            x={(currentSize.width - currentSize.lines.width) / 2}
            y={currentSize.width * 0.7 - currentSize.lines.height}
            width={currentSize.lines.width}
            height={currentSize.lines.height}
            rx={1}
            fill="white"
            opacity="0.95"
          />
        </svg>

        {/* Speech bubble tail */}
        <div
          className={`absolute rotate-45 ${
            size === 'sm' ? 'w-1.5 h-1.5 -bottom-0.5 left-1' :
            size === 'md' ? 'w-2 h-2 -bottom-1 left-1' :
            size === 'lg' ? 'w-2.5 h-2.5 -bottom-1 left-1.5' : 'w-3 h-3 -bottom-1 left-2'
          }`}
          style={{background: "#1BC4B2"}}
        ></div>
      </div>

      {/* Text */}
      {showText && (
        <div className={`font-bold text-slate-900 ${textSizeClasses[size]}`}>
          message stack
          <span
            className="ml-0.5 inline-block relative"
            style={{ color: '#1DD1A1' }}
          >
            .ai
            {/* Animated glow effect */}
            <span
              className="absolute inset-0 opacity-50 animate-pulse"
              style={{
                color: '#1BC4B2',
                filter: 'blur(1px)',
                animation: 'glow 2s ease-in-out infinite alternate'
              }}
            >
              .ai
            </span>
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes glow {
          from {
            text-shadow: 0 0 5px rgba(29, 209, 161, 0.5),
                         0 0 10px rgba(29, 209, 161, 0.3),
                         0 0 15px rgba(29, 209, 161, 0.2);
          }
          to {
            text-shadow: 0 0 8px rgba(27, 196, 178, 0.7),
                         0 0 16px rgba(27, 196, 178, 0.5),
                         0 0 24px rgba(27, 196, 178, 0.3);
          }
        }
      `}</style>
    </div>
  );
}

// Alternative simplified version for smaller spaces
export function LogoIcon({ size = 'md', className = '' }: Pick<LogoProps, 'size' | 'className'>) {
  const svgSizes = {
    sm: { width: 24, height: 24, lines: { width: 14, height: 3, spacing: 3 } },
    md: { width: 32, height: 32, lines: { width: 18, height: 3, spacing: 3 } },
    lg: { width: 40, height: 40, lines: { width: 24, height: 4, spacing: 4 } },
    xl: { width: 48, height: 48, lines: { width: 28, height: 4, spacing: 5 } }
  };

  const currentSize = svgSizes[size];

  return (
    <div className={`relative ${className}`}>
      <svg
        width={currentSize.width}
        height={currentSize.height}
        viewBox={`0 0 ${currentSize.width} ${currentSize.height}`}
        className="relative z-10"
      >
        <defs>
          <linearGradient id={`iconGrad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1DD1A1"/>
            <stop offset="100%" stopColor="#1BC4B2"/>
          </linearGradient>
        </defs>

        {/* Main bubble */}
        <rect
          x="0"
          y="0"
          width={currentSize.width}
          height={currentSize.width}
          rx={currentSize.width * 0.33}
          fill={`url(#iconGrad-${size})`}
        />

        {/* Three horizontal lines */}
        <rect
          x={(currentSize.width - currentSize.lines.width) / 2}
          y={currentSize.width * 0.25}
          width={currentSize.lines.width}
          height={currentSize.lines.height}
          rx={currentSize.lines.height / 2}
          fill="white"
        />
        <rect
          x={(currentSize.width - currentSize.lines.width) / 2}
          y={currentSize.width * 0.25 + currentSize.lines.spacing + currentSize.lines.height}
          width={currentSize.lines.width}
          height={currentSize.lines.height}
          rx={currentSize.lines.height / 2}
          fill="white"
        />
        <rect
          x={(currentSize.width - currentSize.lines.width) / 2}
          y={currentSize.width * 0.25 + 2 * (currentSize.lines.spacing + currentSize.lines.height)}
          width={currentSize.lines.width}
          height={currentSize.lines.height}
          rx={currentSize.lines.height / 2}
          fill="white"
        />
      </svg>

      {/* Speech bubble tail */}
      <div
        className={`absolute rotate-45 ${
          size === 'sm' ? 'w-1.5 h-1.5 -bottom-0.5 left-1' :
          size === 'md' ? 'w-2 h-2 -bottom-1 left-1' :
          size === 'lg' ? 'w-2.5 h-2.5 -bottom-1 left-1.5' : 'w-3 h-3 -bottom-1 left-2'
        }`}
        style={{background: "#1BC4B2"}}
      ></div>
    </div>
  );
}

// Compact version for navigation
export function LogoCompact({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Simple, visible logo with 3 lines */}
      <div className="relative">
        <div
          className="w-8 h-8 rounded-xl flex flex-col items-center justify-center space-y-1 p-1"
          style={{background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"}}
        >
          {/* Three thick white horizontal lines */}
          <div className="w-5 h-0.5 bg-white rounded-full"></div>
          <div className="w-5 h-0.5 bg-white rounded-full"></div>
          <div className="w-5 h-0.5 bg-white rounded-full"></div>
        </div>
        {/* Speech bubble tail */}
        <div
          className="absolute w-1.5 h-1.5 -bottom-0.5 left-1 rotate-45"
          style={{background: "#1BC4B2"}}
        ></div>
      </div>

      <span className="text-xl font-bold text-slate-900">
        message stack
        <span
          className="ml-0.5 relative inline-block"
          style={{ color: '#1DD1A1' }}
        >
          .ai
          <span
            className="absolute inset-0 opacity-50"
            style={{
              color: '#1BC4B2',
              filter: 'blur(0.5px)',
              animation: 'aiGlow 2s ease-in-out infinite alternate'
            }}
          >
            .ai
          </span>
        </span>
      </span>

      <style jsx>{`
        @keyframes aiGlow {
          from {
            text-shadow: 0 0 3px rgba(29, 209, 161, 0.4),
                         0 0 6px rgba(29, 209, 161, 0.2);
          }
          to {
            text-shadow: 0 0 6px rgba(27, 196, 178, 0.6),
                         0 0 12px rgba(27, 196, 178, 0.4);
          }
        }
      `}</style>
    </div>
  );
}
