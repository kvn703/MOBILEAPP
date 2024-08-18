import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/views/screens/LoginScreen";
import RegistrationScreen from "./src/views/screens/RegistrationScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import ProfilScreen from "./src/views/screens/ProfilScreen";
import WidgetScreen from "./src/views/screens/WidgetScreen";
import ChatScreen from "./src/views/screens/ChatScreen";
import YoutubeWidget from "./src/views/components/YoutubeWidget";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AuthProvider } from "./src/views/context/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import theme from "./src/conts/colors";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const { COLORS, LIGHT, DARK } = theme;

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: LIGHT.background },
        tabBarActiveTintColor: LIGHT.primary,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Accueil") {
            iconName = "home";
          } else if (route.name === "Widget") {
            iconName = "widgets";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Widget" component={WidgetScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen
          name='RegistrationScreen'
          component={RegistrationScreen}
        /> */}
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeTabs" component={HomeTabs} />
          <Stack.Screen name="ProfilScreen" component={ProfilScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="YoutubeWidget" component={YoutubeWidget} />
        </Stack.Navigator>
      </AuthProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}
