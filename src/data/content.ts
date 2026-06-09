export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "/solutions" },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
]

export const siteConfig = {
  name: "KnowledgeOS",
  tagline: "The Operating System for Enterprise Knowledge",
  description: "Build, validate, and optimize AI assistants powered by your own knowledge — with source-backed answers you can trust.",
}

export const heroContent = {
  home: {
    headline: "Your AI Is Only As Good As The Knowledge Behind It",
    subheadline: "Build AI assistants powered by your own knowledge, documents, policies, and expertise. Provide trusted answers backed by real sources.",
    cta: { primary: { label: "Build Your Bot", href: "/build-your-bot" }, secondary: { label: "Watch Demo", href: "/demo" } },
  },
  product: {
    headline: "Build Trusted AI Assistants From Your Knowledge",
    subheadline: "Transform documents into intelligent, searchable, source-backed AI assistants in minutes.",
    cta: { primary: { label: "Build Your Bot", href: "/build-your-bot" }, secondary: { label: "See Solutions", href: "/solutions" } },
  },
  solutions: {
    headline: "One Platform. Multiple Use Cases.",
    subheadline: "From customer support to compliance, KnowledgeOS powers AI assistants across every department.",
    cta: { primary: { label: "Build Your Bot", href: "/build-your-bot" }, secondary: { label: "See Demo", href: "/demo" } },
  },
  demo: {
    headline: "See KnowledgeOS In Action",
    subheadline: "Watch how enterprises transform their knowledge into trusted, source-backed AI assistants.",
    cta: { primary: { label: "Build Your Own Bot", href: "/build-your-bot" }, secondary: { label: "See Solutions", href: "/solutions" } },
  },
  buildBot: {
    headline: "Build Your AI Assistant In Minutes",
    subheadline: "Upload your knowledge and create a custom AI assistant without writing a single line of code.",
    cta: { primary: { label: "Build Your Bot", href: "/build-your-bot" }, secondary: { label: "Watch Demo", href: "/demo" } },
  },
  pricing: {
    headline: "Simple, Transparent Pricing",
    subheadline: "Start free, scale as you grow. No hidden fees, no surprise charges.",
    cta: { primary: { label: "Build Your Bot", href: "/build-your-bot" }, secondary: { label: "Contact Sales", href: "mailto:sales@knowledgeos.com" } },
  },
}

export const problems = [
  {
    icon: "SearchX",
    title: "Missing Knowledge",
    description: "Critical documents, policies, and expertise are scattered across silos — your AI can't access what doesn't exist in its knowledge base.",
  },
  {
    icon: "FilterX",
    title: "Poor Retrieval",
    description: "Even when knowledge exists, traditional search fails to find the right context, leading to irrelevant or incomplete answers.",
  },
  {
    icon: "AlertTriangle",
    title: "Hallucinated Responses",
    description: "Without proper grounding, LLMs fabricate answers. One hallucinated response can erode customer trust and create compliance risks.",
  },
  {
    icon: "EyeOff",
    title: "Black Box AI Systems",
    description: "You can't see why your AI answered the way it did. No citations, no traceability, no way to audit or improve responses.",
  },
]

export const comparisonItems = [
  { feature: "Source-backed answers", traditional: false, chatbot: false, basicAI: false, kos: true },
  { feature: "Knowledge validation", traditional: false, chatbot: false, basicAI: false, kos: true },
  { feature: "Retrieval transparency", traditional: false, chatbot: false, basicAI: false, kos: true },
  { feature: "Custom branding", traditional: false, chatbot: false, basicAI: true, kos: true },
  { feature: "No-code setup", traditional: false, chatbot: true, basicAI: true, kos: true },
  { feature: "Enterprise security", traditional: true, chatbot: false, basicAI: false, kos: true },
  { feature: "Deployment flexibility", traditional: false, chatbot: false, basicAI: true, kos: true },
  { feature: "Answer confidence scoring", traditional: false, chatbot: false, basicAI: false, kos: true },
  { feature: "Knowledge gap analysis", traditional: false, chatbot: false, basicAI: false, kos: true },
  { feature: "Audit trails", traditional: true, chatbot: false, basicAI: false, kos: true },
]

export const pillars = [
  {
    title: "Understand",
    description: "Gain deep visibility into what your AI knows and how it retrieves information.",
    items: [
      "Map your entire knowledge landscape",
      "See exactly which sources are retrieved for each query",
      "Understand chunk-level retrieval decisions",
      "Visualize knowledge relationships and gaps",
    ],
  },
  {
    title: "Validate",
    description: "Verify every answer against its source material with confidence scoring.",
    items: [
      "Ground every response in actual documents",
      "Get confidence and grounding scores per answer",
      "Identify hallucinated or unsupported claims",
      "Audit the full answer journey from query to response",
    ],
  },
  {
    title: "Optimize",
    description: "Continuously improve your AI's knowledge and retrieval quality.",
    items: [
      "Detect and fill knowledge gaps proactively",
      "Track retrieval quality across environments",
      "Adjust chunking and embedding strategies",
      "Measure and improve answer quality over time",
    ],
  },
]

export const capabilities = [
  { icon: "Upload", title: "Multi-format Upload", description: "Upload PDFs, DOCX, TXT, and web pages — your knowledge, your way." },
  { icon: "BrainCircuit", title: "Intelligent Processing", description: "Automatic chunking, embedding, and indexing optimized for your content." },
  { icon: "Search", title: "Smart Retrieval", description: "Semantic search that finds the right context every time." },
  { icon: "CheckCircle2", title: "Source Verification", description: "Every answer cites its sources — no more black box responses." },
  { icon: "SlidersHorizontal", title: "Full Customization", description: "Customize bot name, branding, instructions, and response tone." },
  { icon: "Shield", title: "Enterprise Security", description: "Your data stays yours. Role-based access and SOC 2 compliance." },
  { icon: "BarChart3", title: "Analytics & Insights", description: "Track usage, confidence scores, and knowledge gaps across environments." },
  { icon: "Zap", title: "Fast Deployment", description: "Launch a production-ready AI assistant in minutes, not months." },
]

export const howItWorksSteps = [
  { step: 1, title: "Upload", description: "Upload your documents — PDFs, policies, manuals, or knowledge base exports. We support all major formats." },
  { step: 2, title: "Configure", description: "Name your bot, set instructions, choose your tone, and customize the branding to match your company." },
  { step: 3, title: "Process", description: "Our engine automatically chunks, embeds, and indexes your knowledge for optimal retrieval." },
  { step: 4, title: "Preview", description: "Test your AI assistant with sample questions. See exactly which sources back each answer." },
  { step: 5, title: "Deploy", description: "Go live with a website widget, shareable link, or embedded assistant on your platform." },
  { step: 6, title: "Optimize", description: "Monitor performance, fill knowledge gaps, and continuously improve answer quality." },
]

export const businessOutcomes = [
  { icon: "Zap", title: "Faster Time to Answer", description: "Reduce resolution time from hours to seconds with instant AI responses backed by your actual knowledge." },
  { icon: "DollarSign", title: "Reduced Support Costs", description: "Deflect common questions to your AI assistant, cutting ticket volume and freeing your team for high-value work." },
  { icon: "FileSearch", title: "Source Transparency", description: "Every answer backed by real sources with citations — no hallucinations, no guesswork, full audit trail." },
  { icon: "Users", title: "Knowledge Democratized", description: "Unlock the value of your documents, policies, and institutional expertise across every team and department." },
]

export const testimonials = [
  {
    quote: "KnowledgeOS transformed how our support team operates. We went from 4-hour response times to instant answers backed by our actual documentation.",
    author: "Sarah Chen",
    role: "VP of Customer Experience",
    company: "TechScale Inc.",
  },
  {
    quote: "Finally, an AI solution that doesn't hallucinate. The source transparency alone saved us from a major compliance audit finding.",
    author: "Marcus Rodriguez",
    role: "Chief Information Security Officer",
    company: "FinSecure Corp.",
  },
  {
    quote: "We deployed our first bot in under two hours. The no-code setup and customizable branding made it a no-brainer for our team.",
    author: "Emily Nakamura",
    role: "Director of Knowledge Management",
    company: "GlobalServe Solutions",
  },
]

export const faqItems = [
  { q: "What file formats does KnowledgeOS support?", a: "KnowledgeOS supports PDF, DOCX, TXT, and web pages. We're continuously adding support for additional formats based on customer needs." },
  { q: "How does KnowledgeOS prevent hallucinations?", a: "Every answer is grounded in your actual documents. We use retrieval-augmented generation (RAG) with explicit source citations, confidence scoring, and grounding verification." },
  { q: "Do I need coding skills to build an AI assistant?", a: "Not at all. KnowledgeOS is designed for non-technical users. Upload your documents, configure your bot, and deploy — all without writing a single line of code." },
  { q: "Can I customize the look and feel of my AI assistant?", a: "Absolutely. You can customize the bot name, description, instructions, response tone, and branding to match your company's identity." },
  { q: "Where can I deploy my AI assistant?", a: "You can deploy as a website widget, a shareable link, an embedded assistant on your platform, or integrate via our API." },
  { q: "Is my data secure?", a: "Yes. Your knowledge is stored securely with encryption at rest and in transit. We offer role-based access control and SOC 2 compliance." },
]

export const pricingPlans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    description: "Perfect for small teams getting started with AI knowledge management.",
    features: ["Up to 3 bots", "100 documents per bot", "10,000 queries/month", "Standard embeddings", "Email support", "Basic analytics"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    description: "For growing teams that need advanced features and more capacity.",
    features: ["Up to 10 bots", "500 documents per bot", "50,000 queries/month", "Advanced embeddings", "Priority support", "Full analytics & insights", "Custom branding", "API access"],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with complex knowledge management needs.",
    features: ["Unlimited bots", "Unlimited documents", "Unlimited queries", "Custom embedding models", "Dedicated support & SLAs", "Advanced analytics & gap analysis", "Custom integrations", "On-premise deployment option", "SOC 2 & GDPR compliance", "Dedicated account manager"],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export const pricingFaq = [
  { q: "Can I switch plans later?", a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately." },
  { q: "Is there a free trial?", a: "We offer a 14-day free trial on the Professional plan with no credit card required." },
  { q: "What happens if I exceed my query limit?", a: "You'll receive a notification and can upgrade your plan or purchase additional query credits." },
  { q: "Do you offer discounts for annual billing?", a: "Yes, annual billing comes with a 20% discount on all plans." },
]

export const deploymentOptions = [
  { icon: "Globe", title: "Website Widget", description: "Embed a chat widget on your website with a single script tag." },
  { icon: "Link", title: "Shareable Link", description: "Generate a unique URL to share your AI assistant with anyone." },
  { icon: "Code2", title: "Embedded Assistant", description: "Integrate directly into your SaaS platform or internal tools." },
  { icon: "Database", title: "Knowledge Hub", description: "Create a central knowledge portal for your entire organization." },
  { icon: "Users", title: "Internal Assistant", description: "Deploy as an internal tool for employee self-service and training." },
  { icon: "MessageSquare", title: "Support Center", description: "Integrate with your existing help desk and support workflows." },
]

export const solutionCards = [
  {
    title: "Customer Support",
    problem: "Slow response times, inconsistent answers, and high ticket volumes.",
    solution: "Deploy an AI assistant trained on your knowledge base, FAQs, and product documentation.",
    outcome: "94% faster response times, 60% reduction in ticket volume.",
    examples: ["How do I reset my password?", "What's your return policy?", "Do you ship internationally?"],
  },
  {
    title: "Internal Knowledge",
    problem: "Institutional knowledge trapped in documents, wikis, and employee expertise.",
    solution: "Create a searchable AI assistant with access to all internal policies and procedures.",
    outcome: "3x improvement in knowledge utilization across teams.",
    examples: ["What's the expense approval process?", "Who handles vendor onboarding?", "What's our remote work policy?"],
  },
  {
    title: "HR Assistant",
    problem: "HR teams overwhelmed with repetitive questions about policies and benefits.",
    solution: "An AI assistant trained on your employee handbook, benefits docs, and HR policies.",
    outcome: "80% reduction in tier-1 HR ticket volume.",
    examples: ["How many vacation days do I have?", "What health insurance plans are available?", "How do I file a expense report?"],
  },
  {
    title: "Documentation Assistant",
    problem: "Users struggle to find the right information in extensive product documentation.",
    solution: "An AI assistant that understands your docs and provides answers with source citations.",
    outcome: "Significant reduction in documentation-related support tickets.",
    examples: ["How do I set up two-factor auth?", "What are the system requirements?", "How do I migrate from v2 to v3?"],
  },
  {
    title: "Sales Assistant",
    problem: "Sales reps spend hours searching for product specs, pricing, and competitive intel.",
    solution: "A sales AI assistant trained on product sheets, pricing docs, and battle cards.",
    outcome: "30% faster response to prospect questions during sales calls.",
    examples: ["What are the key features of Enterprise plan?", "How do we compare to Competitor X?", "What's the pricing for 500+ users?"],
  },
  {
    title: "Compliance Assistant",
    problem: "Compliance teams must ensure every AI response meets regulatory requirements.",
    solution: "An AI assistant with full audit trails, citation tracking, and confidence scoring.",
    outcome: "100% source transparency for every response, audit-ready logs.",
    examples: ["What are our data retention requirements?", "Show the policy on PII handling.", "What's our breach notification procedure?"],
  },
]

export const industryExamples = [
  {
    name: "Healthcare",
    description: "Provide patients and staff with instant, compliant answers from medical documentation, policies, and procedures.",
    icon: "HeartPulse",
  },
  {
    name: "SaaS",
    description: "Reduce support tickets with an AI assistant trained on your product docs, knowledge base, and FAQs.",
    icon: "Cloud",
  },
  {
    name: "Manufacturing",
    description: "Give operators and engineers instant access to manuals, safety procedures, and quality docs.",
    icon: "Factory",
  },
  {
    name: "Financial Services",
    description: "Deploy compliant AI assistants with full audit trails for regulatory requirements.",
    icon: "Landmark",
  },
  {
    name: "Education",
    description: "Create AI teaching assistants from course materials, syllabi, and academic policies.",
    icon: "GraduationCap",
  },
  {
    name: "Retail",
    description: "Power customer self-service with AI trained on product catalogs, policies, and inventory data.",
    icon: "ShoppingBag",
  },
]

export const demoSteps = [
  { step: 1, title: "Upload Documents", description: "Start by uploading your knowledge documents — PDFs, policies, manuals, or web pages. Our system accepts all major formats.", visual: "Upload" },
  { step: 2, title: "Process Knowledge", description: "Watch as our engine automatically chunks, embeds, and indexes your content for lightning-fast retrieval.", visual: "BrainCircuit" },
  { step: 3, title: "Ask Questions", description: "Test your AI assistant with real questions. See how it retrieves relevant context and generates grounded answers.", visual: "MessageSquare" },
  { step: 4, title: "Receive Verified Answers", description: "Every answer includes source citations, confidence scores, and grounding verification. No more black box responses.", visual: "CheckCircle2" },
]

export const demoQuestions = [
  { q: "What is your refund policy for enterprise customers?", a: "Enterprise customers receive a full refund within the first 30 days of their annual subscription. After 30 days, refunds are prorated based on remaining contract value. All enterprise agreements include a 30-day satisfaction guarantee.", sources: ["Enterprise_Agreement_Terms_v3.2.pdf (p. 4)", "Customer_Warranty_Policy_2025.pdf (p. 2)"] },
  { q: "How is data privacy handled in multi-tenant environments?", a: "Multi-tenant environments use isolated database schemas per tenant with AES-256 encryption at rest and TLS 1.3 in transit. Tenant data is never co-mingled. Full SOC 2 Type II compliance is maintained with quarterly audits.", sources: ["Security_Architecture_Overview.pdf (p. 7)", "Data_Isolation_Standards_v2.1.pdf (p. 3)"] },
  { q: "What are the SLA guarantees for the Professional plan?", a: "The Professional plan guarantees 99.9% uptime, with response times under 200ms for 95% of queries. Support tickets receive an initial response within 4 hours during business hours. Monthly credits are issued for any SLA breaches.", sources: ["Service_Level_Agreement_2025.pdf (p. 3)", "Professional_Plan_Overview.pdf (p. 8)"] },
]

export const beforeAfter = {
  before: { label: "Without KnowledgeOS", items: ["Hours spent searching for information", "No visibility into AI decision-making", "Hallucinated responses damage trust", "Knowledge trapped in silos", "No audit trail for compliance", "Manual updates to knowledge bases"] },
  after: { label: "With KnowledgeOS", items: ["Instant, source-backed answers", "Full retrieval transparency", "Grounded responses with citations", "Centralized knowledge management", "Complete audit trails", "Automated knowledge optimization"] },
}

export const knowledgeProcessingSteps = [
  { title: "Documents", description: "Your source materials — PDFs, DOCX, TXT, and web pages." },
  { title: "Chunking", description: "Documents are split into optimized, contextual chunks for precise retrieval." },
  { title: "Embeddings", description: "Each chunk is converted into a vector embedding for semantic search." },
  { title: "Indexing", description: "Embeddings are indexed in a vector database for fast, scalable retrieval." },
  { title: "Retrieval", description: "When asked a question, the most relevant chunks are retrieved with scores." },
  { title: "Generation", description: "The LLM generates a response grounded in the retrieved context with citations." },
]

export const productPreviewFeatures = [
  { icon: "Upload", title: "Upload Any Document", description: "PDFs, DOCX, TXT, web pages — drag and drop to build your knowledge base." },
  { icon: "BrainCircuit", title: "AI Processing", description: "Automatic chunking, embedding, and indexing optimized for your content." },
  { icon: "MessageSquare", title: "Smart Chat Interface", description: "Ask questions and get instant answers with source citations." },
  { icon: "FileSearch", title: "Source Verification", description: "Every answer includes citations, confidence scores, and grounding checks." },
]

export const houseCTA = {
  headline: "Ready To Build An AI Assistant Your Team Can Trust?",
  subheadline: "Upload your first document and get a working AI assistant in under 5 minutes. No code required.",
}

export const botConfigFields = [
  { field: "Bot Name", type: "text", description: "What should your AI assistant be called?" },
  { field: "Description", type: "textarea", description: "Briefly describe what your bot does." },
  { field: "Instructions", type: "textarea", description: "How should the bot behave? Set guidelines and constraints." },
  { field: "Tone", type: "select", description: "Professional, Friendly, Casual, or Custom." },
  { field: "Branding", type: "color", description: "Choose your brand colors and upload your logo." },
]
