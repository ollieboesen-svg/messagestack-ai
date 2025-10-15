import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <Link href="/">
          <div className="inline-flex items-center justify-center mb-8 cursor-pointer group">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #1DD1A1 0%, #1BC4B2 100%)"
              }}
            >
              <Sparkles className="h-8 w-8 text-white group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
        </Link>

        {/* 404 Error */}
        <div className="mb-6">
          <h1 className="text-8xl md:text-9xl font-bold mb-4">
            <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}>
              404
            </span>
          </h1>
          <div className="w-24 h-1 mx-auto mb-8 rounded-full" style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)'}}></div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
          Page not found
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-lg mx-auto">
          Looks like this page got lost in the messaging journey. Let's get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/">
            <Button
              size="lg"
              className="text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{background: 'linear-gradient(90deg, #1DD1A1 0%, #2563EB 100%)', backgroundSize: '200% 100%'}}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/get-started">
            <Button
              size="lg"
              variant="outline"
              className="border-teal-200 text-teal-700 hover:bg-teal-50"
            >
              Get Started
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/dashboard" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Dashboard
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/research" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Insight Hub
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/brief" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Strategic Brief
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/message-grid" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Message Grid
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/copy-engine" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
              Copy Engine
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
