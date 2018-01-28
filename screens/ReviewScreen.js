import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Button } from 'react-native-elements';

class ReviewScreen extends Component {
    // define NavigationOptions for Navigator to read 
    // static is Class property
    // the static navigationOptions property receive a naviagtion 'props'
    static navigationOptions = ({ navigation }) => { // extract the navigation props to use navigate functions
        return {
            title: "Review Jobs", // define title of header and label of tab
            headerRight: function() {
                return <Button 
                    title="Settings" 
                    onPress={() => {navigation.navigate('Setting')}} // navigate to other screen using navigate
                    backgroundColor="rgba(0, 0, 0, 0)"
                    color={Platform.OS === 'android' ? 'black' : 'blue'} // Platform specific code
                />
            }() // add a header navigation option that allows us to add a custom right view
            // when click that button, navigate to Settings screen
        };
    };

    render() {
        return(
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;