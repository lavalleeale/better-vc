export type ClassType = {
    name: string;
    id?: number;
    teacher: { name: string; id: number; email: string };
    startTime: number;
    endTime: number;
    zoomLink: string;
    students: Array<{ name: string; id: number; email: string }>;
    days: Array<boolean>;
};
