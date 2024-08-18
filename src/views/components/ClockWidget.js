import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { COLORS, LIGHT, DARK } = theme;


const ClockWidget = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Icon name="clock" size={50} color={LIGHT.onSurfaceVariant} />
      <Text style={styles.clockText}>{formatTime(currentTime)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT.surfaceVariant,
    height: 150,
    width: "95%",
    marginHorizontal: 10,
    marginBottom: 80,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  clockText: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
});

export default ClockWidget;
