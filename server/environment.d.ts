declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_URI: string;
      NODE_ENV: "development" | "production";
      CLOUDINARY_CLOUD_NAME: string;
      CLOUDINARY_API_KEY: string;
      CLOUDINARY_API_SECRET: string;
    }
  }
}
export {};
