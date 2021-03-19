/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    AppBar,
    Button,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import GoogleLogin, { GoogleLoginResponse } from "react-google-login";
import { API_BASE_URL } from "../constants";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [username, setUsername] = useState(cookies.name);
    return (
        <AppBar position="static" color="inherit" style={{ padding: "10px" }}>
            <Toolbar>
                <Typography style={{ flexGrow: 1 }} variant="h3">
                    The Better Veracross
                </Typography>
                {username ? (
                    <div>
                        <Link href="/schedule">
                            <Button aria-label="schedule" variant="outlined">
                                Schedule
                            </Button>
                        </Link>
                        {cookies.teacher && (
                            <Link href="/teacher/dashboard">
                                <Button
                                    aria-label="dashboard"
                                    variant="outlined"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        )}
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => {
                                setAnchorEl(e.currentTarget);
                            }}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorEl)}
                            onClose={() => setAnchorEl(null)}
                        >
                            <Link href="/user/profile">
                                <MenuItem onClick={() => setAnchorEl(null)}>
                                    {username}
                                </MenuItem>
                            </Link>
                            <MenuItem
                                onClick={() => {
                                    fetch(`${API_BASE_URL}/auth/logout`, {
                                        credentials: "include",
                                    });
                                    setUsername("");
                                    removeCookie("name", {
                                        domain:
                                            process.env.NODE_ENV ===
                                            "production"
                                                ? ".alextesting.ninja"
                                                : "localhost",
                                    });
                                    setAnchorEl(null);
                                }}
                            >
                                Logout
                            </MenuItem>
                        </Menu>
                    </div>
                ) : (
                    <GoogleLogin
                        clientId="275616371359-52hg1smuvotcq2dh3jaoj23tjqminp34.apps.googleusercontent.com"
                        buttonText="Login"
                        render={(renderProps) => (
                            <Button
                                aria-label="login"
                                variant="outlined"
                                onClick={renderProps.onClick}
                            >
                                Login
                            </Button>
                        )}
                        onSuccess={async (e) => {
                            const response = await fetch(
                                `${API_BASE_URL}/auth/login`,
                                {
                                    credentials: "include",
                                    method: "POST",
                                    headers: {
                                        "content-type": "application/json",
                                    },
                                    body: JSON.stringify({
                                        access_token: (e as GoogleLoginResponse)
                                            .accessToken,
                                    }),
                                }
                            );
                            if (response.ok) {
                                const userData = await response.json();
                                setCookie("name", userData.name, {
                                    domain:
                                        process.env.NODE_ENV === "production"
                                            ? ".alextesting.ninja"
                                            : "localhost",
                                });
                                setCookie("teacher", userData.teacher, {
                                    domain:
                                        process.env.NODE_ENV === "production"
                                            ? ".alextesting.ninja"
                                            : "localhost",
                                });
                                setUsername(userData.name);
                            }
                        }}
                        // onFailure={console.log}
                        cookiePolicy="single_host_origin"
                    />
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
