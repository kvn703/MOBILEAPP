import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import theme from "../../conts/colors";

const { COLORS, LIGHT, DARK } = theme;

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  inputText,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? LIGHT.error
              : isFocused
              ? LIGHT.primary
              : LIGHT.outline,
            borderWidth: isFocused ? 2 : 0.5,
          },
          {
            flexDirection: "row",
          }
        ]}
      >
        <Text
          style={[
            style.label,
            (isFocused || inputText) && style.focusedLabel,
          ]}
        >
          {label}
        </Text>
        <TextInput
          secureTextEntry={!showPassword && password}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          style={[style.input, isFocused && style.focusedInput]}
          {...props}
        />
        {password && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={style.passwordToggle}>
              {showPassword ? "Masquer" : "Afficher"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {error && (
        <Text style={{ color: COLORS.red, fontSize: 12, marginTop: 7 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderColor: COLORS.light,
    borderWidth: 1,
    borderRadius: 4,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: LIGHT.onBackground,
    padding: 0,
  },
  focusedInput: {
    borderColor: COLORS.blue,
  },
  label: {
    fontSize: 16,
    color: LIGHT.outline,
    marginLeft: 16,
    position: "absolute",
  },
  focusedLabel: {
    position: "absolute",
    top: -12,
    left: 16,
    fontSize: 12,
    backgroundColor: LIGHT.background,
    paddingHorizontal: 4,
  },
  passwordToggle: {
    fontSize: 16,
    color: LIGHT.primary,
    paddingHorizontal: 10,
    alignSelf: "center",
  },
});

export default Input;
