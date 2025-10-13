"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Users,
  Sparkles,
  Shield,
  CheckCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  authenticateUser,
  storeSecureToken,
  removeSecureToken,
  LoginCredentials
} from "@/lib/auth";
import { LogoCompact } from "@/components/Logo";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}



export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Clear any existing tokens
      removeSecureToken();

      const credentials: LoginCredentials = {
        email: loginForm.email,
        password: loginForm.password,
        rememberMe: loginForm.rememberMe
      };

      const result = await authenticateUser(credentials);

      if (result.success && result.user && result.token) {
        // Store secure token
        storeSecureToken(result.token, loginForm.rememberMe);

        // Redirect to dashboard
        router.push("/dashboard");
      } else {
        alert(result.error || "Login failed. Please try again.");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <LogoCompact />
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-3">
              Welcome back
            </h1>
            <p className="text-slate-600">
              Sign in to your Message Stack account to continue your messaging journey
            </p>

            <div className="mt-4">
              <p className="text-sm text-slate-500">
                New to MessageStack?
                <Link href="/get-started" className="text-teal-600 hover:text-teal-700 ml-1 font-medium">
                  Get started for free →
                </Link>
              </p>
            </div>
          </div>

          {/* Auth Form */}
          <Card className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={loginForm.email}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                      className="w-full pl-10 pr-12 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={loginForm.rememberMe}
                      onChange={(e) => setLoginForm(prev => ({ ...prev, rememberMe: e.target.checked }))}
                      className="rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    />
                    <span className="ml-2 text-sm text-slate-600">Remember me</span>
                  </label>
                  <button type="button" className="text-sm text-teal-600 hover:text-teal-700">
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>
          </Card>

          {/* Security Notice */}
          <div className="mt-6 space-y-3">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="text-sm font-medium text-green-900 mb-2 flex items-center">
                <Shield className="h-4 w-4 mr-2" />
                Enhanced Security Features
              </h4>
              <div className="space-y-1 text-xs text-green-700">
                <p className="flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Secure password hashing and validation</p>
                <p className="flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Encrypted survey data storage</p>
                <p className="flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> AI data privacy controls</p>
                <p className="flex items-center"><CheckCircle className="h-3 w-3 mr-1" /> Session-based authentication</p>
              </div>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="text-sm font-medium text-blue-900 mb-2">Demo Login Credentials</h4>
              <div className="space-y-1 text-xs text-blue-700">
                <p><strong>Consultant Portal:</strong> admin@messagestack.ai</p>
                <p><strong>Client User:</strong> user@demo.com</p>
                <p><strong>Client User:</strong> sarah@techcorp.com</p>
                <p><strong>Password for all:</strong> password123!</p>
              </div>
            </div>

            {/* Quick Test Buttons */}
            <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
              <h4 className="text-sm font-medium text-teal-900 mb-3">Quick Test Options</h4>
              <div className="space-y-2">
                <Button
                  onClick={async () => {
                    // Quick login as consultant
                    setIsLoading(true);
                    try {
                      removeSecureToken();
                      const result = await authenticateUser({
                        email: "admin@messagestack.ai",
                        password: "password123!",
                        rememberMe: false
                      });

                      if (result.success && result.token) {
                        storeSecureToken(result.token, false);
                        router.push("/dashboard");
                      } else {
                        alert("Consultant login failed");
                      }
                    } catch (error) {
                      alert("Consultant login failed");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  className="w-full text-sm"
                  variant="outline"
                  style={{borderColor: '#1DD1A1', color: '#1DD1A1'}}
                  disabled={isLoading}
                >
                  Quick Consultant Portal Access
                </Button>
                <Button
                  onClick={async () => {
                    // Quick login as client user
                    setIsLoading(true);
                    try {
                      removeSecureToken();
                      const result = await authenticateUser({
                        email: "user@demo.com",
                        password: "password123!",
                        rememberMe: false
                      });

                      if (result.success && result.token) {
                        storeSecureToken(result.token, false);
                        router.push("/dashboard");
                      } else {
                        alert("Client login failed");
                      }
                    } catch (error) {
                      alert("Client login failed");
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  className="w-full text-sm"
                  variant="outline"
                  style={{borderColor: '#2563EB', color: '#2563EB'}}
                  disabled={isLoading}
                >
                  Quick Client Dashboard Access
                </Button>
                <Button
                  onClick={() => router.push("/survey/test-survey-123")}
                  className="w-full text-sm"
                  style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #1BC4B2 100%)', color: 'white'}}
                >
                  Test Survey Experience →
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="p-4">
              <Users className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-slate-900">Multi-stakeholder</h4>
              <p className="text-xs text-slate-600">Survey different audiences</p>
            </div>
            <div className="p-4">
              <Sparkles className="h-8 w-8 text-teal-600 mx-auto mb-2" />
              <h4 className="text-sm font-semibold text-slate-900">AI-Powered</h4>
              <p className="text-xs text-slate-600">Smart messaging insights</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
