import { Card, createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { lazy, Suspense } from "react";
import { useCookies } from "react-cookie";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
const AddStudent = lazy(() => import("./components/AddUser"));
const TeacherDash = lazy(() => import("./components/TeacherDash"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));
const Schedule = lazy(() => import("./components/Schedule"));
const AddClass = lazy(() => import("./components/AddClass"));
const ManageClasses = lazy(() => import("./components/ManageClasses"));

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  const [cookies] = useCookies(["auth"]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="spacer" />
        {!cookies.auth ? (
          <Suspense fallback={<Card className="card">Loading...</Card>}>
            <Login />
          </Suspense>
        ) : (
          <Switch>
            <Route path="/schedule">
              <Suspense fallback={<Card className="card">Loading...</Card>}>
                <Schedule />
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
                <AddStudent teacher={true} />
              </Suspense>
            </Route>
            <Route path="/teacher/addStudent">
              <Suspense fallback={<Card className="card">Loading...</Card>}>
                <AddStudent teacher={false} />
              </Suspense>
            </Route>
            <Route path="/teacher/manageClasses">
              <Suspense fallback={<Card className="card">Loading...</Card>}>
                <ManageClasses />
              </Suspense>
            </Route>
          </Switch>
        )}
        <Header />
      </Router>
    </ThemeProvider>
  );
}

export default App;
