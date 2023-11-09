import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainStack from "./MainStack";
import Profile from "../pages/Profile";
import { StatusBar } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function MainTab() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 18,
        },
        tabBarActiveTintColor: "black",
      }}
    >
      <Tab.Screen
        name="findjob"
        component={MainStack}
        options={{
          title: "Find Jobs",
          tabBarIcon: ({ color , focused }) => (
            <Ionicons
              name="compass"
              size={25}
              color={focused ? "#6A12D8" : "gray"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
            title: "Profile",
            tabBarIcon: ({ color , focused }) => (
              <AntDesign
                name="user"
                size={25}
                color={focused ? "#6A12D8" : "gray"}
              />
            ),
          }}
      />
    </Tab.Navigator>
  );
}
