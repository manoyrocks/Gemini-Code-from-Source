import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, FunctionDeclaration } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Health & Status endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
    model: 'gemini-3.8-flash',
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

// Run a live Agent step using Gemini 3.8 Flash
app.post('/api/gemini/agent-step', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured in the environment.',
      });
    }

    const { prompt, history = [], systemInstruction, toolsEnabled = true } = req.body;

    const toolDeclarations: FunctionDeclaration[] = toolsEnabled
      ? [
          {
            name: 'view_file',
            description: 'Read the contents of a file with optional line slice notation.',
            parameters: {
              type: Type.OBJECT,
              properties: {
                filePath: { type: Type.STRING, description: 'Path to file relative to repo root' },
                startLine: { type: Type.INTEGER, description: 'Starting line number (1-based)' },
                endLine: { type: Type.INTEGER, description: 'Ending line number' },
              },
              required: ['filePath'],
            },
          },
          {
            name: 'edit_file',
            description: 'Make a surgical substring replacement in a target file.',
            parameters: {
              type: Type.OBJECT,
              properties: {
                filePath: { type: Type.STRING, description: 'Path to the file to edit' },
                targetContent: { type: Type.STRING, description: 'Exact string block to replace' },
                replacementContent: { type: Type.STRING, description: 'New string content' },
              },
              required: ['filePath', 'targetContent', 'replacementContent'],
            },
          },
          {
            name: 'run_command',
            description: 'Execute a shell command inside the sandboxed workspace environment.',
            parameters: {
              type: Type.OBJECT,
              properties: {
                command: { type: Type.STRING, description: 'Shell command line to execute' },
                timeoutMs: { type: Type.INTEGER, description: 'Max runtime in milliseconds' },
              },
              required: ['command'],
            },
          },
        ]
      : [];

    const contents = [
      ...history,
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction:
          systemInstruction ||
          'You are Gemini Code, an autonomous coding agent engineered with @google/genai SDK. You inspect files, propose surgical edits, and solve engineering tasks by calling tools.',
        tools: toolsEnabled ? [{ functionDeclarations: toolDeclarations }] : undefined,
        temperature: 0.2,
      },
    });

    const candidate = response.candidates?.[0];
    const functionCalls = response.functionCalls || [];
    const text = response.text || '';
    const usage = response.usageMetadata;

    return res.json({
      text,
      functionCalls,
      usage,
      finishReason: candidate?.finishReason,
    });
  } catch (error: any) {
    console.error('Error running Gemini agent step:', error);
    return res.status(500).json({
      error: error.message || 'Internal server error while executing Gemini agent step',
    });
  }
});

// Quick live generate endpoint
app.post('/api/gemini/generate', async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(400).json({
        error: 'GEMINI_API_KEY is not configured in the environment.',
      });
    }

    const { prompt, systemInstruction } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || 'You are an expert AI systems architect.',
      },
    });

    return res.json({ text: response.text });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
