import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { runLivePipeline, runMockPipeline } from './orchestrator.js';

const app = express();
const PORT = process.env.PORT || 3001;
const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(express.json());

const setupSSE = (res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  return (type, payload) => {
    res.write(`data: ${JSON.stringify({ type, payload })}\n\n`);
  };
};

app.post('/api/analyze', upload.array('documents'), (req, res) => {
  const sseEmitter = setupSSE(res);
  runLivePipeline(req.files, sseEmitter).finally(() => res.end());
});

app.post('/api/analyze-demo', (req, res) => {
  const sseEmitter = setupSSE(res);
  runMockPipeline(sseEmitter).finally(() => res.end());
});

// Export for Vercel
export default app;

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🔬 Diligence.dev server running on port ${PORT}`);
  });
}
