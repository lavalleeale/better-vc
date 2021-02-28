import { Button, Card, TextField } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { API_BASE_URL } from "../constants";

const TeacherDash = () => {
  const [email, setEmail] = useState("");
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${API_BASE_URL}/teacher/addTeacher`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
  }
  return (
    <Card className="card">
      <form onSubmit={handleSubmit}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          style={{ width: "100%" }}
          label="Add teacher by email"
          variant="outlined"
        />
        <Button
          type="submit"
          variant="outlined"
          style={{ float: "right", marginTop: "10px" }}
        >
          Add
        </Button>
      </form>
    </Card>
  );
};

export default TeacherDash;
