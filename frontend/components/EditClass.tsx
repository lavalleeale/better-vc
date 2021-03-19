/* eslint-disable react/require-default-props */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useState } from 'react';
import { ClassType } from '../types/class';
import AddClass from '../pages/teacher/addClass';
import ViewClass from './ViewClass';

const EditClass = ({
  block,
  setBlock,
  deleteClass,
}: {
    block: ClassType;
    // eslint-disable-next-line no-unused-vars
    setBlock: (value: ClassType) => void;
    deleteClass: () => void;
}) => {
  const [editing, setEditing] = useState(false);

  return (
    <>
      {!editing ? (
        <ViewClass
          day={new Date().getDay()}
          deleteClass={deleteClass}
          block={block}
          teacher
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
