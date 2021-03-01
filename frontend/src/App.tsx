import { Card, createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
const TeacherDash = lazy(() => import("./components/TeacherDash"));
const Login = lazy(() => import("./components/Login"));
const AddTeacher = lazy(() => import("./components/AddTeacher"));
const Profile = lazy(() => import("./components/Profile"));
const Schedule = lazy(() => import("./components/Schedule"));
const AddClass = lazy(() => import("./components/AddClass"));

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="spacer" />
      <Router>
        <Switch>
          <Route path="/schedule">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <Schedule />
            </Suspense>
          </Route>
          <Route exact path="/">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <Login />
            </Suspense>
          </Route>
          <Route path="/teacher/addClass">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <AddClass />
            </Suspense>
          </Route>
          <Route exact path="/teacher">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <TeacherDash />
            </Suspense>
          </Route>
          <Route path="/profile">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <Profile />
            </Suspense>
          </Route>
          <Route path="/teacher/addTeacher">
            <Suspense fallback={<Card className="card">Loading...</Card>}>
              <AddTeacher />
            </Suspense>
          </Route>
        </Switch>
        <Header />
      </Router>
    </ThemeProvider>
  );
}

export default App;
