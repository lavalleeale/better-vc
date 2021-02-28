import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../constants";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [cookies, , removeCookie] = useCookies(["auth"]);
  return (
    <AppBar position="fixed" color="inherit" style={{ padding: "10px" }}>
      <Toolbar>
        <Typography style={{ flexGrow: 1 }} variant="h6">
          The Better Veracross
        </Typography>
        {cookies.auth ? (
          <div>
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
              <Link style={{ textDecoration: "none" }} to="/profile">
                <MenuItem>
                  <Typography color="textPrimary">
                    {jwt_decode<{ name: string }>(cookies.auth).name}
                  </Typography>
                </MenuItem>
              </Link>
              {jwt_decode<{ teacher: boolean }>(cookies.auth).teacher && (
                <Link style={{ textDecoration: "none" }} to="/teacher">
                  <Typography color="textPrimary">
                    <MenuItem>Admin</MenuItem>
                  </Typography>
                </Link>
              )}
              <MenuItem
                onClick={() => {
                  removeCookie("auth");
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