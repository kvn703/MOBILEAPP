import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  useWindowDimensions
} from "react-native";
import { Drawer } from "react-native-paper";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "../components/Button";
import UserDisplay from "../components/UserDisplay";
import theme from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import WeatherWidget from "../components/WeatherWidget";
import Loader from "../components/Loader";
import { Image } from 'expo-image';
import CalendarWidget from "../components/CalendarWidget";
import NewsWidget from "../components/NewsWidget";
import BourseWidget from "../components/BourseWidget";
import CalculatorWidget from "../components/CalculatorWidget";
import ClockWidget from "../components/ClockWidget";
import YoutubeWidget from "../components/YoutubeWidget";
import Joke from "../components/Jokes";
import { Modal } from "react-native-paper";
import AstroWidget from "../components/AstroWidget";
import MeditationWidget from "../components/MeditationWidget";
import { SearchBar } from "@rneui/themed";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { FlatList } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ProfileScreen from "./ProfilScreen";
import LoginScreen from "./LoginScreen";

const { COLORS, LIGHT, DARK } = theme;

const HomeScreen = ({ navigation }) => {
  const { userInfo } = useContext(AuthContext);
  const { ShowProfile, setShowProfile } = useContext(AuthContext);
  const { Userdetails } = useContext(AuthContext);
  const { EmployeesDetails, setEmployeesDetails } = useContext(AuthContext);
  const { OpenWidgetModal, setOpenWidgetModal } = useContext(AuthContext);
  const parser = JSON.parse(userInfo);
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const Tab = createMaterialBottomTabNavigator();
  const {DisplayWeather, setDisplayWeather} = useContext(AuthContext);
  const {DisplayCalendar, setDisplayCalendar} = useContext(AuthContext);
  const {DisplayNews, setDisplayNews} = useContext(AuthContext);
  const {DisplayBourse, setDisplayBourse} = useContext(AuthContext);
  const {DisplayCalculator, setDisplayCalculator} = useContext(AuthContext);
  const {DisplayClock, setDisplayClock} = useContext(AuthContext);
  const {DisplayMedi, setDisplayMedi} = useContext(AuthContext);
  const {DisplayAstro, setDisplayAstro} = useContext(AuthContext);
  const {DisplayYoutube, setDisplayYoutube} = useContext(AuthContext);
  const {DisplayJoke, setDisplayJoke} = useContext(AuthContext);
  const [WidgetArray, setWidgetArray] = useState([]);

  const {width, height} = useWindowDimensions();

  useEffect(() => {
    setWidgetArray([
      {
        id: 1,
        name: "Méteo",
        bool: DisplayWeather,
        component: <WeatherWidget />,
        icon: "weather-sunny",
        size: 175,
        function: setDisplayWeather,
      },
      {
        id: 2,
        name: "Calendrier",
        bool: DisplayCalendar,
        component: <CalendarWidget />,
        icon: "calendar",
        size: 175,
        function: setDisplayCalendar,
      },
      {
        id: 3,
        name: "Actualités",
        bool: DisplayNews,
        component: <NewsWidget />,
        icon: "newspaper",
        size: 225,
        function: setDisplayNews,
      },
      {
        id: 4,
        name: "Bourse",
        bool: DisplayBourse,
        component: <BourseWidget />,
        icon: "currency-eur",
        size: 175,
        function: setDisplayBourse,
      },
      {
        id: 5,
        name: "Calculatrice",
        bool: DisplayCalculator,
        component: <CalculatorWidget />,
        icon: "calculator",
        size: 225,
        function: setDisplayCalculator,
      },
      {
        id: 6,
        name: "Horloge",
        bool: DisplayClock,
        component: <ClockWidget />,
        icon: "clock-outline",
        size: 175,
        function: setDisplayClock,
      },
      {
        id: 7,
        name: "Meditation",
        bool: DisplayMedi,
        component: <MeditationWidget />,
        icon: "meditation",
        size: 175,
        function: setDisplayMedi,
      },
      {
        id: 8,
        name: "Astrologie",
        bool: DisplayAstro,
        component: <AstroWidget />,
        icon: "star",
        size: 175,
        function: setDisplayAstro,
      },
      {
        id: 9,
        name: "Youtube",
        bool: DisplayYoutube,
        component: <YoutubeWidget />,
        icon: "youtube",
        size: 175,
        function: setDisplayYoutube,
      },
      {
        id: 10,
        name: "Joke de papa",
        bool: DisplayJoke,
        component: <Joke />,
        icon: "emoticon-lol-outline",
        size: 175,
        function: setDisplayJoke,
      },
    ]);
  }, [
    DisplayWeather,
    DisplayCalendar,
    DisplayNews,
    DisplayBourse,
    DisplayCalculator,
    DisplayClock,
    DisplayMedi,
    DisplayAstro,
    DisplayYoutube,
    DisplayJoke,
  ]);

  function chooseIcon() {
    return OpenWidgetModal ? "close-box" : "plus-box";
  }

  function chooseText() {
    return OpenWidgetModal ? "" : "Liste widgets";
  }

  return (
    <View style={{ flex: 1, backgroundColor: LIGHT.secondaryBackground }}>
      <Loader visible={Loading} />
      <View style={{ height: "15%", flexDirection: "row", alignItems: "center", marginTop: '5%' }}>
        <Text
          style={{
            fontSize: 30,
            marginLeft: "5%",
            fontWeight: 'bold',
          }}
        >
          Widget
        </Text>
        <TouchableOpacity
          style={{
            marginLeft: "auto",
            marginRight: 20,
            borderColor: LIGHT.primary,
            borderWidth: 3,
            borderRadius: 30,
          }}
          onPress={() => navigation.navigate("ProfilScreen")}
        >
          <Image
            source={{ uri: Userdetails.image }}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
      </View>
            <FlatList
              data={WidgetArray}
              numColumns={1}
              renderItem={({ item }) => (
                <View style={{ height: item.size, width: "100%", display: item.bool ? 'flex' : 'none' }}>
                  {item.bool ? item.component : null}
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
      <Modal animationType="slide" visible={OpenWidgetModal} transparent={true}>
        <Drawer.Section
          title="Widgets"
          style={{
            backgroundColor: LIGHT.secondaryBackground,
            height: "100%",
            width: "70%",
            marginLeft: "30%",
            borderRadius: 20,
          }}
          showDivider={false}
        >
          <View style={{height: "5%", width: "20%"}}></View>
          {WidgetArray.map((item) => (
            <TouchableOpacity
              style={{
                backgroundColor: item.bool ? LIGHT.tertiaryContainer : LIGHT.secondary,
                height: "6.5%",
                width: "80%",
                borderRadius: 40,
                marginTop: "5%",
                marginLeft: "10%",
              }}
              onPress={() => {
                item.function(!item.bool);
              }}
            >
              <Icon
                name={item.icon}
                size={30}
                color={COLORS.white}
                style={{
                  marginLeft: "5%",
                  marginTop: "5%",
                  position: "absolute",
                }}
              />
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.white,
                  marginLeft: "35%",
                  marginTop: "7%",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </Drawer.Section>
      </Modal>
      <View
        style={{
          height: "10%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
        <Drawer.Item
          style={{
            backgroundColor: OpenWidgetModal
              ? COLORS.redmaroon
              : LIGHT.secondary,
            height: "60%",
            width: "90%",
            marginRight: "40%",
            marginBottom: "5%",
            bottom: OpenWidgetModal ? "810%" : "0%",
            borderRadius: 50,
          }}
          icon={chooseIcon()}

          onPress={() =>
            OpenWidgetModal
              ? setOpenWidgetModal(false)
              : setOpenWidgetModal(true)
          }
          label={chooseText()}
          theme={{ colors: { primary: COLORS.white } }}
        />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 270,
    width: '50%',
  },
  name: {
    fontSize: 40,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    marginTop: 30,
  },
  surname: {
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
  },
  container_profil: {
    backgroundColor: COLORS.white,
    height: 150,
    width: 150,
    margin: 100,
    right: 100,
    padding: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.blue,
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  widget: {
    backgroundColor: COLORS.white,
    height: 150,
    width: 170,
    marginHorizontal: 10,
    padding: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.blue,
  },
  Modal: {
    backgroundColor: COLORS.white,
    height: "75%",
    width: "90%",
    marginHorizontal: "5%",
    padding: 10,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: COLORS.blue,
  },
  searchBar: {
    backgroundColor: LIGHT.tertiaryContainer,
    borderRadius: 50,
    marginHorizontal: "5%",
  },
  searchInput: {
    color: LIGHT.onTertiaryContainer,
  },
  searchContainer: {
    backgroundColor: "transparent",
    borderWidth: 0,
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchInputContainer: {
    backgroundColor: LIGHT.tertiaryContainer,
    borderRadius: 20,
  },
  searchIconContainer: {
    backgroundColor: "transparent",
  }
});

export default HomeScreen;
