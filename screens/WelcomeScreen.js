import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';

// specify content and color for each slide
const SLIDES_DATA = [
    { id: 1, text: 'Welcome to Job Finder', color: '#b2dfdb' },
    { id: 2, text: 'Find a local job', color: '#ffecb3' },
    { id: 3, text: 'Save jobs by swiping', color: '#40c489' }
];

class WelcomeScreen extends Component {
    static navigationOptions = {
        tabBarVisible: false
    };

    componentDidMount() {
        // temp code to remove token
        // AsyncStorage.removeItem('@MyStore:fb_token');
    }

    // no need to bind this
    onSlidesFinish = () => {
        // react-navigation auto pass down navigation to props of Component
        this.props.navigation.navigate('Auth');
    };

    render() {
        return(
            <Slides 
                data={SLIDES_DATA}
                onSlidesFinish={this.onSlidesFinish}
            />
        );
    }
}

export default WelcomeScreen;