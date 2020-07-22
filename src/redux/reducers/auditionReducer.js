import {
    AUDITION_GET_AUDITIONS,
    AUDITION_LOADING,
    AUDITION_STOP_LOADING,
    AUDITION_DETAILS_LOADING,
    AUDITION_DETAILS_STOP_LOADING,
    AUDITION_DETAILS_GET_ITEM,
    AUDITION_DETAILS_LOADING_POPUP
} from '../types';

const initState = {
    loading: false,
    auditions: [],
    detailsLoading: false,
    loadingDetails: true,
    auditionDetails: {}
}

export default (state = initState, action) => {
    switch (action.type) {

        case AUDITION_GET_AUDITIONS:
            return { ...state, loading: false, auditions: action.auditions };

        case AUDITION_LOADING:
            return { ...state, loading: true };

        case AUDITION_STOP_LOADING:
            return { ...state, loading: false };

        case AUDITION_DETAILS_LOADING_POPUP:
            return { ...state, detailsLoading: true };

        case AUDITION_DETAILS_STOP_LOADING:
            return { ...state, detailsLoading: false, loadingDetails: false };

        case AUDITION_DETAILS_GET_ITEM:
            return { ...state, auditionDetails: action.auditionDetails };

        case AUDITION_DETAILS_LOADING:
            return { ...state, loadingDetails: true };

        default:
            return state;
    }
}