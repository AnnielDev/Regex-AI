export function initGA(): void {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (!gaId) return;

  if (document.getElementById("google-tag-manager")) return;

  const script = document.createElement("script");
  script.id = "google-tag-manager";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer?.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", gaId);
}

export function trackPageview(path: string, title?: string): void {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (typeof window.gtag === "function" && gaId) {
    window.gtag("event", "page_view", {
      page_path: path,
      page_title: title,
      send_to: gaId,
    });
  }
}

export function trackEvent(
  action: string,
  category?: string,
  label?: string,
  value?: number,
): void {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  if (typeof window.gtag === "function" && gaId) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      send_to: gaId,
    });
  }
}
