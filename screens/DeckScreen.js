import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import { likeJob } from '../actions';
import Deck from '../components/Deck';

// reg exp to extract snippet from description
// const parse_des = /^<p>.+<\/p>[\n\s]+<p>(.)<\/p>/;

class DeckScreen extends Component {
    static navigationOptions = {
        title: 'Jobs'
    };

    // define layout for deck item
    renderCard(job) {
        return (
            <Card style={styles.cardStyle}>
                <View style={styles.detailContainer}>
                    <Image 
                        style={styles.companyImg}
                        source={{ uri: job.company_logo }}
                    />
                    <View style={styles.detailText}>
                        <Text style={styles.title}>{job.title}</Text>
                        <Text style={styles.companyName}>{job.company}</Text>
                        <Text style={styles.companyLoc}>{job.location}</Text>
                    </View>
                </View>
            </Card>
        );
    }

    // define layout for empty deck
    // have to make Arrow function because of this will binded to Deck component
    // otherwise
    renderNoMoreCard = () => {
        return (
            <Card>
                <Text>No more jobs!</Text>
                <Button
                    style={{ marginTop: 10 }}
                    title="Get more jobs"
                    large
                    borderRadius={10}
                    icon={{ name: 'my-location' }}
                    onPress={() => this.props.navigation.navigate('Map')}
                />
            </Card>
        );
    }

    // define what swiping left will do
    // dismiss the job
    onSwipeLeft = job => {

    }

    // define what swiping right will do
    // like the job
    onSwipeRight = job => {
        this.props.likeJob(job);
    }

    render() {
        return(
            <Deck 
                data={this.props.jobs}
                keyProp="id"
                onSwipeLeft={this.onSwipeLeft}
                onSwipeRight={this.onSwipeRight}
                renderCard={this.renderCard}
                renderNoMoreCard={this.renderNoMoreCard}
            />
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        height: 400
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

const mapStateToProps = ({ jobs }) => {
    return { jobs: jobs.list };
};

export default connect(mapStateToProps, { likeJob })(DeckScreen);