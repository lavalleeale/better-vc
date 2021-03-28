export type BottomTabParamList = {
  Schedule: undefined;
  teacher: undefined;
  Login: undefined;
};

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type ScheduleParamList = {
  ScheduleScreen: undefined;
};

export type TeacherParamList = {
  Dashboard: undefined;
  ManageClasses: undefined;
};
export type ClassType = {
  id: number;
  days: Array<Boolean>;
  name: string;
  startTime: number;
  endTime: number;
  teacher: { name: string; email: string };
  students: Array<{ name: string; email: string }>;
};
