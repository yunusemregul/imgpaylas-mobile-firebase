import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";
import { getDisplayNameFromUID } from "../Datamanager";
import colors from "../styles/colors";

function TopBottomText(props) {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: colors.primary, fontSize: 25 }}>
        {props.topText}
      </Text>
      <Text style={{ color: colors.primary, fontSize: 17 }}>
        {props.bottomText}
      </Text>
    </View>
  );
}

export default function ProfileDetails({ data }) {
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    getDisplayNameFromUID(data.uid).then((name) => {
      setDisplayName(name);
    });
    return () => {};
  }, []);

  return (
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <Image source={require("../assets/images/icon_profile_big.png")} />
      <View style={{ alignItems: "center" }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: colors.primary,
          }}
        >
          {displayName}
        </Text>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <TopBottomText topText={"1"} bottomText="gönderi" />
          <TopBottomText topText={"1"} bottomText="gönderi" />
        </View>
      </View>
    </View>
  );
}
