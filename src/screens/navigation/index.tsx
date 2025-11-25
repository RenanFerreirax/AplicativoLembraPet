// src/navigation/index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "../login/LoginScreen";
import RegisterScreen from "../Register/RegisterScreen";
import MainTabs from "./tabs";
import CreateReminderScreen from "../Reminder/CreateReminderScreen";
import EditReminderScreen from "../Reminder/EditReminderScreen";

import { useAuth } from "../contexts/AuthContext";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen name="CreateReminder" component={CreateReminderScreen} />
            <Stack.Screen name="EditReminder" component={EditReminderScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
