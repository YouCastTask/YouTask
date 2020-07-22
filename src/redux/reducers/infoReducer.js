import {
    INFO_GET_PACKAGES,
    INFO_LOADING,
    INFO_STOP_LOADING,
    INFO_SET_USER,
    INFO_SUBSCRIBE_STOP_LOADING,
    INFO_SUBSCRIBE_LOADING
} from './../types';

const initState = {
    loading: true,
    subscribeLoading: false,
    packages: [],
    details: [],
    userInfo: {}
}

export default (state = initState, action) => {
    switch (action.type) {
        case INFO_LOADING:
            return { ...state, loading: true };

        case INFO_STOP_LOADING:
            return { ...state, loading: false };

        case INFO_GET_PACKAGES:
            return { ...state, packages: action.packages, details: action.details };

        case INFO_SET_USER:
            return { ...state, userInfo: action.user };

        case INFO_SUBSCRIBE_STOP_LOADING:
            return { ...state, subscribeLoading: false };

        case INFO_SUBSCRIBE_LOADING:
            return { ...state, subscribeLoading: true };

        default:
            return state;
    }
}