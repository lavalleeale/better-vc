import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Divider } from "react-native-elements";

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <Button title="Manage Classes" />
      <Divider style={{ backgroundColor: "blue" }} />
      <Button type="outline" title="Add Teacher" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
