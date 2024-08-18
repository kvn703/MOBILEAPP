import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import theme from "../../conts/colors";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const { COLORS, LIGHT, DARK } = theme;

const Joke = () => {
  const [jokeData, setJokeData] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);

  function getJoke() {
    setShowAnswer(false);
    axios
      .get("https://blague.xyz/api/joke/random")
      .then((response) => {
        setJokeData(response.data.joke);
      })
      .catch((error) => {
        console.error("Error fetching astrological data: ", error);
      });
  }

  useEffect(() => {
    getJoke();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        getJoke();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.widgetTitle}>Joke de Papa</Text>
        <TouchableOpacity
          onPress={() => {
            setShowAnswer(!showAnswer);
          }}
        >
          <Text style={styles.astroSign}>
            {showAnswer ? jokeData.answer : jokeData.question}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT.surfaceVariant,
    height: 150,
    width: "95%",
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    textAlign: "center",
  },
  astroContainer: {},
  astroSign: {
    fontSize: 18,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    top: 10,
    textAlign: "center",
  },
  astroText: {
    fontSize: 16,
    fontFamily: "Arial",
    fontWeight: "bold",
    color: LIGHT.onSurfaceVariant,
    textAlign: "center",
  },
});

export default Joke;
