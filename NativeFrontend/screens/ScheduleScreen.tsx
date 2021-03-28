import * as React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import API_BASE_URL from "../constants/Data";
import * as SecureStore from "expo-secure-store";
import { ClassType } from "../types";
import ViewClass from "../components/ViewClass";

export default function ScheduleScreen() {
  const [schedule, setSchedule] = React.useState<ClassType[]>([]);
  React.useEffect(() => {
    async function getSchedule() {
      const response = await fetch(`${API_BASE_URL}/user/getClasses`, {
        credentials: "include",
        headers: (await SecureStore.isAvailableAsync())
          ? {
              Authorization: `Bearer ${await SecureStore.getItemAsync(
                "token"
              )}`,
            }
          : {},
      });
      setSchedule(await response.json());
    }
    getSchedule();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.name}
        data={schedule.filter((block) => block.days[new Date().getDay()])}
        renderItem={({ item }) => <ViewClass block={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
