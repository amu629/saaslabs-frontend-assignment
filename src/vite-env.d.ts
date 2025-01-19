/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_API_URL: string;  // Define all your custom environment variables here
  }
  
  interface ImportMeta {
    env: ImportMetaEnv;
  }
  