import {
    PROFILE_GET_INFO,
    PROFILE_LOADING,
    PROFILE_STOP_LOADING
} from './../types';
import { getInfo } from './../../lib/models/profileModel';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

export const getUserInfo = () => {
    return async (dispatch) => {
        dispatch({ type: PROFILE_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        getInfo(token, {
            success: (response) => {
                let images = [], videos = [];

                _.each(response.data.user.images, item => {
                    images.push({ source: { uri: `http://youcast.media/${item.title}` } })
                });

                _.each(response.data.user.videos, item => {
                    videos.push(item);
                });

                dispatch({ type: PROFILE_STOP_LOADING });
                dispatch({ type: PROFILE_GET_INFO, info: response.data, images: images, videos: videos });
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: PROFILE_STOP_LOADING });
                throw (error);
            }
        });
    }
}