import React from "react";
import { View, FlatList } from "react-native";
import ImageBox from "./ImageBox";

// Component that lists all the images thats given by props
export default function ImageList(props) {
  if (Object.keys(props.data) == 0) {
    return null;
  }

  return (
    <FlatList
      data={Object.keys(props.data)}
      renderItem={({ item }) => {
        return <ImageBox key={item} id={item} data={props.data[item]} />;
      }}
      numColumns={3}
      keyExtractor={(item) => item}
      style={{ alignSelf: "center", paddingTop: 8 }}
    />
  );
}
