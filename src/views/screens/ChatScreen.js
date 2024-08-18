import React from 'react';
import {View, Text} from 'react-native';

const ChatScreen = ({navigation}) => {

    return <View 
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizonal: 40,
        }}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Chat</Text>
        </View>;
};

export default ChatScreen;