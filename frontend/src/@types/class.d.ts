export type ClassType = {
  name: string;
  teacher: { name: string };
  startTime: string;
  endTime: string;
  zoomLink: string;
  classroomLink;
  students: Array<{ name: string }>;
};
