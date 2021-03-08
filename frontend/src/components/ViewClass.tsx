import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@material-ui/core";
import Popup from "reactjs-popup";
import { ClassType } from "../@types/class";
import { Edit, Delete } from "@material-ui/icons";
import React, { useState } from "react";

const ViewClass = ({
  block,
  teacher,
  setEditing,
  deleteClass,
}: {
  block: ClassType;
  teacher: boolean;
  setEditing?: (value: boolean) => void;
  deleteClass?: () => void;
}) => {
  function compareTime(
    startTime: Date,
    endTime: Date,
    days: ClassType["days"]
  ) {
    const currentTime = new Date();
    return (
      isToday(days) &&
      removeDate(startTime) <= removeDate(currentTime) &&
      removeDate(currentTime) < removeDate(endTime)
    );
  }
  function removeDate(date: Date) {
    return new Date(
      Date.UTC(0, 0, 0, date.getUTCHours(), date.getUTCMinutes())
    ).getTime();
  }
  function isToday(days: ClassType["days"]) {
    return days[
      new Date().toLocaleString("en-us", {
        weekday: "long",
      }) as keyof typeof block.days
    ];
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      {(teacher || isToday(block.days)) && (
        <Card
          className={
            compareTime(
              new Date(
                0,
                0,
                0,
                Math.floor(block.startTime / 60),
                block.startTime % 60,
                0,
                0
              ),
              new Date(
                0,
                0,
                0,
                Math.floor(block.endTime / 60),
                block.endTime % 60,
                0,
                0
              ),
              block.days
            )
              ? "selected"
              : "card"
          }
        >
          {!teacher && (
            <>
              {block.zoomLink ? (
                <a
                  target="_blank"
                  rel="noreferrer"
                  style={{ textDecoration: "inherit", float: "right" }}
                  href={block.zoomLink}
                >
                  <Button aria-label="Zoom Link" variant="outlined">
                    Zoom Link
                  </Button>
                </a>
              ) : (
                <Button
                  aria-label="no link"
                  variant="outlined"
                  disabled
                  style={{ float: "right" }}
                >
                  No Link
                </Button>
              )}
            </>
          )}
          {setEditing && deleteClass && (
            <>
              <IconButton
                aria-label="Edit"
                onClick={() => setEditing(true)}
                style={{ float: "right" }}
              >
                <Edit />
              </IconButton>
              <IconButton
                aria-label="Edit"
                onClick={() => setOpen(true)}
                style={{ float: "right" }}
              >
                <Delete />
              </IconButton>
              <Popup
                modal
                contentStyle={{
                  width: "50%",
                  height: "50%",
                  textAlign: "center",
                }}
                open={open}
                position="right center"
              >
                <Card style={{ width: "100%", height: "100%" }}>
                  <Typography variant="h3">
                    Are you sure you want to delete
                  </Typography>
                  <Typography variant="h2">{block.name}?</Typography>
                  <Button
                    style={{ margin: "10px" }}
                    variant="outlined"
                    onClick={() => {
                      deleteClass();
                      setOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    style={{ margin: "10px" }}
                    variant="outlined"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </Card>
              </Popup>
            </>
          )}
          <Typography>Name: {block.name}</Typography>
          <Typography>Teacher: {block.teacher.name}</Typography>
          <Typography>
            Start Time:{" "}
            {new Date(
              0,
              0,
              0,
              Math.floor(block.startTime / 60),
              block.startTime % 60,
              0,
              0
            ).toLocaleTimeString()}
          </Typography>
          <Typography>
            End Time:{" "}
            {new Date(
              0,
              0,
              0,
              Math.floor(block.endTime / 60),
              block.endTime % 60,
              0,
              0
            ).toLocaleTimeString()}
          </Typography>
          {teacher && (
            <Typography>Zoom Link: {block.zoomLink || "none"}</Typography>
          )}
          {teacher && (
            <FormGroup row>
              <ul>
                {(Object.keys(block.days) as Array<
                  keyof typeof block.days
                >).map((day) => (
                  <li
                    key={day}
                    style={{
                      display: "inline",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          color="primary"
                          checked={block.days[day]}
                        />
                      }
                      label={day}
                    />
                  </li>
                ))}
              </ul>
            </FormGroup>
          )}
          {!!block.students.length && (
            <ul style={{ listStyle: "inside" }}>
              <Typography>Students:</Typography>
              {block.students.map((student) => (
                <li key={student.name}>
                  <Typography style={{ display: "inline" }}>
                    {student.name}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </Card>
      )}
    </>
  );
};

export default ViewClass;
