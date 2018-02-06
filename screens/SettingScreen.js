import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { resetLikes } from '../actions';
import { Button } from 'react-native-elements';

class SettingScreen extends Component {
    static navigationOptions = () => {
        return {
            title: "Settings"
        };
    };

    render() {
        return(
            <View>
                <Button 
                    title="Reset liked jobs"
                    large
                    icon={{ name: 'delete-forever' }}
                    onPress={() => this.props.resetLikes()}
                />
            </View>
        );
    }
}

export default connect(null, { resetLikes })(SettingScreen);