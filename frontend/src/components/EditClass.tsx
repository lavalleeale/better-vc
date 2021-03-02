import { useState } from "react";
import { ClassType } from "../@types/class";
import AddClass from "./AddClass";
import ViewClass from "./ViewClass";

const Class = ({ block }: { block: ClassType }) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing ? (
        <ViewClass block={block} teacher={true} setEditing={setEditing} />
      ) : (
        <AddClass initBlock={block} />
      )}
    </>
  );
};

export default Class;
