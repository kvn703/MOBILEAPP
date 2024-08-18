import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { COLORS, LIGHT, DARK } = theme;

const MeditationWidget = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [currentDate, setCurrentDate] = useState("");

  const fetchQuote = async () => {
    try {
      const apiUrl = "https://zenquotes.io/api/today";
      const response = await fetch(apiUrl);

      if (response.ok) {
        const data = await response.json();
        if (data[0] && data[0].q && data[0].a) {
          setQuoteData(data[0]);
        }
      } else {
        console.error("Error fetching quote of the day");
      }
    } catch (error) {
      console.error("Error fetching quote of the day: ", error);
    }
  };

  const getCurrentDate = () => {
    const date = new Date();
    const options = { year: "numeric", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    fetchQuote();
    setCurrentDate(getCurrentDate());
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.widgetTitle}>Citation du Jour</Text>
      {quoteData ? (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteDate}>{currentDate}</Text>
          <Text style={styles.zenQuoteText}>"{quoteData.q}"</Text>
          <Text style={styles.quoteAuthor}>— {quoteData.a}</Text>
        </View>
      ) : (
        <Text>Loading quote of the day...</Text>
      )}
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
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 10,
  },
  quoteContainer: {
    alignItems: "center",
  },
  quoteDate: {
    fontSize: 16,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 10,
  },
  zenQuoteText: {
    fontSize: 16,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 16,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
});

export default MeditationWidget;
