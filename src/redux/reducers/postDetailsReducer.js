import {
    POST_DETAILS_LOADING,
    POST_DETAILS_RESET,
    POST_DETAILS_SET_ITEM,
    POST_DETAILS_STOP_LOADING,
    POST_DETAILS_EDIT,
    POST_DETAILS_UPADTE_CAPTION
} from './../types';

const initState = {
    loading: false,
    item: {},
    editable: false,
    caption: ''
}

export default (state = initState, action) => {
    switch (action.type) {
        case POST_DETAILS_LOADING:
            return { ...state, loading: true };

        case POST_DETAILS_RESET:
            return { ...state, loading: false, item: {}, editable: false, caption: '' }

        case POST_DETAILS_SET_ITEM:
            return { ...state, item: action.item };

        case POST_DETAILS_STOP_LOADING:
            return { ...state, loading: false };

        case POST_DETAILS_EDIT:
            return { ...state, editable: action.editable };

        case POST_DETAILS_UPADTE_CAPTION:
            return { ...state, caption: action.caption };

        default:
            return state;
    }
}