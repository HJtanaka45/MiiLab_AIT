import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type SettingsState = {
  systemPrompt: string;
  model: string;
  bgColor: string;
  speechPreset: string;
  set: (partial: Partial<Omit<SettingsState, 'set'>>) => void;
};

export const useSettings = create<SettingsState>()(
  persist(
    (set) => ({
      systemPrompt: '',
      model: 'o3-mini',
      bgColor: '#171717',
      speechPreset: 'default',
      set: (partial) => set(partial)
    }),
    { name: 'mii.settings' }
  )
);
