/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import API_BASE_URL from "../constants";
import { ClassType } from "../@types/class";
import ViewClass from "./ViewClass";
import DayPicker from "./DayPicker";

const ManageClasses = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [day, setDay] = useState(new Date().getDay());
  useEffect(() => {
    async function getData() {
      try {
        let response: Response;
        if (jwtDecode<{ teacher: boolean }>(cookies.auth).teacher) {
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
    <div>
      <DayPicker day={day} setDay={(value: number) => setDay(value)} />
      <ul>
        {classes.map((block: ClassType) => {
          return (
            <li key={block.name}>
              <ViewClass day={day} teacher={false} block={block} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageClasses;
