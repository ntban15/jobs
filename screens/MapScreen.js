import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import { fetchJobs } from '../actions';

class MapScreen extends Component {
    // initial postion of the Map
    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04, // zooming
            latitudeDelta: 0.09
        }
    };

    onRegionChange = (region) => {
        // update the local record of region whenver user just move map
        this.setState({ region });
    };

    onSearchPress = () => {
        // pass a callback to this action creator
        // so that when the action is dispatched
        // we can navigate directly to DeckScreen
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('Deck');
        });
    };

    render() {
        return(
            <View
                style={{ flex: 1 }}
            >
                <MapView 
                    style={{ flex: 1 }}
                    region={this.state.region}
                    // callback to listen to movement of map
                    onRegionChangeComplete={this.onRegionChange}
                />

                <View style={styles.buttonContainer}>
                    <Button 
                        large
                        title="Search this position"
                        backgroundColor="#009688"
                        icon={{ name: 'search' }}
                        onPress={this.onSearchPress}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        // if use 'absolute', set position by using bottom, left, right, top
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
});

export default connect(null, { fetchJobs })(MapScreen);