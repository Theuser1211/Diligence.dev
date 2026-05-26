import { GoogleGenerativeAI } from "@google/generative-ai";
import { MOCK_PIPELINE_RESULT } from '../mockData.js';

export async function runLegalHawk(fileMarshalResult) {
  if (process.env.USE_MOCK_DATA === 'true' || !process.env.GEMINI_API_KEY) {
    await new Promise(r => setTimeout(r, 700));
    return MOCK_PIPELINE_RESULT.agentThree;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are Legal Hawk, an AI contract review agent. You receive a summary of extracted text from due diligence documents.
  
  Extracted Context: ${fileMarshalResult.extractedContext}

  Your task:
  1. Analyze commercial lease terms (expiry, rent, renewal options).
  2. Flag critical clauses like "Assignment and Transfer", "Personal Guarantees", and "Early Termination".
  3. Identify any other legal liabilities or unusual contractual obligations.
  4. Assign a legal risk score.

  Return a JSON object with these keys:
  - leaseAnalysis: object { property, leaseExpiry, monthlyBaseRent, remainingTerm, renewalOptions, transferabilityVerdict }
  - flaggedClauses: array of objects { clauseType, riskLevel, excerpt, analysis, recommendation }
  - legalRiskScore: integer (1-100)`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
