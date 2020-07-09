import React from 'react'
import { View, Text } from 'react-native'
import style from "../../styles/style";
import auth from "@react-native-firebase/auth";

export default function Home() {
    return (
        <View style={style.container}>
            <Text>Hoş geldin {auth().currentUser.displayName}!</Text>
        </View>
    )
}
