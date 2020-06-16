import {
    NOTIFICATION_GET_ITEMS,
    NOTIFICATION_STOP_LOADING,
    NOTIFICATION_LOADING
} from './../types';
import firestore from '@react-native-firebase/firestore';
import _ from 'underscore';
import AsyncStorage from '@react-native-community/async-storage';

export const getNotifications = () => {
    return async (dispatch) => {
        dispatch({ type: NOTIFICATION_LOADING });
        const { id } = JSON.parse(await AsyncStorage.getItem('user'));

        firestore().collection(`_${id}`).onSnapshot((querySnapshot) => {
            let notifications = [];
            if(querySnapshot!=null)
            {
                _.each(querySnapshot.docs, i => {
                    notifications.push({ body: i.data().body, height: i.data().body.length, link: i.data()?.link });
                });
            }
            dispatch({ type: NOTIFICATION_GET_ITEMS, notifications: notifications });
            dispatch({ type: NOTIFICATION_STOP_LOADING });
        });
    }
}