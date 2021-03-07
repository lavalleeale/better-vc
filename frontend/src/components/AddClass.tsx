import { Button, Card, Typography } from "@material-ui/core";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ClassType } from "../@types/class";
import { API_BASE_URL } from "../constants";
import ImportBlock from "./ImportBlock";

const AddClass = ({
  initBlock,
  setInitBlock,
  setEditing,
}: {
  initBlock?: ClassType;
  setInitBlock?: (value: ClassType) => void;
  setEditing?: (value: boolean) => void;
}) => {
  const [cookies] = useCookies();
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [block, setBlock] = useState({} as ClassType);
  if (Object.keys(block).length === 0) {
    if (initBlock) {
      setBlock(initBlock);
    } else {
      setBlock({
        name: "",
        teacher: { name: "" },
        startTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
        endTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
        zoomLink: "",
        classroomLink: "",
        students: [],
        days: {
          Sunday: false,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
        },
      });
    }
  }
  async function addClass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/teacher/addClass`, {
      method: "POST",
      credentials: "omit",
      headers: {
        jwt: cookies.auth,
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...block, teacher: block.teacher.name }),
    });
    if (response.ok) {
      setBlock({
        name: "",
        teacher: { name: "" },
        startTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
        endTime: new Date(0, 0, 0, 8, 0, 0, 0).toLocaleString(),
        zoomLink: "",
        classroomLink: "",
        students: [],
        days: {
          Sunday: false,
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
        },
      });
    } else {
      setError(await response.text());
    }
  }
  async function updateClass(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (initBlock && setInitBlock && setEditing) {
      const response = await fetch(`${API_BASE_URL}/teacher/updateClass`, {
        method: "PUT",
        credentials: "omit",
        headers: {
          jwt: cookies.auth,
          "content-type": "application/json",
        },
        body: JSON.stringify({ name: initBlock.name, block }),
      });
      if (response.ok) {
        setInitBlock(await response.json());
        setEditing(false);
      } else {
        setError(await response.text());
      }
    }
  }
  useEffect(() => {
    async function getData() {
      let response = await fetch(`${API_BASE_URL}/teacher/getTeachers`, {
        credentials: "omit",
        headers: {
          jwt: cookies.auth,
        },
      });
      setTeachers(await response.json());
      response = await fetch(`${API_BASE_URL}/teacher/getStudents`, {
        credentials: "omit",
        headers: {
          jwt: cookies.auth,
        },
      });
      setStudents(await response.json());
    }
    getData();
  }, [cookies.auth]);
  return (
    <>
      {error && (
        <Card className="card">
          <Typography color="error" variant="h4">
            {error === "QueryFailedError"
              ? "An internal server error occured."
              : "An unkown error occured. Try again later?"}
          </Typography>
        </Card>
      )}
      <form
        onSubmit={(e) => {
          if (initBlock) {
            return updateClass(e);
          }
          return addClass(e);
        }}
      >
        <Card className="card">
          <ImportBlock
            students={students}
            block={block}
            setBlock={setBlock}
            teachers={teachers}
          />
          {initBlock && setEditing ? (
            <div style={{ float: "right", marginTop: "10px" }}>
              <Button
                aria-label="cancel"
                variant="outlined"
                onClick={() => setEditing(false)}
              >
                cancel
              </Button>
              <Button
                aria-label="save"
                style={{ marginLeft: "10px" }}
                variant="outlined"
                type="submit"
              >
                save class
              </Button>
            </div>
          ) : (
            <Button
              aria-label="add"
              style={{ float: "right", marginTop: "10px" }}
              variant="outlined"
              type="submit"
            >
              add class
            </Button>
          )}
        </Card>
      </form>
    </>
  );
};

export default AddClass;
