import React from "react";
import { Icon, Card, Text } from "react-native-elements";
import { FlatList, Linking, StyleSheet, View } from "react-native";
import { ClassType } from "../types";

const ViewClass = ({
  block,
  setEditing,
}: {
  block: ClassType;
  setEditing?(): void;
}) => {
  return (
    <Card>
      <Card.Title>
        <Text>{block.name}</Text>
      </Card.Title>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text>
          Teacher:{" "}
          <Text
            onPress={() => Linking.openURL(`mailto:${block.teacher.email}`)}
          >
            {block.teacher.name}
          </Text>
        </Text>
        {setEditing && (
          <Icon name="create-outline" type="ionicon" onPress={setEditing} />
        )}
      </View>
      <Text>
        Start Time:{" "}
        {new Date(
          0,
          0,
          0,
          block.startTime / 60,
          block.startTime % 60
        ).toLocaleTimeString()}
      </Text>
      <Text>
        End Time:{" "}
        {new Date(
          0,
          0,
          0,
          block.endTime / 60,
          block.endTime % 60
        ).toLocaleTimeString()}
      </Text>
      <Text>Students:</Text>
      <FlatList
        keyExtractor={(block) => block.name}
        data={block.students}
        renderItem={({ item }) => (
          <Text
            onPress={() => Linking.openURL(`mailto:${item.email}`)}
          >{`\u2022 ${item.name}`}</Text>
        )}
      />
    </Card>
  );
};

export default ViewClass;
