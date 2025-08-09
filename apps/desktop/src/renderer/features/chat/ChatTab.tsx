import React, { useState } from 'react';
import { useSettings } from '@/store/settings';
import { generate, ChatMessage } from '@/lib/llm/client';
import { speak } from '../speech/speak';
import clsx from 'clsx';

const ChatTab: React.FC = () => {
  const { model, systemPrompt } = useSettings();
  const [messages, setMessages] = useState<ChatMessage[]>([{ role: 'system', content: systemPrompt }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const next = [...messages, { role: 'user', content: input }];
    setMessages(next);
    setInput('');
    setLoading(true);
    const reply = await generate({ model, messages: next });
    setMessages([...next, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-4 p-4">
        {messages
          .filter((m) => m.role !== 'system')
          .map((m, i) => (
            <div
              key={i}
              className={clsx('p-3 rounded-lg', m.role === 'user' ? 'bg-surface text-text' : 'bg-border text-text')}
            >
              {m.content}
              {m.role === 'assistant' && (
                <button
                  className="ml-4 text-sm text-primary underline"
                  onClick={() => speak(m.content)}
                  aria-label="speak"
                >
                  発話
                </button>
              )}
            </div>
          ))}
        {loading && <p className="text-textSecondary animate-pulse">…thinking</p>}
      </div>
      <div className="p-2 border-t border-border flex gap-2">
        <input
          className="flex-1 bg-surface rounded-lg px-3 py-2 text-text outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="メッセージを入力"
        />
        <button className="bg-primary rounded-lg px-4 py-2" onClick={send}>
          送信
        </button>
      </div>
    </div>
  );
};

export default ChatTab;
