import React from "react";
import { Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import colors from "../../styles/colors";
import style from "../../styles/style";
import ProgressBar from "../ProgressBar";

// Kullanıcı bir fotoğraf yüklerken ne kadarı yüklendiğini vs. gösteren komponent
export default function Uploading(props) {
  return (
    <Modal
      animationType="none"
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
            {props.progress == 100 ? "Yüklendi!" : "Yükleniyor..."}
          </Text>
          <ProgressBar progress={props.progress} />
          <TouchableOpacity
            style={
              props.progress == 100 ? style.okaybutton : style.cancelbutton
            }
            activeOpacity={1}
            onPress={props.progress == 100 ? props.onClose : props.onCancel}
          >
            <Text style={{ color: "white", fontSize: 17 }}>
              {props.progress == 100 ? "KAPAT" : "İPTAL"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar hidden={true} />
    </Modal>
  );
}
