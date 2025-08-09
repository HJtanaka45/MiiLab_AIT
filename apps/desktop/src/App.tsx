<![CDATA[
import React, { useState } from 'react';
import { ChatPanel } from './features/chat/ChatPanel';
import { VisionPanel } from './features/vision/VisionPanel';
import { SettingsPanel } from './features/settings/SettingsPanel';
import { BackgroundLayer } from './features/background/BackgroundLayer';

export default function App() {
  const [activeTab, setActiveTab] = useState('chat');

  const renderTab = () => {
    switch(activeTab) {
      case 'chat':
        return <ChatPanel />;
      case 'vision':
        return <VisionPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <BackgroundLayer>
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setActiveTab('chat')}
            className={`px-4 py-2 rounded ${activeTab === 'chat' ? 'bg-primary' : 'bg-surface text-white'}`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('vision')}
            className={`px-4 py-2 rounded ${activeTab === 'vision' ? 'bg-primary' : 'bg-surface text-white'}`}
          >
            Vision
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded ${activeTab === 'settings' ? 'bg-primary' : 'bg-surface text-white'}`}
          >
            Settings
          </button>
        </div>
        <div>
          {renderTab()}
        </div>
      </div>
    </BackgroundLayer>
  );
}
]]>
