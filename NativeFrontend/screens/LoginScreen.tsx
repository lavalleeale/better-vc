import * as React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Text } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import API_BASE_URL from "../constants/Data";

WebBrowser.maybeCompleteAuthSession();
const LoginScreen = ({ finish }: { finish(): void }) => {
  const [, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "275616371359-oan5i1oebaoseapua3jgn3r24o6i2gtp.apps.googleusercontent.com",
    iosClientId:
      "275616371359-u2qd6huip62dmc13ermje03i8saf3i1e.apps.googleusercontent.com",
    androidClientId: "GOOGLE_GUID.apps.googleusercontent.com",
    webClientId:
      "275616371359-mea04ireso3j7b1bcmucpjrb8t3afjlq.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    async function login() {
      if (response?.type === "success") {
        const { authentication } = response;
        const request = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ access_token: authentication?.accessToken }),
        });
        const userInfo = await request.json();

        await AsyncStorage.setItem("name", userInfo.name);
        await AsyncStorage.setItem("teacher", userInfo.teacher ? "true" : "");
        if (Platform.OS !== "web") {
          await SecureStore.setItemAsync("token", userInfo.token);
        }
        finish();
      }
    }
    login();
  }, [response]);
  React.useEffect(() => {
    AsyncStorage.getItem("name").then((data) => {
      if (data) finish();
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text onPress={() => promptAsync()}>Login</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});

export default LoginScreen;
