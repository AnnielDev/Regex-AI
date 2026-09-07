export function initAdSense(): void {
  const publisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID as
    | string
    | undefined;
  if (!publisherId) return;

  // Check if script already exists
  if (document.getElementById("google-adsense")) return;

  const script = document.createElement("script");
  script.id = "google-adsense";
  script.async = true;
  // Publisher ID already includes ca-pub- prefix, don't add it again
  script.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" +
    publisherId;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
}

export function pushAd(): void {
  if (typeof window === "undefined") return;

  // Retry mechanism for script readiness
  const checkAndPush = () => {
    if ((window as any).adsbygoogle) {
      try {
        (window as any).adsbygoogle.push({});
      } catch (error) {
        console.debug("AdSense push failed:", error);
      }
    }
  };

  // Try immediately, then retry after a short delay
  checkAndPush();
  setTimeout(checkAndPush, 100);
}
