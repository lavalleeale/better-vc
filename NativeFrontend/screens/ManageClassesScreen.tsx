import * as SecureStore from "expo-secure-store";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import EditClass from "../components/EditClass";
import API_BASE_URL from "../constants/Data";
import { ClassType } from "../types";

const ManageClassesScreen = () => {
  const [classes, setClasses] = React.useState<ClassType[]>([]);
  React.useEffect(() => {
    async function getClasses() {
      const response = await fetch(`${API_BASE_URL}/teacher/getAllClasses`, {
        credentials: "include",
        headers: (await SecureStore.isAvailableAsync())
          ? {
              Authorization: `Bearer ${await SecureStore.getItemAsync(
                "token"
              )}`,
            }
          : {},
      });
      setClasses(await response.json());
    }
    getClasses();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.name}
        data={classes.filter((block) => block.days[new Date().getDay()])}
        renderItem={({ item }) => <EditClass block={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ManageClassesScreen;
