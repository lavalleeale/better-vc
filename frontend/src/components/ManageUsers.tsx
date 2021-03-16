/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../constants";
import PageSelect from "./PageSelect";
import User from "./User";

const ManageUsers = () => {
    const [cookies, , removeCookie] = useCookies(["auth"]);
    const { userType } = useParams<{ userType: string }>();
    const [users, setUsers] = useState<
        {
            name: string;
            nickname: string;
            email: string;
            teacher: boolean;
            // eslint-disable-next-line camelcase
            image_url: string;
            id: number;
        }[]
    >([]);
    const [start, setStart] = useState(0);
    const [skip, setSkip] = useState(10);
    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/teacher/get${userType}`,
                    {
                        credentials: "include",
                        headers: {
                            X_CSRF_TOKEN: cookies.csrf_access_token,
                        },
                    }
                );
                setUsers(await response.json());
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
        getData();
    }, [userType]);
    async function deleteUser(id: number, index: number) {
        await fetch(`${API_BASE_URL}/teacher/deleteUser/${id}`, {
            credentials: "include",
            method: "delete",
            headers: {
                X_CSRF_TOKEN: cookies.csrf_access_token,
            },
        });
        setUsers([...users.slice(0, index), ...users.slice(index + 1)]);
    }
    return (
        <div>
            <PageSelect
                skip={skip}
                setSkip={setSkip}
                start={start}
                setStart={setStart}
                end={users.length}
            />
            <ul>
                {users.slice(start, start + skip).map((student, index) => (
                    <li key={student.name}>
                        <User
                            userProp={student}
                            deleteUser={() => deleteUser(student.id, index)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageUsers;
