import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../conts/colors";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { AuthContext } from "../context/AuthContext";

const { COLORS, LIGHT, DARK } = theme;


const AddingWidget = () => {
  const {setOpenWidgetModal} = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
                setOpenWidgetModal(true);
            }}
            style={{
                height: 100,
                width: "110%",
                backgroundColor: COLORS.blue,
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 10,
                borderRadius: 10,
                left: -5,
                top: -15,
            }}
        >
            <Icon name="plus-circle-outline" size={60} color={COLORS.white} />
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.blue,
    height: 150,
    width: 150,
    marginHorizontal: 10,
    marginBottom: 80,
    padding: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.blue,
  },
  weatherText: {
    fontSize: 16,
  },
});

export default AddingWidget;