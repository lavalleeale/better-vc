import { ThemeProvider } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { AppRegistry, Appearance } from "react-native";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = Appearance.getColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider useDark={colorScheme === "dark"}>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}

AppRegistry.registerComponent("NativeFrontend", () => App);
