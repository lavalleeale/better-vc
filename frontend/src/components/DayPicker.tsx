import { Card, IconButton, Typography } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";

const DayPicker = ({
  day,
  setDay,
}: {
  day: number;
  setDay(day: number): void;
}) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return (
    <Card className="card" style={{ textAlign: "center" }}>
      <IconButton
        onClick={() => {
          if (day === 0) {
            setDay(6);
          } else {
            setDay(day - 1);
          }
        }}
        style={{ marginRight: "10px" }}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <Typography style={{ display: "inline" }}>
        {days[Math.abs(day)]}
      </Typography>
      <IconButton
        onClick={() => {
          if (day === 6) {
            setDay(0);
          } else {
            setDay(day + 1);
          }
        }}
        style={{ marginLeft: "10px" }}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Card>
  );
};

export default DayPicker;