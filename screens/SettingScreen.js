import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingScreen extends Component {
    static navigationOptions = () => {
        return {
            title: "Settings"
        };
    };

    render() {
        return(
            <View>
                <Text>SettingScreen</Text>
                <Text>SettingScreen</Text>
                <Text>SettingScreen</Text>
                <Text>SettingScreen</Text>
                <Text>SettingScreen</Text>
                <Text>SettingScreen</Text>
            </View>
        );
    }
}

export default SettingScreen;