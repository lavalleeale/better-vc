export default process.env.NODE_ENV === "production"
    ? "https://bettervc-api.alextesting.ninja"
    : "http://localhost:5000";
