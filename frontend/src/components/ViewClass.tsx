import {
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ClassType } from "../@types/class";
import { Edit, Delete } from "@material-ui/icons";
import React from "react";

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
  return (
    <>
      {(teacher || isToday(block.days)) && (
        <Card
          className={
            compareTime(
              new Date(block.startTime),
              new Date(block.endTime),
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
                onClick={deleteClass}
                style={{ float: "right" }}
              >
                <Delete />
              </IconButton>
            </>
          )}
          <Typography>Name: {block.name}</Typography>
          <Typography>Teacher: {block.teacher.name}</Typography>
          <Typography>
            Start Time: {new Date(block.startTime).toLocaleTimeString()}
          </Typography>
          <Typography>
            End Time: {new Date(block.endTime).toLocaleTimeString()}
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
