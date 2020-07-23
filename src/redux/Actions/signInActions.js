import {
    SIGN_IN_LOADING,
    SIGN_IN_RESET,
    SIGN_IN_STOP_LOADING,
    SIGN_IN_UPDATE_NAME,
    SIGN_IN_UPDATE_PASSWORD,
    SIGN_UP_STOP_LOADING
} from '../types';
import { login, getUser } from './../../lib/models/signinModel';
import { StackActions, NavigationActions } from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import firestore from '@react-native-firebase/firestore';
import _ from 'underscore';

const signUpMessages = [{
    body: "Thank You For Joining YouCast",
    link: null
}, {
    body: "Like Our Page On Facebook",
    link: 'fb://page/110735607104576'
}, {
    body: "Follow Us On Instagram",
    link: 'instagram://user?username=youcast.eg'
}, {
    body: "Subscribe To Youtube",
    link: 'https://www.youtube.com/channel/UCinkoHoj6l2HmEUN0bhokTw?view_as=subscriber'
}];

export const updateEmail = (email) => {
    const trim = String(email).trim().toLowerCase();
    return { type: SIGN_IN_UPDATE_NAME, name: trim };
}

export const updatePassword = (password) => {
    const trim = String(password).trim();
    return { type: SIGN_IN_UPDATE_PASSWORD, password: trim };
}

export const signIn = (email, password, navigation, fromRegisteration) => {
    return (dispatch) => {
        email = String(email).trim().toLowerCase();
        password = String(password).trim();
        dispatch({ type: SIGN_IN_LOADING }); 
        login({
            username: email,
            password: password
        }, {
            success: (response) => {
                const {  refresh_token,token } = response;
                getUser(token, {
                    success: async (response) => {
                        await AsyncStorage.setItem('tokens', JSON.stringify({ token: token, refresh_token: refresh_token }));
                        await AsyncStorage.setItem('user', JSON.stringify(response.data), (error) => {
                            if (!error) {
                                dispatch({ type: SIGN_IN_STOP_LOADING });
                                dispatch({ type: SIGN_UP_STOP_LOADING });
                                dispatch({ type: SIGN_IN_RESET });
                                global.type = response.data.current_user_subscription_plan?.confirmed ? response.data.current_user_subscription_plan.subscription_plan.title : 'Invalid';
                                const resetAction = StackActions.reset({
                                    index: 0,
                                    actions: [NavigationActions.navigate({ routeName: 'Home' })],
                                });
                                navigation.dispatch(resetAction);

                                // !!__Firebase workround__!!
                                if (fromRegisteration) {
                                    _.each(signUpMessages, i => {
                                        firestore().collection(`_${response.data.id}`).doc().set({
                                            body: i.body,
                                            link: i.link
                                        }).then(() => {
                                            if (!i.link) {
                                                global.popup.show({
                                                    onPress: null,
                                                    appIconSource: require('./../../assets/logo.png'),
                                                    appTitle: 'YOUCAST',
                                                    timeText: 'Now',
                                                    title: 'Signup successed',
                                                    body: String(i.body),
                                                    slideOutTime: 5000
                                                });
                                            }
                                        });
                                       
                                    })
                                }
                            }
                        });
                    },
                    error: (error) => {
                        alert(error.response.data.message);
                        throw (error);
                    }
                });
            },
            error: (error) => {
                dispatch({ type: SIGN_IN_STOP_LOADING, error: error.response.data.message });
                alert(error.response.data.message);
                throw (error);
            }
        })
    }
}