export const knowledgeBases = {
  "customer-support": {
    name: "Customer Support",
    description: "Refund, returns, warranty, shipping and tracking policies",
    icon: "Building2",
    accent: "bg-blue-50",
    color: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    health: {
      readiness: 94,
      coverage: 91,
      metadataQuality: 96,
      chunkQuality: 89,
      indexHealth: 99,
      retrievalPerformance: 93,
    },
    documents: [
      { name: "Refund Policy", pages: 18, chunks: 124, category: "Policy", status: "Indexed", updated: "Today", content: "Refund requests may be initiated within seven days of delivery. Items must be unused and in original packaging. Processing takes 5-7 business days. Refunds are issued to the original payment method." },
      { name: "Returns Policy", pages: 12, chunks: 98, category: "Policy", status: "Indexed", updated: "Today", content: "Returns are accepted within 30 days of purchase. Items must be in original condition. Return shipping is free for premium members. Standard processing time is 3-5 business days." },
      { name: "Warranty Guide", pages: 24, chunks: 156, category: "Guide", status: "Indexed", updated: "Yesterday", content: "All products come with a 1-year limited warranty. Extended warranty plans are available for up to 3 years. Coverage includes manufacturing defects only." },
      { name: "Shipping Guide", pages: 8, chunks: 67, category: "Guide", status: "Indexed", updated: "2 days ago", content: "Standard shipping takes 5-7 business days. Express shipping delivers in 2-3 business days. Free shipping on orders over $50. International shipping available." },
      { name: "Tracking Guide", pages: 6, chunks: 45, category: "Guide", status: "Indexed", updated: "3 days ago", content: "Track your order using the order number and email. Tracking updates are sent every 24 hours. Contact support if no update for 48 hours." },
    ],
    questions: [
      "What is the refund policy?",
      "How can I return a product?",
      "What is the warranty period?",
      "How do I track my order?",
      "Can I cancel an order?",
      "How long does a refund take?",
      "Can I exchange instead?",
      "What products are excluded?",
    ],
    insights: {
      totalQuestions: 12480,
      popularTopics: [
        { topic: "Refunds & Returns", count: 3450, percentage: 28 },
        { topic: "Shipping & Delivery", count: 2890, percentage: 23 },
        { topic: "Account Management", count: 2100, percentage: 17 },
        { topic: "Product Information", count: 1850, percentage: 15 },
        { topic: "Warranty & Repairs", count: 1250, percentage: 10 },
        { topic: "Billing & Payments", count: 940, percentage: 7 },
      ],
      mostRetrievedDocuments: [
        { name: "Refund Policy.pdf", retrievals: 1240, percentage: 18 },
        { name: "Returns Policy.pdf", retrievals: 980, percentage: 14 },
        { name: "Shipping Guide.pdf", retrievals: 870, percentage: 13 },
        { name: "Warranty Guide.pdf", retrievals: 650, percentage: 9 },
        { name: "Tracking Guide.pdf", retrievals: 540, percentage: 8 },
      ],
      retrievalQuality: 94,
      coverageScore: 87,
    },
  },
  hr: {
    name: "HR Policies",
    description: "Leave, benefits, payroll and travel policies",
    icon: "ScrollText",
    accent: "bg-purple-50",
    color: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    health: {
      readiness: 88,
      coverage: 84,
      metadataQuality: 92,
      chunkQuality: 86,
      indexHealth: 97,
      retrievalPerformance: 89,
    },
    documents: [
      { name: "Leave Policy", pages: 15, chunks: 110, category: "Policy", status: "Indexed", updated: "Today", content: "Employees are entitled to 20 days of annual leave. Sick leave is 10 days per year. Maternity leave is 16 weeks. Paternity leave is 2 weeks." },
      { name: "Benefits Guide", pages: 22, chunks: 175, category: "Guide", status: "Indexed", updated: "Yesterday", content: "Health insurance covers medical, dental and vision. 401(k) matching up to 5%. Annual bonus based on performance. Stock options available." },
      { name: "Payroll Policy", pages: 10, chunks: 82, category: "Policy", status: "Indexed", updated: "2 days ago", content: "Payroll is processed bi-weekly. Direct deposit is required. Overtime is paid at 1.5x base rate. Pay stubs available online." },
      { name: "Travel Policy", pages: 14, chunks: 105, category: "Policy", status: "Indexed", updated: "3 days ago", content: "Business class for flights over 6 hours. Hotel budget up to $300/night. Per diem of $75 for meals. Car rental covered for business use." },
    ],
    questions: [
      "How many vacation days do I get?",
      "What health insurance options are available?",
      "When is payday?",
      "What is the travel reimbursement policy?",
      "How do I file a sick leave request?",
      "What is the maternity leave policy?",
      "Can I work remotely from another country?",
    ],
    insights: {
      totalQuestions: 8760,
      popularTopics: [
        { topic: "Leave & Time Off", count: 2340, percentage: 27 },
        { topic: "Health Benefits", count: 1980, percentage: 23 },
        { topic: "Payroll & Compensation", count: 1650, percentage: 19 },
        { topic: "Travel & Expenses", count: 1240, percentage: 14 },
        { topic: "Remote Work", count: 890, percentage: 10 },
        { topic: "Retirement & Savings", count: 660, percentage: 7 },
      ],
      mostRetrievedDocuments: [
        { name: "Benefits Guide.pdf", retrievals: 980, percentage: 21 },
        { name: "Leave Policy.pdf", retrievals: 870, percentage: 18 },
        { name: "Payroll Policy.pdf", retrievals: 650, percentage: 14 },
        { name: "Travel Policy.pdf", retrievals: 540, percentage: 11 },
      ],
      retrievalQuality: 89,
      coverageScore: 84,
    },
  },
  "it-support": {
    name: "IT Support",
    description: "VPN, email, password and device setup guides",
    icon: "Monitor",
    accent: "bg-amber-50",
    color: "text-amber-600",
    badge: "bg-amber-100 text-amber-700",
    health: {
      readiness: 92,
      coverage: 88,
      metadataQuality: 94,
      chunkQuality: 90,
      indexHealth: 98,
      retrievalPerformance: 91,
    },
    documents: [
      { name: "VPN Setup", pages: 8, chunks: 62, category: "Guide", status: "Indexed", updated: "Today", content: "Download the VPN client from the portal. Install and log in with company credentials. Select the appropriate server location. Connection is automatic on launch." },
      { name: "Email Access", pages: 6, chunks: 48, category: "Guide", status: "Indexed", updated: "Yesterday", content: "Access email via Outlook Web App or configure in Outlook client. IMAP settings available in the IT portal. Two-factor authentication required." },
      { name: "Password Reset", pages: 4, chunks: 32, category: "Guide", status: "Indexed", updated: "2 days ago", content: "Reset password via the company portal. Security questions required. New password must be 12+ characters. History prevents last 5 passwords." },
      { name: "Device Enrollment", pages: 10, chunks: 78, category: "Guide", status: "Indexed", updated: "3 days ago", content: "Enroll devices via MDM portal. Company devices are auto-enrolled. Personal devices require MDM profile installation. Encryption is mandatory." },
    ],
    questions: [
      "How do I set up VPN access?",
      "How do I configure my email?",
      "I forgot my password, what do I do?",
      "How do I enroll my device?",
      "How do I install the VPN client?",
      "What are the IMAP settings?",
      "How do I enable 2FA?",
    ],
    insights: {
      totalQuestions: 6540,
      popularTopics: [
        { topic: "VPN & Remote Access", count: 1890, percentage: 29 },
        { topic: "Email Configuration", count: 1450, percentage: 22 },
        { topic: "Password & Security", count: 1320, percentage: 20 },
        { topic: "Device Management", count: 980, percentage: 15 },
        { topic: "Software Access", count: 620, percentage: 10 },
        { topic: "Network Issues", count: 280, percentage: 4 },
      ],
      mostRetrievedDocuments: [
        { name: "VPN Setup.pdf", retrievals: 1120, percentage: 24 },
        { name: "Password Reset.pdf", retrievals: 890, percentage: 19 },
        { name: "Email Access.pdf", retrievals: 760, percentage: 16 },
        { name: "Device Enrollment.pdf", retrievals: 540, percentage: 12 },
      ],
      retrievalQuality: 91,
      coverageScore: 88,
    },
  },
  compliance: {
    name: "Compliance",
    description: "Privacy, security, governance and audit guidelines",
    icon: "Shield",
    accent: "bg-red-50",
    color: "text-red-600",
    badge: "bg-red-100 text-red-700",
    health: {
      readiness: 96,
      coverage: 93,
      metadataQuality: 98,
      chunkQuality: 92,
      indexHealth: 99,
      retrievalPerformance: 95,
    },
    documents: [
      { name: "Privacy Policy", pages: 20, chunks: 145, category: "Policy", status: "Indexed", updated: "Today", content: "We collect minimal data required for service. Data is encrypted at rest and in transit. User data is never sold to third parties. GDPR and CCPA compliant." },
      { name: "Security Standards", pages: 25, chunks: 185, category: "Standards", status: "Indexed", updated: "Yesterday", content: "SOC 2 Type II certified. Annual penetration testing required. All employees must complete security training. Incident response within 1 hour." },
      { name: "Governance Framework", pages: 30, chunks: 210, category: "Framework", status: "Indexed", updated: "2 days ago", content: "Data governance follows COBIT framework. Quarterly review meetings. Data retention policies enforced automatically. Access control reviews monthly." },
      { name: "Audit Guidelines", pages: 18, chunks: 130, category: "Guide", status: "Indexed", updated: "3 days ago", content: "Internal audits conducted quarterly. External audits annually. All logs retained for 12 months. Audit trail includes all data access." },
    ],
    questions: [
      "What data do you collect?",
      "What security certifications do you have?",
      "How often are audits conducted?",
      "How is data governed?",
      "Are we GDPR compliant?",
      "What is our incident response plan?",
      "How long are logs retained?",
    ],
    insights: {
      totalQuestions: 4320,
      popularTopics: [
        { topic: "Data Privacy", count: 1240, percentage: 29 },
        { topic: "Security Compliance", count: 980, percentage: 23 },
        { topic: "Audit Readiness", count: 870, percentage: 20 },
        { topic: "Governance", count: 650, percentage: 15 },
        { topic: "Incident Response", count: 340, percentage: 8 },
        { topic: "Training & Awareness", count: 240, percentage: 5 },
      ],
      mostRetrievedDocuments: [
        { name: "Security Standards.pdf", retrievals: 890, percentage: 22 },
        { name: "Privacy Policy.pdf", retrievals: 780, percentage: 19 },
        { name: "Governance Framework.pdf", retrievals: 650, percentage: 16 },
        { name: "Audit Guidelines.pdf", retrievals: 520, percentage: 13 },
      ],
      retrievalQuality: 95,
      coverageScore: 93,
    },
  },
}

export const recentQuestions = {
  "customer-support": [
    "What is the refund policy?",
    "How can I return a product?",
    "What is the warranty period?",
    "How do I track my order?",
    "Can I cancel an order?",
  ],
  hr: [
    "How many vacation days do I get?",
    "What health insurance options are available?",
    "When is payday?",
    "What is the travel reimbursement policy?",
  ],
  "it-support": [
    "How do I set up VPN access?",
    "How do I configure my email?",
    "I forgot my password, what do I do?",
    "How do I enroll my device?",
  ],
  compliance: [
    "What data do you collect?",
    "What security certifications do you have?",
    "How often are audits conducted?",
    "How is data governed?",
  ],
}

export const sampleChunks = [
  { id: 12, text: "Refund requests may be initiated within seven days of delivery. Items must be unused and in original packaging. Processing takes 5-7 business days.", tokens: 24, source: "Refund Policy.pdf", retrievals: 324, lastRetrieved: "2 hours ago", avgSimilarity: 96, connectedChunks: [8, 11, 17, 19] },
  { id: 17, text: "Refunds are issued to the original payment method. Store credit is available as an alternative. Expedited processing available for premium members.", tokens: 18, source: "Refund Policy.pdf", retrievals: 287, lastRetrieved: "4 hours ago", avgSimilarity: 94, connectedChunks: [12, 15, 21] },
  { id: 24, text: "Damaged items may be eligible for full refund including shipping costs. Photographic evidence required within 48 hours of delivery.", tokens: 16, source: "Returns Policy.pdf", retrievals: 198, lastRetrieved: "1 hour ago", avgSimilarity: 89, connectedChunks: [12, 17, 22, 28] },
  { id: 31, text: "Return shipping is free for premium members. Standard processing time is 3-5 business days after item is received.", tokens: 14, source: "Returns Policy.pdf", retrievals: 156, lastRetrieved: "6 hours ago", avgSimilarity: 87, connectedChunks: [24, 28, 35] },
  { id: 42, text: "Extended warranty plans cover up to 3 years from date of purchase. Coverage includes manufacturing defects and hardware failures.", tokens: 18, source: "Warranty Guide.pdf", retrievals: 134, lastRetrieved: "12 hours ago", avgSimilarity: 85, connectedChunks: [38, 40, 45] },
]

export const documentRelationships = [
  { source: "Refund Policy.pdf", targets: ["Returns Policy.pdf", "Shipping Guide.pdf", "Customer Support FAQ"], strength: "strong" },
  { source: "Returns Policy.pdf", targets: ["Refund Policy.pdf", "Warranty Guide.pdf", "Shipping Guide.pdf"], strength: "strong" },
  { source: "Warranty Guide.pdf", targets: ["Returns Policy.pdf", "Product Guide.pdf", "Customer Support FAQ"], strength: "medium" },
  { source: "Shipping Guide.pdf", targets: ["Tracking Guide.pdf", "Returns Policy.pdf", "Refund Policy.pdf"], strength: "strong" },
  { source: "Tracking Guide.pdf", targets: ["Shipping Guide.pdf", "Customer Support FAQ"], strength: "medium" },
]

export const topicRelationships = [
  { source: "Refunds", targets: ["Returns", "Warranty", "Shipping"], strength: "strong" },
  { source: "Returns", targets: ["Refunds", "Warranty", "Shipping", "Exchanges"], strength: "strong" },
  { source: "Warranty", targets: ["Returns", "Repairs", "Product Quality"], strength: "medium" },
  { source: "Shipping", targets: ["Tracking", "Returns", "International"], strength: "strong" },
  { source: "Tracking", targets: ["Shipping", "Delivery Status"], strength: "medium" },
]

export const chunkRelationships = [
  { source: "Chunk 12", targets: ["Chunk 17", "Chunk 24"], strength: "strong" },
  { source: "Chunk 17", targets: ["Chunk 12", "Chunk 21"], strength: "medium" },
  { source: "Chunk 24", targets: ["Chunk 12", "Chunk 31"], strength: "strong" },
]

export const answerResponse = {
  answer: "Our refund policy allows customers to initiate refund requests within seven days of delivery. Items must be unused and in their original packaging to qualify. Once approved, refunds are typically processed within 5-7 business days and issued to the original payment method.",
  keyFindings: [
    "Refund requests accepted within 7 days of delivery",
    "Items must be unused and in original packaging",
    "Processing time is 5-7 business days",
    "Refunds issued to original payment method",
  ],
  confidence: 97,
  confidenceBreakdown: {
    sourceMatch: 98,
    semanticMatch: 96,
    retrievalConfidence: 97,
    generationConfidence: 95,
    overall: 97,
  },
  sourcesUsed: ["Refund Policy.pdf", "Returns Policy.pdf"],
  retrievedChunks: [
    { id: "Chunk 12", text: "Refund requests may be initiated within seven days of delivery. Items must be unused and in original packaging. Processing takes 5-7 business days.", similarity: 98, source: "Refund Policy.pdf" },
    { id: "Chunk 17", text: "Refunds are issued to the original payment method. Store credit is available as an alternative.", similarity: 87, source: "Refund Policy.pdf" },
    { id: "Chunk 24", text: "Damaged items may be eligible for full refund including shipping costs.", similarity: 72, source: "Returns Policy.pdf" },
  ],
  followUpQuestions: [
    "How long does a refund take?",
    "Can I exchange instead?",
    "What products are excluded?",
  ],
  answerExplanation: {
    summary: "This answer was generated based on the highest semantically matched documents in the knowledge base.",
    documentsUsed: [
      { name: "Refund Policy.pdf", reason: "Contained the highest semantic match (98%) for the query", relevance: "Primary source" },
      { name: "Returns Policy.pdf", reason: "Provided supporting context for related policies", relevance: "Secondary source" },
    ],
    chunksUsed: [
      { id: "Chunk 12", reason: "Directly addressed refund eligibility and timeline", confidence: 98 },
      { id: "Chunk 17", reason: "Provided refund processing method details", confidence: 87 },
      { id: "Chunk 24", reason: "Covered damaged item scenarios as supplementary context", confidence: 72 },
    ],
    confidenceFactors: [
      "High semantic similarity between query and source documents (avg 86%)",
      "Multiple corroborating sources confirming the same policy",
      "Low LLM temperature (0.1) ensuring factual consistency",
      "Source documents have high metadata quality score (96%)",
    ],
  },
  answerJourney: {
    question: "What is the refund policy?",
    embedding: { model: "BGE Large", dimensions: 1024, queryVector: "[-0.023, 0.456, -0.789, ...]" },
    vectorSearch: {
      strategy: "Cosine Similarity",
      topK: 5,
      threshold: 0.75,
      results: 3,
      retrievedDocuments: [
        { name: "Refund Policy.pdf", score: 0.98 },
        { name: "Returns Policy.pdf", score: 0.87 },
        { name: "Customer FAQ.pdf", score: 0.72 },
      ],
    },
    retrievedChunks: [
      { id: "Chunk 12", text: "Refund requests may be initiated within seven days of delivery...", score: 0.98, document: "Refund Policy.pdf" },
      { id: "Chunk 17", text: "Refunds are issued to the original payment method...", score: 0.87, document: "Refund Policy.pdf" },
      { id: "Chunk 24", text: "Damaged items may be eligible for full refund...", score: 0.72, document: "Returns Policy.pdf" },
    ],
    contextAssembly: {
      tokensUsed: 1248,
      strategy: "Top-K with relevance scoring",
      combinedChunks: ["Chunk 12", "Chunk 17", "Chunk 24"],
      promptPreview: "You are a helpful assistant. Use the following context to answer the user's question accurately.\n\nContext:\n[Chunk 12] Refund requests may be initiated within seven days of delivery...\n[Chunk 17] Refunds are issued to the original payment method...\n[Chunk 24] Damaged items may be eligible for full refund...\n\nQuestion: What is the refund policy?\n\nAnswer:",
    },
    llmGeneration: { model: "DeepSeek v3", temperature: 0.1, tokensGenerated: 256, latencyMs: 1240 },
  },
}

export const knowledgeGapsEngine = {
  summary: {
    questionsAsked: 12480,
    answered: 11232,
    answeredRate: 90,
    lowConfidence: 748,
    lowConfidenceRate: 6,
    unanswered: 500,
    unansweredRate: 4,
  },
  gaps: [
    { topic: "Exchange Policy", asked: 42, coverage: "Missing" as const, confidence: 0, impact: "High" as const },
    { topic: "Warranty Claim Process", asked: 38, coverage: "Partial" as const, confidence: 63, impact: "High" as const },
    { topic: "International Shipping Costs", asked: 48, coverage: "Missing" as const, confidence: 0, impact: "High" as const },
    { topic: "Gift Card Policies", asked: 35, coverage: "Missing" as const, confidence: 0, impact: "Medium" as const },
    { topic: "Subscription Cancellation", asked: 28, coverage: "Partial" as const, confidence: 45, impact: "Medium" as const },
    { topic: "Bulk Order Discounts", asked: 22, coverage: "Missing" as const, confidence: 0, impact: "Low" as const },
    { topic: "Product Availability", asked: 19, coverage: "Partial" as const, confidence: 51, impact: "Low" as const },
    { topic: "Returns for International Orders", asked: 31, coverage: "Missing" as const, confidence: 0, impact: "Medium" as const },
  ],
  recommendations: [
    { action: "Create Exchange Policy document", impact: "High", effort: "Low" },
    { action: "Add Warranty Claim Process section to Warranty Guide", impact: "High", effort: "Medium" },
    { action: "Document International Shipping costs and policies", impact: "High", effort: "Medium" },
    { action: "Create Gift Card policy document", impact: "Medium", effort: "Low" },
    { action: "Add Subscription cancellation guide", impact: "Medium", effort: "Low" },
  ],
}

export const dashboardData = {
  documentsIndexed: 17,
  chunksIndexed: 1785,
  knowledgeReadiness: 92,
  coverageScore: 87,
  mostRetrievedDocuments: [
    { name: "Refund Policy.pdf", retrievals: 1240 },
    { name: "Returns Policy.pdf", retrievals: 980 },
    { name: "Shipping Guide.pdf", retrievals: 870 },
    { name: "Warranty Guide.pdf", retrievals: 650 },
    { name: "Tracking Guide.pdf", retrievals: 540 },
  ],
  mostReferencedChunks: [
    { id: "Chunk 12", retrievals: 324, document: "Refund Policy.pdf" },
    { id: "Chunk 17", retrievals: 287, document: "Refund Policy.pdf" },
    { id: "Chunk 24", retrievals: 198, document: "Returns Policy.pdf" },
    { id: "Chunk 31", retrievals: 156, document: "Returns Policy.pdf" },
    { id: "Chunk 42", retrievals: 134, document: "Warranty Guide.pdf" },
  ],
  retrievalSuccessRate: 94,
  averageConfidence: 89,
  knowledgeGaps: 8,
  healthByEnvironment: Object.fromEntries(
    Object.entries({
      "customer-support": knowledgeBases["customer-support"],
      hr: knowledgeBases.hr,
      "it-support": knowledgeBases["it-support"],
      compliance: knowledgeBases.compliance,
    }).map(([key, kb]) => [key, kb.health])
  ),
}

export const pipelineDeepDive = {
  upload: {
    fileName: "Refund Policy.pdf",
    documentType: "PDF",
    pageCount: 18,
    fileSize: "2.4 MB",
    uploadTime: "2026-06-02 14:32:10",
    processingTime: "3.2 seconds",
  },
  parse: {
    textExtracted: "12,450 words",
    tablesDetected: 3,
    imagesDetected: 2,
    metadataFieldsFound: "Title, Author, Date, Pages, Category",
    languageDetected: "English (en)",
  },
  chunk: {
    chunkCount: 124,
    avgChunkSize: "256 tokens",
    chunkingStrategy: "Semantic + Overlap",
    chunkOverlap: "128 tokens",
    chunks: sampleChunks,
  },
  embed: {
    embeddingModel: "BGE Large",
    embeddingCount: 124,
    vectorDimensions: 1024,
    embeddingQualityScore: 96,
  },
  index: {
    indexedRecords: 124,
    indexHealth: "Optimal",
    searchReadiness: "Ready",
    vectorStoreStatus: "Connected",
  },
}
