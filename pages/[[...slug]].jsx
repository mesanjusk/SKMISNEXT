import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect } from "react";

// The legacy React app owns its own client-side routing (react-router-dom)
// and MUI/theme providers, so it is mounted as a single client-only bundle
// behind this Next.js catch-all route rather than being split into
// per-page Next routes.
const LegacyClientApp = dynamic(() => import("../src/legacy-client/AppRoot"), {
  ssr: false,
});

export default function CatchAllPage() {
  useEffect(() => {
    // Boot logic that used to live in MISFrontend/src/main.jsx.
    let cancelled = false;

    (async () => {
      const { repairAuthStorage } = await import("../src/legacy-client/utils/authStorage");
      repairAuthStorage();

      const { initOfflineQueue } = await import("../src/legacy-client/utils/offlineQueue");
      initOfflineQueue();

      const { toast } = await import("../src/legacy-client/Components");
      const nativeAlert = window.alert.bind(window);
      window.alert = (msg) => {
        if (typeof msg === "string" && msg.trim()) {
          toast(msg);
          return;
        }
        nativeAlert(msg);
      };

      if (!cancelled && "serviceWorker" in navigator) {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js").catch(() => {});
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Head>
        <title>MIS</title>
      </Head>
      <LegacyClientApp />
    </>
  );
}
