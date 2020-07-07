import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { StyleSheet } from "react-native";
import Login from "./components/stacks/Login";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F5",
    alignItems: "center",
    justifyContent: "center",
  },
  textinput: {
    marginTop: 14,
    color: "#39375B",
    fontSize: 17,
    borderColor: "#39375B",
    width: 245,
    height: 40,
    borderWidth: 2,
    padding: 10,
    borderRadius: 2,
  },
  loginbutton: {
    padding: 8,
    backgroundColor: "#39375B",
    marginTop: 32,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: 40,
  },
  registerbutton: {
    padding: 8,
    backgroundColor: "#E76F51",
    marginTop: 14,
    width: 245,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
    height: 40,
  },
});
