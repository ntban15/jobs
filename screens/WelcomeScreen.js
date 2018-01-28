import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Slides from '../components/Slides';

// specify content and color for each slide
const SLIDES_DATA = [
    { id: 1, text: 'Welcome to Job Finder', color: '#b2dfdb' },
    { id: 2, text: 'Job Finder will help you find a local job', color: '#ffecb3' }
];

class WelcomeScreen extends Component {
    static navigationOptions = {
        tabBarVisible: false
    };

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