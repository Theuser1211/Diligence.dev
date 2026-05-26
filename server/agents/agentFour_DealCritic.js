import { GoogleGenerativeAI } from "@google/generative-ai";
import { MOCK_PIPELINE_RESULT } from '../mockData.js';

export async function runDealCritic(agentOneResult, agentTwoResult, agentThreeResult) {
  if (process.env.USE_MOCK_DATA === 'true' || !process.env.GEMINI_API_KEY) {
    await new Promise(r => setTimeout(r, 600));
    return MOCK_PIPELINE_RESULT.agentFour;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are Deal Critic, a master M&A analyst AI. You synthesize reports from three specialist agents and render a final acquisition verdict based on REAL extracted data. 
  
  Reports:
  Marshal (Classification & Context): ${JSON.stringify(agentOneResult)}
  Accountant (Financials): ${JSON.stringify(agentTwoResult)}
  Legal (Contracts): ${JSON.stringify(agentThreeResult)}

  Your task:
  1. Synthesize the findings into a clear acquisition verdict (GO, CONDITIONAL NO-GO, NO-GO).
  2. Map out a 2x2 Risk Matrix.
  3. Create a prioritized Negotiation Playbook.
  4. Estimate a Fair Value Range based on adjusted EBITDA and multiples.

  Return a JSON object with these keys:
  - verdict: "GO", "CONDITIONAL NO-GO", or "NO-GO"
  - verdictColor: "GREEN", "AMBER", or "RED"
  - valuationScore: integer (1-100)
  - dealSummary: string
  - riskMatrix: object { financial, legal, operational, market } (values: LOW, MEDIUM, HIGH, CRITICAL)
  - negotiationPlaybook: array of objects { priority, lever, tactic, potentialImpact }
  - estimatedFairValue: object { low, mid, high }
  - askingPriceVerdict: string`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
