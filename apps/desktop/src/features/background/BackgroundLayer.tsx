<![CDATA[
import React, { useEffect, useState } from 'react';

export function BackgroundLayer({ children }) {
  const [bgColor, setBgColor] = useState('#171717');

  useEffect(() => {
    const stored = localStorage.getItem('mii.settings');
    if (stored) {
      const settings = JSON.parse(stored);
      if (settings.backgroundColor) {
        setBgColor(settings.backgroundColor);
      }
    }
  }, []);

  return (
    <div style={{ backgroundColor: bgColor, minHeight: '100vh' }}>
      {children}
    </div>
  );
}
]]>
