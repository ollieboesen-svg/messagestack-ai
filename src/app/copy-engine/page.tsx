"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Sparkles,
  Download,
  Check,
  Edit3,
} from "lucide-react";

const initialMessages = [
  {
    id: 'msg-1',
    title: 'Homepage Hero Section',
    content: 'Transform your messaging strategy in weeks, not months. Our AI-powered platform delivers consultant-quality strategic frameworks 75% faster than traditional approaches.',
    audience: 'Decision Makers',
    channel: 'Website',
    approved: true
  },
  {
    id: 'msg-2',
    title: 'Email Campaign - Welcome Series',
    content: 'Welcome to the future of strategic messaging. Get ready to unlock enterprise-level strategy without the enterprise-level costs.',
    audience: 'Decision Makers',
    channel: 'Email',
    approved: true
  },
  {
    id: 'msg-3',
    title: 'LinkedIn Ad - Targeting CMOs',
    content: 'Stop overpaying for strategy consulting. Get the same strategic rigor with 60-80% cost savings and 75% faster delivery.',
    audience: 'Decision Makers',
    channel: 'Social Media',
    approved: true
  },
  {
    id: 'msg-4',
    title: 'Product Demo Script',
    content: 'See how our guided workflow transforms complex strategy development into an intuitive, step-by-step process that anyone can follow.',
    audience: 'End Users',
    channel: 'Sales Materials',
    approved: true
  },
  {
    id: 'msg-5',
    title: 'User Onboarding Email',
    content: 'No strategy background? No problem. Our AI guides you through every step, ensuring professional results every time.',
    audience: 'End Users',
    channel: 'Email',
    approved: true
  },
  {
    id: 'msg-6',
    title: 'Partner Program Landing Page',
    content: 'Expand your service offerings with our white-label platform. Deliver strategic consulting services with 40% higher margins.',
    audience: 'Partners',
    channel: 'Website',
    approved: false
  },
  {
    id: 'msg-7',
    title: 'Investor Pitch Deck',
    content: 'First-mover advantage in the $12B+ strategy consulting market. Scalable SaaS model with proven product-market fit.',
    audience: 'Investors',
    channel: 'Sales Materials',
    approved: false
  },
  {
    id: 'msg-8',
    title: 'Blog Post - Thought Leadership',
    content: 'The democratization of enterprise strategy: How AI is making consultant-quality strategic thinking accessible to every organization.',
    audience: 'Decision Makers',
    channel: 'Content Marketing',
    approved: false
  }
];

export default function CopyEngine() {
  const [messages, setMessages] = useState(initialMessages);

  const handleToggleApprove = (id: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === id ? { ...msg, approved: !msg.approved } : msg
      )
    );
  };

  const approvedCount = messages.filter((m) => m.approved).length;
  const totalCount = messages.length;
  const percentApproved = (approvedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/message-grid">
                <Button variant="outline" size="sm" className="border-green-200 text-green-700 hover:bg-green-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Message Grid
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Copy Engine</h1>
                <p className="text-slate-600">Approve or reject generated messages for your copy library</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-slate-900">{approvedCount}/{totalCount}</div>
              <div className="text-sm text-slate-600">Messages Approved</div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-500 bg-gradient-to-r from-green-500 to-emerald-600"
              style={{ width: `${percentApproved}%` }}
            ></div>
          </div>
        </div>

        {/* Message Approval Interface */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {messages.map((message) => (
            <Card key={message.id} className={`p-6 transition-all duration-200 ${
              message.approved
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-lg'
                : 'hover:shadow-lg border-slate-200'
            }`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 text-sm mb-2">{message.title}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      message.channel === 'Website' ? 'bg-blue-500' :
                      message.channel === 'Email' ? 'bg-purple-500' :
                      message.channel === 'Social Media' ? 'bg-green-500' :
                      message.channel === 'Sales Materials' ? 'bg-orange-500' :
                      message.channel === 'Content Marketing' ? 'bg-yellow-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-xs text-slate-600">{message.channel}</span>
                  </div>
                </div>
                {/* Approval Checkbox */}
                <button
                  aria-label={message.approved ? "Unapprove message" : "Approve message"}
                  onClick={() => handleToggleApprove(message.id)}
                  className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all transform hover:scale-110 ${
                    message.approved
                      ? 'border-green-500 bg-green-500 shadow-lg shadow-green-200'
                      : 'border-slate-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  {message.approved ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className="block w-4 h-4 border border-slate-300 rounded-sm bg-white" />
                  )}
                </button>
              </div>
              <div className="mb-4">
                <p className="text-sm text-slate-700 leading-relaxed">{message.content}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-600">
                  {message.audience}
                </div>
                <div className="flex space-x-1">
                  <button className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600" aria-label="Edit message">
                    <Edit3 className="h-3 w-3" />
                  </button>
                  <button className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600" aria-label="Copy message">
                    <Copy className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="text-center">
          <div className="space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 font-medium">
                {approvedCount === totalCount
                  ? "All messages approved! Your copy library is ready."
                  : `Review and approve ${totalCount - approvedCount} remaining message${totalCount - approvedCount === 1 ? "" : "s"} to complete your copy library.`}
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                size="lg"
                className="text-white shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Generate More Copy
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-green-200 text-green-700 hover:bg-green-50"
                disabled={approvedCount === 0}
              >
                <Download className="h-5 w-5 mr-2" />
                Export Approved ({approvedCount})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
