export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://bettervc-api.alextesting.ninja"
    : "http://localhost:5000";

export function fetcher(url: string) {
  return fetch(`${API_BASE_URL}/${url}`, {
    credentials: "include",
  }).then((r) => r.json());
}
