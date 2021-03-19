import { Button, Card, Typography } from '@material-ui/core';
import Link from 'next/link';

const TeacherDash = () => (
  <Card className="card" style={{ textAlign: 'center' }}>
    <Typography variant="h3">Teacher Dashboard</Typography>
    <Link href="/teacher/addTeacher">
      <Button
        aria-label="Add Teacher"
        variant="outlined"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography>Add Teacher</Typography>
      </Button>
    </Link>
    <Link href="/teacher/addStudent">
      <Button
        aria-label="Add Student"
        variant="outlined"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography>Add Student</Typography>
      </Button>
    </Link>
    <Link href="/teacher/addClass">
      <Button
        aria-label="Add Class"
        variant="outlined"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography>Add Class</Typography>
      </Button>
    </Link>
    <Link href="/teacher/manageClasses">
      <Button
        aria-label="Manage Classes"
        variant="outlined"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography>Manage Classes</Typography>
      </Button>
    </Link>
    <Link href="/teacher/manage/students">
      <Button
        aria-label="Manage Students"
        variant="outlined"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography>Manage Students</Typography>
      </Button>
    </Link>
    <Link href="/teacher/manage/teachers">
      <Button
        aria-label="Manage Students"
        variant="outlined"
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '10px',
        }}
      >
        <Typography>Manage Teachers</Typography>
      </Button>
    </Link>
  </Card>
);

export default TeacherDash;
