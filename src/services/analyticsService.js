const gaId = import.meta.env.VITE_GA_ID;
let initialized = false;

export function initAnalytics() {
  if (!gaId || initialized || typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", gaId, { send_page_view: false });
  initialized = true;
}

export function trackPageView(path, title) {
  if (!gaId || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_path: path,
    page_title: title,
  });
}
