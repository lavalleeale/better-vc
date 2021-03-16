/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Button, Card, TextField, Typography } from "@material-ui/core";
import { FormEvent, useState } from "react";
import { useCookies } from "react-cookie";
import API_BASE_URL from "../constants";

const Profile = () => {
    const [cookies] = useCookies(["name"]);
    const [info, setInfo] = useState({
        nickname: cookies.name,
    });
    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        fetch(`${API_BASE_URL}/user/updateNickname`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "content-type": "application/json",
                jwt: cookies.auth,
            },
            body: JSON.stringify({
                nickname: info.nickname,
            }),
        });
    }
    return (
        <Card className="card">
            <Typography variant="h4">{cookies.name}</Typography>
            <form onSubmit={onSubmit}>
                <TextField
                    value={info.nickname}
                    onChange={(e) => {
                        setInfo({ ...info, nickname: e.target.value });
                    }}
                    style={{ marginTop: "10px" }}
                    required
                    className="longText"
                    variant="outlined"
                    label="Nickname"
                    id="Nickname"
                />
                <Button
                    aria-label="update"
                    type="submit"
                    style={{ float: "right", marginTop: "10px" }}
                    variant="outlined"
                >
                    Update
                </Button>
            </form>
        </Card>
    );
};

export default Profile;
