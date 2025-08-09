<![CDATA[
import React, { useState } from 'react';
import { generate } from './llmClient';

export function ChatPanel() {
  const [input, setInput] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    setLoading(true);
    const newChatLog = [ ...chatLog, { role: 'user', content: input } ];
    setChatLog(newChatLog);
    try {
      const response = await generate({
        model: process.env.OPENAI_MODEL || 'o3-mini',
        messages: newChatLog,
        maxTokens: 100,
        temperature: 0.7
      });
      setChatLog([ ...newChatLog, { role: 'assistant', content: response } ]);
      setInput('');
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  async function handleSpeak(text) {
    const endpoint = process.env.AIVISSPEECH_ENDPOINT || 'http://localhost:50021';
    try {
      await fetch(`${endpoint}/speak`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, preset: '' })
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-4">
      <div className="mb-4 space-y-2 max-h-60 overflow-auto bg-surface p-2 rounded">
        {chatLog.map((msg, index) => (
          <div key={index} className={`p-2 rounded ${msg.role === 'user' ? 'bg-secondary' : 'bg-primary'}`}>
            <p className="text-white">{msg.content}</p>
            {msg.role === 'assistant' && (
              <button
                onClick={() => handleSpeak(msg.content)}
                className="mt-1 px-2 py-1 bg-accent text-white rounded hover:bg-accent/80"
              >
                Speak
              </button>
            )}
          </div>
        ))}
      </div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="w-full h-24 p-2 rounded bg-surface text-white border border-border"
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
    </div>
  );
}
]]>
