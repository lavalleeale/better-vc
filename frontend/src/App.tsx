import {
  AppBar,
  Card,
  createMuiTheme,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/styles";
import React, { lazy, Suspense, useState } from "react";
import { useCookies } from "react-cookie";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { ClassType } from "./@types/class";
import { API_BASE_URL } from "./constants";
const Schedule = lazy(() => import("./components/Schedule"));
const AddClass = lazy(() => import("./components/AddClass"));

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [schedule, setSchedule] = useState<ClassType[]>([]);
  const [cookies, _setCookie, removeCookie] = useCookies(["auth"]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  if (cookies.schedule && !schedule.length) {
    setSchedule(cookies.schedule);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="spacer" />
      <Router>
        <Switch>
          <Route path="/schedule">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <Schedule schedule={schedule} />
            </Suspense>
          </Route>
          <Route path="/teacher/addClass">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <AddClass />
            </Suspense>
          </Route>
        </Switch>
      </Router>
      <AppBar position="fixed" color="inherit" style={{ padding: "10px" }}>
        <Toolbar>
          <Typography style={{ flexGrow: 1 }} variant="h6">
            The Better Veracross
          </Typography>
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
              {cookies.auth ? (
                <div>
                  <MenuItem onClick={() => setAnchorEl(null)}>
                    My Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      removeCookie("auth");
                      setAnchorEl(null);
                    }}
                  >
                    Logout
                  </MenuItem>
                </div>
              ) : (
                <MenuItem
                  onClick={() =>
                    window.open(`${API_BASE_URL}/auth/google`, "_self")
                  }
                >
                  Login
                </MenuItem>
              )}
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default App;
