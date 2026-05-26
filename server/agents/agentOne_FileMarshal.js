import { GoogleGenerativeAI } from "@google/generative-ai";
import pdf from 'pdf-parse';

export async function runFileMarshal(files) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured.");
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
        content: data.text.substring(0, 10000)
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
  1. Classify each document into categories.
  2. Identify the year/period if applicable.
  3. Determine a confidence score for each classification.
  4. Identify critical MISSING documents based on standard M&A due diligence.
  5. Calculate an overall "documentScore" (1-100).

  Return a JSON object with these keys:
  - documentsReceived: array of objects { filename, category, year, confidence }
  - missingDocuments: array of objects { document, severity, reason }
  - documentScore: integer (1-100)
  - extractedContext: string`;

  const result = await model.generateContent(prompt);
  return JSON.parse(result.response.text());
}
