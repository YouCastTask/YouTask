import {
    CONTACT_US_GET_ITEMS,
    CONTACT_US_LOADING,
    CONTACT_US_STOP_LOADING
} from './../types';

const initState = {
    info: {},
    loading: true
}

export default (state = initState, action) => {
    switch (action.type) {
        case CONTACT_US_GET_ITEMS:
            return { ...state, info: action.info };

        case CONTACT_US_LOADING:
            return { ...state, loading: true };

        case CONTACT_US_STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
}