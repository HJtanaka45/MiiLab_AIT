import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // ここに必要な IPC / 安全 API を後続で追加
});
