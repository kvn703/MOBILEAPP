import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import theme from "../../conts/colors";
import { AuthContext } from "../context/AuthContext";

const { COLORS, LIGHT, DARK } = theme;

const AstroWidget = () => {
  const { Userdetails } = useContext(AuthContext);
  const [astroData, setAstroData] = useState(null);

  useEffect(() => {
    const apiUrl =
      "https://raw.githubusercontent.com/kayoo123/astroo-api/main/docs/jour.json";
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setAstroData(data);
      })
      .catch((error) => {
        console.error("Error fetching astrological data: ", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.widgetTitle}>Ton Horoscope du jour</Text>
      {astroData ? (
        <ScrollView style={styles.astroContainer} nestedScrollEnabled={true}>
          <Text style={styles.astroSign}>{astroData.signe}</Text>
          <Text style={styles.astroText}>
            {Userdetails.astro_sign ? (
              Userdetails.astro_sign === "belier" ? (
                astroData.belier
              ) : Userdetails.astro_sign === "taureau" ? (
                astroData.taureau
              ) : Userdetails.astro_sign === "gemeaux" ? (
                astroData.gemeaux
              ) : Userdetails.astro_sign === "cancer" ? (
                astroData.cancer
              ) : Userdetails.astro_sign === "lion" ? (
                astroData.lion
              ) : Userdetails.astro_sign === "vierge" ? (
                astroData.vierge
              ) : Userdetails.astro_sign === "balance" ? (
                astroData.balance
              ) : Userdetails.astro_sign === "scorpion" ? (
                astroData.scorpion
              ) : Userdetails.astro_sign === "sagittaire" ? (
                astroData.sagittaire
              ) : Userdetails.astro_sign === "capricorne" ? (
                astroData.capricorne
              ) : Userdetails.astro_sign === "verseau" ? (
                astroData.verseau
              ) : Userdetails.astro_sign === "poissons" ? (
                astroData.poissons
              ) : null
            ) : null}
          </Text>
        </ScrollView>
      ) : (
        <Text>Loading astrological data...</Text>
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
    marginBottom: 20,
    padding: 20,
    borderRadius: 20,
  },
  widgetTitle: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 10,
    textAlign: "center",
  },
  astroContainer: {
  },
  astroSign: {
    fontSize: 16,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginBottom: 10,
  },
  astroText: {
    fontSize: 16,
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    textAlign: "center",
  },
});

export default AstroWidget;
