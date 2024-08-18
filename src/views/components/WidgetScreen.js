import React from "react";
import { View, Text, StyleSheet } from "react-native";
import WeatherWidget from "../components/WeatherWidget";
import CalendarWidget from "../components/CalendarWidget"; // Assuming you have a CalendarWidget component

const WidgetScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Widgets</Text>
      <View style={styles.widgetContainer}>
        <WeatherWidget />
        <CalendarWidget />
        {/* Add more widgets as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  widgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 100,
    width: "100%",
  },
});

export default WidgetScreen;
