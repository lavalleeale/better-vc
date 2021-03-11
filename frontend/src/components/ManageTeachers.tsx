import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";
import PageSelect from "./PageSelect";
import User from "./User";

const ManageTeachers = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [teachers, setTeachers] = useState<
    {
      name: string;
      nickname: string;
      email: string;
      teacher: boolean;
      image: string;
    }[]
  >([]);
  const [start, setStart] = useState(0);
  const [skip, setSkip] = useState(10);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${API_BASE_URL}/teacher/getTeachers`, {
          credentials: "omit",
          headers: {
            jwt: cookies.auth,
          },
        });
        setTeachers(await response.json());
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
    <div>
      <PageSelect
        skip={skip}
        setSkip={setSkip}
        start={start}
        setStart={setStart}
        end={teachers.length}
      />
      <ul>
        {teachers.slice(start, start + skip).map((teacher, index) => {
          return (
            <li key={index}>
              <User userProp={teacher} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageTeachers;
