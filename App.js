import React from 'react';
import { StyleSheet, Text, View, Alert, AsyncStorage } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Notifications } from 'expo';

import { store, persistor } from './store';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthScreen from './screens/AuthScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';
import registerForPushNotifications from './services/PushNotifications';

export default class App extends React.Component {
  componentDidMount() {
    //AsyncStorage.removeItem('@MyStore:push_token');

    registerForPushNotifications();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(notification => {
      // 2-level deep destructuring
      const { data: { text }, origin } = notification; 

      // check expo docs for more information of origin
      if ((origin === 'selected' || origin === 'received') && text) {
          Alert.alert(
          'Push notification received',
          text,
          [{ text: 'OK', onPress: () => {} }],
          { cancelable: true }
        );
      }
    });
  }

  render() {
    // put Navigator in Root application file
    const RootNavigator = StackNavigator({
      Welcome: { // each Screen has a key, must be unique
        screen: WelcomeScreen, // what Component related to this screen
        navigationOptions: { header: null } // override navigation options for screen
      },
      Auth: {
        screen: AuthScreen,
        navigationOptions: { header: null } 
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
                screen: ReviewScreen,
                navigationOptions: { }
              },
              Setting: {
                screen: SettingScreen,
                navigationOptions: { }
              }
            }, {
              headerMode: 'none' // solves double header
            }) 
          } 
        }),
        navigationOptions: { }
      }
    }, {
      headerMode: 'screen' // solves double header
    });

    return (
      // every component in the app will now have access to the store
      // must wrap with PersistGate to deter components rendering
      // until redux is loaded with persisted state
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={styles.container}>
            <RootNavigator />
          </View>
        </PersistGate>
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
