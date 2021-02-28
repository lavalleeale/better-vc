import { Button, Card } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import { ClassType } from "../@types/class";
import ImportBlock from "./ImportBlock";

const AddClass = () => {
  const [block, setBlock] = useState({
    name: "",
    teacherName: "",
    startTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
    endTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
    link: "",
    zoomLink: "",
    classroomLink: "",
  } as ClassType);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(block);
  }
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <ImportBlock block={block} setBlock={setBlock} />
      <Card className="card">
        <Button style={{ float: "right" }} variant="outlined" type="submit">
          add class
        </Button>
      </Card>
    </form>
  );
};

export default AddClass;
