import DateFnsUtils from "@date-io/date-fns";
import { Card, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import React, { Dispatch, SetStateAction } from "react";
import { ClassType } from "../@types/class";

const ImportBlock = ({
  localSchedule,
  setLocalSchedule,
  index,
}: {
  localSchedule: ClassType[];
  setLocalSchedule: Dispatch<SetStateAction<ClassType[]>>;
  index: number;
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card className="card">
        <TextField
          id="Class Name"
          className="longText"
          required
          value={localSchedule[index].name}
          onChange={(e) => {
            setLocalSchedule([
              ...localSchedule.slice(0, index),
              {
                ...localSchedule[index],
                name: e.target.value,
              },
              ...localSchedule.slice(index + 1),
            ]);
          }}
          label="Class Name"
          variant="outlined"
        />
        <TextField
          id="Teacher Name"
          value={localSchedule[index].teacherName}
          style={{ marginTop: "10px" }}
          className="longText"
          onChange={(e) => {
            setLocalSchedule([
              ...localSchedule.slice(0, index),
              {
                ...localSchedule[index],
                teacherName: e.target.value,
              },
              ...localSchedule.slice(index + 1),
            ]);
          }}
          required
          label="Teacher Name"
          variant="outlined"
        />
        <TextField
          id="Zoom Link"
          value={localSchedule[index].zoomLink}
          style={{ marginTop: "10px" }}
          className="longText"
          onChange={(e) => {
            setLocalSchedule([
              ...localSchedule.slice(0, index),
              {
                ...localSchedule[index],
                zoomLink: e.target.value,
              },
              ...localSchedule.slice(index + 1),
            ]);
          }}
          label="Zoom Link"
          variant="outlined"
        />
        <TimePicker
          id="Start Time"
          label="Start Time"
          required
          style={{ marginTop: "10px" }}
          value={localSchedule[index].startTime}
          onChange={(e) => {
            if (e) {
              setLocalSchedule([
                ...localSchedule.slice(0, index),
                {
                  ...localSchedule[index],
                  startTime: e.toLocaleString(),
                },
                ...localSchedule.slice(index + 1),
              ]);
            }
          }}
        />
        <TimePicker
          id="End Time"
          label="End Time"
          required
          style={{ marginTop: "10px" }}
          value={localSchedule[index].endTime}
          onChange={(e) => {
            if (e) {
              setLocalSchedule([
                ...localSchedule.slice(0, index),
                {
                  ...localSchedule[index],
                  endTime: e.toLocaleString(),
                },
                ...localSchedule.slice(index + 1),
              ]);
            }
          }}
        />
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default ImportBlock;
