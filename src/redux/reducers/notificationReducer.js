import {
    NOTIFICATION_GET_ITEMS,
    NOTIFICATION_STOP_LOADING,
    NOTIFICATION_LOADING
} from './../types';

const initState = {
    notifications: [],
    loading: true
}

export default (state = initState, action) => {
    switch (action.type) {
        case NOTIFICATION_GET_ITEMS:
            return { ...state, notifications: action.notifications };

        case NOTIFICATION_LOADING:
            return { ...state, loading: true };

        case NOTIFICATION_STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
}