import React from "react";
import {TouchableOpacity, Text} from "react-native";
// import HomeScreen from "../screens/HomeScreen";


// const Tab = createBottomTabNavigator();

const TabBottom = () => {
  return (
    <TouchableOpacity onPress={()=> {
        navigation.navigate('HomeScreen')
    }
    }  >
        <Text>text</Text>
    </TouchableOpacity>
  );
};

export default TabBottom;
