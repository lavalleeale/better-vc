import { Button, Card, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const TeacherDash = () => {
  return (
    <Card className="card" style={{ textAlign: "center" }}>
      <Typography variant="h3">Teacher Dashboard</Typography>
      <Link
        to="/teacher/addTeacher"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          aria-label="Add Teacher"
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
          aria-label="Add Student"
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
          aria-label="Add Class"
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
          aria-label="Manage Classes"
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Manage Classes</Typography>
        </Button>
      </Link>
      <Link
        to="/teacher/manage/Students"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          aria-label="Manage Students"
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Manage Students</Typography>
        </Button>
      </Link>
      <Link
        to="/teacher/manage/Teachers"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Button
          aria-label="Manage Students"
          variant="outlined"
          style={{ width: "100%", padding: "10px", marginTop: "10px" }}
        >
          <Typography>Manage Teachers</Typography>
        </Button>
      </Link>
    </Card>
  );
};

export default TeacherDash;
