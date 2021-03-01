import { Button, Card, Typography } from "@material-ui/core";
import React from "react";
import { API_BASE_URL } from "../constants";

const Login = () => {
  return (
    <Card
      style={{
        margin: "auto",
        width: "75%",
        height: "50vh",
        textAlign: "center",
        position: "relative",
      }}
    >
      <Typography variant="h3" style={{ margin: "auto" }}>
        Final Name
      </Typography>
      <Button
        style={{ padding: "10vh" }}
        variant="outlined"
        onClick={() => window.open(`${API_BASE_URL}/auth/google`, "_self")}
      >
        LOGO
      </Button>
    </Card>
  );
};

export default Login;
