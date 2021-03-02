import { Button, Card, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const TeacherDash = () => {
  return (
    <Card className="card">
      <Typography variant="h3">Teacher Dashboard</Typography>
      <Link
        to="/teacher/addTeacher"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Add Teacher</Typography>
        </Button>
      </Link>
      <Link
        to="/teacher/addStudent"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Add Student</Typography>
        </Button>
      </Link>
      <Link
        to="/teacher/addClass"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Add Class</Typography>
        </Button>
      </Link>
      <Link
        to="/teacher/manageClasses"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Manage Classes</Typography>
        </Button>
      </Link>
      <Button
        variant="outlined"
        style={{ width: "100%", padding: "10px", marginTop: "10px" }}
      >
        <Typography>Change Schedules</Typography>
      </Button>
    </Card>
  );
};

export default TeacherDash;
