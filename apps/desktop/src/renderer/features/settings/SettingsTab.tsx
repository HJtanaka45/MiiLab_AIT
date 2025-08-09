import React from 'react';
import { useSettings } from '@/store/settings';

const SettingsTab: React.FC = () => {
  const { systemPrompt, model, bgColor, speechPreset, set } = useSettings();

  return (
    <div className="p-4 space-y-6">
      <div>
        <label className="block mb-1">System Prompt</label>
        <textarea
          className="w-full h-24 bg-surface rounded-lg p-2"
          value={systemPrompt}
          onChange={(e) => set({ systemPrompt: e.target.value })}
        />
      </div>

      <div className="flex items-center gap-4">
        <label>Model</label>
        <select className="bg-surface rounded-lg p-2" value={model} onChange={(e) => set({ model: e.target.value })}>
          <option value="o3-mini">o3-mini</option>
          <option value="gpt-5">gpt-5</option>
        </select>
      </div>

      <div className="flex items-center gap-4">
        <label>背景色</label>
        <input type="color" value={bgColor} onChange={(e) => set({ bgColor: e.target.value })} />
      </div>

      <div>
        <label className="block mb-1">aivisSpeech preset</label>
        <input
          className="bg-surface rounded-lg p-2 w-full"
          value={speechPreset}
          onChange={(e) => set({ speechPreset: e.target.value })}
        />
      </div>
    </div>
  );
};

export default SettingsTab;
