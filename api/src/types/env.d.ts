// eslint-disable-next-line no-unused-vars
declare namespace NodeJS {
  // eslint-disable-next-line no-unused-vars
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
