/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEATHER_API_KEY: string; // Cambia el prefijo a VITE_
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
