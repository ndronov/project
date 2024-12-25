/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_WEB_URL: string;
  VITE_GOOGLE_PLAY_WEB_URL: string;
  VITE_GOOGLE_PLAY_MARKET_URL: string;
  VITE_APP_STORE_WEB_URL: string;
  VITE_APP_STORE_MARKET_URL: string;
  VITE_GOOGLE_API_KEY: string;
  VITE_RSA_PUBLIC_KEY: string;
  VITE_COMMIT_HASH: string;
  VITE_COMMIT_TIME: string;
  VITE_BUILD_TIME: string;
}
