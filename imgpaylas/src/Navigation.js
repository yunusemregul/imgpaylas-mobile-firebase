import auth from "@react-native-firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Image } from "react-native";
import ImageDetails from "./screens/stacks/ImageDetails";
import Login from "./screens/stacks/Login";
import Register from "./screens/stacks/Register";
import Settings from "./screens/stacks/Settings";
import Home from "./screens/tabs/Home";
import Likes from "./screens/tabs/Likes";
import Profile from "./screens/tabs/Profile";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let routeName = route.name.toLowerCase();
          let icon;

          /* 
                Böyle yapılması gerekmesi çok kötü
                https://reactnative.dev/docs/images
              */
          switch (routeName) {
            case "home": {
              icon = focused
                ? require("../assets/images/icon_home_focused.png")
                : require("../assets/images/icon_home.png");
              break;
            }
            case "likes": {
              icon = focused
                ? require("../assets/images/icon_likes_focused.png")
                : require("../assets/images/icon_likes.png");
              break;
            }
            case "profile": {
              icon = focused
                ? require("../assets/images/icon_profile_focused.png")
                : require("../assets/images/icon_profile.png");
              break;
            }
          }

          return <Image source={icon} style={{ width: 36, height: 36 }} />;
        },
      })}
      tabBarOptions={{ showLabel: false }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Likes" component={Likes} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
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
    </NavigationContainer>
  );
}
