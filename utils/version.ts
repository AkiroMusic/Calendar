export const getAppVersion = async (): Promise<string> => {
  try {
    if (typeof window !== 'undefined' && window.electronAPI?.app?.getVersion) {
      const v = await window.electronAPI.app.getVersion();
      if (v) return v;
    }
  } catch {}

  try {
    const res = await fetch('/package.json');
    if (res.ok) {
      const json = await res.json();
      return (json?.version as string) || '';
    }
  } catch {}

  return '';
};

