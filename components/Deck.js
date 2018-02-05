import React, { Component } from 'react';
import { 
    View, 
    Animated, 
    StyleSheet, 
    PanResponder,
    Dimensions,
    LayoutAnimation,
    UIManager } from 'react-native';

// TODO: Handle dynamic card height

// get actual screen dimensions
const SCREEN_WIDTH = Dimensions.get('screen').width;
const DISMISS_THRESHOLD = 0.25 * SCREEN_WIDTH; // distance when cards are dismissed
const DISMISS_DURATION = 250;

class Deck extends Component {
    //defaultProps system define default values for required props
    static defaultProps = {
        onSwipeRight: () => {},
        onSwipeLeft: () => {},
        keyProp: 'id'
    };

    constructor(props) {
        super(props);

        // animated value
        const position = new Animated.ValueXY();

        this.panResponder = PanResponder.create({
            // everytime the user presses on the screen
            // true -> let this responder handle user input
            // false -> dont involve this responder in user input
            // evt stores what information user is pressing down on
            // gestureState tells what user is doing when pressing, more important
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            // called when user drags component around the screen
            onPanResponderMove: (evt, gestureState) => {
                // change value of position whenever onPanresponderMove invoked
                position.setValue({ x: gestureState.dx, y: gestureState.dy});
                // gestureState is not created again
                // react simply changes the value in it
                // console.log(gestureState);
                // Object {
                //     "_accountsForMovesUpTo": 1356783,
                //     "dx": -70.53849792480469, // total distance in a single gesture
                //     "dy": -3.794647216796875, // total distance in a single gesture
                //     "moveX": 162.421875, // where the user is clicking down
                //     "moveY": 158.54910278320312, // where the user is clicking down
                //     "numberActiveTouches": 1,
                //     "stateID": 0.18148400634527206,
                //     "vx": -0.1435875525841346, // how fast
                //     "vy": 0,
                //     "x0": 232.9603729248047,
                //     "y0": 162.34375,
                // }
            },
            // called everytime user press screen, and then release
            onPanResponderRelease: (evt, gestureState) => {
                // check the amount of swipe
                // if enough -> liked -> dismiss card
                if (gestureState.dx > DISMISS_THRESHOLD) {
                    this.forceSwipe('right');
                }
                else if (gestureState.dx < -DISMISS_THRESHOLD) {
                    this.forceSwipe('left');
                }
                else {
                    this.resetPostion(); // reset to default position when user release
                }
            }
        });

        this.position = position;

        // set default swiping item to 0, which is the first item
        this.state = { index: 0 };
    }

    // called whenever a component is about to be rerendered with a new set of props
    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({ index: 0 });
        }
    }

    // cascading cards animation by using LayoutAnimation
    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }

    forceSwipe(direction) {
        Animated.timing(
            this.position, {
                toValue: {
                    x: direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH,
                    y: 0
                },
                duration: DISMISS_DURATION // check doc for more properties
            }).start(() => this.onSwipeComplete(direction));
    }

    onSwipeComplete(direction) {
        const { onSwipeLeft, onSwipeRight, data } = this.props;
        const item = data[this.state.index];

        // onSwipeRight and onSwipeLeft are passed in from parent component
        // to let it listen to swipe event for handling outside functions
        // such as network call or sth not of interest of Deck
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        // reset value of position as it is not resetted for us
        this.position.setValue({ x: 0, y: 0 });

        // remember setState!!!! not modify this.state.index
        // after this call, the deck will be rerendered
        this.setState({ index: this.state.index + 1 });
    }

    // reset to default position smoothly with spring
    // TODO: button flickering
    resetPostion() {
        Animated.spring(this.position, {
            toValue: {
                x: 0,
                y: 0
            }
        }).start();
    }

    getCardStyle() {
        const position = this.position;
        // translate move X to rotation
        const rotateInterpolation = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5], // -500 -> -120deg, 0 -> 0deg, ...
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.position.getLayout(), // spread all the props of object form getLayout
            transform: [{ rotate: rotateInterpolation }] 
            // transform contain array of setting objects
            // when we pass an interpolation into Animated.View, it sees it
            // and use it to calculate animations
        };
    }

    renderCards() {
        // check if all cards have been swiped
        // if so, call the function renderNoMoreCards from invoking component
        // just like renderCard, this can be handled by the invoking component
        if (this.state.index >= this.props.data.length)
            return this.props.renderNoMoreCard();

        // idx represents the position of the item in the array
        return this.props.data.map((item, idx) => {
            if (idx < this.state.index) { // if item has been swiped before => don't render
                return null;
            }

            // if the item is the swiping item
            if (idx === this.state.index) {
                // have to attach key to each item
                return (
                    <Animated.View 
                        key={item[this.props.keyProp]} // for different key prop names
                        // can pass in multiple styles by using array
                        style={[this.getCardStyle(), styles.cardStyle]} 
                        {...this.panResponder.panHandlers} // attach panHandlers to certain components
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            
            // if the item is behind the swiping item
            if (idx === this.state.index + 1) {
                return (
                    // use animated.view too to avoid image get called again causing flickering
                    // because change of View to Animated.View
                    <Animated.View 
                        key={item[this.props.keyProp]} // for different key prop names
                        style={[styles.cardStyle, { top: 10 * (idx - this.state.index) }]} // make bottom card cascading
                    >
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }

            // the rest of the list
            return null;
        }).reverse(); // this is to reverse the map function so that it render the first card last
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        position: 'absolute',
        // get the cards to stack on each other
        // 'absolute' take the component out of layout context/hierarchy
        // also it makes the component shrink to minimum size required to store children
        // to solve it set width
        width: SCREEN_WIDTH,
        // or use left and right limit, but it will conflict with animation
        // left: 0,
        // right: 0
        elevation: 1 // solve problem with reverse() on Android
    }
});

export default Deck;