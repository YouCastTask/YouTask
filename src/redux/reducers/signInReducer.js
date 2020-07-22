import {
    SIGN_IN_LOADING,
    SIGN_IN_RESET,
    SIGN_IN_STOP_LOADING,
    SIGN_IN_UPDATE_NAME,
    SIGN_IN_UPDATE_PASSWORD
} from '../types';

const initState = {
    username: "",
    password: "",
    loading: false,
    errorMSG: ""
}

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_IN_LOADING:
            return { ...state, loading: true };

        case SIGN_IN_STOP_LOADING:
            return { ...state, loading: false, errorMSG: action.error };

        case SIGN_IN_UPDATE_NAME:
            return { ...state, username: action.name };

        case SIGN_IN_UPDATE_PASSWORD:
            return { ...state, password: action.password };

        case SIGN_IN_RESET:
            return {
                username: "",
                password: "",
                loading: false,
                errorMSG: ""
            };

        default:
            return state;
    }
}