import {
  Button,
  Card,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { FormEvent, useState } from "react";
import { ClassType } from "../@types/class";
import ImportBlock from "./ImportBlock";

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
              <ImportBlock
                localSchedule={localSchedule}
                setLocalSchedule={setLocalSchedule}
                index={index}
              />
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
