import auth from "@react-native-firebase/auth";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabNavigator from "../navigators/TabNavigator";
import ImageDetails from "../stacks/ImageDetails";
import Login from "../stacks/Login";
import Register from "../stacks/Register";
import Profile from "../tabs/Profile";
import Settings from "../stacks/Settings";

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName={auth().currentUser != null ? "Home" : "Login"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="Settings" component={Settings} />

      <Stack.Screen name="ImageDetails" component={ImageDetails} />
      <Stack.Screen name="ProfileDetails" component={Profile} />
    </Stack.Navigator>
  );
}
