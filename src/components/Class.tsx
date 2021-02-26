import { Button, Card, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import { ClassType } from "../@types/class";

const Class = ({ block }: { block: ClassType }) => {
  function compareTime(startTime: Date, endTime: Date) {
    const currentTime = new Date();
    return (
      removeDate(startTime) <= removeDate(currentTime) &&
      removeDate(currentTime) < removeDate(endTime)
    );
  }
  function removeDate(date: Date) {
    return new Date(
      Date.UTC(0, 0, 0, date.getUTCHours(), date.getUTCMinutes())
    ).getTime();
  }
  return (
    <Card className="card">
      {block.zoomLink ? (
        <a
          target="_blank"
          style={{ textDecoration: "inherit", float: "right" }}
          href={block.zoomLink}
        >
          <Button variant="outlined">Zoom Link</Button>
        </a>
      ) : (
        <Button variant="outlined" disabled style={{ float: "right" }}>
          No Link
        </Button>
      )}
      {compareTime(new Date(block.startTime), new Date(block.endTime)) && (
        <Typography variant="h6" style={{ color: "red" }}>
          Now
        </Typography>
      )}
      <Typography>Name: {block.name}</Typography>
      <Typography>Teacher Name: {block.teacherName}</Typography>
      <Typography>
        Start Time: {new Date(block.startTime).toLocaleTimeString()}
      </Typography>
      <Typography>
        End Time: {new Date(block.endTime).toLocaleTimeString()}
      </Typography>
    </Card>
  );
};

Class.propTypes = {
  block: PropTypes.shape({
    name: PropTypes.string,
    teachernName: PropTypes.string,
    id: PropTypes.number,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
  }),
};

export default Class;
