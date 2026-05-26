import { GoogleGenerativeAI } from "@google/generative-ai";

export async function runDealCritic(agentOneResult, agentTwoResult, agentThreeResult) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are Deal Critic, a master M&A analyst AI. Synthesize these specialist reports and render a final verdict.
  
  Reports:
  Marshal: ${JSON.stringify(agentOneResult)}
  Accountant: ${JSON.stringify(agentTwoResult)}
  Legal: ${JSON.stringify(agentThreeResult)}

  Return a JSON object with these keys:
  - verdict: "GO", "CONDITIONAL NO-GO", or "NO-GO"
  - verdictColor: "GREEN", "AMBER", or "RED"
  - valuationScore: integer (1-100)
  - dealSummary: string
  - riskMatrix: object { financial, legal, operational, market }
  - negotiationPlaybook: array of objects { priority, lever, tactic, potentialImpact }
  - estimatedFairValue: object { low, mid, high }
  - askingPriceVerdict: string`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
