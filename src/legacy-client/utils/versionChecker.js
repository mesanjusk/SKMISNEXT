export function initVersionChecker(interval = 5 * 60 * 1000) {
  const check = async () => {
    try {
      const res = await fetch(
        `/version.json?ts=${Date.now()}`,
        { cache: 'no-store' }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.version && data.version !== process.env.NEXT_PUBLIC_APP_VERSION) {
          window.location.reload();
        }
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error('Failed to check app version', err);
    }
  };

  check();
  return setInterval(check, interval);
}
