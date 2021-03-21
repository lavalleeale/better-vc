import * as React from "react";
import { FlatList, Linking, View, StyleSheet } from "react-native";
import API_BASE_URL from "../constants/Data";
import * as SecureStore from "expo-secure-store";
import { Card, Text } from "react-native-elements";

export default function ScheduleScreen() {
  const [schedule, setSchedule] = React.useState<
    Array<{
      id: number;
      days: Array<Boolean>;
      name: string;
      startTime: number;
      endTime: number;
      teacher: { name: string; email: string };
      students: Array<{ name: string; email: string }>;
    }>
  >([]);
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
        renderItem={({ item }) => (
          <Card>
            <Card.Title>
              <Text>{item.name}</Text>
            </Card.Title>
            <Text>
              Teacher:{" "}
              <Text
                onPress={() => Linking.openURL(`mailto:${item.teacher.email}`)}
              >
                {item.teacher.name}
              </Text>
            </Text>
            <Text>
              Start Time:{" "}
              {new Date(
                0,
                0,
                0,
                item.startTime / 60,
                item.startTime % 60
              ).toLocaleTimeString()}
            </Text>
            <Text>
              End Time:{" "}
              {new Date(
                0,
                0,
                0,
                item.endTime / 60,
                item.endTime % 60
              ).toLocaleTimeString()}
            </Text>
            <Text>Students:</Text>
            <FlatList
              keyExtractor={(item) => item.name}
              data={item.students}
              renderItem={({ item }) => (
                <Text
                  onPress={() => Linking.openURL(`mailto:${item.email}`)}
                >{`\u2022 ${item.name}`}</Text>
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
