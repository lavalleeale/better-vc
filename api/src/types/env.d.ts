declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_PASSWORD: string;
    DATABASE_USERNAME: string;
    DATEBASE_NAME: string;
    DATABASE_HOST: string;
    DATABASE_PORT: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    JWT_SECRET: string;
    API_URL: string;
    FRONTEND_URL: string;
    CLOUDINARY_URL: string;
  }
}