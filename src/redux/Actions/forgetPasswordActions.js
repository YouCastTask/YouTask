import {
    FORGET_PASSWORD_LOADING,
    FORGET_PASSWORD_STOP_LOADING,
    FORGET_PASSWORD_UPDATE_MAIL,
    FORGET_PASSWORD_RESET,
    VERIFY_CODE_LOADING,
    VERIFY_CODE_RESET,
    VERIFY_CODE_STOP_LOADING,
    VERIFY_CODE_UPDATE_1,
    VERIFY_CODE_UPDATE_2,
    VERIFY_CODE_UPDATE_3,
    VERIFY_CODE_UPDATE_4,
    VERIFY_CODE_UPDATE_5,
    RESET_PASSWORD_LOADING,
    RESET_PASSWORD_RESET,
    RESET_PASSWORD_STOP_LOADING,
    RESET_PASSWORD_UPDATE_PASSWORD,
    RESET_PASSWORD_UPDATE_PASSWORD_AGAIN
} from '../types';
import { sendMail, changePass, verify } from './../../lib/models/forgetPasswordModel';
import { StackActions, NavigationActions } from 'react-navigation';

export const updateEmail = (email) => {
    const EmailRegExp = RegExp(/^([a-zA-Z0-9._-]+@[a-z.-]+\.[a-z]{2,6})$/);
    const valid = EmailRegExp.test(email);

    if (!valid) {
        return {
            type: FORGET_PASSWORD_UPDATE_MAIL,
            error: 'Invalid email format.',
            email: email.trim()
        }
    } else {
        return {
            type: FORGET_PASSWORD_UPDATE_MAIL,
            error: '',
            email: email.trim()
        }
    }
}

export const reset = () => {
    return { type: FORGET_PASSWORD_RESET };
}

export const requestPassword = (email, navigation) => {
    return (dispatch) => {
        dispatch({ type: FORGET_PASSWORD_LOADING });

        sendMail({
            email: String(email).toLowerCase()
        }, {
            success: () => {
                navigation.navigate('VerifyCode');
                dispatch({ type: FORGET_PASSWORD_STOP_LOADING });
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: FORGET_PASSWORD_STOP_LOADING });
            }
        });
    }
}

export const updateInput = (value, id) => {
    switch (id) {
        case 1:
            return { type: VERIFY_CODE_UPDATE_1, _1: value }
        case 2:
            return { type: VERIFY_CODE_UPDATE_2, _2: value }
        case 3:
            return { type: VERIFY_CODE_UPDATE_3, _3: value }
        case 4:
            return { type: VERIFY_CODE_UPDATE_4, _4: value }
        case 5:
            return { type: VERIFY_CODE_UPDATE_5, _5: value }
    }
}

export const resetInputs = () => {
    return { type: VERIFY_CODE_RESET };
}

export const verifyCode = (code, navigation) => {
    return (dispatch) => {
        dispatch({ type: VERIFY_CODE_LOADING });

        verify({
            code: code
        }, {
            success: () => {
                navigation.navigate('ChangePassword', { code: code });
                dispatch({ type: VERIFY_CODE_STOP_LOADING });
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: VERIFY_CODE_STOP_LOADING });
            }
        })
    }
}

export const updatePassword = (password) => {
    return { type: RESET_PASSWORD_UPDATE_PASSWORD, resetPassword: password };
}

export const updatePasswordAgain = (password) => {
    return { type: RESET_PASSWORD_UPDATE_PASSWORD_AGAIN, resetPasswordRepeat: password };
}

export const resetPasswords = () => {
    return { type: RESET_PASSWORD_RESET };
}

export const changePassword = (password, again, code, navigation) => {
    return (dispatch) => {
        if (password.trim() != again.trim()) {
            alert('confirm password not match.');
        } else {
            dispatch({ type: RESET_PASSWORD_LOADING });

            changePass({
                code: code,
                password: password.trim()
            }, {
                success: () => {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
                    });
                    navigation.dispatch(resetAction);
                    alert('Password reseted successfully!');
                    dispatch({ type: RESET_PASSWORD_STOP_LOADING });
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: RESET_PASSWORD_STOP_LOADING });
                }
            })
        }
    }
}