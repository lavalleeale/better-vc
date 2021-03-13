import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { API_BASE_URL } from "../constants";
import { ClassType } from "../@types/class";
import EditClass from "./EditClass";
import PageSelect from "./PageSelect";

const ManageClasses = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [start, setStart] = useState(0);
  const [skip, setSkip] = useState(10);
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${API_BASE_URL}/teacher/getAllClasses`, {
          credentials: "omit",
          headers: {
            jwt: cookies.auth,
          },
        });
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
  async function deleteClass(name: string, index: number) {
    await fetch(`${API_BASE_URL}/teacher/deleteClass`, {
      credentials: "omit",
      method: "delete",
      headers: {
        jwt: cookies.auth,
        name,
      },
    });
    setClasses([...classes.slice(0, index), ...classes.slice(index + 1)]);
  }
  return (
    <div>
      <PageSelect
        skip={skip}
        setSkip={setSkip}
        start={start}
        setStart={setStart}
        end={classes.length}
      />
      <ul>
        {classes.slice(start, start + skip).map((block: ClassType, index) => {
          return (
            <li key={index}>
              <EditClass
                deleteClass={() => deleteClass(block.name, index)}
                block={block}
                setBlock={(value) => {
                  setClasses([
                    ...classes.slice(0, index + start),
                    value,
                    ...classes.slice(index + start + 1),
                  ]);
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ManageClasses;
