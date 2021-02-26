import DateFnsUtils from "@date-io/date-fns";
import {
  Button,
  Card,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import PropTypes from "prop-types";
import { FormEvent, useState } from "react";
import { ClassType } from "../@types/class";

const ImportSchedule = ({
  setSchedule,
}: {
  setSchedule: (schedule: ClassType[]) => void;
}) => {
  const [classNum, setClassNum] = useState(0);
  const [localSchedule, setLocalSchedule] = useState<ClassType[]>(
    new Array(10).fill({
      name: "",
      teacherName: "",
      startTime: new Date(0, 0, 0, 8, 0, 0, 0),
      endTime: new Date(0, 0, 0, 8, 0, 0, 0),
      link: "",
    })
  );
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSchedule(localSchedule.slice(0, classNum + 1));
  }
  return (
    <form onSubmit={onSubmit}>
      <Card className="card">
        <FormLabel component="legend">Number of Classes</FormLabel>
        <RadioGroup
          row
          id="Number of Classes"
          name="ClassNum"
          value={classNum}
          onChange={(e) => setClassNum(parseInt(e.target.value, 10))}
        >
          <ul>
            {[...Array(10)].map((_x, index) => (
              <li key={index} style={{ display: "inline" }}>
                <FormControlLabel
                  labelPlacement="top"
                  value={index}
                  control={<Radio />}
                  label={index + 1}
                />
              </li>
            ))}
          </ul>
        </RadioGroup>
      </Card>
      <ul>
        {localSchedule.slice(0, classNum + 1).map((block, index) => {
          return (
            <li key={index}>
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
                    label="Link"
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
                    autoOk
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
                    autoOk
                  />
                </Card>
              </MuiPickersUtilsProvider>
            </li>
          );
        })}
      </ul>
      <Card className="card">
        <Button style={{ float: "right" }} type="submit" variant="outlined">
          import schedule
        </Button>
      </Card>
    </form>
  );
};

ImportSchedule.propTypes = {
  setSchedule: PropTypes.func.isRequired,
};

export default ImportSchedule;
