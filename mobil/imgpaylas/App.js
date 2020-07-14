import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { Image } from "react-native";
import Login from "./components/stacks/Login";
import Register from "./components/stacks/Register";
import Home from "./components/tabs/Home";
import Likes from "./components/tabs/Likes";
import Profile from "./components/tabs/Profile";
import ImageDetails from "./components/stacks/ImageDetails";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// TODO: Çıkış yapma sayfası, profil sayfası

// Keşfet, Beğeniler, Yüklenenler sayfalarını kontrol eden navigator
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
            case "profile": {
              icon = focused
                ? require("./assets/images/icon_profile_focused.png")
                : require("./assets/images/icon_profile.png");
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

export default function App() {
  const [user, setUser] = useState();
  const [initializing, setInitializing] = useState(true);

  // kullanıcı bilgileri değiştiğinde (giriş/çıkış)
  function onAuthStateChanged(user) {
    setUser(user);
    if (user != null) {
      console.log(user);
      firestore()
        .collection("users")
        .doc(auth().currentUser.uid)
        .update({ displayName: auth().currentUser.displayName });
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
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
        <Stack.Screen name="ImageDetails" component={ImageDetails} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
