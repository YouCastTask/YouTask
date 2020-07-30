import {
    HOME_CATEGORY_LOADING,
    HOME_CATEGORY_STOP_LOADING,
    HOME_GET_ITEMS,
    HOME_LOADING,
    HOME_STOP_LOADING,
    HOME_SET_CATEGORIES,
    HOME_SET_MIAN_TABS
} from './../types';
import {strings} from "./../../translations/translation"

const initState = {
    posts: [],
    loading: true,
    sectionLoading: false,
    mainTabs: [],
    tabs: [{
        title: "Hot",
        active: true
    }, {
        title: "Fresh",
        active: false
    }, {
        title: "Following",
        active: false
    }]
}

export default (state = initState, action) => {
    switch (action.type) {
        case HOME_CATEGORY_LOADING:
            return { ...state, sectionLoading: true };

        case HOME_CATEGORY_STOP_LOADING:
            return { ...state, sectionLoading: false };

        case HOME_GET_ITEMS:
            return { ...state, posts: action.posts };

        case HOME_LOADING:
            return { ...state, loading: true };

        case HOME_STOP_LOADING:
            return { ...state, loading: false };

        case HOME_SET_CATEGORIES:
            return { ...state, tabs: action.tabs };

        case HOME_SET_MIAN_TABS:
            return { ...state,mainTabs:action.mainTabs};
        default:
            return state;
    }
}