import { Button, Card, TextField, Typography } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import React, { FormEvent, useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";

const Profile = () => {
  const [cookies] = useCookies(["auth"]);
  const [info, setInfo] = useState({ nickname: "" } as { nickname: string });
  useEffect(() => {
    async function getData() {
      const response = await fetch(`${API_BASE_URL}/user/getInfo`, {
        credentials: "omit",
        headers: {
          jwt: cookies.auth,
        },
      });
      setInfo(await response.json());
    }
    getData();
  }, [cookies.auth]);
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch(`${API_BASE_URL}/user/updateNickname`, {
      method: "PUT",
      credentials: "omit",
      headers: {
        "content-type": "application/json",
        jwt: cookies.auth,
      },
      body: JSON.stringify({
        nickname: info.nickname,
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
          value={info.nickname}
          onChange={(e) => {
            setInfo({ ...info, nickname: e.target.value });
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
