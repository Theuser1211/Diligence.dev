import { GoogleGenerativeAI } from "@google/generative-ai";

export async function runForensicAccountant(fileMarshalResult) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  const prompt = `You are a Forensic Accountant AI. You receive a summary of extracted text from due diligence documents.
  
  Extracted Context: ${fileMarshalResult.extractedContext || "No specific financial data found."}

  Analyze this data for revenue discrepancies and EBITDA adjustments.
  
  Return a JSON object with these keys:
  - revenueReconciliation: array of objects { period, taxReportedRevenue, bankDepositTotal, variance, variancePercent, riskLevel, note }
  - claimedEBITDA: number
  - adjustedEBITDA: number
  - ebitdaAdjustmentNote: string
  - impliedMultiple: number
  - adjustedMultiple: number
  - forensicVerdict: string`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
