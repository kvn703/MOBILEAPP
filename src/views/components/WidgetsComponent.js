import React from "react";
import { Text } from "react-native";
import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "../../conts/colors";

const { COLORS, LIGHT, DARK } = theme;

const WidgetsButton = (item) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: item.bool ? COLORS.green : COLORS.darkBlue,
        height: "7%",
        width: "80%",
        borderRadius: 40,
        marginTop: "5%",
        marginLeft: "10%",
      }}
      onPress={() => {
        item.function(!item.bool);
      }}
    >
      <Icon
        name={item.icon}
        size={30}
        color={COLORS.white}
        style={{
          marginLeft: "5%",
          marginTop: "5%",
          position: "absolute",
        }}
      />
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: COLORS.white,
          marginLeft: "35%",
          marginTop: "7%",
        }}
      >
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default WidgetsButton;
