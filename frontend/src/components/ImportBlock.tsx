import DateFnsUtils from "@date-io/date-fns";
import {
  Card,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import React, { Dispatch, SetStateAction } from "react";
import { ClassType } from "../@types/class";

const ImportBlock = ({
  block,
  setBlock,
  teachers,
}: {
  block: ClassType;
  setBlock: Dispatch<SetStateAction<ClassType>>;
  teachers: Array<string>;
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
        <FormControl
          className="longText"
          style={{ marginTop: "10px", padding: "10px" }}
        >
          <InputLabel>Teacher Name</InputLabel>
          <Select
            label="Teacher Name"
            required
            value={block.teacher}
            onChange={(e) => {
              if (e.target.value) {
                setBlock({
                  ...block,
                  teacher: e.target.value as string,
                });
              }
            }}
          >
            {teachers.map((teacher: string) => (
              <MenuItem key={teacher} value={teacher}>
                {teacher}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
