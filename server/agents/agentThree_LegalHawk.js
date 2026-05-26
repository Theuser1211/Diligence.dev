import { GoogleGenerativeAI } from "@google/generative-ai";

export async function runLegalHawk(fileMarshalResult) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are Legal Hawk, an AI contract review agent. You receive a summary of extracted text from due diligence documents.
  
  Extracted Context: ${fileMarshalResult.extractedContext || "No specific legal data found."}

  Analyze the text for lease and legal risks.
  
  Return a JSON object with these keys:
  - leaseAnalysis: object { property, leaseExpiry, monthlyBaseRent, remainingTerm, renewalOptions, transferabilityVerdict }
  - flaggedClauses: array of objects { clauseType, riskLevel, excerpt, analysis, recommendation }
  - legalRiskScore: integer (1-100)`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
