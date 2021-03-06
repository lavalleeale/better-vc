/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import {
    Card,
    CircularProgress,
    createMuiTheme,
    CssBaseline,
    Typography,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { lazy, Suspense, useState } from "react";
import { useCookies } from "react-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import ManageUsers from "./components/ManageUsers";
import User from "./components/User";

const AddStudent = lazy(() => import("./components/AddUser"));
const TeacherDash = lazy(() => import("./components/TeacherDash"));
const Login = lazy(() => import("./components/Login"));
const Profile = lazy(() => import("./components/Profile"));
const AddClass = lazy(() => import("./components/AddClass"));
const ManageClasses = lazy(() => import("./components/ManageClasses"));
const Schedule = lazy(() => import("./components/Schedule"));

const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    },
});
const lightTheme = createMuiTheme({
    palette: {
        type: "light",
    },
});

function Loading() {
    return (
        <Card className="card" style={{ textAlign: "center" }}>
            <Typography variant="h3">Loading...</Typography>
            <CircularProgress style={{ width: "10%", height: "10%" }} />
        </Card>
    );
}
function App() {
    const [darkMode, setDarkMode] = useState(darkThemeMq.matches);
    darkThemeMq.addEventListener("change", (evt) => {
        setDarkMode(evt.matches);
    });
    const [cookies] = useCookies(["name"]);
    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Router>
                <Header />
                <br />
                {!cookies.name ? (
                    <Suspense fallback={<Loading />}>
                        <Login />
                    </Suspense>
                ) : (
                    <Switch>
                        <Route exact path="/">
                            <Suspense fallback={<Loading />}>
                                <Schedule />
                            </Suspense>
                        </Route>
                        <Route exact path="/dashboard">
                            <Suspense fallback={<Loading />}>
                                <TeacherDash />
                            </Suspense>
                        </Route>
                        <Route path="/profile">
                            <Suspense fallback={<Loading />}>
                                <Profile />
                            </Suspense>
                        </Route>
                        <Route path="/user/:name">
                            <Suspense fallback={<Loading />}>
                                <User />
                            </Suspense>
                        </Route>
                        <Route path="/teacher/addClass">
                            <Suspense fallback={<Loading />}>
                                <AddClass />
                            </Suspense>
                        </Route>
                        <Route path="/teacher/addTeacher">
                            <Suspense fallback={<Loading />}>
                                <AddStudent teacher />
                            </Suspense>
                        </Route>
                        <Route path="/teacher/addStudent">
                            <Suspense fallback={<Loading />}>
                                <AddStudent teacher={false} />
                            </Suspense>
                        </Route>
                        <Route path="/teacher/manageClasses">
                            <Suspense fallback={<Loading />}>
                                <ManageClasses />
                            </Suspense>
                        </Route>
                        <Route path="/teacher/manage/:userType">
                            <Suspense fallback={<Loading />}>
                                <ManageUsers />
                            </Suspense>
                        </Route>
                    </Switch>
                )}
            </Router>
        </ThemeProvider>
    );
}

export default App;
