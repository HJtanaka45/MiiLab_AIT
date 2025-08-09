export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string };
export type ChatInput = {
  model: string;
  messages: ChatMessage[];
  maxTokens?: number;
  temperature?: number;
};

export async function generate(input: ChatInput): Promise<string> {
  // VITE環境変数を使用する際、末尾のスラッシュを除去するための正規表現を修正
  const base = (import.meta.env.OPENAI_API_BASE ?? 'https://api.openai.com/v1').replace(/\/+$/, '');
  const model = input.model || import.meta.env.OPENAI_MODEL || 'o3-mini';
  const isResponses = model.startsWith('o');

  const headers = {
    Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  };

  if (isResponses) {
    const body = {
      model,
      input: input.messages.map((m) => ({ role: m.role, content: m.content })),
      max_completion_tokens: input.maxTokens ?? 512,
      temperature: input.temperature ?? 0.7
    };
    const res = await fetch(`${base}/responses`, { method: 'POST', headers, body: JSON.stringify(body) });
    const j = await res.json();
    return j?.output_text ?? j?.choices?.[0]?.message?.content ?? '…';
  } else {
    const body = {
      model,
      messages: input.messages,
      max_tokens: input.maxTokens ?? 512,
      temperature: input.temperature ?? 0.7
    };
    const res = await fetch(`${base}/chat/completions`, { method: 'POST', headers, body: JSON.stringify(body) });
    const j = await res.json();
    return j?.choices?.[0]?.message?.content ?? '…';
  }
}
