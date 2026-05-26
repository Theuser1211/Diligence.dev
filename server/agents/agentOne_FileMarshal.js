import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse';
import { MOCK_PIPELINE_RESULT } from '../mockData.js';

export async function runFileMarshal(files) {
  if (process.env.USE_MOCK_DATA === 'true' || !process.env.GEMINI_API_KEY) {
    return MOCK_PIPELINE_RESULT.agentOne;
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  console.log(`[File Marshal] Extracting text from ${files.length} files...`);
  
  const extractedDocs = await Promise.all(files.map(async (file) => {
    try {
      const data = await pdf(file.buffer);
      return {
        filename: file.originalname,
        content: data.text.substring(0, 10000) // Truncate per file to stay safe, though Flash has large context
      };
    } catch (err) {
      console.error(`Error parsing PDF ${file.originalname}:`, err);
      return { filename: file.originalname, content: "Error: Could not extract text." };
    }
  }));

  const prompt = `You are File Marshal, a document classification agent for M&A due diligence. 
  You receive extracted text from several uploaded PDF documents.
  
  Documents:
  ${extractedDocs.map(d => `--- FILE: ${d.filename} ---\n${d.content}\n`).join('\n')}

  Your task:
  1. Classify each document into categories (e.g., Tax Return, Lease, Bank Statement, Payroll, etc.).
  2. Identify the year/period if applicable.
  3. Determine a confidence score for each classification.
  4. Identify critical MISSING documents based on standard M&A due diligence (e.g., if 2023 tax return is there but 2022 is missing).
  5. Calculate an overall "documentScore" (1-100) representing the completeness of the data provided.

  Return a JSON object with these keys:
  - documentsReceived: array of objects { filename, category, year, confidence }
  - missingDocuments: array of objects { document, severity, reason }
  - documentScore: integer (1-100)
  - extractedContext: string (a concise summary of the most important financial/legal facts found across all files, for the next agents)`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
}
