import { readFileSync } from 'fs';
import { join } from 'path';
import { BedrockRuntimeClient, ConverseCommand } from '@aws-sdk/client-bedrock-runtime';
import { injectPageLinks } from '../../lib/injectPageLinks.js';

function getSystemPrompt() {
  const promptPath = join(process.cwd(), 'content/agentic-service/system-prompt.md');
  return readFileSync(promptPath, 'utf-8').trim();
}

let cachedClient = null;

function getClient() {
  if (cachedClient) return cachedClient;

  cachedClient = new BedrockRuntimeClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
  return cachedClient;
}

// `conversation` is the full message history so far, oldest first:
// [{ sender: 'me' | 'them', text: string }, ...]
export async function generateChatReply(conversation) {
  const systemPrompt = getSystemPrompt();

  const command = new ConverseCommand({
    modelId: process.env.BEDROCK_MODEL_ID,
    system: systemPrompt ? [{ text: systemPrompt }] : undefined,
    messages: conversation.map(({ sender, text }) => ({
      role: sender === 'me' ? 'user' : 'assistant',
      content: [{ text }],
    })),
  });

  const response = await getClient().send(command);
  const reply = response.output?.message?.content?.[0]?.text;

  if (!reply) {
    throw new Error('No reply returned from model.');
  }

  return injectPageLinks(reply);
}
