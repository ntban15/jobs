import { AsyncStorage } from 'react-native'; // module of react-native to store data asynchronously and globally
import { Facebook } from 'expo';
import { 
    FB_LOGIN_SUCCESS,
    FB_LOGIN_FAIL } from './types';

const APP_ID = '1820345688009478';

// persist items
// await AsyncStorage.setItem('@MySuperStore:key', 'I like to save it.'); 
// fetch items
// await const value = await AsyncStorage.getItem('@MySuperStore:key');

// redux thunk works by return a function with arg dispatch inside the action creator
// when the action creator is invoked, thunk invoke the function
// because the function we return make use of await,
// we have to annotate it with async keyword
export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('@MyStore:fb_token');
    if (token) {
        // Dispatch action saying FB Login is done
        // have to return it
        dispatch({
            type: FB_LOGIN_SUCCESS,
            payload: token
        });
    }
    else {
        // Start FB login process
        // pass dispatch function to the helper function
        // to give it access to redux thunk
        startFBLogin(dispatch);
    }
};

// another function, have to use const
const startFBLogin = async dispatch => {
    // Expo FB Login return a object with type and token properties
    let { type, token } = await Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ['public_profile']
    });
    // check if login is success => dispatch an action FB_LOGIN_SUCCESS
    // and save the token to AsyncStorage
    if (type === 'success') {
        // persist token
        await AsyncStorage.setItem('@MyStore:fb_token', token);
        // dispatch FB_SUCCESS
        dispatch({
            type: FB_LOGIN_SUCCESS,
            payload: token
        });
    }
    // if fail => FB_LOGIN_FAIL
    else if (type === 'cancel') {
        dispatch({
            type: FB_LOGIN_FAIL
        });
    }
};