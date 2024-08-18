import React from "react";
import { View, StyleSheet, useWindowDimensions, Text } from "react-native";
import theme from "../../conts/colors";
import { ActivityIndicator } from "react-native";

const { COLORS, LIGHT, DARK } = theme;

const Loader = ({visible = false}) => {
    const {height, width} = useWindowDimensions();
    return (
        visible && (
            <View style={[style.container, {height, width}]}>
                <View style={style.loader}>
                    <ActivityIndicator size="large" color={COLORS.blue} />
                    <Text style={{marginRight: 10, fontSize: 16}}>Loading...</Text>
                </View>
            </View>
        )
    );
};
const style = StyleSheet.create({
    container: {
        position: "absolute",
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
    },
    loader: {
        height: 100,
        backgroundColor: COLORS.white,
        marginHorizontal: 50,
        bordelRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
    },
});

export default Loader;
