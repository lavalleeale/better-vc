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
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [info, setInfo] = useState({ nickname: "" } as { nickname: string });
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch(`${API_BASE_URL}/user/getInfo`, {
          credentials: "omit",
          headers: {
            jwt: cookies.auth,
          },
        });
        setInfo(await response.json());
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
    <AppBar position="fixed" color="inherit" style={{ padding: "10px" }}>
      <Toolbar>
        <Typography style={{ flexGrow: 1 }} variant="h3">
          The Better Veracross
        </Typography>
        {cookies.auth ? (
          <div>
            {jwt_decode<{ teacher: boolean }>(cookies.auth).teacher && (
              <Link style={{ textDecoration: "none" }} to="/teacher">
                <Button variant="outlined">Dashboard</Button>
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
              <Link
                style={{ textDecoration: "none", color: "inherit" }}
                to="/profile"
                onClick={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  {info.nickname}
                </MenuItem>
              </Link>
              <MenuItem
                onClick={() => {
                  removeCookie("auth", {
                    path: "/",
                    domain:
                      process.env.NODE_ENV === "production"
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
          <Button
            variant="outlined"
            onClick={() => window.open(`${API_BASE_URL}/auth/google`, "_self")}
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
