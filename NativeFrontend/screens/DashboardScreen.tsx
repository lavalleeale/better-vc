import { StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Divider } from "react-native-elements";
import { TeacherParamList } from "../types";

export default function DashboardScreen({
  navigation,
}: {
  navigation: StackNavigationProp<TeacherParamList>;
}) {
  return (
    <View style={styles.container}>
      <Button
        type="outline"
        title="Manage Classes"
        onPress={() => navigation.navigate("ManageClasses")}
      />
      <Divider style={{ backgroundColor: "blue", height: "10px" }} />
      <Button type="outline" title="Add Teacher" />
      <Divider style={{ backgroundColor: "blue", height: "10px" }} />
      <Button type="outline" title="Add Student" />
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
