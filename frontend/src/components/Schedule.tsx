/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import API_BASE_URL from "../constants";
import { ClassType } from "../@types/class";
import ViewClass from "./ViewClass";
import DayPicker from "./DayPicker";

const ManageClasses = () => {
    const [cookies] = useCookies(["name"]);
    const [classes, setClasses] = useState<ClassType[]>([]);
    const [day, setDay] = useState(new Date().getDay());
    useEffect(() => {
        async function getData() {
            let response: Response;
            if (cookies.teacher) {
                response = await fetch(`${API_BASE_URL}/teacher/getClasses`, {
                    credentials: "include",
                });
            } else {
                response = await fetch(`${API_BASE_URL}/user/getClasses`, {
                    credentials: "include",
                });
            }
            setClasses(await response.json());
        }
        getData();
    }, []);
    return (
        <div>
            <DayPicker day={day} setDay={(value: number) => setDay(value)} />
            <ul>
                {classes.map((block: ClassType) => (
                    <li key={block.name}>
                        <ViewClass day={day} teacher={false} block={block} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageClasses;
