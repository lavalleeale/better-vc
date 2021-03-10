import { Button, Card, TextField } from "@material-ui/core";
import React, { FormEvent, useState } from "react";
import useCookies from "react-cookie/cjs/useCookies";
import { API_BASE_URL } from "../constants";

const AddUser = ({ teacher }: { teacher: boolean }) => {
  const [student, setStudent] = useState({ name: "", nickname: "", email: "" });
  const [image, setImage] = useState("");
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
      body: JSON.stringify({
        ...student,
        teacher: teacher,
        image: image,
      }),
    });
    if (response.ok) {
      setStudent({ name: "", nickname: "", email: "" });
    }
  }
  return (
    <Card className="card">
      <form onSubmit={onSubmit}>
        <TextField
          id="name"
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
          id="nickname"
          style={{ marginTop: "15px" }}
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
          id="email"
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
        <input
          required
          style={{ display: "none" }}
          accept="image/*"
          id="image-upload"
          type="file"
          onChange={(e) => {
            const reader = new FileReader();
            if (e.target.files) {
              reader.readAsDataURL(e.target.files[0]);
              reader.addEventListener("load", () => {
                setImage(reader.result as string);
              });
            }
          }}
        />
        <label htmlFor="image-upload">
          <Button variant="contained" color="primary" component="span">
            Upload Profile Picture
          </Button>
        </label>
        <Button
          aria-label="Add"
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
