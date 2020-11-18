import {
    INFO_GET_PACKAGES,
    INFO_LOADING,
    INFO_STOP_LOADING,
    INFO_SET_USER,
    INFO_SUBSCRIBE_STOP_LOADING,
    INFO_SUBSCRIBE_LOADING
} from './../types';
import { DeviceEventEmitter } from 'react-native';
import { getPackages, subscripeToPlane } from './../../lib/models/infoModel';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';
import firestore from '@react-native-firebase/firestore';
import { strings } from '../../translations/translation';
import { cond } from 'react-native-reanimated';

export const fetchPackages = () => {
    return async (dispatch) => {
        dispatch({ type: INFO_LOADING });
        dispatch(setUserInfo());

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        getPackages(token, {
            success: (response) => {
                const newArr = [];
                const details = [];

                _.each(response.data, item => {
                    const { cost, period } = item;
                    newArr.push({ type: item.title, price: `${cost} L.E`, period: period });
                    details.push({ ...item });
                });

                dispatch({ type: INFO_GET_PACKAGES, packages: newArr, details: details });
                dispatch({ type: INFO_STOP_LOADING });
            },
            error: (error) => {
                dispatch({ type: INFO_STOP_LOADING });
                throw (error);
            }
        });
    }
}

const setUserInfo = () => {
    return async (dispatch) => {
        dispatch({ type: INFO_SET_USER, user: JSON.parse(await AsyncStorage.getItem('user'))['current_user_subscription_plan'] });
    };
}

export const subscripe = (id) => {
    console.log("idddddddddddddd-------",id)
    return async (dispatch) => {
        dispatch({ type: INFO_SUBSCRIBE_LOADING });
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        const user = JSON.parse(await AsyncStorage.getItem('user'));

        subscripeToPlane(id, token, {
            success: () => {
                dispatch({ type: INFO_SUBSCRIBE_STOP_LOADING });
                DeviceEventEmitter.emit("CloseModal");
                console.log("we are in successssssssssss")
                // !!__Firebase workround__!!
                firestore().collection(`_${user.id}`).doc().set({
                    body: strings.requestSent
                }).then(() => {
                    global.popup.show({
                        onPress: null,
                        appIconSource: require('./../../assets/logo.png'),
                        appTitle: 'YOUCAST',
                        timeText: 'Now',
                        title: strings.subscribeSucceed,
                        body: strings.requestSent,
                        slideOutTime: 10000
                    });
                });
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: INFO_SUBSCRIBE_STOP_LOADING });
                throw (error);
            }
        })
    }
}