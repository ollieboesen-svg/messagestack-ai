export const demoProject = {
  id: "demo-project-1",
  name: "Acme SaaS Platform Messaging Project",
  description: "Complete messaging strategy for our B2B workflow automation platform launch",
  company: "Acme SaaS Platform",
  createdAt: "2025-09-15",
  status: "In Progress",
  stats: {
    surveyResponses: 45,
    strategicImperatives: 12,
    messagePillars: 8,
    copyAssets: 24
  }
};

export const surveys = [
  {
    id: "survey-1",
    name: "Executive Stakeholder Survey",
    description: "Understanding C-suite priorities and decision criteria for enterprise workflow solutions",
    targetAudience: "C-Suite Executives (CEO, CFO, COO)",
    responseCount: 15,
    status: "Completed",
    completedDate: "2025-09-22",
    questions: [
      "What are your top 3 business priorities for the next 12 months?",
      "What challenges do you face with your current workflow and automation tools?",
      "How do you measure ROI on technology investments?",
      "What factors are most important when evaluating new enterprise software?",
      "What concerns do you have about implementing new workflow automation?",
      "How important is vendor stability and long-term partnership?",
      "What would make you switch from your current solution?"
    ],
    responses: [
      {
        id: "r1",
        respondent: "Sarah Chen, CEO, TechCorp",
        answers: {
          0: "Cost optimization, operational efficiency, and scalability for growth",
          1: "Our current tools don't integrate well. We're losing 15-20 hours per week on manual data transfer between systems.",
          2: "Time saved, error reduction, and employee productivity gains. We need to see payback within 18 months.",
          3: "Integration capabilities (critical), ease of implementation, vendor track record, and total cost of ownership",
          4: "Change management and user adoption. We've had failed implementations before.",
          5: "Extremely important. We need a partner who will grow with us, not just sell and disappear.",
          6: "Seamless integration with our existing tech stack and proven ROI within the first year"
        }
      },
      {
        id: "r2",
        respondent: "Michael Rodriguez, CFO, GrowthStartup",
        answers: {
          0: "Reducing operational costs, improving cash flow visibility, scaling without proportional headcount increase",
          1: "Too many point solutions. We're spending $50K+ annually on tools that don't talk to each other.",
          2: "Hard dollar savings and cost avoidance. I need clear metrics on time saved and efficiency gained.",
          3: "Pricing transparency, scalability without major cost jumps, and security/compliance certifications",
          4: "Hidden costs and long implementation timelines that delay value realization",
          5: "Very important. I want a vendor who understands our growth trajectory and can scale pricing accordingly.",
          6: "Consolidated platform that eliminates 3-4 existing tools with clear cost savings"
        }
      }
    ]
  },
  {
    id: "survey-2",
    name: "Customer Survey",
    description: "Gathering feedback from current users on pain points, value drivers, and product positioning",
    targetAudience: "Current Customers (IT Leaders & Operations Managers)",
    responseCount: 20,
    status: "Completed",
    completedDate: "2025-09-25",
    questions: [
      "What initially attracted you to our platform?",
      "What specific problems has our platform solved for you?",
      "How would you describe our platform to a colleague?",
      "What's your favorite feature and why?",
      "If you could improve one thing, what would it be?",
      "How has our platform impacted your team's productivity?",
      "Would you recommend us? What would you say?"
    ],
    responses: [
      {
        id: "r3",
        respondent: "David Park, IT Director, FinanceFlow Inc",
        answers: {
          0: "The promise of no-code workflow automation and pre-built integrations with our CRM and ERP",
          1: "Eliminated 30+ hours of manual data entry per week. Our finance team can now focus on analysis instead of data shuffling.",
          2: "It's like having a digital operations team that never sleeps. Connects all your tools and automates the boring stuff.",
          3: "The visual workflow builder. My team can create automations without involving IT every time.",
          4: "Better mobile experience and more detailed analytics on workflow performance",
          5: "We've reduced processing time for customer onboarding by 60%. What took 3 days now takes 4 hours.",
          6: "Absolutely. I'd say it's the fastest way to eliminate manual work and connect your existing tools without massive IT projects."
        }
      },
      {
        id: "r4",
        respondent: "Jennifer Liu, Operations Manager, ScaleUp Co",
        answers: {
          0: "Quick time to value. We were up and running in 2 weeks vs. 3-6 months with other platforms we evaluated.",
          1: "Automated our entire lead-to-customer workflow. Eliminated errors from manual handoffs between sales and operations.",
          2: "Workflow automation that actually works. Simple enough for business users, powerful enough for complex processes.",
          3: "Error tracking and automatic retry logic. We went from 15% error rate to less than 1%.",
          4: "More pre-built templates for common use cases. Would speed up initial setup even more.",
          5: "Our operations team is 3 people doing the work that used to require 7. We can scale without hiring proportionally.",
          6: "Yes! I tell people it's the easiest enterprise-grade automation platform. You can start simple and grow into advanced features."
        }
      }
    ]
  },
  {
    id: "survey-3",
    name: "Sales Team Survey",
    description: "Understanding objections, competitive positioning, and messaging that resonates with prospects",
    targetAudience: "Internal Sales Team",
    responseCount: 10,
    status: "Completed",
    completedDate: "2025-09-28",
    questions: [
      "What are the most common objections you hear from prospects?",
      "How do prospects typically describe their current pain points?",
      "What makes prospects choose us over competitors?",
      "What makes prospects choose competitors over us?",
      "What messaging resonates most with different buyer personas?",
      "What proof points or case studies close deals?",
      "What would make your sales conversations easier?"
    ],
    responses: [
      {
        id: "r5",
        respondent: "Alex Thompson, Senior AE",
        answers: {
          0: "Price (we're premium), change management concerns, and 'we already have something that works okay'",
          1: "Drowning in manual work, tools that don't integrate, scaling problems, and high error rates from manual processes",
          2: "Ease of implementation, no-code interface, and our customer success approach. Also our integration marketplace.",
          3: "Lower upfront cost (even if higher TCO) and existing relationships with larger vendors",
          4: "Executives care about ROI and risk mitigation. IT cares about integration and security. Ops cares about ease of use.",
          5: "The TechCorp case study - 60% reduction in processing time with payback in 8 months. That one closes deals.",
          6: "Better battle cards against Competitor X, more industry-specific ROI calculators, and video testimonials from customers"
        }
      },
      {
        id: "r6",
        respondent: "Maria Garcia, Enterprise AE",
        answers: {
          0: "Implementation risk, 'not invented here' syndrome with IT, and concerns about switching costs from current tools",
          1: "Technical debt from legacy systems, can't move fast enough, losing visibility as they scale",
          2: "Speed to value and our customer success model. We hold hands through implementation unlike competitors.",
          3: "Brand recognition of bigger players and checkbox features they claim to have (but don't really work well)",
          4: "CFOs respond to cost savings and efficiency metrics. CTOs want to see technical architecture and security.",
          5: "GrowthStartup case study - went from 7 ops people to 3 while doubling revenue. The efficiency story sells.",
          6: "More competitive intelligence on emerging players, and better messaging around our integration capabilities vs competitors"
        }
      }
    ]
  }
];

export const analyticsData = {
  topThemes: [
    { theme: "Integration complexity & tool sprawl", percentage: 78, mentions: 35, sentiment: "negative" },
    { theme: "Time to value & quick implementation", percentage: 65, mentions: 29, sentiment: "positive" },
    { theme: "Scalability without proportional cost increase", percentage: 52, mentions: 23, sentiment: "neutral" },
    { theme: "Cost optimization & ROI clarity", percentage: 48, mentions: 22, sentiment: "neutral" },
    { theme: "Ease of use for non-technical users", percentage: 43, mentions: 19, sentiment: "positive" },
    { theme: "Change management & user adoption", percentage: 38, mentions: 17, sentiment: "negative" }
  ],
  keyQuotes: [
    {
      quote: "We're losing 15-20 hours per week on manual data transfer between systems.",
      author: "Sarah Chen, CEO, TechCorp",
      category: "Pain Point",
      sentiment: "negative"
    },
    {
      quote: "What took 3 days now takes 4 hours. We've reduced processing time by 60%.",
      author: "David Park, IT Director, FinanceFlow Inc",
      category: "Value Delivered",
      sentiment: "positive"
    },
    {
      quote: "Our operations team is 3 people doing the work that used to require 7.",
      author: "Jennifer Liu, Operations Manager, ScaleUp Co",
      category: "Efficiency Gains",
      sentiment: "positive"
    },
    {
      quote: "I need clear metrics on time saved and efficiency gained. Hard dollar savings and cost avoidance.",
      author: "Michael Rodriguez, CFO, GrowthStartup",
      category: "Decision Criteria",
      sentiment: "neutral"
    }
  ],
  sentimentAnalysis: {
    positive: 58,
    neutral: 28,
    negative: 14
  },
  buyerPersonas: [
    {
      persona: "C-Suite Executives",
      topConcerns: ["ROI & cost optimization", "Risk mitigation", "Vendor stability"],
      decisionCriteria: ["Proven results", "Strategic fit", "Long-term partnership"]
    },
    {
      persona: "IT Leaders",
      topConcerns: ["Integration capabilities", "Security & compliance", "Technical architecture"],
      decisionCriteria: ["Ease of integration", "Scalability", "Support quality"]
    },
    {
      persona: "Operations Managers",
      topConcerns: ["Ease of use", "Time to value", "User adoption"],
      decisionCriteria: ["No-code capabilities", "Quick implementation", "Training & support"]
    }
  ]
};

export const strategyData = {
  strategicImperatives: [
    {
      id: "si-1",
      title: "Lead with integration & consolidation value",
      rationale: "78% of respondents cite tool sprawl and integration complexity as top pain point",
      evidence: ["35 mentions across surveys", "Multiple quotes about tools not talking to each other", "CFOs citing $50K+ spent on disconnected tools"],
      recommendation: "Position as the integration layer that eliminates 3-4 point solutions"
    },
    {
      id: "si-2",
      title: "Emphasize speed to value over feature breadth",
      rationale: "65% highlighted quick implementation as key differentiator vs competitors",
      evidence: ["'2 weeks vs 3-6 months' mentioned repeatedly", "Speed to value beats feature checklist in win/loss", "Customers cite fast ROI as referral driver"],
      recommendation: "Lead messaging with time-to-value guarantee and implementation timeline"
    },
    {
      id: "si-3",
      title: "Quantify efficiency gains with role-specific metrics",
      rationale: "52% focused on scaling without proportional cost/headcount increase",
      evidence: ["Multiple examples of 50-60% time reduction", "Headcount efficiency stories (7 people to 3)", "Hours saved per week consistently mentioned"],
      recommendation: "Develop ROI calculator and role-based efficiency metrics"
    },
    {
      id: "si-4",
      title: "Address change management concerns proactively",
      rationale: "38% expressed concerns about implementation risk and user adoption",
      evidence: ["C-suite mentions failed implementations", "IT worried about change management", "Sales team hears 'switching costs' objection"],
      recommendation: "Build customer success and implementation methodology into core messaging"
    },
    {
      id: "si-5",
      title: "Develop persona-specific value narratives",
      rationale: "Different stakeholders have distinct priorities and decision criteria",
      evidence: ["CFOs want cost savings", "CTOs want technical architecture", "Ops wants ease of use", "Sales feedback on what resonates per persona"],
      recommendation: "Create targeted messaging frameworks for each key persona"
    },
    {
      id: "si-6",
      title: "Strengthen competitive differentiation on customer success",
      rationale: "Win/loss data shows customer success approach drives competitive wins",
      evidence: ["'We hold hands through implementation unlike competitors'", "Customer success model mentioned as differentiator", "Support quality cited in decision criteria"],
      recommendation: "Elevate customer success from service to core value proposition"
    }
  ],
  positioningBrief: {
    targetAudience: "Mid-market to enterprise B2B companies (200-5000 employees) experiencing rapid growth, struggling with tool sprawl and manual workflow processes. Primary buyers: C-suite executives (economic buyers), IT Leaders (technical buyers), Operations Managers (end users).",
    valueProposition: "Acme SaaS Platform is the fastest way for growing B2B companies to eliminate manual work and tool sprawl through intelligent workflow automation that integrates your existing tech stack—delivering measurable efficiency gains in weeks, not months.",
    keyDifferentiators: [
      "Speed to value: 2-week implementation vs 3-6 months with traditional platforms",
      "No-code simplicity: Business users can build automations without IT bottlenecks",
      "Integration-first: Pre-built connectors that actually work, eliminating 3-4 point solutions",
      "Customer success model: White-glove implementation and ongoing optimization"
    ],
    proofPoints: [
      "60% average reduction in processing time (TechCorp case study)",
      "50-70% decrease in manual data entry hours across customer base",
      "2-3x headcount efficiency in operations teams (GrowthStartup: 7 people to 3)",
      "Sub-1% error rates vs 15%+ with manual processes",
      "8-12 month average payback period with documented ROI"
    ],
    competitivePositioning: "While enterprise platforms like Competitor X offer feature breadth but require 6+ month implementations and extensive IT resources, and simple tools like Competitor Y lack enterprise-grade integrations and scalability, Acme delivers enterprise capabilities with startup speed—the sweet spot for fast-growing mid-market companies who can't wait months for value but need enterprise-grade reliability."
  }
};

export const messageGrid = {
  audiences: ["C-Suite Executives", "IT Leaders", "Operations Managers"],
  categories: ["Value Drivers", "Key Messages", "Proof Points", "Objection Handling"],
  cells: {
    "C-Suite Executives": {
      "Value Drivers": "Strategic agility, cost optimization, and competitive advantage through operational excellence. Scale revenue without proportional cost increase.",
      "Key Messages": "Transform your operations from a cost center to a competitive advantage. Acme delivers measurable ROI in months, not years—proven efficiency gains that drop straight to your bottom line.",
      "Proof Points": "• 60% reduction in processing time\n• 8-12 month payback period\n• 50-70% decrease in manual work\n• Scale 2x revenue with same ops team",
      "Objection Handling": "Implementation Risk: White-glove customer success ensures successful rollout\nCost Concerns: ROI calculator shows 8-12 month payback with documented savings\nVendor Stability: Backed by tier-1 investors with 300+ enterprise customers"
    },
    "IT Leaders": {
      "Value Drivers": "Reduce technical debt, eliminate integration headaches, and empower business users while maintaining security and control.",
      "Key Messages": "Finally, workflow automation that integrates seamlessly with your existing tech stack. Pre-built connectors that actually work, with enterprise-grade security and governance built in.",
      "Proof Points": "• 200+ pre-built integrations\n• SOC 2 Type II certified\n• 99.9% uptime SLA\n• 2-week average implementation\n• Visual workflow builder reduces IT tickets by 40%",
      "Objection Handling": "Security Concerns: SOC 2, GDPR compliant, enterprise-grade encryption\nIntegration Complexity: Pre-built connectors + dedicated integration support\nMaintenance Burden: Business users manage workflows, IT sets governance"
    },
    "Operations Managers": {
      "Value Drivers": "Eliminate manual work, reduce errors, and scale your team's impact without burning out your people.",
      "Key Messages": "Stop drowning in spreadsheets and manual data entry. Acme automates your repetitive workflows so your team can focus on work that actually matters—and you can prove the impact.",
      "Proof Points": "• Sub-1% error rates\n• 15-20 hours saved per week per user\n• No-code workflow builder\n• Live in 2 weeks, not months\n• 94% user adoption rate",
      "Objection Handling": "Ease of Use: No-code builder + live training + template library\nUser Adoption: Intuitive interface with 94% adoption rate\nTime to Value: See results in weeks with quick-win templates"
    }
  }
};

export const copyExamples = {
  "Website": {
    "C-Suite Executives": {
      "Professional": {
        headline: "Scale Revenue Without Scaling Costs",
        subheadline: "Transform operations into your competitive advantage with intelligent workflow automation that delivers measurable ROI in months, not years.",
        body: "Growing B2B companies choose Acme to eliminate operational bottlenecks and tool sprawl that slow growth. Our customers achieve 60% faster processing times and 2-3x operational efficiency—proven results that drop straight to your bottom line with 8-12 month payback.",
        cta: "See ROI Calculator"
      },
      "Executive": {
        headline: "Operational Excellence at Scale",
        subheadline: "Leading mid-market companies trust Acme to deliver strategic agility through intelligent automation.",
        body: "Join 300+ fast-growing companies who've transformed their operations from cost centers to competitive advantages. Our enterprise-grade platform delivers the efficiency gains your board expects with the speed your business demands.",
        cta: "Request Executive Briefing"
      }
    },
    "IT Leaders": {
      "Technical": {
        headline: "Enterprise-Grade Integration Without the Enterprise Complexity",
        subheadline: "200+ pre-built connectors. SOC 2 certified. 2-week implementation. Actually works.",
        body: "Built for IT leaders who need enterprise capabilities without 6-month implementations. Our integration-first platform connects your existing tech stack with pre-built, tested connectors—not custom code projects. Deploy in weeks with enterprise-grade security, governance, and 99.9% uptime SLA.",
        cta: "View Integration Catalog"
      },
      "Professional": {
        headline: "Stop Fighting Integration Fires",
        subheadline: "Pre-built integrations that actually work, with enterprise security built in.",
        body: "Eliminate the integration headaches holding your organization back. Acme delivers seamless connectivity across your tech stack with 200+ pre-built integrations, SOC 2 compliance, and governance controls that keep IT in control while empowering business users.",
        cta: "See Technical Overview"
      }
    },
    "Operations Managers": {
      "Conversational": {
        headline: "Your Team Deserves Better Than Spreadsheets",
        subheadline: "Automate the boring stuff. Focus on work that matters. See results in weeks.",
        body: "Imagine eliminating 15-20 hours of manual data entry every single week. That's what Acme customers achieve with our no-code workflow automation. No IT projects. No months-long implementations. Just simple, powerful automation that starts delivering value in week one.",
        cta: "Start Free Trial"
      },
      "Professional": {
        headline: "Eliminate Manual Work, Multiply Your Impact",
        subheadline: "No-code workflow automation that scales your team without burnout.",
        body: "Stop losing hours to manual processes and data entry errors. Acme empowers operations teams to automate repetitive workflows without coding or IT dependencies. Deploy in 2 weeks and achieve sub-1% error rates while reclaiming 15-20 hours per week per team member.",
        cta: "Watch 2-Minute Demo"
      }
    }
  },
  "Email": {
    "C-Suite Executives": {
      "Executive": {
        subject: "60% faster processing time in 8-12 months",
        preview: "How TechCorp scaled 2x revenue with the same ops team",
        body: "Hi {{FirstName}},\n\nQuick question: What if you could scale revenue 2x without doubling your operations headcount?\n\nThat's exactly what TechCorp achieved with Acme. They reduced processing time by 60% and scaled from $10M to $20M ARR with the same 3-person ops team.\n\nThe key? Eliminating the tool sprawl and manual workflows that create operational drag as you scale.\n\nTheir CFO saw full ROI in 10 months—and that's with a white-glove implementation that took just 3 weeks.\n\nWant to see how this applies to {{CompanyName}}? I can send you their case study or hop on a quick call to walk through the numbers.\n\nBest,\n{{SenderName}}",
        cta: "Book 15-Min ROI Review"
      }
    },
    "IT Leaders": {
      "Technical": {
        subject: "Pre-built integration with {{CurrentTool}}—deployed in 2 weeks",
        preview: "No custom code. No 6-month project. Actually works.",
        body: "Hi {{FirstName}},\n\nI saw {{CompanyName}} uses {{CurrentTool}}. Most IT leaders tell us integrating workflow automation with their existing stack is a 3-6 month nightmare of custom code and broken connections.\n\nWe built Acme specifically to solve that problem.\n\nPre-built, tested connectors with {{CurrentTool}} and 200+ other platforms. SOC 2 certified. Deploy in 2 weeks, not months.\n\nFinanceFlow's IT Director deployed our full platform in 12 days—including integration with Salesforce, NetSuite, and their custom ERP. No custom code required.\n\nWant to see how the {{CurrentTool}} integration works? I can give you a technical walkthrough.\n\nBest,\n{{SenderName}}",
        cta: "Schedule Technical Deep Dive"
      }
    },
    "Operations Managers": {
      "Conversational": {
        subject: "Spending 15+ hours/week on manual data entry?",
        preview: "See how to get those hours back (without an IT project)",
        body: "Hi {{FirstName}},\n\nLet me guess: you're spending way too much time copying data between systems, fixing errors from manual entry, and explaining to your team why the boring work still isn't automated.\n\nSound familiar?\n\nThe operations managers we work with were losing 15-20 hours per week to manual workflows before using Acme. Now they've automated that work—without needing IT to build anything.\n\nOur no-code workflow builder means you can set up automation yourself. Most of our customers are live in 2 weeks and seeing results immediately.\n\nWant to see it in action? I can show you in a quick 15-minute demo—and we can even start building your first workflow together.\n\nBest,\n{{SenderName}}",
        cta: "Book Quick Demo"
      }
    }
  },
  "LinkedIn": {
    "C-Suite Executives": {
      "Executive": {
        post: "Most scaling B2B companies hit the same wall:\n\nRevenue grows 2x.\nOperational headcount needs to grow 2x.\nMargins compress.\n\nBut what if operations could be a competitive advantage instead of a cost center?\n\nI just reviewed our Q3 customer data. Companies using Acme scaled an average of 1.8x revenue while growing ops teams just 1.2x.\n\nThe difference? Eliminating the tool sprawl and manual workflows that create operational drag.\n\n60% faster processing times.\n50-70% reduction in manual work.\n8-12 month payback periods.\n\nOperational excellence isn't about working harder. It's about working smarter—with the right automation infrastructure.\n\nHow is your ops team scaling compared to revenue? 📊",
        cta: "Comments open—share your scaling challenges"
      }
    }
  },
  "Landing Page": {
    "Operations Managers": {
      "Conversational": {
        headline: "Stop Drowning in Manual Work",
        subheadline: "Automate your repetitive workflows in 2 weeks, not months—no coding required.",
        hero: "Join 300+ operations teams who've eliminated 15-20 hours of manual work per week with Acme's no-code workflow automation.",
        benefits: [
          "✓ Live in 2 weeks with quick-win templates",
          "✓ No-code builder—IT optional, not required",
          "✓ Sub-1% error rates vs 15%+ manual processes",
          "✓ 94% user adoption rate (people actually use it)"
        ],
        socialProof: "\"Our operations team is 3 people doing the work that used to require 7. We can scale without hiring proportionally.\" - Jennifer Liu, Operations Manager, ScaleUp Co",
        cta: "Start Your Free Trial"
      }
    }
  }
};
