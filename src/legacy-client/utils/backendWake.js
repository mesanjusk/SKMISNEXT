/**
 * backendWake.js
 *
 * Historically this pinged a separate Render backend service to wake it
 * from free-tier sleep before the frontend fired its first API requests.
 * The UI and API now run in the same Next.js process/deploy, so if the
 * page loaded at all, the API is already up — this is a no-op kept only
 * so existing call sites (main entry) don't need to change.
 */
let wakePromise = null;

export function wakeBackend() {
  if (!wakePromise) wakePromise = Promise.resolve(true);
  return wakePromise;
}
