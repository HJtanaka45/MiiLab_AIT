/* Zustand + electron-store powered settings state */
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import store from '../lib/store';

export type BackgroundType = 'color' | 'image' | 'video';

export interface BackgroundSettings {
  type: BackgroundType;
  value: string;               // #RRGGBB | filepath | URL
  fit?: 'contain' | 'cover';
  loop?: boolean;
  muted?: boolean;
  history: Array<{ type: BackgroundType; value: string }>;
}

const DEFAULT_BG: BackgroundSettings = {
  type: 'color',
  value: '#000000',
  fit: 'cover',
  loop: true,
  muted: true,
  history: []
};

interface BackgroundStore {
  settings: BackgroundSettings;
  setSettings: (next: Partial<BackgroundSettings>) => void;
  applyHistory: (entry: { type: BackgroundType; value: string }) => void;
}

export const useBackgroundStore = create<BackgroundStore>()(
  subscribeWithSelector((set, get) => ({
    settings: store.get('settings.background', DEFAULT_BG),

    setSettings: (next) => {
      const current = get().settings;
      const merged = { ...current, ...next };

      // maintain history – newest first, no duplicates, max 5
      if (next.value !== undefined) {
        merged.history = [
          { type: merged.type, value: merged.value },
          ...current.history.filter((h) => h.value !== merged.value)
        ].slice(0, 5);
      }

      set({ settings: merged });
    },

    applyHistory: (entry) => {
      set((s) => ({
        settings: {
          ...s.settings,
          ...entry,
          history: [
            entry,
            ...s.settings.history.filter((h) => h.value !== entry.value)
          ].slice(0, 5)
        }
      }));
    }
  }))
);

// persist to electron-store on any change
useBackgroundStore.subscribe(
  (s) => s.settings,
  (settings) => {
    store.set('settings.background', settings);
  }
);
