import React from "react";
import { FlatList } from "react-native";
import ImageBox from "./ImageBox";

export default function ImageList(props) {
  return (
    <FlatList
      data={Object.keys(props.data)}
      renderItem={({ item }) => {
        return (
          <ImageBox
            onChange={props.onChange}
            key={item}
            id={item}
            data={props.data[item]}
          />
        );
      }}
      numColumns={3}
      keyExtractor={(item) => item}
      style={{ alignSelf: "center", marginTop: 8 }}
    />
  );
}
