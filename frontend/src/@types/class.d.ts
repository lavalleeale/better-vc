export type ClassType = {
  name: string;
  teacher: Record<string, string>;
  startTime: string;
  endTime: string;
  zoomLink: string;
  classroomLink;
  students: Array<{ name: string }>;
  days: {
    Sunday: boolean;
    Monday: boolean;
    Tuesday: boolean;
    Wednesday: boolean;
    Thursday: boolean;
    Friday: boolean;
    Saturday: boolean;
  };
};
