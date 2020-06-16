import {
    AUDITION_GET_AUDITIONS,
    AUDITION_LOADING,
    AUDITION_STOP_LOADING,
    AUDITION_DETAILS_LOADING,
    AUDITION_DETAILS_STOP_LOADING,
    AUDITION_DETAILS_LOADING_POPUP,
    AUDITION_DETAILS_GET_ITEM,
    CALENDAR_STOP_LOADING
} from '../types';
import { getAuditions, actionOnAudition, getAudition } from './../../lib/models/auditionModel';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchAuditions = () => {
    return async (dispatch) => {
        dispatch({ type: AUDITION_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        getAuditions(token, {
            success: (response) => {
                dispatch({ type: AUDITION_GET_AUDITIONS, auditions: response.data });
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: AUDITION_STOP_LOADING });
                throw (error);
            }
        });
    }
}

export const handleAudition = (id, type) => {
    return async (dispatch) => {
        dispatch({ type: AUDITION_DETAILS_LOADING_POPUP });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        actionOnAudition(id, type, token, {
            success: () => {
                dispatch(fetchAuditions());
                dispatch(fetchAudition(id));
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: AUDITION_DETAILS_STOP_LOADING });
                throw (error);
            }
        })
    }
}

export const fetchAudition = (id, way, navigation) => {
    return async (dispatch) => {
        way ? dispatch({ type: AUDITION_DETAILS_LOADING }) : null;

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        getAudition(id, token, {
            success: (response) => {
                dispatch({ type: AUDITION_DETAILS_GET_ITEM, auditionDetails: response.data })
                dispatch({ type: AUDITION_DETAILS_STOP_LOADING });
                navigation ? dispatch({ type: CALENDAR_STOP_LOADING }) : null;
                navigation ? navigation.goBack() : null;
            },
            error: (error) => {
                dispatch({ type: AUDITION_DETAILS_STOP_LOADING })
                throw (error);
            }
        });
    }
}