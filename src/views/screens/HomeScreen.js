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
import CalendarWidget from "../components/CalendarWidget";
import NewsWidget from "../components/NewsWidget";
import BourseWidget from "../components/BourseWidget";
import CalculatorWidget from "../components/CalculatorWidget";
import ClockWidget from "../components/ClockWidget";
import { Modal, ActivityIndicator } from "react-native-paper";
import AstroWidget from "../components/AstroWidget";
import MeditationWidget from "../components/MeditationWidget";
import { SearchBar } from "@rneui/themed";
import Joke from "../components/Jokes";
import YoutubeWidget from "../components/YoutubeWidget";
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { FlatList } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Image } from 'expo-image';
import ProfileScreen from "./ProfilScreen";
import LoginScreen from "./LoginScreen";
import Constants from 'expo-constants';

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
        function: setDisplayWeather,
      },
      {
        id: 2,
        name: "Calendrier",
        bool: DisplayCalendar,
        component: <CalendarWidget />,
        icon: "calendar",
        function: setDisplayCalendar,
      },
      {
        id: 3,
        name: "Actualités",
        bool: DisplayNews,
        component: <NewsWidget />,
        icon: "newspaper",
        function: setDisplayNews,
      },
      {
        id: 4,
        name: "Bourse",
        bool: DisplayBourse,
        component: <BourseWidget />,
        icon: "currency-eur",
        function: setDisplayBourse,
      },
      {
        id: 5,
        name: "Calculatrice",
        bool: DisplayCalculator,
        component: <CalculatorWidget />,
        icon: "calculator",
        function: setDisplayCalculator,
      },
      {
        id: 6,
        name: "Horloge",
        bool: DisplayClock,
        component: <ClockWidget />,
        icon: "clock-outline",
        function: setDisplayClock,
      },
      {
        id: 7,
        name: "Meditation",
        bool: DisplayMedi,
        component: <MeditationWidget />,
        icon: "meditation",
        function: setDisplayMedi,
      },
      {
        id: 8,
        name: "Astrologie",
        bool: DisplayAstro,
        component: <AstroWidget />,
        icon: "star",
        function: setDisplayAstro,
      },
      {
        id: 9,
        name: "Youtube",
        bool: DisplayYoutube,
        component: <YoutubeWidget />,
        icon: "youtube",
        function: setDisplayYoutube,
      },
      {
        id: 10,
        name: "Joke de papa",
        bool: DisplayJoke,
        component: <Joke />,
        icon: "emoticon-lol-outline",
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

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Group-Authorization": Constants.expoConfig.extra.X_Groupe_key,
      Authorization: "Bearer " + parser.access_token,
    },
  };

  async function GetImg(key) {
    try {
      const res = await fetch(
        "https://masurao.fr/api/employees/" + key + " /image",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Group-Authorization": Constants.expoConfig.extra.X_Groupe_key,
            Authorization: "Bearer " + parser.access_token,
          },
        }
      );
      const blob = await res.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const request = async () => {
    await axios
      .get("https://masurao.fr/api/employees", config)
      .then(async (response) => {
        // setData(response.data);
        const User = [];
        for (let i = 0; i < response.data.length; i++) {
          const img = await GetImg(response.data[i].id);
          User.push({
            id: response.data[i].id,
            name: response.data[i].name,
            surname: response.data[i].surname,
            image: img,
          });
          setData([...User]);
        }
      })
      .catch((error) => {
        console.log("ZEBI CREDENTIALS");
        console.log(error);
      });
  };

  useEffect(() => {
    setLoading(true);
    console.log(Userdetails.id);
    setTimeout(() => {
      request();
      setLoading(false);
    }, 4000);
  }, []);

  function chooseIcon() {
    return OpenWidgetModal ? "close-box" : "application-edit-outline";
  }

  function chooseText() {
    return OpenWidgetModal ? "Fermer" : "Ajouter des Widgets";
  }

  async function fetchImage(key) {
    try {
      for(let i = 0; i < data.length; i++) {
        if (data[i].id == key) {
          setEmployeesDetails((prevState) => ({
            ...prevState,
            image: data[i].image,
          }));
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  const display = (key) => {
    axios
      .get("https://masurao.fr/api/employees/" + key, config)
      .then((response) => {
        let details = response.data;
        setEmployeesDetails(details);
        setShowProfile(true);
      })
      .then(() => fetchImage(key))
      .catch((error) => {
        console.log("PAS TROUVE CREDENTIALS");
        Alert.alert("Error", "User not found");
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: LIGHT.secondaryBackground }}>
      <View style={{ height: "15%", flexDirection: "row", alignItems: "center", marginTop: '5%' }}>
        <Text
          style={{
            fontSize: 30,
            marginLeft: "5%",
            fontWeight: 'bold',
          }}
        >
          Trombinoscope
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
      <UserDisplay visible={ShowProfile} />
        <View style={{ height: "20%" }}>
          <View style={style.searchBar}>
            <SearchBar
              placeholder="Tu veux trouver quelqu'un ?"
              onChangeText={(text) => setSearchText(text)}
              value={searchText}
              inputStyle={style.searchInput}
              containerStyle={style.searchContainer}
              inputContainerStyle={style.searchInputContainer}
              leftIconContainerStyle={style.searchIconContainer}
              rightIconContainerStyle={style.searchIconContainer}
            />
          </View>
          <Text
            style={{
              fontSize: 25,
              marginTop: "10%",
              left: 20,
            }}
          >
            Employés
          </Text>
        </View>
        <FlatList
          data={data}
          numColumns={2}
          snapToInterval={270}
          snapToAlignment={"start"}
          decelerationRate={"fast"}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={{
                ...style.container,
                display:
                  item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                  item.surname.toLowerCase().includes(searchText.toLowerCase())
                    ? 'flex'
                    : 'none',
              }}
              key={item.id}
            >
              <Card style={{ borderRadius: 10, backgroundColor: LIGHT.surfaceVariant, alignItems: 'center' }}>
                <Image
                  style={{ height: 180, width: '100%', borderRadius: 10 }}
                  source={{ uri: item.image }}
                />
                <Text style={{ margin: 10, marginBottom: 0, color: LIGHT.onSurfaceVariant }}>
                  {item.name} {item.surname}
                </Text>
                <Button onPress={() => display(item.id)} title="Profile"
                  height='15%'
                  width="65%"
                  color={LIGHT.secondary}
                  radius={50}
                  textColor={LIGHT.onSecondary}
                  textSize={12}
                />
              </Card>
            </View>
          )}
        />
      <UserDisplay visible={ShowProfile} />
      <ActivityIndicator
        animating={Loading}
        color={LIGHT.primary}
        size="large"
        style={{ position: "absolute", top: "50%", left: "45%" }}
      />
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
