/* eslint-disable react/require-default-props */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Card, IconButton, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API_BASE_URL from "../constants";

const User = ({
    userProp,
    deleteUser,
}: {
    userProp?: {
        name: string;
        nickname: string;
        email: string;
        teacher: boolean;
        // eslint-disable-next-line camelcase
        image_url: string;
    };
    deleteUser?(): void;
}) => {
    const { name } = useParams<{ name: string }>();
    const [user, setUser] = useState<{
        name: string;
        nickname: string;
        email: string;
        teacher: boolean;
        // eslint-disable-next-line camelcase
        image_url: string;
    }>(
        {} as {
            name: string;
            nickname: string;
            email: string;
            teacher: boolean;
            // eslint-disable-next-line camelcase
            image_url: string;
        }
    );
    useEffect(() => {
        async function getData() {
            const response = await fetch(
                `${API_BASE_URL}/user/getInfo/${name}`,
                {
                    credentials: "include",
                }
            );
            setUser(await response.json());
        }
        if (userProp) {
            setUser(userProp);
        } else {
            getData();
        }
    }, [name, userProp]);
    return (
        <Card className="card">
            {user.image_url && (
                <img
                    style={{ width: "100px", height: "100px", float: "right" }}
                    alt="profile"
                    src={user.image_url}
                />
            )}
            {deleteUser && (
                <IconButton
                    aria-label="Delete User"
                    style={{ float: "right" }}
                    onClick={deleteUser}
                >
                    <Delete />
                </IconButton>
            )}
            <Typography>
                Role: {user.teacher ? "Teacher" : "Student"}
            </Typography>
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
