// Replace the Render hostname when the production API is deployed.
const capacitorLocalHost = location.hostname === "localhost"
  && (location.protocol === "https:" || location.protocol === "capacitor:");
window.SHAMBA_ANDROID_APP = capacitorLocalHost;
window.SHAMBA_API_BASE = window.SHAMBA_API_BASE
  || (capacitorLocalHost ? "https://YOUR-RENDER-SERVICE.onrender.com/api" : "/api");
window.SHAMBA_LIVE_ONLY = true;
