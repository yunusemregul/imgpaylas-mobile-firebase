import auth from "@react-native-firebase/auth";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import Home from "./components/screens/Home";
import Likes from "./components/screens/Likes";
import Login from "./components/screens/Login";
import Register from "./components/screens/Register";
import Uploads from "./components/screens/Uploads";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
                ? require("./assets/images/icon_home_focused.png")
                : require("./assets/images/icon_home.png");
              break;
            }
            case "likes": {
              icon = focused
                ? require("./assets/images/icon_likes_focused.png")
                : require("./assets/images/icon_likes.png");
              break;
            }
            case "uploads": {
              icon = focused
                ? require("./assets/images/icon_uploads_focused.png")
                : require("./assets/images/icon_uploads.png");
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
      <Tab.Screen name="Uploads" component={Uploads} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (user != null)
      console.log("user with email '" + user.email + "' logged in!");
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user != null ? "Home" : "Login"}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
