import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../../conts/colors";

const { COLORS, LIGHT, DARK } = theme;

const Button = ({ 
  title,
  height,
  width,
  color,
  radius,
  textColor,
  textSize,
  onPress = () => {}
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        height: height,
        width: width,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
        borderRadius: radius,
      }}
    >
      <Text style={{ color: textColor, fontSize: textSize }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
