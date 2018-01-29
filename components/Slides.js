import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get("screen").width;

class Slides extends Component {
    renderFinishButton() {
        return (
            <Button 
                title="I am ready for this"
                raised
                backgroundColor='#40c4ff'
                color='black'
                borderRadius={10}
                style={{ marginTop: 40 }}
                onPress={this.props.onSlidesFinish}
            />
        );
    }

    renderSlides() {
        const len = this.props.data.length;
        return this.props.data.map((slide, index) => {
            return (
                <View // get color for each slide
                    style={[styles.slideStyle, { backgroundColor: slide.color }]} 
                    key={slide.id}
                >
                    <Text style={styles.slideText}>
                        {slide.text}
                    </Text>

                    {index === len - 1 ? this.renderFinishButton() : null}
                </View>
            ); // render button only if it is the last slide
        });
    }

    render() {
        return (
            <ScrollView
                horizontal // make scroll view lay children horizontally
                style={{ flex: 1 }} // fill up screen
                pagingEnabled // make scroll view snap to each slide, not halfway
            >
                {this.renderSlides()}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    slideText: {
        fontSize: 30,
        textAlign: 'center'
    },
    slideStyle: {
        flex: 1, // fill whole screen
        width: SCREEN_WIDTH, // fill the width
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Slides;