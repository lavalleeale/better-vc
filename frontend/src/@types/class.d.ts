export type ClassType = {
  name: string;
  teacher: Record<string, string>;
  startTime: number;
  endTime: number;
  zoomLink: string;
  classroomLink;
  students: Array<{ name: string; email: string }>;
  days: Array<boolean>;
};
