import { Button, Card, Typography } from "@material-ui/core";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ClassType } from "../@types/class";
import { API_BASE_URL } from "../constants";
import ImportBlock from "./ImportBlock";

const AddClass = () => {
  const [cookies] = useCookies();
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [block, setBlock] = useState({
    name: "",
    teacher: "",
    startTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
    endTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
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
      body: JSON.stringify(block),
    });
    if (response.ok) {
      setBlock({
        name: "",
        teacher: "",
        startTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
        endTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
        zoomLink: "",
        classroomLink: "",
      });
    } else {
      setError(await response.text());
    }
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
    <>
      {error && (
        <Card className="card">
          <Typography color="error" variant="h4">
            {error === "QueryFailedError"
              ? "An internal server error occured. Is this class name in use?"
              : "An unkown error occured. Try again later?"}
          </Typography>
        </Card>
      )}
      <form onSubmit={(e) => onSubmit(e)}>
        <ImportBlock block={block} setBlock={setBlock} teachers={teachers} />
        <Card className="card">
          <Button style={{ float: "right" }} variant="outlined" type="submit">
            add class
          </Button>
        </Card>
      </form>
    </>
  );
};

export default AddClass;
