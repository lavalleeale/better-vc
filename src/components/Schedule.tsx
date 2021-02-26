import PropTypes from "prop-types";
import React from "react";
import { ClassType } from "../@types/class";
import Class from "./Class";

const Schedule = ({ schedule }: { schedule: ClassType[] }) => {
  return (
    <ul>
      {schedule.map((block, index) => {
        return (
          <li key={index}>
            <Class block={block} />
          </li>
        );
      })}
    </ul>
  );
};

Schedule.propTypes = {
  schedule: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      teachernName: PropTypes.string,
      id: PropTypes.number,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
    })
  ).isRequired,
};

export default Schedule;
