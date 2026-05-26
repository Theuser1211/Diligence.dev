export const MOCK_PIPELINE_RESULT = {
  deal: {
    businessName: "Sunrise Café & Bakery",
    askingPrice: 1200000,
    industry: "Food & Beverage",
    yearsInOperation: 8,
    analysisTimestamp: "2025-01-15T09:32:00Z"
  },
  agentOne: {
    agentName: "File Marshal",
    status: "COMPLETE",
    documentsReceived: [
      { filename: "2022_tax_return.pdf", category: "Tax Return", year: 2022, confidence: 0.98 },
      { filename: "2023_tax_return.pdf", category: "Tax Return", year: 2023, confidence: 0.97 },
      { filename: "commercial_lease_main_st.pdf", category: "Commercial Lease", confidence: 0.99 },
      { filename: "bank_statements_q1_q4_2023.pdf", category: "Bank Statement", year: 2023, confidence: 0.95 },
      { filename: "equipment_list.pdf", category: "Asset Schedule", confidence: 0.91 }
    ],
    missingDocuments: [
      { document: "2021 Tax Return", severity: "HIGH", reason: "3-year trend requires 2021 baseline" },
      { document: "Franchise Disclosure Document", severity: "MEDIUM", reason: "Cannot verify brand obligations" },
      { document: "Payroll Records (Last 12 Months)", severity: "HIGH", reason: "Labor cost validation impossible" },
      { document: "Health Inspection Reports", severity: "LOW", reason: "Regulatory compliance unverified" }
    ],
    documentScore: 62
  },
  agentTwo: {
    agentName: "Forensic Accountant",
    status: "COMPLETE",
    revenueReconciliation: [
      { period: "2022 Full Year", taxReportedRevenue: 487000, bankDepositTotal: 441200, variance: -45800, variancePercent: -9.4, riskLevel: "MEDIUM", note: "Possible timing difference or owner draws pre-deposit" },
      { period: "2023 Full Year", taxReportedRevenue: 521000, bankDepositTotal: 448750, variance: -72250, variancePercent: -13.9, riskLevel: "HIGH", note: "Variance exceeds 10% threshold. Indicates possible revenue inflation on tax return or unreported cash withdrawals." },
      { period: "2023 Q1", taxReportedRevenue: 118000, bankDepositTotal: 109200, variance: -8800, variancePercent: -7.5, riskLevel: "LOW", note: "Within acceptable range" },
      { period: "2023 Q2", taxReportedRevenue: 134500, bankDepositTotal: 112400, variance: -22100, variancePercent: -16.4, riskLevel: "HIGH", note: "Spike in variance during peak summer season warrants scrutiny" },
      { period: "2023 Q3", taxReportedRevenue: 152000, bankDepositTotal: 138900, variance: -13100, variancePercent: -8.6, riskLevel: "MEDIUM", note: "Acceptable, monitor closely" },
      { period: "2023 Q4", taxReportedRevenue: 116500, bankDepositTotal: 88250, variance: -28250, variancePercent: -24.3, riskLevel: "CRITICAL", note: "Q4 variance is alarming. Possible year-end manipulation. Demand detailed transaction ledger." }
    ],
    claimedEBITDA: 148000,
    adjustedEBITDA: 101200,
    ebitdaAdjustmentNote: "Adjusted EBITDA reflects removal of owner discretionary expenses ($28k travel, $12k personal auto) and reconciled revenue baseline.",
    impliedMultiple: 8.1,
    adjustedMultiple: 11.9,
    forensicVerdict: "INFLATED — Financials appear materially overstated. The seller is presenting a 8.1x multiple, but adjusted figures yield a 11.9x multiple at the $1.2M ask. This is a significant red flag."
  },
  agentThree: {
    agentName: "Legal Hawk",
    status: "COMPLETE",
    leaseAnalysis: {
      property: "142 Main Street, Unit A",
      leaseExpiry: "2027-03-31",
      monthlyBaseRent: 8500,
      remainingTerm: "26 months",
      renewalOptions: "One 3-year option at landlord's then-market rate",
      transferabilityVerdict: "RISKY"
    },
    flaggedClauses: [
      {
        clauseType: "Rent Escalation",
        riskLevel: "HIGH",
        excerpt: "Rent shall increase by the greater of 5% or CPI annually",
        analysis: "A 5% floor on annual escalation significantly erodes margin. At current rent, Year 3 rent will be approximately $9,852/month — a $1,352 monthly increase. This was likely not factored into the seller's EBITDA projections.",
        recommendation: "Negotiate a hard cap of 3% annually or a fixed-step schedule."
      },
      {
        clauseType: "Assignment & Transfer",
        riskLevel: "CRITICAL",
        excerpt: "Tenant may not assign this lease without Landlord's prior written consent, which may be withheld in Landlord's sole and absolute discretion.",
        analysis: "This is a DEAL BREAKER clause. The landlord has unlimited veto power over the business sale itself. If the landlord declines to consent to the lease assignment, the acquisition cannot proceed. You must obtain written landlord consent BEFORE closing.",
        recommendation: "Obtain a signed Landlord Estoppel Certificate and Assignment Consent as a hard condition precedent to closing."
      },
      {
        clauseType: "Personal Guarantee",
        riskLevel: "HIGH",
        excerpt: "The obligations of Tenant shall be jointly and severally guaranteed by the individual owner(s) of Tenant.",
        analysis: "As the acquirer, you will inherit this guarantee obligation. Negotiate to have the personal guarantee released upon assignment and replaced with a new guarantee capped at 6 months' rent.",
        recommendation: "Require guarantee release and replacement as part of the purchase agreement."
      },
      {
        clauseType: "Permitted Use",
        riskLevel: "MEDIUM",
        excerpt: "Premises shall be used solely for the operation of a café and retail bakery and for no other purpose.",
        analysis: "Any pivot in business model (e.g., adding alcohol service, ghost kitchen, catering) requires landlord consent. This limits post-acquisition strategic flexibility.",
        recommendation: "Negotiate to broaden the permitted use clause to 'food and beverage retail and service'."
      },
      {
        clauseType: "Early Termination by Landlord",
        riskLevel: "HIGH",
        excerpt: "Landlord reserves the right to terminate this lease upon 90 days written notice in the event of redevelopment of the property.",
        analysis: "With only 26 months remaining on the lease and a single renewal option, this clause creates a scenario where the landlord could terminate during your payback period. The location is likely core to business value.",
        recommendation: "Require seller to exercise the renewal option prior to closing, extending the term to 2030. Negotiate demolition clause removal or extend notice period to 180 days."
      },
      {
        clauseType: "Operating Hours",
        riskLevel: "LOW",
        excerpt: "Tenant shall operate the business a minimum of 6 days per week, no fewer than 8 hours per day.",
        analysis: "Mandatory operating hours restrict your ability to reduce hours if labor costs require it. Minor risk but worth tracking.",
        recommendation: "Negotiate to remove or soften this to a 'commercially reasonable efforts' standard."
      }
    ],
    legalRiskScore: 71
  },
  agentFour: {
    agentName: "Deal Critic",
    status: "COMPLETE",
    verdict: "CONDITIONAL NO-GO",
    verdictColor: "AMBER",
    valuationScore: 38,
    dealSummary: "Sunrise Café & Bakery presents a viable core business obscured by materially inflated financials, a dangerously restrictive lease, and critical documentation gaps. The $1.2M asking price is not supportable at current evidence. The deal may be restructured at $680K–$780K with proper lease remediation and financial disclosure.",
    riskMatrix: {
      financial: "HIGH",
      legal: "CRITICAL",
      operational: "MEDIUM",
      market: "LOW"
    },
    negotiationPlaybook: [
      {
        priority: 1,
        lever: "Landlord Consent — Non-Negotiable Condition Precedent",
        tactic: "Do not proceed to any further stage without a signed Landlord Estoppel Certificate confirming consent to assignment. Make this a hard closing condition. If landlord refuses or delays, walk away immediately.",
        potentialImpact: "Eliminates existential deal risk"
      },
      {
        priority: 2,
        lever: "Price Reduction Based on Adjusted EBITDA",
        tactic: "Present the forensic reconciliation to the seller. Offer $720,000 based on 7.1x adjusted EBITDA of $101,200 — a standard multiple for a single-location food service business with concentration risk. Justify with your Q4 2023 variance data.",
        potentialImpact: "$480,000 price reduction"
      },
      {
        priority: 3,
        lever: "Seller Holdback / Earnout Clause",
        tactic: "Propose that 20% of the purchase price ($144,000 at ask; $144,000 at revised price) be held in escrow for 18 months, released only if trailing twelve-month revenue meets the seller's claimed figures within a 5% tolerance.",
        potentialImpact: "Protects against revenue inflation risk; aligns seller incentives"
      },
      {
        priority: 4,
        lever: "Rent Escalation Cap Negotiation",
        tactic: "Present a lease amendment requiring the rent escalation clause be changed from '5% or CPI' to 'fixed 2.5% annually' as a condition of purchase. Alternatively, request seller fund a $40,000 rent reserve at closing.",
        potentialImpact: "$18,000–$24,000 in saved rent costs over 3 years"
      },
      {
        priority: 5,
        lever: "Mandatory Document Production",
        tactic: "Issue a formal due diligence document request list. Require 2021 tax returns and all 12 months of payroll records within 10 business days. Extend due diligence period by 15 days. If documents are not produced, treat as material misrepresentation and exit.",
        potentialImpact: "Exposes potential fraud; validates or destroys adjusted EBITDA figure"
      },
      {
        priority: 6,
        lever: "Lease Renewal Exercise by Seller",
        tactic: "Require seller to exercise the 3-year renewal option prior to closing. This extends the lease to 2030, providing adequate time for investment payback and dramatically reducing the landlord termination risk.",
        potentialImpact: "Extends asset life and eliminates early termination exposure"
      }
    ],
    estimatedFairValue: { low: 680000, mid: 720000, high: 780000 },
    askingPriceVerdict: "OVERPRICED BY 54–76%"
  }
};

export const MOCK_AGENT_STREAM_EVENTS = [
  { agentIndex: 0, agentName: "File Marshal", message: "Initializing document ingestion pipeline...", delayMs: 400 },
  { agentIndex: 0, agentName: "File Marshal", message: "Analyzing 5 uploaded documents...", delayMs: 800 },
  { agentIndex: 0, agentName: "File Marshal", message: "Identifying tax returns and bank statements...", delayMs: 600 },
  { agentIndex: 0, agentName: "File Marshal", message: "Mapping asset schedules and commercial leases...", delayMs: 500 },
  { agentIndex: 0, agentName: "File Marshal", message: "Document classification complete. Confidence 96%.", delayMs: 700 },
  { agentIndex: 1, agentName: "Forensic Accountant", message: "Starting financial reconciliation...", delayMs: 900 },
  { agentIndex: 1, agentName: "Forensic Accountant", message: "Comparing tax-reported revenue vs. bank deposits...", delayMs: 1200 },
  { agentIndex: 1, agentName: "Forensic Accountant", message: "WARNING: Significant variance detected in Q4 2023.", delayMs: 1500 },
  { agentIndex: 1, agentName: "Forensic Accountant", message: "Calculating owner discretionary add-backs...", delayMs: 800 },
  { agentIndex: 1, agentName: "Forensic Accountant", message: "Adjusted EBITDA calculated at $101,200.", delayMs: 600 },
  { agentIndex: 2, agentName: "Legal Hawk", message: "Reviewing commercial lease for 142 Main St...", delayMs: 1000 },
  { agentIndex: 2, agentName: "Legal Hawk", message: "Analyzing rent escalation and renewal options...", delayMs: 1100 },
  { agentIndex: 2, agentName: "Legal Hawk", message: "CRITICAL: Landlord consent clause found. Assignment at risk.", delayMs: 1400 },
  { agentIndex: 2, agentName: "Legal Hawk", message: "Identifying personal guarantee obligations...", delayMs: 900 },
  { agentIndex: 2, agentName: "Legal Hawk", message: "Lease risk assessment finalized.", delayMs: 500 },
  { agentIndex: 3, agentName: "Deal Critic", message: "Synthesizing specialist agent reports...", delayMs: 1200 },
  { agentIndex: 3, agentName: "Deal Critic", message: "Running valuation sensitivity models...", delayMs: 1000 },
  { agentIndex: 3, agentName: "Deal Critic", message: "Drafting negotiation playbook and levers...", delayMs: 1300 },
  { agentIndex: 3, agentName: "Deal Critic", message: "Finalizing acquisition verdict...", delayMs: 1100 },
  { agentIndex: 3, agentName: "Deal Critic", message: "Diligence report generation complete.", delayMs: 600 }
];
