import React, { useState } from 'react';
import ChatTab from './features/chat/ChatTab';
import VisionTab from './features/vision/VisionTab';
import SettingsTab from './features/settings/SettingsTab';
import { useSettings } from './store/settings';
import clsx from 'clsx';

const tabs = ['Chat', 'Vision', 'Settings'] as const;
type Tab = (typeof tabs)[number];

const App: React.FC = () => {
  const [tab, setTab] = useState<Tab>('Chat');
  const { bgColor } = useSettings();

  return (
    <div className="h-screen flex" style={{ backgroundColor: bgColor }}>
      <aside className="w-40 bg-surface border-r border-border flex flex-col">
        {tabs.map((t) => (
          <button
            key={t}
            className={clsx(
              'py-3',
              tab === t ? 'bg-primary text-background font-bold' : 'text-textSecondary hover:bg-border'
            )}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </aside>
      <main className="flex-1 overflow-hidden">
        {tab === 'Chat' && <ChatTab />}
        {tab === 'Vision' && <VisionTab />}
        {tab === 'Settings' && <SettingsTab />}
      </main>
    </div>
  );
};

export default App;
