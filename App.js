import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';

export default class App extends React.Component {
  render() {
    // put Navigator in Root application file
    const RootNavigator = TabNavigator({
      Welcome: { // each Screen has a key, must be unique
        screen: WelcomeScreen // what Component related to this screen
      },
      Auth: {
        screen: AuthScreen
      },
      Main: { // main flow contains another TabNavigator
        screen: TabNavigator({ // must be assigned to screen property
          Map: {
            screen: MapScreen
          },
          Deck: {
            screen: DeckScreen
          },
          ReviewFlow: { 
            screen: StackNavigator({
              Review: {
                screen: ReviewScreen
              },
              Setting: {
                screen: SettingScreen
              }
            }) 
          } 
        }, {
          tabBarPosition: 'bottom' // set tab bar to bottom
        })
      }
    }, {
      tabBarPosition: 'bottom',
      swipeEnabled: false // disable swipe
    });

    return (
      // every component in the app will now have access to the store
      <Provider store={store}> 
        <View style={styles.container}>
          <RootNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
