import { Button, Card, TextField } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { API_BASE_URL } from "../constants";

const AddUser = ({ teacher }: { teacher: boolean }) => {
  const [student, setStudent] = useState({ name: "", nickname: "", email: "" });
  const [cookies] = useCookies();

  function validateEmail(inputText: string) {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return !!inputText.match(mailformat) || inputText === "";
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const response = await fetch(`${API_BASE_URL}/teacher/addUser`, {
      method: "POST",
      credentials: "omit",
      headers: {
        jwt: cookies.auth,
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...student, teacher: teacher }),
    });
    if (response.ok) {
      setStudent({ name: "", nickname: "", email: "" });
    }
  }
  return (
    <Card className="card">
      <form onSubmit={onSubmit}>
        <TextField
          required
          className="longText"
          value={student.name}
          onChange={(e) => {
            setStudent({
              ...student,
              name: e.target.value,
            });
          }}
          label="Name"
          variant="outlined"
        />
        <TextField
          style={{ marginTop: "15px" }}
          required
          className="longText"
          value={student.nickname}
          onChange={(e) => {
            setStudent({
              ...student,
              nickname: e.target.value,
            });
          }}
          label="Nickname"
          variant="outlined"
        />
        <TextField
          style={{ marginTop: "15px" }}
          required
          error={!validateEmail(student.email)}
          className="longText"
          value={student.email}
          onChange={(e) => {
            setStudent({
              ...student,
              email: e.target.value,
            });
          }}
          label="Email"
          variant="outlined"
        />
        <Button
          type="submit"
          style={{ float: "right", marginTop: "10px" }}
          variant="outlined"
        >
          Add
        </Button>
      </form>
    </Card>
  );
};

export default AddUser;
