import React from "react";
import { Modal, Text, View, TouchableOpacity, Image } from "react-native";
import style from "../../styles/style";
import colors from "../../styles/colors";

export default function Error(props) {
  return (
    <Modal
      animationType="none"
      visible={props.visible == null ? false : props.visible}
      transparent={true}
    >
      <View style={style.centeredView}>
        <View style={style.outlinedWhiteContainer}>
          <Image
            source={require("../../assets/images/icon_error.png")}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              alignSelf: "center",
              color: colors.primary,
              marginBottom: 10,
              fontSize: 33,
              fontWeight: "bold",
            }}
          >
            Hata!
          </Text>
          <Text
            style={{
              alignSelf: "center",
              color: colors.primary,
              marginBottom: 25,
              marginTop: 15,
            }}
          >
            {props.children}
          </Text>
          <TouchableOpacity
            style={{
              ...style.button,
              marginTop: 9,
              width: 292,
              backgroundColor: colors.negative,
            }}
            activeOpacity={1}
            onPress={props.onClose}
          >
            <Text style={{ color: "white", fontSize: 17 }}>TAMAM</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
