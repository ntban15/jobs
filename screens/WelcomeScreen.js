import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

// specify content and color for each slide
const SLIDES_DATA = [
    { id: 1, text: 'Welcome to Job Finder', color: '#b2dfdb' },
    { id: 2, text: 'Find a local job', color: '#ffecb3' },
    { id: 3, text: 'Save jobs by swiping', color: '#40c489' }
];

class WelcomeScreen extends Component {
    // static navigationOptions = {
    //     tabBarVisible: false
    // };

    state = {
        isWelcomed: null // state to watch if user has gone through the welcome screen before
    };

    async componentWillMount() {
        // temp code to remove token
        // AsyncStorage.removeItem('@MyStore:token');

        // look for isWelcomed in AsyncStorage
        let welcome = await AsyncStorage.getItem('@MyStore:welcome');
        // if exist
        if (welcome) {
            // check if it is false
            if (welcome === 'false') {
                this.setState({ isWelcomed: false })
            }
            else {
                // go directly into AuthScreen
                this.props.navigation.navigate('Auth');
            }
        }
        else {
            AsyncStorage.setItem('@MyStore:welcome', 'false');
            this.setState({ isWelcomed: false });
        }
    }

    // no need to bind this
    onSlidesFinish = () => {
        // set welcome state to true
        AsyncStorage.setItem('@MyStore:welcome', 'true');
        // react-navigation auto pass down navigation to props of Component
        this.props.navigation.navigate('Auth');
    };

    render() {
        // if user has not gone through before
        if (this.state.isWelcomed === false) {
            return(
                <Slides 
                    data={SLIDES_DATA}
                    onSlidesFinish={this.onSlidesFinish}
                />
            );
        }
        // the app is getting the state isWelcomed
        else if (this.state.isWelcomed === null) {
            return(
                <AppLoading />
            );
        }
    }
}

export default WelcomeScreen;