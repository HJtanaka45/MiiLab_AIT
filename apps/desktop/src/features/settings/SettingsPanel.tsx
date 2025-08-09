<![CDATA[
import React, { useState, useEffect } from 'react';

const SETTINGS_KEY = 'mii.settings';

const defaultSettings = {
  systemPrompt: '',
  model: 'o3-mini',
  backgroundColor: '#171717',
  aivisSpeechPreset: '',
  fps: 5
};

export function SettingsPanel() {
  const [settings, setSettings] = useState(defaultSettings);

  useEffect(() => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (stored) {
      setSettings(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings]);

  return (
    <div className="p-4 space-y-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-200">System Prompt</span>
        <input
          type="text"
          value={settings.systemPrompt}
          onChange={(e) => setSettings({ ...settings, systemPrompt: e.target.value })}
          className="mt-1 block w-full rounded bg-surface text-white border border-border p-2"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-200">Model</span>
        <select
          value={settings.model}
          onChange={(e) => setSettings({ ...settings, model: e.target.value })}
          className="mt-1 block w-full rounded bg-surface text-white border border-border p-2"
        >
          <option value="o3-mini">o3-mini</option>
          <option value="gpt-5">gpt-5</option>
        </select>
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-200">Background Color</span>
        <input
          type="color"
          value={settings.backgroundColor}
          onChange={(e) => setSettings({ ...settings, backgroundColor: e.target.value })}
          className="mt-1 block w-full rounded bg-surface border border-border p-2"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-200">Aivis Speech Preset</span>
        <input
          type="text"
          value={settings.aivisSpeechPreset}
          onChange={(e) => setSettings({ ...settings, aivisSpeechPreset: e.target.value })}
          className="mt-1 block w-full rounded bg-surface text-white border border-border p-2"
        />
      </label>
      <label className="block">
        <span className="text-sm font-medium text-gray-200">FPS</span>
        <select
          value={settings.fps}
          onChange={(e) => setSettings({ ...settings, fps: parseInt(e.target.value) })}
          className="mt-1 block w-full rounded bg-surface text-white border border-border p-2"
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>
      </label>
    </div>
  );
}
]]>
