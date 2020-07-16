import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { Image } from "react-native";
import Home from "../tabs/Home";
import Likes from "../tabs/Likes";
import Profile from "../tabs/Profile";

const Tab = createBottomTabNavigator();

// Keşfet, Beğeniler, Yüklenenler sayfalarını kontrol eden navigator
export default function TabNavigator() {
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
                ? require("../../assets/images/icon_home_focused.png")
                : require("../../assets/images/icon_home.png");
              break;
            }
            case "likes": {
              icon = focused
                ? require("../../assets/images/icon_likes_focused.png")
                : require("../../assets/images/icon_likes.png");
              break;
            }
            case "profile": {
              icon = focused
                ? require("../../assets/images/icon_profile_focused.png")
                : require("../../assets/images/icon_profile.png");
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
