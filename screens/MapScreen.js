import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { MapView } from 'expo';

class MapScreen extends Component {
    // initial postion of the Map
    state = {
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04, // zooming
            latitudeDelta: 0.09
        }
    }

    onRegionChange = (region) => {
        // update the local record of region whenver user just move map
        this.setState({ region });
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
            </View>
        );
    }
}

export default MapScreen;