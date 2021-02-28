import {
  AppBar,
  Card,
  createMuiTheme,
  CssBaseline,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { lazy, Suspense, useState } from "react";
import { useCookies } from "react-cookie";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { ClassType } from "./@types/class";
const ImportSchedule = lazy(() => import("./components/ImportSchedule"));
const Schedule = lazy(() => import("./components/Schedule"));

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [schedule, setSchedule] = useState<ClassType[]>([]);
  const [cookies, setCookie] = useCookies([]);
  if (cookies.schedule && !schedule.length) {
    setSchedule(cookies.schedule);
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="spacer" />
      <Router>
        {!schedule.length ? (
          <Redirect to="import" />
        ) : (
          <Redirect to="schedule" />
        )}
        <Switch>
          <Route path="/import">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <ImportSchedule
                setSchedule={(e: ClassType[]) => {
                  setSchedule(e);
                  setCookie("schedule", e, {
                    expires: new Date(new Date().getTime() + 365 * 86400000),
                  });
                }}
              />
            </Suspense>
          </Route>
          <Route path="/schedule">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <Schedule schedule={schedule} />
            </Suspense>
          </Route>
        </Switch>
      </Router>
      <AppBar position="fixed" color="inherit" style={{ padding: "10px" }}>
        <Toolbar>
          <Typography variant="h6">The Better Veracross</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default App;
