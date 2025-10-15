// Mock survey response data for testing and development

export interface SurveyResponse {
  id: string;
  surveyId: string;
  surveyTitle: string;
  stakeholderType: string;
  role: string;
  respondent: {
    name: string;
    company: string;
    industry: string;
    companySize: string;
    email: string;
  };
  responses: {
    questionId: string;
    question: string;
    answer: string | string[] | number;
    type: string;
  }[];
  submittedAt: string;
  completionTime: number; // in minutes
}

export const mockSurveyResponses: SurveyResponse[] = [
  // Customer - End User Responses
  {
    id: "resp-001",
    surveyId: "customer-enduser-001",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "End User",
    respondent: {
      name: "Sarah Chen",
      company: "TechFlow Solutions",
      industry: "Software Development",
      companySize: "50-200 employees",
      email: "sarah.chen@techflow.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack feels like the most comprehensive platform for messaging strategy. You're positioned as the premium solution that brings together research, strategy, and execution in one place. Most competitors focus on just one piece of the puzzle.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Faster messaging development", "Better strategic alignment"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-15T10:30:00Z",
    completionTime: 8
  },
  {
    id: "resp-002",
    surveyId: "customer-decisionmaker-001",
    surveyTitle: "Customer - Decision Maker Survey",
    stakeholderType: "customer",
    role: "Decision Maker",
    respondent: {
      name: "Marcus Rodriguez",
      company: "GrowthCorp",
      industry: "Marketing Agency",
      companySize: "200-500 employees",
      email: "marcus@growthcorp.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "You're the premium choice for companies that are serious about messaging strategy. The AI component sets you apart, but it's really the systematic approach that sold me. Most tools are just survey builders - you're a complete methodology.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Better strategic alignment", "Cost savings", "Higher quality output"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-14T14:22:00Z",
    completionTime: 12
  },
  {
    id: "resp-003",
    surveyId: "internal-employee-001",
    surveyTitle: "Internal - Employee Survey",
    stakeholderType: "internal",
    role: "Marketing Manager",
    respondent: {
      name: "Jessica Wu",
      company: "Message Stack",
      industry: "SaaS",
      companySize: "10-50 employees",
      email: "jessica@messagestack.ai"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "We're pioneering a new category - AI-powered messaging strategy platforms. We're not just competing with survey tools or strategy consultants, we're creating something entirely new that combines the best of both worlds with AI efficiency.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's our strongest competitive advantage?",
        answer: ["AI-powered insights", "Comprehensive methodology", "Integrated workflow"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in our market position?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our platform delivers superior value compared to alternatives",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you believe we have product-market fit?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-13T09:15:00Z",
    completionTime: 6
  },
  {
    id: "resp-004",
    surveyId: "partner-integration-001",
    surveyTitle: "Partner - Integration Partner Survey",
    stakeholderType: "partner",
    role: "Integration Partner",
    respondent: {
      name: "David Kim",
      company: "StrategyPro Consulting",
      industry: "Business Consulting",
      companySize: "500+ employees",
      email: "david.kim@strategypro.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you position Message Stack to your clients?",
        answer: "We position Message Stack as the modern alternative to traditional messaging strategy development. It's what we recommend when clients need comprehensive messaging strategy but want faster turnaround and more systematic approach than traditional consulting.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What makes Message Stack attractive to your clients?",
        answer: ["Faster delivery", "Comprehensive approach", "AI-powered insights", "Cost effectiveness"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How likely are you to recommend Message Stack?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Message Stack enhances our service delivery to clients",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you expand our partnership?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-12T16:45:00Z",
    completionTime: 10
  },
  {
    id: "resp-005",
    surveyId: "customer-enduser-002",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Content Strategist",
    respondent: {
      name: "Emma Thompson",
      company: "BrandForward",
      industry: "Branding & Design",
      companySize: "10-50 employees",
      email: "emma@brandforward.co"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is positioned as the intelligent choice for messaging strategy. You've managed to make something that was traditionally very manual and consultant-heavy into something accessible and systematic. The AI feels like having a strategy consultant on demand.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Faster messaging development", "Higher quality output", "Better strategic alignment"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-11T11:20:00Z",
    completionTime: 7
  },
  {
    id: "resp-006",
    surveyId: "investor-potential-001",
    surveyTitle: "Investor - Potential Investor Survey",
    stakeholderType: "investor",
    role: "Venture Capitalist",
    respondent: {
      name: "Robert Chang",
      company: "NextGen Ventures",
      industry: "Venture Capital",
      companySize: "50-200 employees",
      email: "robert@nextgenvc.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you view Message Stack's market opportunity?",
        answer: "Message Stack is attacking a massive, underserved market. The messaging strategy space has been dominated by expensive consultants for decades. The combination of AI, systematic methodology, and integrated workflow could create a new category worth billions.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's most compelling about the opportunity?",
        answer: ["Large addressable market", "AI differentiation", "Recurring revenue model", "Network effects potential"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How strong is the competitive moat?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "This represents a significant investment opportunity",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you consider investing?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-10T13:30:00Z",
    completionTime: 15
  },
  {
    id: "resp-007",
    surveyId: "customer-enduser-003",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Marketing Director",
    respondent: {
      name: "Alex Morgan",
      company: "InnovateCorp",
      industry: "Technology",
      companySize: "200-500 employees",
      email: "alex.morgan@innovatecorp.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "You're the Netflix of messaging strategy - taking something that was traditionally high-touch and making it accessible, fast, and intelligent. The AI component isn't just a feature, it's a fundamental shift in how messaging strategy can be done.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Faster messaging development", "Cost savings", "Better strategic alignment"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-09T15:45:00Z",
    completionTime: 9
  },
  {
    id: "resp-008",
    surveyId: "competitor-analysis-001",
    surveyTitle: "Competitor Analysis Survey",
    stakeholderType: "market",
    role: "Industry Analyst",
    respondent: {
      name: "Dr. Lisa Park",
      company: "MarketInsights Research",
      industry: "Market Research",
      companySize: "100-500 employees",
      email: "lisa.park@marketinsights.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How does Message Stack compare to existing solutions?",
        answer: "Message Stack is creating a new category between traditional strategy consulting and DIY survey tools. The closest competitors are either too manual (consultants) or too basic (survey platforms). No one else combines systematic methodology with AI intelligence at this level.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What are Message Stack's key differentiators?",
        answer: ["AI-powered analysis", "Integrated workflow", "Systematic methodology", "Speed to insights"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How innovative is the approach?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Message Stack represents a significant innovation in the space",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you see this as a category-defining solution?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-08T10:15:00Z",
    completionTime: 20
  },
  {
    id: "resp-009",
    surveyId: "customer-enduser-004",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Product Manager",
    respondent: {
      name: "Jordan Smith",
      company: "ProductLab",
      industry: "Product Development",
      companySize: "50-200 employees",
      email: "jordan@productlab.io"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is positioned as the intelligent automation of what used to require expensive strategy consultants. You've democratized access to high-quality messaging strategy by making it faster, more systematic, and more affordable.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Faster messaging development", "Higher quality output"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-07T14:30:00Z",
    completionTime: 6
  },
  {
    id: "resp-010",
    surveyId: "internal-leadership-001",
    surveyTitle: "Internal - Leadership Survey",
    stakeholderType: "internal",
    role: "CEO",
    respondent: {
      name: "Sarah Johnson",
      company: "Message Stack",
      industry: "SaaS",
      companySize: "10-50 employees",
      email: "sarah@messagestack.ai"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our strategic position?",
        answer: "We're not just building a product, we're defining a new category. We're at the intersection of AI, strategy consulting, and marketing operations - creating something that's never existed before. Our position is as the category creator and leader.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's our strongest competitive advantage?",
        answer: ["First-mover advantage", "AI differentiation", "Comprehensive methodology", "Team expertise"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in our market position?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "We have a clear path to market leadership",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you believe we can achieve category leadership?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-06T09:00:00Z",
    completionTime: 12
  },
  {
    id: "resp-011",
    surveyId: "customer-decisionmaker-002",
    surveyTitle: "Customer - Decision Maker Survey",
    stakeholderType: "customer",
    role: "CMO",
    respondent: {
      name: "Michael Foster",
      company: "GrowthTech",
      industry: "B2B SaaS",
      companySize: "200-500 employees",
      email: "michael@growthtech.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack has positioned itself as the modern, intelligent alternative to traditional messaging strategy approaches. You've made something that was previously accessible only to large enterprises available to growing companies like ours.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Cost savings", "Better strategic alignment", "Faster messaging development"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-05T16:20:00Z",
    completionTime: 11
  },
  {
    id: "resp-012",
    surveyId: "partner-consultant-001",
    surveyTitle: "Partner - Strategy Consultant Survey",
    stakeholderType: "partner",
    role: "Strategy Consultant",
    respondent: {
      name: "Rachel Green",
      company: "Strategic Advantage",
      industry: "Management Consulting",
      companySize: "50-200 employees",
      email: "rachel@strategicadvantage.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you position Message Stack to your clients?",
        answer: "I position Message Stack as the future of messaging strategy - combining the rigor of traditional consulting with the speed and intelligence of modern AI. It's not replacing strategy thinking, it's augmenting it and making it more accessible.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What makes Message Stack attractive to your clients?",
        answer: ["Faster delivery", "Cost effectiveness", "Systematic approach", "AI-powered insights"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How likely are you to recommend Message Stack?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Message Stack enhances our service delivery to clients",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you expand our partnership?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-04T12:10:00Z",
    completionTime: 14
  },
  {
    id: "resp-013",
    surveyId: "customer-enduser-005",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Brand Manager",
    respondent: {
      name: "Kevin Liu",
      company: "BrandCraft",
      industry: "Consumer Goods",
      companySize: "500+ employees",
      email: "kevin.liu@brandcraft.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is the Tesla of messaging strategy - taking something traditional and making it intelligent, efficient, and accessible. The AI doesn't feel like a gimmick, it feels like the natural evolution of how this work should be done.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Higher quality output", "Better strategic alignment", "Improved team collaboration"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-03T08:45:00Z",
    completionTime: 8
  },
  {
    id: "resp-014",
    surveyId: "internal-employee-002",
    surveyTitle: "Internal - Employee Survey",
    stakeholderType: "internal",
    role: "Product Designer",
    respondent: {
      name: "Maria Gonzalez",
      company: "Message Stack",
      industry: "SaaS",
      companySize: "10-50 employees",
      email: "maria@messagestack.ai"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "We're pioneering human-centered AI for strategic work. Our position is unique because we're not trying to replace human thinking, we're amplifying it. We make strategic messaging accessible to teams that couldn't afford it before.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's our strongest competitive advantage?",
        answer: ["User experience design", "AI integration", "Workflow efficiency"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in our market position?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our platform delivers superior value compared to alternatives",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you believe we have product-market fit?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-02T13:25:00Z",
    completionTime: 7
  },
  {
    id: "resp-015",
    surveyId: "customer-enduser-006",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Communications Lead",
    respondent: {
      name: "Tyler Davis",
      company: "CommTech Solutions",
      industry: "Telecommunications",
      companySize: "1000+ employees",
      email: "tyler@commtech.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack occupies a unique position as the first truly intelligent messaging strategy platform. You've managed to systematize and accelerate what used to be a very artisanal, consultant-heavy process.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Faster messaging development", "Cost savings", "Higher quality output"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-03-01T11:15:00Z",
    completionTime: 9
  },
  {
    id: "resp-016",
    surveyId: "investor-current-001",
    surveyTitle: "Investor - Current Investor Survey",
    stakeholderType: "investor",
    role: "Angel Investor",
    respondent: {
      name: "Patricia Wong",
      company: "Wong Capital",
      industry: "Angel Investment",
      companySize: "1-10 employees",
      email: "patricia@wongcapital.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you view Message Stack's progress?",
        answer: "Message Stack is executing on a vision that could transform an entire industry. The combination of strong product-market fit signals, growing revenue, and expanding use cases gives me confidence we're building something significant.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's most impressive about the company's development?",
        answer: ["Product innovation", "Market traction", "Team execution", "Customer satisfaction"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in the investment?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "This investment is performing above expectations",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you invest again in a future round?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-29T15:40:00Z",
    completionTime: 18
  },
  {
    id: "resp-017",
    surveyId: "customer-decisionmaker-003",
    surveyTitle: "Customer - Decision Maker Survey",
    stakeholderType: "customer",
    role: "VP Marketing",
    respondent: {
      name: "Amanda Rivers",
      company: "ScaleUp Inc",
      industry: "Fintech",
      companySize: "100-500 employees",
      email: "amanda@scaleup.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is positioned as the intelligent evolution of messaging strategy. You've taken something that was historically very manual and consultant-dependent and made it scalable, repeatable, and accessible to growing companies.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Better strategic alignment", "Faster messaging development", "Cost savings"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-28T10:30:00Z",
    completionTime: 13
  },
  {
    id: "resp-018",
    surveyId: "partner-agency-001",
    surveyTitle: "Partner - Agency Partner Survey",
    stakeholderType: "partner",
    role: "Agency Partner",
    respondent: {
      name: "Chris Taylor",
      company: "Creative Collective",
      industry: "Marketing Agency",
      companySize: "20-50 employees",
      email: "chris@creativecollective.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you position Message Stack to your clients?",
        answer: "We position Message Stack as the professional-grade messaging strategy platform. It allows us to deliver consultant-level strategic work at agency speed and pricing. Our clients get the best of both worlds.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What makes Message Stack attractive to your clients?",
        answer: ["Professional quality", "Faster delivery", "Comprehensive approach", "Cost effectiveness"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How likely are you to recommend Message Stack?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Message Stack enhances our service delivery to clients",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you expand our partnership?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-27T14:15:00Z",
    completionTime: 12
  },
  {
    id: "resp-019",
    surveyId: "customer-enduser-007",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Marketing Coordinator",
    respondent: {
      name: "Sophie Martinez",
      company: "NextWave Digital",
      industry: "Digital Marketing",
      companySize: "10-50 employees",
      email: "sophie@nextwave.digital"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is like having a senior strategist available 24/7. You've democratized access to high-level messaging strategy by making it fast, affordable, and systematic. This would have cost us tens of thousands with a traditional consultant.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Cost savings", "Faster messaging development", "Higher quality output"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-26T09:30:00Z",
    completionTime: 6
  },
  {
    id: "resp-020",
    surveyId: "internal-employee-003",
    surveyTitle: "Internal - Employee Survey",
    stakeholderType: "internal",
    role: "AI Engineer",
    respondent: {
      name: "Raj Patel",
      company: "Message Stack",
      industry: "SaaS",
      companySize: "10-50 employees",
      email: "raj@messagestack.ai"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "We're at the forefront of applied AI for strategic business functions. Our position is unique because we're not just adding AI as a feature - we're fundamentally reimagining how strategic messaging work gets done with AI as a core enabler.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's our strongest competitive advantage?",
        answer: ["AI technology stack", "Data-driven insights", "Systematic methodology"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in our market position?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our platform delivers superior value compared to alternatives",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you believe we have product-market fit?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-25T16:20:00Z",
    completionTime: 8
  },
  {
    id: "resp-021",
    surveyId: "customer-enduser-008",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Startup Founder",
    respondent: {
      name: "Alex Chen",
      company: "LaunchPad Ventures",
      industry: "Venture Capital",
      companySize: "1-10 employees",
      email: "alex@launchpadvc.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is positioned perfectly for the modern startup ecosystem. You've made enterprise-level messaging strategy accessible to early-stage companies. The AI component makes it feel like having a world-class strategy team from day one.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Cost savings", "Professional quality", "Faster messaging development"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-24T12:45:00Z",
    completionTime: 7
  },
  {
    id: "resp-022",
    surveyId: "customer-decisionmaker-004",
    surveyTitle: "Customer - Decision Maker Survey",
    stakeholderType: "customer",
    role: "Head of Growth",
    respondent: {
      name: "Jamie Wilson",
      company: "GrowthLabs",
      industry: "SaaS",
      companySize: "50-200 employees",
      email: "jamie@growthlabs.io"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is the Figma of messaging strategy - collaborative, intelligent, and designed for modern teams. You've taken something that was traditionally siloed in strategy departments and made it accessible to the entire go-to-market team.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Better strategic alignment", "Improved team collaboration", "Faster messaging development"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-23T11:20:00Z",
    completionTime: 10
  },
  {
    id: "resp-023",
    surveyId: "partner-technology-001",
    surveyTitle: "Partner - Technology Partner Survey",
    stakeholderType: "partner",
    role: "Technology Partner",
    respondent: {
      name: "Lisa Zhang",
      company: "MarTech Solutions",
      industry: "Marketing Technology",
      companySize: "200-500 employees",
      email: "lisa@martechsolutions.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you position Message Stack to your clients?",
        answer: "We position Message Stack as the strategic layer that makes all other marketing technology more effective. It's the intelligence that informs how companies should position themselves across all their marketing tools and channels.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What makes Message Stack attractive to your clients?",
        answer: ["Integration capabilities", "Strategic value", "AI-powered insights", "Systematic approach"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How likely are you to recommend Message Stack?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Message Stack enhances our service delivery to clients",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you expand our partnership?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-22T15:10:00Z",
    completionTime: 11
  },
  {
    id: "resp-024",
    surveyId: "customer-enduser-009",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Content Marketing Manager",
    respondent: {
      name: "Morgan Brown",
      company: "ContentFirst",
      industry: "Content Marketing",
      companySize: "20-50 employees",
      email: "morgan@contentfirst.co"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack has positioned itself as the intelligence layer for content strategy. Instead of creating content in a vacuum, we now have a systematic way to ensure everything we create is strategically aligned and audience-focused.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Better strategic alignment", "Higher quality output", "Improved team collaboration"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-21T13:55:00Z",
    completionTime: 8
  },
  {
    id: "resp-025",
    surveyId: "internal-employee-004",
    surveyTitle: "Internal - Employee Survey",
    stakeholderType: "internal",
    role: "Sales Director",
    respondent: {
      name: "Carlos Rivera",
      company: "Message Stack",
      industry: "SaaS",
      companySize: "10-50 employees",
      email: "carlos@messagestack.ai"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "We're creating a new category that sits between strategy consulting and marketing tools. Our position is as the category creator - we're not competing, we're defining what intelligent messaging strategy looks like for modern businesses.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's our strongest competitive advantage?",
        answer: ["Category creation", "Comprehensive solution", "AI differentiation", "Customer success stories"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in our market position?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our platform delivers superior value compared to alternatives",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you believe we have product-market fit?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-20T10:40:00Z",
    completionTime: 9
  },
  {
    id: "resp-026",
    surveyId: "customer-enduser-010",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Demand Generation Manager",
    respondent: {
      name: "Taylor Kim",
      company: "DemandFlow",
      industry: "B2B Marketing",
      companySize: "100-500 employees",
      email: "taylor@demandflow.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is positioned as the strategic foundation for all demand generation activities. You've solved the problem of disconnected messaging across channels by providing a systematic way to ensure consistency and strategic alignment.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Better strategic alignment", "Improved campaign performance", "Faster messaging development"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-19T14:30:00Z",
    completionTime: 7
  },
  {
    id: "resp-027",
    surveyId: "customer-decisionmaker-005",
    surveyTitle: "Customer - Decision Maker Survey",
    stakeholderType: "customer",
    role: "Board Member",
    respondent: {
      name: "Victoria Sterling",
      company: "Sterling Enterprises",
      industry: "Investment",
      companySize: "1000+ employees",
      email: "victoria@sterling.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack represents the future of how strategic work gets done - combining human insight with AI efficiency. From a board perspective, it's exactly the kind of intelligence augmentation that creates sustainable competitive advantages.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Strategic competitive advantage", "Operational efficiency", "Better strategic alignment"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 5,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-18T16:15:00Z",
    completionTime: 15
  },
  {
    id: "resp-028",
    surveyId: "partner-reseller-001",
    surveyTitle: "Partner - Reseller Partner Survey",
    stakeholderType: "partner",
    role: "Reseller Partner",
    respondent: {
      name: "David Park",
      company: "Business Solutions Pro",
      industry: "Business Services",
      companySize: "50-200 employees",
      email: "david@bizsolpro.com"
    },
    responses: [
      {
        questionId: "q1",
        question: "How do you position Message Stack to your clients?",
        answer: "We position Message Stack as the professional messaging strategy solution that doesn't require hiring expensive consultants. It's perfect for our mid-market clients who need enterprise-level strategy capabilities at a growing company budget.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What makes Message Stack attractive to your clients?",
        answer: ["Cost effectiveness", "Professional quality", "Ease of use", "Comprehensive approach"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How likely are you to recommend Message Stack?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Message Stack enhances our service delivery to clients",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you expand our partnership?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-17T11:50:00Z",
    completionTime: 13
  },
  {
    id: "resp-029",
    surveyId: "customer-enduser-011",
    surveyTitle: "Customer - End User Survey",
    stakeholderType: "customer",
    role: "Digital Marketing Specialist",
    respondent: {
      name: "Casey Johnson",
      company: "DigitalFirst Agency",
      industry: "Digital Marketing",
      companySize: "10-50 employees",
      email: "casey@digitalfirst.agency"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "Message Stack is the Canva for messaging strategy - it makes something that used to require specialized expertise accessible to everyone. The AI feels like having a senior strategist guiding you through the process.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's the primary value you get from our solution?",
        answer: ["Ease of use", "Professional quality", "Faster messaging development"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How satisfied are you with our overall solution?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our solution helps my team create better messaging",
        answer: "Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Would you recommend our solution to a colleague?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-16T09:25:00Z",
    completionTime: 6
  },
  {
    id: "resp-030",
    surveyId: "internal-employee-005",
    surveyTitle: "Internal - Employee Survey",
    stakeholderType: "internal",
    role: "Customer Success Manager",
    respondent: {
      name: "Nina Patel",
      company: "Message Stack",
      industry: "SaaS",
      companySize: "10-50 employees",
      email: "nina@messagestack.ai"
    },
    responses: [
      {
        questionId: "q1",
        question: "How would you describe our position in the market?",
        answer: "We're positioned as the trusted partner for messaging strategy transformation. Our customers see us not just as a tool, but as the methodology that helps them think more systematically about their messaging across all touchpoints.",
        type: "text"
      },
      {
        questionId: "q2",
        question: "What's our strongest competitive advantage?",
        answer: ["Customer success focus", "Methodology completeness", "AI-human collaboration", "Proven results"],
        type: "multiple_choice"
      },
      {
        questionId: "q3",
        question: "How confident are you in our market position?",
        answer: 4,
        type: "rating"
      },
      {
        questionId: "q4",
        question: "Our platform delivers superior value compared to alternatives",
        answer: "Strongly Agree",
        type: "likert"
      },
      {
        questionId: "q5",
        question: "Do you believe we have product-market fit?",
        answer: "Yes",
        type: "yes_no"
      }
    ],
    submittedAt: "2024-02-15T15:10:00Z",
    completionTime: 8
  }
];

// Helper functions for data analysis
export const getResponsesByStakeholderType = (stakeholderType: string) => {
  return mockSurveyResponses.filter(response => response.stakeholderType === stakeholderType);
};

export const getResponsesByRole = (role: string) => {
  return mockSurveyResponses.filter(response => response.role === role);
};

export const getResponsesByCompanySize = (companySize: string) => {
  return mockSurveyResponses.filter(response => response.respondent.companySize === companySize);
};

export const getResponsesByIndustry = (industry: string) => {
  return mockSurveyResponses.filter(response => response.respondent.industry === industry);
};

// Summary statistics
export const getResponseStatistics = () => {
  const total = mockSurveyResponses.length;
  const byStakeholder = mockSurveyResponses.reduce((acc, response) => {
    acc[response.stakeholderType] = (acc[response.stakeholderType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byRole = mockSurveyResponses.reduce((acc, response) => {
    acc[response.role] = (acc[response.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const avgCompletionTime = mockSurveyResponses.reduce((sum, response) =>
    sum + response.completionTime, 0) / total;

  return {
    total,
    byStakeholder,
    byRole,
    avgCompletionTime: Math.round(avgCompletionTime * 10) / 10
  };
};
