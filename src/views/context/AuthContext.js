import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { createContext } from "react";
import { useState } from "react";
import { Alert } from "react-native";
import Constants from 'expo-constants';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, SetIsLoading] = useState(false);
  let userdata = {};
  const navigation = useNavigation();
  const [ShowProfile, setShowProfile] = useState(false);
  const [Userdetails, setUserDetails] = useState({});
  const [EmployeesDetails, setEmployeesDetails] = useState({});
  const [OpenWidgetModal, setOpenWidgetModal] = useState(false);

  const [DisplayWeather, setDisplayWeather] = useState(false);
  const [DisplayCalendar, setDisplayCalendar] = useState(false);
  const [DisplayNews, setDisplayNews] = useState(false);
  const [DisplayBourse, setDisplayBourse] = useState(false);
  const [DisplayCalculator, setDisplayCalculator] = useState(false);
  const [DisplayClock, setDisplayClock] = useState(false);
  const [DisplayMedi, setDisplayMedi] = useState(false);
  const [DisplayAstro, setDisplayAstro] = useState(false);
  const [DisplayYoutube, setDisplayYoutube] = useState(false);
  const [DisplayJoke, setDisplayJoke] = useState(false);


  async function fetchImage(key) {
    try {
      const res = await fetch(
        "https://masurao.fr/api/employees/" + key + " /image",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Group-Authorization": Constants.expoConfig.extra.X_Groupe_key,
            Authorization: "Bearer " + userInfo.access_token,
          },
        }
      );
      const blob = await res.blob();
  
      const base64data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      setUserDetails((prevState) => ({
        ...prevState,
        image: base64data,
      }));
    } catch (err) {
      console.log(err);
    }
  }
  

  const Login = (email, password) => {
    SetIsLoading(true);
    const data = {
      email: email,
      password: password,
    };

    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Group-Authorization": Constants.expoConfig.extra.X_Groupe_key,
      },
    };

    function getAstroSign(birthdate) {
      const date = new Date(birthdate);
      const day = date.getDate();
      const month = date.getMonth() + 1;

      if ((month == 1 && day <= 20) && (month == 12 && day >= 22)) {
        return "capricorne";
      } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
        return "verseau";
      } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "poissons";
      } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
        return "belier";
      } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
        return "taureau";
      } else if ((month == 5 && day >= 21) || (month == 6 && day <= 21)) {
        return "gemeaux";
      } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
        return "cancer";
      } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        return "lion";
      } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        return "vierge";
      } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        return "balance";
      } else if ((month == 10 && day >= 23) || (month == 11 && day <= 22)) {
        return "scorpion";
      } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
        return "sagittaire";
      }
    };

    axios
      .post("https://masurao.fr/api/employees/login", data, config)
      .then((response) => {
        let userInfo = response.data;
        setUserInfo(JSON.stringify(userInfo));
        const config_user = {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Group-Authorization": Constants.expoConfig.extra.X_Groupe_key,
            "Authorization": "Bearer " + userInfo.access_token,
          },
        };
        axios.get("https://masurao.fr/api/employees/me", config_user)
          .then((response) => {
            let user = response.data;
            let AstroSign = getAstroSign(user.birth_date);
            setUserDetails({
              ...user,
              astro_sign: AstroSign,
            });
            console.log(user);
            userdata = user;
          }).then(() => {
            fetchImage(userdata.id);
          })
          .catch((error) => {
            console.log("ERROR /me CREDENTIALS");
            console.log(error);
          });
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        navigation.navigate("HomeTabs");
        SetIsLoading(false);
      })
      .catch((error) => {
        console.log("INVLAID CREDENTIALS");
        Alert.alert("Invalid Credentials", "Please try again",);
        SetIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        Login,
        ShowProfile,
        setShowProfile,
        Userdetails,
        EmployeesDetails,
        setEmployeesDetails,
        OpenWidgetModal,
        setOpenWidgetModal,
        DisplayWeather,
        setDisplayWeather,
        DisplayCalendar,
        setDisplayCalendar,
        DisplayNews,
        setDisplayNews,
        DisplayBourse,
        setDisplayBourse,
        DisplayCalculator,
        setDisplayCalculator,
        DisplayClock,
        setDisplayClock,
        DisplayMedi,
        setDisplayMedi,
        DisplayAstro,
        setDisplayAstro,
        DisplayYoutube,
        setDisplayYoutube,
        DisplayJoke,
        setDisplayJoke,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
