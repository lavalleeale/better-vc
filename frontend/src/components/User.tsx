import { Card, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../constants";

const User = () => {
  const { name } = useParams<{ name: string }>();
  const [user, setUser] = useState(
    {} as { name: string; nickname: string; email: string; teacher: boolean }
  );
  const [cookies, , removeCookie] = useCookies(["auth"]);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${API_BASE_URL}/user/getInfo/${name}`, {
          credentials: "omit",
          headers: {
            jwt: cookies.auth,
          },
        });
        setUser(await response.json());
      } catch {
        removeCookie("auth", {
          path: "/",
          domain:
            process.env.NODE_ENV === "production"
              ? ".alextesting.ninja"
              : "localhost",
        });
      }
    }
    if (cookies.auth) {
      getData();
    }
  }, [cookies.auth, removeCookie, name]);
  return (
    <Card className="card">
      <Typography>{user.teacher ? "Teacher" : "Student"}</Typography>
      <Typography>
        Name: {user.name} ({user.nickname})
      </Typography>
      <Typography>
        Email:{" "}
        <a color="" href={`mailto:${user.email}`}>
          {user.email}
        </a>
      </Typography>
    </Card>
  );
};

export default User;
