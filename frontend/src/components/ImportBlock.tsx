import DateFnsUtils from "@date-io/date-fns";
import { Card, TextField } from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import React, { Dispatch, SetStateAction } from "react";
import { ClassType } from "../@types/class";

const ImportBlock = ({
  block,
  setBlock,
}: {
  block: ClassType;
  setBlock: Dispatch<SetStateAction<ClassType>>;
}) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Card className="card">
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
        <TextField
          id="Teacher Name"
          value={block.teacherName}
          style={{ marginTop: "10px" }}
          className="longText"
          onChange={(e) => {
            setBlock({
              ...block,
              teacherName: e.target.value,
            });
          }}
          required
          label="Teacher Name"
          variant="outlined"
        />
        <TextField
          id="Zoom Link"
          value={block.zoomLink}
          style={{ marginTop: "10px" }}
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
          value={block.startTime}
          onChange={(e) => {
            if (e) {
              setBlock({
                ...block,
                startTime: e.toLocaleTimeString(),
              });
            }
          }}
        />
        <TimePicker
          id="End Time"
          label="End Time"
          required
          style={{ marginTop: "10px" }}
          value={block.endTime}
          onChange={(e) => {
            if (e) {
              setBlock({
                ...block,
                endTime: e.toLocaleTimeString(),
              });
            }
          }}
        />
      </Card>
    </MuiPickersUtilsProvider>
  );
};

export default ImportBlock;
