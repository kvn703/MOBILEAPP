import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import axios from "axios";
import theme from "../../conts/colors";
import Constants from 'expo-constants';

const { COLORS, LIGHT, DARK } = theme;

const BourseWidget = () => {
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const apiKey = Constants.expoConfig.extra.BOURSE_API_KEY;
    const symbol = "AAPL";
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        const timeSeries = data["Time Series (5min)"];
        const lastRefreshed = Object.keys(timeSeries)[0];
        const latestData = timeSeries[lastRefreshed];

        setStockData({
          symbol: symbol,
          price: parseFloat(latestData["4. close"]),
          change: parseFloat(latestData["4. close"]) - parseFloat(timeSeries[Object.keys(timeSeries)[1]]["4. close"]),
        });
      })
      .catch((error) => {
        console.error("Error fetching stock data: ", error);
        setStockData(null);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.stockSymbol}>{stockData ? stockData.symbol : "Chargement..."}</Text>
      <Text style={styles.stockPrice}>
        {stockData ? `$${stockData.price.toFixed(2)}` : "Chargement..."}
      </Text>
      <Text style={styles.stockChange}>
        {stockData ? `Change: ${stockData.change.toFixed(2)}` : "Chargement..."}
      </Text>
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
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  stockSymbol: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
  stockPrice: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
  stockChange: {
    fontSize: 15,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
  },
});

export default BourseWidget;
