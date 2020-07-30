import {
    ADD_POSTS_LOADING,
    ADD_POSTS_STOP_LOADING,
    ADD_POSTS_UPDATE_CAPTION,
    ADD_POSTS_UPDATE_PHOTO,
    ADD_POSTS_UPDATE_VIDEO,
    ADD_POSTS_RESET,
    ADD_POSTS_SET_STATUS
} from './../types';

import {strings} from "./../../translations/translation"

const initState = {
    image: {},
    caption: '',
    video: '',
    status: strings.noUrl,
    statusCode: null,
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_POSTS_LOADING:
            return { ...state, loading: true };

        case ADD_POSTS_STOP_LOADING:
            return { ...state, loading: false };

        case ADD_POSTS_UPDATE_CAPTION:
            return { ...state, caption: action.caption };

        case ADD_POSTS_UPDATE_PHOTO:
            return { ...state, image: action.image };

        case ADD_POSTS_UPDATE_VIDEO:
            return { ...state, video: action.video };

        case ADD_POSTS_SET_STATUS:
            return { ...state, status: action.status, statusCode: action.statusCode };

        case ADD_POSTS_RESET:
            return {
                image: {},
                caption: '',
                video: '',
                loading: false,
                status: strings.noUrl,
                statusCode: null
            };

        default:
            return state;
    }
}