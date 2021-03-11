import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";
import PageSelect from "./PageSelect";
import User from "./User";

const ManageStudents = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [students, setStudents] = useState<
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
        const response = await fetch(`${API_BASE_URL}/teacher/getStudents`, {
          credentials: "omit",
          headers: {
            jwt: cookies.auth,
          },
        });
        setStudents(await response.json());
      } catch {
        // removeCookie("auth", {
        //   path: "/",
        //   domain:
        //     process.env.NODE_ENV === "production"
        //       ? ".alextesting.ninja"
        //       : "localhost",
        // });
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
        end={students.length}
      />
      <ul>
        {students.slice(start, start + skip).map((student, index) => {
          return (
            <li key={index}>
              <User userProp={student} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageStudents;
