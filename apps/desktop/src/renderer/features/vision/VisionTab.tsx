import React, { useEffect, useRef, useState } from 'react';

const VisionTab: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [deviceId, setDeviceId] = useState<string>();
  const [fps, setFps] = useState(5);

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then((d) => {
      const cams = d.filter((i) => i.kind === 'videoinput');
      setDevices(cams);
      // 初期 OBS VirtualCamera 選択
      const obs = cams.find((c) => /OBS|Virtual/gi.test(c.label));
      setDeviceId(obs?.deviceId ?? cams[0]?.deviceId);
    });
  }, []);

  useEffect(() => {
    if (!deviceId) return;
    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: { exact: deviceId }, frameRate: { ideal: fps } }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    };
    start();
  }, [deviceId, fps]);

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2">
        <label>カメラ</label>
        <select
          className="bg-surface rounded-lg p-2"
          value={deviceId}
          onChange={(e) => setDeviceId(e.target.value)}
        >
          {devices.map((d) => (
            <option key={d.deviceId} value={d.deviceId}>
              {d.label || 'camera'}
            </option>
          ))}
        </select>
        <label className="ml-4">FPS</label>
        <select className="bg-surface rounded-lg p-2" value={fps} onChange={(e) => setFps(Number(e.target.value))}>
          {[5, 7, 10].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
      </div>
      <video ref={videoRef} className="w-full rounded-lg border border-border" />
    </div>
  );
};

export default VisionTab;
