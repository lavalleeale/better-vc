import { Platform } from "react-native";
export default process.env.NODE_ENV === "production"
  ? // ? "https://bettervc-api.alextesting.ninja"
    "https://192.168.0.32:5000"
  : Platform.OS === "web"
  ? "https://localhost:5000"
  : "https://192.168.0.32:5000";
