import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import * as React from "react";
import { Appearance } from "react-native";
import Colors from "../constants/Colors";
import ScheduleScreen from "../screens/ScheduleScreen";
import DashboardScreen from "../screens/DashboardScreen";
import LoginScreen from "../screens/LoginScreen";
import {
  BottomTabParamList,
  ScheduleParamList,
  TeacherParamList,
} from "../types";
import ManageClassesScreen from "../screens/ManageClassesScreen";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = Appearance.getColorScheme();
  const [teacher, setTeacher] = React.useState(false);
  React.useEffect(() => {
    AsyncStorage.getItem("teacher").then((data) => {
      if (data) setTeacher(true);
    });
  });

  return (
    <BottomTab.Navigator
      initialRouteName="Login"
      tabBarOptions={{ activeTintColor: Colors[colorScheme || "light"].tint }}
    >
      <BottomTab.Screen
        name="Schedule"
        component={ScheduleNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar-outline" color={color} />
          ),
        }}
      />
      {teacher && (
        <BottomTab.Screen
          name="teacher"
          component={DashboardNavigator}
          options={{
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="ios-code" color={color} />
            ),
          }}
        />
      )}
      <BottomTab.Screen
        name="Login"
        component={LoginNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
          tabBarVisible: false,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ScheduleStack = createStackNavigator<ScheduleParamList>();

function ScheduleNavigator() {
  return (
    <ScheduleStack.Navigator>
      <ScheduleStack.Screen
        name="ScheduleScreen"
        component={ScheduleScreen}
        options={{ headerTitle: "Schedule" }}
      />
    </ScheduleStack.Navigator>
  );
}

function LoginNavigator({
  navigation,
}: {
  navigation: StackNavigationProp<BottomTabParamList, "Login">;
}) {
  return (
    <LoginScreen
      finish={() => {
        navigation.navigate("Schedule");
      }}
    />
  );
}

const TeacherStack = createStackNavigator<TeacherParamList>();

function DashboardNavigator() {
  return (
    <TeacherStack.Navigator>
      <TeacherStack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ headerTitle: "Dashboard" }}
      />
      <TeacherStack.Screen
        name="ManageClasses"
        component={ManageClassesScreen}
        options={{ headerTitle: "Manage Classes" }}
      />
    </TeacherStack.Navigator>
  );
}
