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
import { Link } from "react-router-dom";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ViewClass = ({
  block,
  teacher,
  setEditing,
  deleteClass,
  day,
}: {
  block: ClassType;
  teacher: boolean;
  setEditing?: (value: boolean) => void;
  deleteClass?: () => void;
  day: number;
}) => {
  function compareTime(
    startTime: number,
    endTime: number,
    days: ClassType["days"]
  ) {
    const currentTime = new Date().getHours() * 60 + new Date().getMinutes();
    return isToday(days) && startTime <= currentTime && currentTime < endTime;
  }
  function isToday(days: ClassType["days"]) {
    return days[day];
  }
  const [open, setOpen] = useState(false);
  return (
    <>
      {(teacher || isToday(block.days)) && (
        <Card
          className={
            compareTime(block.startTime, block.endTime, block.days)
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
                onClose={() => setOpen(false)}
                modal
                contentStyle={{
                  textAlign: "center",
                }}
                open={open}
                position="top center"
              >
                <Card className="card">
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
          <Link to={`user/${block.teacher.email}`}>
            <Typography style={{ display: "inline" }}>
              {block.teacher.name}
            </Typography>
          </Link>
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
                {block.days.map((day, index) => (
                  <li
                    key={index}
                    style={{
                      display: "inline",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          disabled
                          color="primary"
                          checked={block.days[index]}
                        />
                      }
                      label={days[index]}
                    />
                  </li>
                ))}
              </ul>
            </FormGroup>
          )}
          {!!block.students.length && (
            <div>
              <Typography>Students:</Typography>
              <ul style={{ listStyle: "inside" }}>
                {block.students.map((student) => (
                  <li key={student.name}>
                    <Link to={`user/${student.email}`}>
                      <Typography style={{ display: "inline" }}>
                        {student.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      )}
    </>
  );
};

export default ViewClass;
