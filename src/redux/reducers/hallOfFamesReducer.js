import {
    HALL_OF_FAME_GET_ITEMS,
    HALL_OF_FAME_LOADING,
    HALL_OF_FAME_STOP_LOADING,
    HALL_OF_FAME_CATEGORIES_LOADING,
    HALL_OF_FAME_CATEGORIES_STOP_LOADING,
    HALL_OF_FAME_GET_CATEGORIES,
    HALL_OF_FAME_SET_CATEGORIES,
    HALL_OF_FAME_RESET,
    HALL_OF_FAME_SEARCH_LOADING,
    HALL_OF_FAME_SEARCH_SET_ITEMS,
    HALL_OF_FAME_SEARCH_STOP_LOADING,
    HALL_OF_FAME_TOGGLE_SEARCH,
    HALL_OF_FAME_RESET_SEARCH
} from '../types';

const initState = {
    loading: true,
    categoryLoading: false,
    items: [],
    categories: [],
    loaded: false,
    search: [],
    searchLoading: false,
    showSearch: false
}

export default (state = initState, action) => {
    switch (action.type) {

        case HALL_OF_FAME_SEARCH_LOADING:
            return { ...state, searchLoading: true };

        case HALL_OF_FAME_SEARCH_SET_ITEMS:
            return { ...state, search: action.items };

        case HALL_OF_FAME_SEARCH_STOP_LOADING:
            return { ...state, searchLoading: false };

        case HALL_OF_FAME_TOGGLE_SEARCH:
            return { ...state, showSearch: !state.showSearch };

        case HALL_OF_FAME_CATEGORIES_LOADING:
            return { ...state, categoryLoading: true };

        case HALL_OF_FAME_CATEGORIES_STOP_LOADING:
            return { ...state, categoryLoading: false };

        case HALL_OF_FAME_GET_CATEGORIES:
            return { ...state, categories: action.categories, loaded: true };

        case HALL_OF_FAME_GET_ITEMS:
            return { ...state, items: action.items };

        case HALL_OF_FAME_LOADING:
            return { ...state, loading: true };

        case HALL_OF_FAME_STOP_LOADING:
            return { ...state, loading: false };

        case HALL_OF_FAME_SET_CATEGORIES:
            return { ...state, categories: action.categories };

        case HALL_OF_FAME_RESET_SEARCH:
            return { ...state, search: [], searchLoading: false };

        case HALL_OF_FAME_RESET:
            return {
                loading: true,
                categoryLoading: false,
                items: [],
                categories: [],
                loaded: false,
                search: [],
                searchLoading: false,
                showSearch: false
            }

        default:
            return state;
    }
}