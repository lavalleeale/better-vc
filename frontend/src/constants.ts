export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bettervc-api.alextesting.ninja"
    : "http://localhost";
