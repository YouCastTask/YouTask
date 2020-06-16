import {
    PROFILE_GET_INFO,
    PROFILE_LOADING,
    PROFILE_STOP_LOADING
} from './../types';

const initState = {
    loading: true,
    info: '',
    images: [],
    videos: []
}

export default (state = initState, action) => {
    switch (action.type) {
        case PROFILE_GET_INFO:
            return { ...state, info: action.info, images: action.images, videos: action.videos };

        case PROFILE_LOADING:
            return { ...state, loading: true };

        case PROFILE_STOP_LOADING:
            return { ...state, loading: false };

        default:
            return state;
    }
}