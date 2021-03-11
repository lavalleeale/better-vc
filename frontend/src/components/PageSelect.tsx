import {
  Card,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";

const PageSelect = ({
  end,
  start,
  setStart,
  skip,
  setSkip,
}: {
  end: number;
  start: number;
  setStart(value: number): void;
  skip: number;
  setSkip(value: number): void;
}) => {
  return (
    <Card className="card" style={{ textAlign: "center" }}>
      <IconButton
        onClick={() => {
          if (start - skip < 0) {
            setStart(0);
          } else {
            setStart(start - skip);
          }
        }}
        disabled={start === 0}
        style={{ marginRight: "10px" }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography style={{ display: "inline" }}>
        Showing {start + 1} through {start + skip}
      </Typography>
      <IconButton
        onClick={() => {
          if (start + 20 > end) {
            setStart(end - skip);
          } else {
            setStart(start + skip);
          }
        }}
        disabled={start + skip > end}
        style={{ marginLeft: "10px" }}
      >
        <KeyboardArrowRight />
      </IconButton>
      <FormControl style={{ float: "right", width: "100px" }}>
        <InputLabel>Per Page</InputLabel>
        <Select
          value={skip}
          onChange={(e) => setSkip(e.target.value as number)}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem disabled={end < 20} value={20}>
            20
          </MenuItem>
          <MenuItem disabled={end < 30} value={30}>
            30
          </MenuItem>
          <MenuItem value={end}>All</MenuItem>
        </Select>
      </FormControl>
    </Card>
  );
};

export default PageSelect;
