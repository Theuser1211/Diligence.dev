import { GoogleGenerativeAI } from "@google/generative-ai";
import { MOCK_PIPELINE_RESULT } from '../mockData.js';

export async function runForensicAccountant(fileMarshalResult) {
  if (process.env.USE_MOCK_DATA === 'true' || !process.env.GEMINI_API_KEY) {
    await new Promise(r => setTimeout(r, 500));
    return MOCK_PIPELINE_RESULT.agentTwo;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are a Forensic Accountant AI. You receive a summary of extracted text from due diligence documents.
  
  Extracted Context: ${fileMarshalResult.extractedContext}

  Your task:
  1. Identify revenue figures from tax returns or bank statements.
  2. Perform a reconciliation (detect variances).
  3. Calculate/Verify EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization).
  4. Identify owner discretionary add-backs.
  5. Render a forensic verdict on financial transparency.

  Return a JSON object with these keys:
  - revenueReconciliation: array of objects { period, taxReportedRevenue, bankDepositTotal, variance, variancePercent, riskLevel, note }
  - claimedEBITDA: number
  - adjustedEBITDA: number
  - ebitdaAdjustmentNote: string
  - impliedMultiple: number
  - adjustedMultiple: number
  - forensicVerdict: string`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
