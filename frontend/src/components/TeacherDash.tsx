import { Button, Card, TextField } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";

const TeacherDash = () => {
  const [email, setEmail] = useState("");
  const [cookies] = useCookies(["auth"]);
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${API_BASE_URL}/teacher/addTeacher`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        jwt: cookies.auth,
      },
      body: JSON.stringify({ email }),
    });
  }
  return (
    <Card className="card">
      <form onSubmit={handleSubmit}>
        <TextField
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          className="longText"
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
