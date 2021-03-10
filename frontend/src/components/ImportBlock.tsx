import DateFnsUtils from "@date-io/date-fns";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import React, { Dispatch, SetStateAction } from "react";
import { ClassType } from "../@types/class";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const ImportBlock = ({
  block,
  setBlock,
  teachers,
  students,
}: {
  block: ClassType;
  setBlock: Dispatch<SetStateAction<ClassType>>;
  teachers: Array<{ name: string }>;
  students: Array<{ name: string }>;
}) => {
  function isValidUrl(url: string) {
    try {
      new URL(url);
    } catch {
      return false || url === "";
    }
    return true;
  }
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <TextField
        id="Class Name"
        className="longText"
        required
        value={block.name}
        onChange={(e) => {
          setBlock({
            ...block,
            name: e.target.value,
          });
        }}
        label="Class Name"
        variant="outlined"
      />
      <FormControl
        className="longText"
        style={{ marginTop: "10px", padding: "10px" }}
      >
        <InputLabel>Teacher Name</InputLabel>
        <Select
          required
          value={block.teacher.name}
          onChange={(e) => {
            if (e.target.value) {
              setBlock({
                ...block,
                teacher: { name: e.target.value as string },
              });
            }
          }}
        >
          {teachers.map((teacher) => (
            <MenuItem key={teacher.name} value={teacher.name}>
              {teacher.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        id="Zoom Link"
        value={block.zoomLink}
        style={{ marginTop: "10px" }}
        error={!isValidUrl(block.zoomLink)}
        helperText={isValidUrl(block.zoomLink) ? "" : "Must be valid URL"}
        className="longText"
        onChange={(e) => {
          setBlock({
            ...block,
            zoomLink: e.target.value,
          });
        }}
        label="Zoom Link"
        variant="outlined"
      />
      <TimePicker
        id="Start Time"
        label="Start Time"
        required
        style={{ marginTop: "10px" }}
        value={
          new Date(
            0,
            0,
            0,
            Math.floor(block.startTime / 60),
            block.startTime % 60,
            0,
            0
          )
        }
        onChange={(e) => {
          if (e) {
            setBlock({
              ...block,
              startTime: e.getHours() * 60 + e.getMinutes(),
            });
          }
        }}
      />
      <TimePicker
        id="End Time"
        label="End Time"
        required
        style={{ marginTop: "10px", marginLeft: "10px" }}
        value={
          new Date(
            0,
            0,
            0,
            Math.floor(block.endTime / 60),
            block.endTime % 60,
            0,
            0
          )
        }
        onChange={(e) => {
          if (e) {
            setBlock({
              ...block,
              endTime: e.getHours() * 60 + e.getMinutes(),
            });
          }
        }}
      />
      <ul>
        {[...block.students, { name: "" }].map((student, index) => (
          <li key={student.name}>
            <FormControl
              className="longText"
              style={{ marginTop: "10px", padding: "10px" }}
            >
              <InputLabel>Student {index + 1}</InputLabel>
              <Select
                className="longText"
                value={block.students[index] ? block.students[index].name : ""}
                onChange={(e) => {
                  if (e.target.value) {
                    setBlock({
                      ...block,
                      students: [
                        ...block.students.slice(0, index),
                        { name: e.target.value as string, email: "" },
                        ...block.students.slice(index + 1),
                      ],
                    });
                  } else {
                    setBlock({
                      ...block,
                      students: [
                        ...block.students.slice(0, index),
                        ...block.students.slice(index + 1),
                      ],
                    });
                  }
                }}
              >
                <MenuItem key="Empty" value="">
                  Empty
                </MenuItem>
                {students.map((student) => (
                  <MenuItem key={student.name} value={student.name}>
                    {student.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </li>
        ))}
      </ul>
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
                    checked={day}
                    onChange={() => {
                      setBlock({
                        ...block,
                        days: [
                          ...block.days.slice(0, index),
                          !day,
                          ...block.days.slice(index + 1),
                        ],
                      });
                    }}
                  />
                }
                label={days[index]}
              />
            </li>
          ))}
        </ul>
      </FormGroup>
    </MuiPickersUtilsProvider>
  );
};

export default ImportBlock;
