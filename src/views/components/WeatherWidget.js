import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import theme from "../../conts/colors";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Constants from 'expo-constants';
import * as Location from "expo-location";

const { COLORS, LIGHT, DARK } = theme;

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync();
        const apiKey = Constants.expoConfig.extra.WEATHER_API_KEY;
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;
        const language = "fr";
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=${language}`;

        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
        setWeatherData(null);
      }
    };

    fetchData();
  }, []);

  let weatherIconName = "weather-cloudy";

  if (weatherData && weatherData.weather && weatherData.weather.length > 0) {
    const weatherCondition = weatherData.weather[0].main.toLowerCase();
    const iconMap = {
      rain: "weather-rainy",
      snow: "weather-snowy",
      thunderstorm: "weather-lightning",
      clear: "weather-sunny",
      clouds: "weather-cloudy",
    };

    if (iconMap[weatherCondition]) {
      weatherIconName = iconMap[weatherCondition];
    }
  }

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={weatherIconName}
        size={50}
        color={LIGHT.primary}
        style={styles.weatherIcon}
      />
      <Text style={styles.weatherText}>
        {weatherData ? `${weatherData.main.temp}°C` : "Chargement..."}
      </Text>
      <Text style={styles.weatherText}>
        {weatherData ? weatherData.weather[0].description : "Chargement..."}
      </Text>
      <Text style={styles.cityname}>
        {weatherData ? weatherData.name : "Chargement..."}
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
    padding: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  weatherIcon: {
    marginBottom: 10,
    bottom:-40
  },
  weatherText: {
    fontSize: 13,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginLeft: '80%',
    bottom:20
  },
  cityname: {
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "Arial",
    color: LIGHT.onSurfaceVariant,
    marginRight: '80%',
    bottom:55
  }
});

export default WeatherWidget;
