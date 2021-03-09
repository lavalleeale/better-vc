import { Card, IconButton, TextField, Typography } from "@material-ui/core";
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
        Showing {start} through {start + skip}
      </Typography>
      <IconButton
        onClick={() => {
          if (start + 20 > end) {
            setStart(end - skip);
          } else {
            setStart(start + skip);
          }
        }}
        disabled={start + skip === end}
        style={{ marginLeft: "10px" }}
      >
        <KeyboardArrowRight />
      </IconButton>
      <TextField
        variant="outlined"
        value={skip}
        type="number"
        onChange={(e) => {
          if (
            parseInt(e.target.value, 10) <= end ||
            parseInt(e.target.value, 10) === 0
          ) {
            setSkip(parseInt(e.target.value, 10));
          }
        }}
        style={{ float: "right" }}
        label="Classes Per Page"
      />
    </Card>
  );
};

export default PageSelect;
