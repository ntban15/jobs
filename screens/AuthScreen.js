import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; // import icons from Expo
import { connect } from 'react-redux'; // use connect to make this Component listen to redux state
import * as actions from '../actions'; // import all actions

class AuthScreen extends Component {
    // can put this navigationOptions straight to the RootNavigator
    // static navigationOptions = {
    //     tabBarVisible: false // hide tab bar when scroll to this screen
    // };

    componentWillMount() {
         // check if user is already logged in
        // this will call action to get token
        // the state token will be passed into new props
        this.props.checkAuth();
    }

    // this will be called whenever Component is about to receive new props
    // especially when Redux State is changed
    componentWillReceiveProps(nextProps) {
        if (nextProps.token) {
            this.props.navigation.navigate('Main');
        }
    }

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

const mapStateToProps = ({ auth }) => {
    return {
        token: auth.token // get token from AuthReducer
    };
};

// all actions will be stored in this.props
export default connect(mapStateToProps, actions)(AuthScreen);