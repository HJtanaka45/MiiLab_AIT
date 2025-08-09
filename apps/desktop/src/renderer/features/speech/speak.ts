import { useSettings } from '@/store/settings';

export async function speak(text: string) {
  const { speechPreset } = useSettings.getState();
  const endpoint = import.meta.env.AIVISSPEECH_ENDPOINT ?? 'http://localhost:50021';
  try {
    const res = await fetch(`${endpoint}/speak`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, preset: speechPreset })
    });
    
    if (!res.ok) {
      console.error(`Fetch failed with status: ${res.status} ${res.statusText}`);
      return;
    }
    
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  } catch (error) {
    console.error('Error in speak function:', error);
  }
}
