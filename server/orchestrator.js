import { runFileMarshal } from './agents/agentOne_FileMarshal.js';
import { runForensicAccountant } from './agents/agentTwo_ForensicAccountant.js';
import { runLegalHawk } from './agents/agentThree_LegalHawk.js';
import { runDealCritic } from './agents/agentFour_DealCritic.js';
import { MOCK_PIPELINE_RESULT, MOCK_AGENT_STREAM_EVENTS } from './mockData.js';

export async function runLivePipeline(files, sseEmitter) {
  try {
    sseEmitter('agent_update', { agentIndex: 0, message: "Initializing document ingestion..." });
    const agentOneResult = await runFileMarshal(files);
    sseEmitter('agent_complete', { agentIndex: 0, result: agentOneResult });

    sseEmitter('agent_update', { agentIndex: 1, message: "Analyzing financial patterns..." });
    sseEmitter('agent_update', { agentIndex: 2, message: "Reviewing legal obligations..." });

    // Pass the extractedContext to subsequent agents
    const [agentTwoResult, agentThreeResult] = await Promise.all([
      runForensicAccountant(agentOneResult),
      runLegalHawk(agentOneResult)
    ]);

    sseEmitter('agent_complete', { agentIndex: 1, result: agentTwoResult });
    sseEmitter('agent_complete', { agentIndex: 2, result: agentThreeResult });

    sseEmitter('agent_update', { agentIndex: 3, message: "Synthesizing deal verdict..." });
    const agentFourResult = await runDealCritic(agentOneResult, agentTwoResult, agentThreeResult);
    sseEmitter('agent_complete', { agentIndex: 3, result: agentFourResult });

    const finalResult = {
      deal: {
        businessName: agentOneResult.documentsReceived?.[0]?.filename?.split('.')[0] || "Target Business",
        askingPrice: 0, // Will be filled by synthesized logic if found
        industry: "General",
        yearsInOperation: 0,
        analysisTimestamp: new Date().toISOString()
      },
      agentOne: agentOneResult,
      agentTwo: agentTwoResult,
      agentThree: agentThreeResult,
      agentFour: agentFourResult
    };

    sseEmitter('pipeline_complete', finalResult);
  } catch (error) {
    console.error("Pipeline Error:", error);
    sseEmitter('error', { message: error.message });
  }
}

export async function runMockPipeline(sseEmitter) {
  console.log("[Diligence.dev] Running in DEMO MODE — No API key required");
  
  for (const event of MOCK_AGENT_STREAM_EVENTS) {
    await new Promise(r => setTimeout(r, event.delayMs));
    sseEmitter('agent_update', event);
  }

  sseEmitter('agent_complete', { agentIndex: 0, result: MOCK_PIPELINE_RESULT.agentOne });
  sseEmitter('agent_complete', { agentIndex: 1, result: MOCK_PIPELINE_RESULT.agentTwo });
  sseEmitter('agent_complete', { agentIndex: 2, result: MOCK_PIPELINE_RESULT.agentThree });
  sseEmitter('agent_complete', { agentIndex: 3, result: MOCK_PIPELINE_RESULT.agentFour });

  sseEmitter('pipeline_complete', MOCK_PIPELINE_RESULT);
}
