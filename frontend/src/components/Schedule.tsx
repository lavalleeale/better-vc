import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";
import { ClassType } from "../@types/class";
import ViewClass from "./ViewClass";
import jwt_decode from "jwt-decode";

const ManageClasses = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  useEffect(() => {
    async function getData() {
      try {
        let response: Response;
        if (jwt_decode<{ teacher: boolean }>(cookies.auth)) {
          response = await fetch(`${API_BASE_URL}/teacher/getClasses`, {
            credentials: "omit",
            headers: {
              jwt: cookies.auth,
            },
          });
        } else {
          response = await fetch(`${API_BASE_URL}/user/getClasses`, {
            credentials: "omit",
            headers: {
              jwt: cookies.auth,
            },
          });
        }
        setClasses(await response.json());
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
  }, [cookies.auth, removeCookie]);
  return (
    <ul>
      {classes.map((block: ClassType, index) => {
        return (
          <li key={index}>
            <ViewClass teacher={false} block={block} />
          </li>
        );
      })}
    </ul>
  );
};

export default ManageClasses;
