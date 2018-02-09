import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_TOKEN_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';

export default async () => {
    // check if we have the permission to send notification
    let { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        // only ask iOS because Android permissions are asked during app install
        let { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        finalStatus = status;
    }

    // if the user did not grant permission
    if (finalStatus !== 'granted') {
        return;
    }

    // check if token exist in storgage
    let pushToken = await AsyncStorage.getItem('@MyStore:push_token');
    if (pushToken) {
        console.log(pushToken);
        return; // if token exist, return immediately
    }

    // get push token that uniquely identifies this device
    pushToken = await Notifications.getExpoPushTokenAsync();

    // POST token to back-end server
    await axios.post(PUSH_TOKEN_ENDPOINT, { token: { token: pushToken } });

    // save to AsyncStorage
    await AsyncStorage.setItem('@MyStore:push_token', pushToken);

    console.log(pushToken);
};