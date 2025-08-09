import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';             // ← shadcn/ui path
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { HexColorPicker } from 'react-colorful';
import { useBackgroundStore, BackgroundType } from '../../state/settings';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const BackgroundPanel: React.FC<Props> = ({ open, onOpenChange }) => {
  const { settings, setSettings, applyHistory } = useBackgroundStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFilePick = () => fileInputRef.current?.click();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>背景設定</DialogTitle>
        </DialogHeader>

        {/* type choice */}
        <Label className="mb-1">種類</Label>
        <RadioGroup
          defaultValue={settings.type}
          onValueChange={(v: BackgroundType) => setSettings({ type: v })}
          className="flex space-x-4"
        >
          {['color', 'image', 'video'].map((t) => (
            <div key={t} className="flex items-center space-x-2">
              <RadioGroupItem value={t} id={`bg-${t}`} />
              <Label htmlFor={`bg-${t}`}>{t}</Label>
            </div>
          ))}
        </RadioGroup>

        {/* dynamic area */}
        {settings.type === 'color' && (
          <>
            <Label className="mt-4">カラー</Label>
            <HexColorPicker
              color={settings.value}
              onChange={(c) => setSettings({ value: c })}
            />
            <Input
              className="mt-2"
              value={settings.value}
              onChange={(e) => setSettings({ value: e.target.value })}
            />
          </>
        )}

        {settings.type === 'image' && (
          <>
            <Label className="mt-4">画像ファイル または URL</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="https://… or C:\\path\\image.jpg"
                value={settings.value}
                onChange={(e) => setSettings({ value: e.target.value })}
              />
              <Button variant="outline" onClick={handleFilePick}>
                選択
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSettings({ value: file.path });
                }}
              />
            </div>

            <Label className="mt-4">Fit</Label>
            <RadioGroup
              defaultValue={settings.fit}
              className="flex space-x-4"
              onValueChange={(fit) =>
                setSettings({ fit: fit as 'contain' | 'cover' })
              }
            >
              {['contain', 'cover'].map((f) => (
                <div key={f} className="flex items-center space-x-2">
                  <RadioGroupItem value={f} id={`fit-${f}`} />
                  <Label htmlFor={`fit-${f}`}>{f}</Label>
                </div>
              ))}
            </RadioGroup>
          </>
        )}

        {settings.type === 'video' && (
          <>
            <Label className="mt-4">動画ファイル または URL</Label>
            <div className="flex space-x-2">
              <Input
                placeholder="https://… or C:\\path\\movie.mp4"
                value={settings.value}
                onChange={(e) => setSettings({ value: e.target.value })}
              />
              <Button variant="outline" onClick={handleFilePick}>
                選択
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setSettings({ value: file.path });
                }}
              />
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Switch
                checked={settings.loop}
                onCheckedChange={(v) => setSettings({ loop: v })}
              />
              <Label>ループ</Label>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <Switch
                checked={settings.muted}
                onCheckedChange={(v) => setSettings({ muted: v })}
              />
              <Label>ミュート</Label>
            </div>
          </>
        )}

        {/* history */}
        {settings.history.length > 0 && (
          <>
            <Label className="mt-6">最近使った背景</Label>
            <div className="grid grid-cols-5 gap-2 mt-2">
              {settings.history.map((h, idx) => (
                <button
                  key={idx}
                  onClick={() => applyHistory(h)}
                  className="w-full h-12 rounded border border-muted hover:ring-2 ring-offset-2 ring-primary overflow-hidden"
                >
                  {h.type === 'color' ? (
                    <div style={{ background: h.value }} className="w-full h-full" />
                  ) : h.type === 'image' ? (
                    <img src={h.value} className="object-cover w-full h-full" />
                  ) : (
                    <video src={h.value} muted className="object-cover w-full h-full" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
