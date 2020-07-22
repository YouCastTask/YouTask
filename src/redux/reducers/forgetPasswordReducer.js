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

const initState = {
    loading: false,
    email: '',
    emailError: '',
    _1: '',
    _2: '',
    _3: '',
    _4: '',
    _5: '',
    verifyLoading: false,
    newPassword: '',
    newPasswordRepeat: '',
    newPasswordLoading: false
}

export default (state = initState, action) => {
    switch (action.type) {

        case RESET_PASSWORD_UPDATE_PASSWORD_AGAIN:
            return { ...state, newPasswordRepeat: action.resetPasswordRepeat };

        case RESET_PASSWORD_UPDATE_PASSWORD:
            return { ...state, newPassword: action.resetPassword };

        case RESET_PASSWORD_STOP_LOADING:
            return { ...state, newPasswordLoading: false };

        case RESET_PASSWORD_RESET:
            return {
                ...state,
                newPassword: '',
                newPasswordRepeat: '',
                newPasswordLoading: false
            }

        case RESET_PASSWORD_LOADING:
            return { ...state, newPasswordLoading: true };

        case VERIFY_CODE_UPDATE_1:
            return { ...state, _1: action._1 };

        case VERIFY_CODE_UPDATE_2:
            return { ...state, _2: action._2 };

        case VERIFY_CODE_UPDATE_3:
            return { ...state, _3: action._3 };

        case VERIFY_CODE_UPDATE_4:
            return { ...state, _4: action._4 };

        case VERIFY_CODE_UPDATE_5:
            return { ...state, _5: action._5 };

        case VERIFY_CODE_STOP_LOADING:
            return { ...state, verifyLoading: false };

        case VERIFY_CODE_LOADING:
            return { ...state, verifyLoading: true };

        case VERIFY_CODE_RESET:
            return {
                ...state,
                _1: '',
                _2: '',
                _3: '',
                _4: '',
                _5: '',
                verifyLoading: false
            };

        case FORGET_PASSWORD_UPDATE_MAIL:
            return { ...state, email: action.email, emailError: action.error };

        case FORGET_PASSWORD_LOADING:
            return { ...state, loading: true };

        case FORGET_PASSWORD_STOP_LOADING:
            return { ...state, loading: false };

        case FORGET_PASSWORD_RESET:
            return {
                ...state,
                loading: false,
                email: '',
                emailError: ''
            }

        default:
            return state;
    }
}