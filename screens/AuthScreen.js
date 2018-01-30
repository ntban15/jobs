import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; // import icons from Expo
import { connect } from 'react-redux'; // use connect to make this Component listen to redux state
import * as actions from '../actions'; // import all actions

class AuthScreen extends Component {
    static navigationOptions = {
        tabBarVisible: false // hide tab bar when scroll to this screen
    };

    render() {
        return(
            <View style={styles.containerStyle} >
                <FontAwesome name="facebook-official" size={90} color="#3b5998" />
                <Text>Sign in with Facebook</Text>
                <Button title="Sign in" onPress={this.props.facebookLogin} />
            </View>
        );
    }
}

styles = StyleSheet.create({
    containerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

// all actions will be stored in this.props
export default connect(null, actions)(AuthScreen);