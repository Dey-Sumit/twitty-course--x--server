declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DB_URI: string;
      NODE_ENV: "development" | "production";
    }
  }
}
export {};
