import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Grid3X3, ArrowLeft, Plus, Users, Lightbulb, Target, Settings } from "lucide-react";
import Link from "next/link";

export default function Grid() {
  const audiences = ["Decision Makers", "End Users", "Influencers"];
  const valueDrivers = ["Efficiency", "Cost Savings", "Innovation", "Reliability"];
  const proofPoints = ["ROI Studies", "Customer Success", "Awards", "Certifications"];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Journey
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background: "linear-gradient(135deg, #1A8FD1 0%, #2563EB 100%)"}}>
                  <Grid3X3 className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-slate-900">Message Grid</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-teal-200 text-teal-700 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Visual framework for <span className="bg-clip-text text-transparent" style={{backgroundImage: 'linear-gradient(90deg, #1A8FD1 0%, #2563EB 100%)'}}>mapping messages</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Map audiences, value drivers, and proof points with strategic precision using our multi-column framework.
            </p>
          </div>

          {/* Grid Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Plus className="h-4 w-4 mr-2" />
              Add Audience
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Plus className="h-4 w-4 mr-2" />
              Add Value Driver
            </Button>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              <Plus className="h-4 w-4 mr-2" />
              Add Proof Point
            </Button>
          </div>

          {/* Message Grid */}
          <Card className="p-6 overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Grid Header */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="p-4 bg-slate-100 rounded-lg text-center">
                  <h3 className="font-semibold text-slate-900 flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2 text-blue-600" />
                    Audiences
                  </h3>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg text-center">
                  <h3 className="font-semibold text-slate-900 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-blue-600" />
                    Value Drivers
                  </h3>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg text-center">
                  <h3 className="font-semibold text-slate-900 flex items-center justify-center">
                    <Target className="h-4 w-4 mr-2 text-blue-600" />
                    Proof Points
                  </h3>
                </div>
                <div className="p-4 bg-slate-100 rounded-lg text-center">
                  <h3 className="font-semibold text-slate-900">Key Messages</h3>
                </div>
              </div>

              {/* Grid Content */}
              <div className="space-y-3">
                {[0, 1, 2].map((rowIndex) => (
                  <div key={rowIndex} className="grid grid-cols-4 gap-4">
                    {/* Audience Column */}
                    <div className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                      {rowIndex < audiences.length ? (
                        <div className="text-sm font-medium text-slate-900">{audiences[rowIndex]}</div>
                      ) : (
                        <div className="text-sm text-slate-400 italic">Add audience...</div>
                      )}
                    </div>

                    {/* Value Driver Column */}
                    <div className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                      {rowIndex < valueDrivers.length ? (
                        <div className="text-sm font-medium text-slate-900">{valueDrivers[rowIndex]}</div>
                      ) : (
                        <div className="text-sm text-slate-400 italic">Add value driver...</div>
                      )}
                    </div>

                    {/* Proof Point Column */}
                    <div className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                      {rowIndex < proofPoints.length ? (
                        <div className="text-sm font-medium text-slate-900">{proofPoints[rowIndex]}</div>
                      ) : (
                        <div className="text-sm text-slate-400 italic">Add proof point...</div>
                      )}
                    </div>

                    {/* Key Message Column */}
                    <div className="p-4 border-2 border-slate-200 rounded-lg hover:border-blue-300 transition-colors">
                      <textarea
                        placeholder="Craft your key message..."
                        className="w-full h-16 bg-transparent border-none resize-none focus:outline-none text-sm text-slate-700"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Grid Stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">3</div>
              <div className="text-sm text-slate-600">Audiences Mapped</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">4</div>
              <div className="text-sm text-slate-600">Value Drivers</div>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-2xl font-bold text-slate-900 mb-2">4</div>
              <div className="text-sm text-slate-600">Proof Points</div>
            </Card>
          </div>

          {/* Next Step */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 mb-4">Ready to generate powerful copy from your message grid?</p>
            <Link href="/copy">
              <Button size="lg" className="text-white shadow-lg hover:shadow-xl transition-all duration-300" style={{background: 'linear-gradient(90deg, #2563EB 0%, #1D4ED8 100%)'}}>
                Launch Copy Engine
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
