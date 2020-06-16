import {
    CONTACT_US_GET_ITEMS,
    CONTACT_US_LOADING,
    CONTACT_US_STOP_LOADING
} from './../types';
import { getContact } from './../../lib/models/contactUsModel';
import AsyncStorage from '@react-native-community/async-storage';

export const getInfo = () => {
    return async (dispatch) => {
        dispatch({ type: CONTACT_US_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        getContact(token, {
            success: (response) => {
                dispatch({ type: CONTACT_US_GET_ITEMS, info: response.data });
                dispatch({ type: CONTACT_US_STOP_LOADING });
            },
            error: (error) => {
                dispatch({ type: CONTACT_US_STOP_LOADING });
                throw (error);
            }
        });
    }
}