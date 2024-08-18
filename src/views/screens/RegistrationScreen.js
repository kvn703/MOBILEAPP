import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Alert, SafeAreaView, ScrollView, Text , View} from 'react-native';
import COLORS from '../../conts/colors';
import Input from '../components/Input';
import Button from '../components/Button';
import { Keyboard } from 'react-native';
import Loader from '../components/Loader';

const RegistrationScreen = ({ navigation }) => {
    const [inputs, setInputs] = React.useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);
    const validate = () => {
        Keyboard.dismiss();
        let valid = true;
        if (!inputs.email) {
            handleError('Email is required', 'email');
            valid = false;
        } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
            handleError('Enter valid email', 'email');
            valid = false;
        }

        if (!inputs.fullname) {
            handleError('Fullname is required', 'fullname');
            valid = false;
        }
        if (!inputs.phone) {
            handleError('Phone is required', 'phone');
            valid = false;
        }
        if (!inputs.password) {
            handleError('Password is required', 'password');
            valid = false;
        } else if (inputs.password.length < 5) {
            handleError('Password must be at least 5 characters', 'password');
            valid = false;
        }

        if (valid) {
            register();
        }
    };

    const register = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);

            try  {
                AsyncStorage.setItem('user', JSON.stringify(inputs));
                navigation.navigate('LoginScreen');
            } catch (error) {
                Alert.alert('Error', 'Something went wrong');
            }
        }, 3000);

    };

    const handleInputChange = (text, input) => {
        setInputs((prevState) =>({...prevState, [input]: text}))
    };

    const handleError = (errorMessage, input) => {
        setErrors((prevState) => ({...prevState, [input]: errorMessage}));
    }

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <Loader visible={loading} />
            <ScrollView
                contentContainerStyle={{
                    paddingTop: 50,
                    paddingHorizontal: 20,
                }}>
                <Text style={{color: COLORS.black, fontSize: 40, fontWeight: 'bold'}}>
                    Register
                </Text>
                <Text style={{color: COLORS.grey, fontSize: 18, marginVertical: 10}}>
                    Enter your details to register
                </Text>
                <View style={{marginVertical: 20}}>
                    <Input 
                        placeholder="Enter your email address"
                        iconName="email-outline"
                        label="Email"
                        error={errors.email}
                        onFocus={() => {
                            handleError(null, 'email')
                        }}
                        onChangeText={(text) => handleInputChange(text, 'email')}
                    />
                    <Input 
                        placeholder="Enter your fullname"
                        iconName="account-outline"
                        label="Full Name"
                        error={errors.fullname}
                        onFocus={() => {
                            handleError(null, 'fullname')
                        }}
                        onChangeText={(text) => handleInputChange(text, 'fullname')}
                    />
                    <Input
                        keyboardType="number-pad"
                        placeholder="Enter your phone number"
                        iconName="phone-outline"
                        label="Phone number"
                        error={errors.phone}
                        onFocus={() => {
                            handleError(null, 'phone')
                        }}
                        onChangeText={(text) => handleInputChange(text, 'phone')}
                    />
                    <Input 
                        placeholder="Enter your password"
                        iconName="lock-outline"
                        label="Password"
                        error={errors.password}
                        onFocus={() => {
                            handleError(null, 'password')
                        }}
                        onChangeText={(text) => handleInputChange(text, 'password')}
                        password
                    />
                    <Button title="Register" onPress={validate}/>
                    <Text 
                    onPress={() => navigation.navigate('LoginScreen')}
                        style={{
                            color: COLORS.black, 
                            textAlign: 'center',
                            fontSize: 16,
                            fontWeight: 'bold',
                        }}>
                        Already have an account?
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    
    );
};

export default RegistrationScreen;