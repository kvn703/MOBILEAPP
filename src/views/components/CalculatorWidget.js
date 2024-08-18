import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../conts/colors";

const { COLORS, LIGHT, DARK } = theme;

const CalculatorWidget = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleButtonPress = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input).toString());
      } catch (error) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else {
      setInput(input + value);
    }
  };

  const renderButton = (value) => (
    <TouchableOpacity
      key={value}
      style={styles.button}
      onPress={() => handleButtonPress(value)}
    >
      <Text style={styles.buttonText}>{value}</Text>
    </TouchableOpacity>
  );

  const buttonRows = [
    ["7", "8", "9", "+"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "*"],
    ["C", "0", "=", "/"],
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.resultText}>{result}</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>{input}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        {buttonRows.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {row.map((value) => renderButton(value))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT.surfaceVariant,
    height: 200,
    width: "95%",
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 8,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderColor: LIGHT.secondary,
    marginBottom: 8,
  },
  inputText: {
    fontSize: 16,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
  buttonsContainer: {
    flex: 1,
  },
  buttonRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: LIGHT.secondary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: COLORS.white,
  },
});

export default CalculatorWidget;
