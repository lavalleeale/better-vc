import React from "react";
import { Card, Input } from "react-native-elements";
import { ClassType } from "../types";
import ViewClass from "./ViewClass";

const AddClass = ({ block }: { block: ClassType }) => {
  const [newBlock, setNewBlock] = React.useState(block);
  return (
    <Card>
      <Input
        label="Class Name"
        value={newBlock.name}
        onChangeText={(e) => {
          setNewBlock({ ...newBlock, name: e });
        }}
      />
      <ViewClass block={newBlock} />
    </Card>
  );
};

export default AddClass;
