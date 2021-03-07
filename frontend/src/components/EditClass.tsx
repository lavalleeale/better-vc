import { useState } from "react";
import { ClassType } from "../@types/class";
import AddClass from "./AddClass";
import ViewClass from "./ViewClass";

const EditClass = ({
  block,
  setBlock,
  deleteClass,
}: {
  block: ClassType;
  setBlock: (value: ClassType) => void;
  deleteClass: () => void;
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing ? (
        <ViewClass
          deleteClass={deleteClass}
          block={block}
          teacher={true}
          setEditing={setEditing}
        />
      ) : (
        <AddClass
          initBlock={block}
          setEditing={setEditing}
          setInitBlock={setBlock}
        />
      )}
    </>
  );
};

export default EditClass;
