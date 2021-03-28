import React from "react";
import { ClassType } from "../types";
import AddClass from "./AddClass";
import ViewClass from "./ViewClass";

const EditClass = ({ block }: { block: ClassType }) => {
  const [editing, setEditing] = React.useState(false);
  return (
    <div>
      {editing ? (
        <AddClass block={block} />
      ) : (
        <ViewClass block={block} setEditing={() => setEditing(true)} />
      )}
    </div>
  );
};

export default EditClass;
