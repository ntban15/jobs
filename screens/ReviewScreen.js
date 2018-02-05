import React, { Component } from 'react';
import { 
    Image, View, Text, FlatList, 
    Platform, StyleSheet, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux'; 

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

    onApplyPress = url => {
        Linking.openURL(url); // open source website for applying
    };

    // FlatList elements contain { index, item }
    renderJob = ({ item }) => {

        const { company_logo, title, company, location, url } = item;

        return (
            <Card style={styles.cardStyle}>
                <View style={styles.detailContainer}>
                    <Image 
                        style={styles.companyImg}
                        source={{ uri: company_logo }}
                    />
                    <View style={styles.detailText}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.companyName}>{company}</Text>
                        <Text style={styles.companyLoc}>{location}</Text>
                    </View>
                </View>

                <Button 
                    title="APPLY NOW"
                    large
                    onPress={() => this.onApplyPress(url)}
                    borderRadius={10}
                />
            </Card>
        );
    };

    // to be used by FlatList to define key VERY IMPORTANT!!!
    _keyExtractor = (item, index) => item.id;

    render() {
        return(
            <View>
                <FlatList 
                    data={this.props.likedJobs}
                    renderItem={this.renderJob}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        height: 800
    },
    detailContainer: {
        flex: 1,
        flexDirection: 'row', // element on the same line
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 10
    },
    detailText: {
        flex: 2,
        flexDirection: 'column'
    },
    companyImg: {
        flex: 1,
        height: 70,
        resizeMode: 'contain', // crop the image
        marginLeft: 5,
        marginRight: 5 
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    companyName: {
        fontSize: 18
    },
    companyLoc: {
        fontSize: 16
    }
});

const mapStateToProps = ({ likedJobs }) => {
    return {
        likedJobs
    };
};

export default connect(mapStateToProps, null)(ReviewScreen);