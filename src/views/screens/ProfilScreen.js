import React from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import theme from '../../conts/colors';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const { COLORS, LIGHT, DARK } = theme;

const ProfileScreen = ({navigation}) => {
  const { Userdetails } = useContext(AuthContext);
  const profileData = {
    uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flex: 1}}>
        <TouchableOpacity style={{
            marginTop: "15%",
            height: 55,
            width: 55,
            borderRadius: 30,
            marginRight: "80%",
            justifyContent: "center",
            alignItems: "center",
          }} onPress={() => navigation.navigate("Accueil")}>
          <Icon
            name="home"
            size={40}
            style={{
              position: "absolute",
            }}
            color={LIGHT.secondary}
          />
        </TouchableOpacity>
      <ImageBackground
        source={{
          uri: 'https://your-image-url-here.com/your-image.jpg',
        }}
        style={styles.headerImage}
      >
        <Image
          source={{
            uri: Userdetails.image,
          }}
          style={styles.profileImage}
        />
        <Text style={styles.title}>Ton Profil</Text>
      </ImageBackground>
      </View>
      <View style={styles.formContainer}>
        {renderField('ID', Userdetails.id, 'account')}
        {renderField('Email', Userdetails.email, 'email-outline')}
        {renderField('Prénom', Userdetails.name, 'account')}
        {renderField('Nom', Userdetails.surname, 'account')}
        {renderField('Date de Naissance', Userdetails.birth_date, 'cake')}
        {renderField('Genre', Userdetails.gender, 'gender-male-female')}
        {renderField('Poste', Userdetails.work, 'briefcase')}
        {renderField('Subordonnés', Userdetails.subordinates.join(', '), 'account-group')}
      </View>
      </View>
    </View>
  );
};

const renderField = (label, value, icon) => (
  <View style={styles.formField}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={40} style={styles.fieldIcon} color={LIGHT.tertiary} />
    </View>
    <View style={styles.labelValueContainer}>
      <Text style={styles.fieldLabel}>{label}:</Text>
      <Text style={styles.fieldValue}>{value}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT.background,
  },
  headerImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    height: 100,
    width: 100,
    bottom:85,
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: '60%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: LIGHT.primary,
    bottom:70,
    marginBottom: 100,
  },
  formContainer: {
    backgroundColor: LIGHT.secondaryBackground,
    padding: 20,
    width: '90%',
    borderRadius: 20,
    elevation: 5,
    marginTop: -30,
    marginBottom: '10%'
  },
  formField: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
    fontWeight: 'bold',
  },
  fieldValue: {
    marginTop: 5,
  },
});

export default ProfileScreen;