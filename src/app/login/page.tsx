"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  Mail,
  Lock,
  ArrowRight,
  Chrome,
  Github,
  AlertCircle,
  Users,
  Briefcase
} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (email && password) {
      // Redirect to dashboard (placeholder)
      window.location.href = "/";
    } else {
      setError("Please enter your email and password");
    }

    setIsLoading(false);
  };

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true);
    // Simulate social login
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert(`${provider} login coming soon!`);
    setIsLoading(false);
  };

  const handleDemoLogin = async (type: 'client' | 'consultant') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    window.location.href = type === 'client' ? '/dashboard/client' : '/dashboard/consultant';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <Link href="/">
          <div className="flex items-center justify-center mb-8 cursor-pointer group">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg mr-3"
              style={{
                background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"
              }}
            >
              <Sparkles className="h-6 w-6 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold text-slate-900">MessageStack</span>
          </div>
        </Link>

        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-600">Sign in to your account to continue</p>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('Google')}
              disabled={isLoading}
            >
              <Chrome className="h-5 w-5 mr-2" />
              Continue with Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin('GitHub')}
              disabled={isLoading}
            >
              <Github className="h-5 w-5 mr-2" />
              Continue with GitHub
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">Or continue with email</span>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-sm text-red-700">
                <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-700">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-slate-700">
                Remember me for 30 days
              </label>
            </div>

            <Button
              type="submit"
              className="w-full text-white py-3"
              style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-5 w-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-6">
            Don't have an account?{' '}
            <Link href="/get-started" className="text-teal-600 hover:text-teal-700 font-medium">
              Get started for free
            </Link>
          </p>
        </Card>

        {/* Demo Account Quicklinks */}
        <Card className="p-6 mt-6 bg-gradient-to-br from-teal-50 to-blue-50 border-teal-200">
          <h3 className="text-sm font-semibold text-slate-900 mb-3 text-center">Try a Demo Account</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => handleDemoLogin('client')}
              disabled={isLoading}
              className="bg-white hover:bg-teal-50 border-teal-200"
            >
              <Users className="h-4 w-4 mr-2" />
              Client Demo
            </Button>
            <Button
              variant="outline"
              onClick={() => handleDemoLogin('consultant')}
              disabled={isLoading}
              className="bg-white hover:bg-blue-50 border-blue-200"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Consultant Demo
            </Button>
          </div>
          <p className="text-xs text-slate-600 text-center mt-3">
            Explore the platform with pre-populated data
          </p>
        </Card>

        <p className="text-center text-xs text-slate-500 mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-teal-600 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
