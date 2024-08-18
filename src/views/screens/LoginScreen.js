import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import theme from "../../conts/colors";
import Input from "../components/Input";
import Button from "../components/Button";
import { Keyboard } from "react-native";
import Loader from "../components/Loader";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { TextInput} from "@react-native-material/core";

const { COLORS, LIGHT, DARK } = theme;

const LoginScreen = ({ navigation }) => {
  const [inputs, setInputs] = React.useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });
  const { isLoading , Login } = useContext(AuthContext);
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.email) {
      handleError("Email requis", "email");
      valid = false;
    }
    if (!inputs.password) {
      valid = false;
      handleError("Mot de Passe requis", "password");
    }

    if (valid) {
      Login(inputs.email, inputs.password);
    }
  };

  const handleInputChange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errorMessage, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ backgroundColor: LIGHT.background, flex: 1, alignItems: "center" }}>
      <Loader visible={false} />
      <ScrollView
        contentContainerStyle={{
          paddingTop: 50,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ color: LIGHT.onBackground, fontSize: 40, textAlign: "center"}}>
          Connexion
        </Text>
        <Text style={{ color: LIGHT.onBackground, fontSize: 18, marginVertical: 10, textAlign: "center" }}>
          Entrez votre Email et votre Mot de Passe
        </Text>
        <View style={{ flex: 1, marginVertical: 20, marginTop: '65%'}}>
          <Input
            label="Email"
            value={inputs.email}
            error={errors.email}
            onFocus={() => handleError("", "email")}
            onChangeText={(text) => handleInputChange(text, "email")}
            inputText={inputs.email}
          />
          <Input
            label="Mot de Passe"
            value={inputs.password}
            error={errors.password}
            onFocus={() => handleError("", "password")}
            onChangeText={(text) => handleInputChange(text, "password")}
            inputText={inputs.password}
            password
          />
          <Button title="Connexion"
          onPress={validate}
          height={50}
          width="100%"
          color={LIGHT.primary}
          radius={50}
          textColor={LIGHT.onPrimary}
          textSize={18}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
