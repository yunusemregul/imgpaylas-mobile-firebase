import React, { useState } from "react";
import { Modal, View, Text } from "react-native";
import style from "../../styles/style";
import colors from "../../styles/colors";
import ProgressBar from "../ProgressBar";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Uploading(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.visible == null ? false : props.visible}
      transparent={true}
    >
      <View style={style.centeredView}>
        <View style={style.outlinedWhiteContainer}>
          <Text
            style={{
              alignSelf: "center",
              color: colors.primary,
              marginBottom: 10,
            }}
          >
            Yükleniyor...
          </Text>
          <ProgressBar progress={props.progress} />
          <TouchableOpacity style={props.progress==100 ? style.okaybutton : style.cancelbutton} activeOpacity={1}>
            <Text style={{ color: "white", fontSize: 17 }}>{props.progress==100 ? "KAPAT" : "İPTAL"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
