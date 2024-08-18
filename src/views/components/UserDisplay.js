import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import theme from "../../conts/colors";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Linking } from "react-native";

const { COLORS, LIGHT, DARK } = theme;

const data = {
  id: 0,
  email: "string@gmail.com",
  name: "kevin",
  surname: "stzeddring",
  birth_date: "12-20-2000",
  gender: "Male",
  work: "hello",
  subordinates: [1],
};

const UserDisplay = ({ visible = false }) => {
  const { setShowProfile, Userdetails } = useContext(AuthContext);
  const { EmployeesDetails } = useContext(AuthContext);

  function sendEmail() {
    const recipient = EmployeesDetails.email;
    const subject = "";
    const body = "";

    const emailUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    Linking.openURL(emailUrl)
      .then(() => {
        console.log("Email client opened");
      })
      .catch((error) => {
        console.error("Error opening email client:", error);
      });
  }

  const undisplay = () => {
    setShowProfile(false);
  };
  return (
    visible && (
      <View style={styles.container}>
        <Image
          source={{
            uri: EmployeesDetails.image,
          }}
          style={styles.profileImage}
        />
        {Field("Email", EmployeesDetails.email, "email")}
        {Field("Prénom", EmployeesDetails.name, "account")}
        {Field("Nom", EmployeesDetails.surname, "account")}
        {Field("Date de Naissance", EmployeesDetails.birth_date, "cake")}
        {Field(
          "Genre",
          EmployeesDetails.gender,
          EmployeesDetails.gender == "Male"
            ? "gender-male"
            : EmployeesDetails.gender == "Female"
            ? "gender-female"
            : "gender-non-binary"
        )}
        {Field("Poste", EmployeesDetails.work, "briefcase")}
        {Field("Subordonnés", EmployeesDetails.subordinates, "account-group")}
        <TouchableOpacity
          onPress={() => {
            sendEmail();
          }}
          style={{
            backgroundColor: LIGHT.primary,
            height: "7%",
            width: "60%",
            borderRadius: 25,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: "3%",
            left: "30%",
          }}
        >
          <Icon name="email-send" size={30} color={COLORS.white} />
        </TouchableOpacity>
        <View style={{ bottom: 520, marginLeft: "80%" }}>
          <TouchableOpacity
            onPress={undisplay}
            style={{ height: 50, width: 50 }}
          >
            <Icon
              name="close-box"
              size={40}
              style={{
                position: "absolute",
              }}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  );
};

const Field = (label, value, icon) => (
  <View style={styles.formField}>
    <View style={styles.iconContainer}>
      <Icon
        name={icon}
        size={40}
        style={styles.fieldIcon}
        color={LIGHT.secondary}
      />
    </View>
    <View style={styles.labelValueContainer}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: LIGHT.secondaryBackground,
    top: "10%",
    left: "10%",
    height: "75%",
    width: "70%",
    marginHorizontal: 30,
    padding: 30,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: LIGHT.primary,
  },
  loader: {
    height: 300,
    backgroundColor: COLORS.white,
    marginHorizontal: 30,
    bordelRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  headerImage: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.darkBlue,
    marginBottom: 20,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    marginTop: -30,
  },
  formField: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  iconContainer: {
    marginRight: 10,
  },
  labelValueContainer: {
    flex: 1,
  },
  fieldIcon: {
    marginRight: 10,
  },
  fieldLabel: {
    fontWeight: "bold",
  },
  fieldValue: {
    marginTop: 5,
  },
});

export default UserDisplay;
