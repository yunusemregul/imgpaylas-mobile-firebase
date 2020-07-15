import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { getDisplayNameFromUID } from "../Datamanager";
import colors from "../styles/colors";

function TopBottomText(props) {
  return (
    <View style={{ alignItems: "center", ...props.style }}>
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
    <View
      style={{
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 15,
        marginBottom: 10,
      }}
    >
      <Image source={require("../assets/images/icon_profile_big.png")} />
      <View
        style={{
          alignItems: "center",
          alignSelf: "center",
          marginLeft: 40,
        }}
      >
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
            alignContent: "center",
            alignSelf: "center",
          }}
        >
          <TopBottomText topText={"1"} bottomText="gönderi" />
          <TopBottomText
            style={{ marginLeft: 30 }}
            topText={"1"}
            bottomText="beğeni"
          />
        </View>
      </View>
    </View>
  );
}
