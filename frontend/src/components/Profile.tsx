import { Card, Typography } from "@material-ui/core";
import jwt_decode from "jwt-decode";
import React from "react";
import { useCookies } from "react-cookie";

const Profile = () => {
  const [cookies] = useCookies(["auth"]);
  return (
    <Card className="card">
      <Typography variant="h4">
        {jwt_decode<{ name: string }>(cookies.auth).name}
      </Typography>
    </Card>
  );
};

export default Profile;
