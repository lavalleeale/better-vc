import { Button, Card, TextField, Typography } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import React, { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";

const Profile = () => {
  const [cookies] = useCookies(["auth"]);
  const [nickname, setNickname] = useState(
    (jwt_decode(cookies.auth) as { nickname: string }).nickname
  );
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${API_BASE_URL}/student/updateNickname`, {
      method: "PUT",
      credentials: "omit",
      headers: {
        "content-type": "application/json",
        jwt: cookies.auth,
      },
      body: JSON.stringify({
        nickname: nickname,
      }),
    });
  }
  return (
    <Card className="card">
      <Typography variant="h4">
        {jwt_decode<{ name: string }>(cookies.auth).name}
      </Typography>
      <form onSubmit={onSubmit}>
        <TextField
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          style={{ marginTop: "10px" }}
          required
          className="longText"
          variant="outlined"
          label="Nickname"
        />
        <Button
          type="submit"
          style={{ float: "right", marginTop: "10px" }}
          variant="outlined"
        >
          Update
        </Button>
      </form>
    </Card>
  );
};

export default Profile;
