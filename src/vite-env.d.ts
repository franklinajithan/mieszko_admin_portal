
interface ImportMetaEnv {
    readonly VITE_BASE_URL_DEV: string;
    readonly VITE_IMAGE_DEV: string;
    readonly VITE_BASE_URL_PROD: string;
    // Add more variables if needed
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }