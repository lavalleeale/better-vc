import { Button, Card } from "@material-ui/core";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ClassType } from "../@types/class";
import { API_BASE_URL } from "../constants";
import ImportBlock from "./ImportBlock";

const AddClass = () => {
  const [cookies] = useCookies();
  const [teachers, setTeachers] = useState([]);
  const [block, setBlock] = useState({
    name: "",
    teacherName: "",
    startTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
    endTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
    link: "",
    zoomLink: "",
    classroomLink: "",
  } as ClassType);
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/teacher/addClass`, {
      method: "POST",
      credentials: "omit",
      headers: {
        jwt: cookies.auth,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: block.name,
        startTime: block.startTime,
        endTime: block.endTime,
        zoomLink: block.zoomLink,
        teacher: block.teacherName,
      }),
    });
    console.log(await response.text());
  }
  useEffect(() => {
    async function getData() {
      const response = await fetch(`${API_BASE_URL}/teacher/getTeachers`, {
        credentials: "omit",
        headers: {
          jwt: cookies.auth,
        },
      });
      setTeachers(await response.json());
    }
    getData();
  }, [cookies.auth]);
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <ImportBlock block={block} setBlock={setBlock} teachers={teachers} />
      <Card className="card">
        <Button style={{ float: "right" }} variant="outlined" type="submit">
          add class
        </Button>
      </Card>
    </form>
  );
};

export default AddClass;
