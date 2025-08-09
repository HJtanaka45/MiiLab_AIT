<![CDATA[
import React, { useEffect, useRef, useState } from 'react';

export function VisionPanel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const [fps, setFps] = useState(5);

  useEffect(() => {
    async function getDevices() {
      try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = allDevices.filter(d => d.kind === 'videoinput');
        setDevices(videoDevices);
        const obsDevice = videoDevices.find(d => d.label.includes('OBS Virtual Camera'));
        if (obsDevice) {
          setSelectedDeviceId(obsDevice.deviceId);
        } else if (videoDevices.length > 0) {
          setSelectedDeviceId(videoDevices[0].deviceId);
        }
      } catch (error) {
        console.error('Error enumerating devices:', error);
      }
    }
    getDevices();
  }, []);

  useEffect(() => {
    if (selectedDeviceId) {
      const constraints = {
        video: {
          deviceId: { exact: selectedDeviceId },
          frameRate: { ideal: fps }
        }
      };
      navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch((error) => {
              console.error('Auto play prevented:', error);
            });
          }
        })
        .catch((error) => console.error('Error accessing media devices:', error));
    }
  }, [selectedDeviceId, fps]);

  return (
    <div className="p-4 space-y-4">
      <div>
        <label className="text-white mr-2">Select Camera:</label>
        <select
          value={selectedDeviceId}
          onChange={(e) => setSelectedDeviceId(e.target.value)}
          className="rounded bg-surface text-white border border-border p-1"
        >
          {devices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || 'Unknown Device'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-white mr-2">FPS:</label>
        <select
          value={fps}
          onChange={(e) => setFps(parseInt(e.target.value))}
          className="rounded bg-surface text-white border border-border p-1"
        >
          <option value={5}>5</option>
          <option value={7}>7</option>
          <option value={10}>10</option>
        </select>
      </div>
      <div>
        <video ref={videoRef} autoPlay playsInline className="w-full rounded" />
      </div>
    </div>
  );
}
]]>
