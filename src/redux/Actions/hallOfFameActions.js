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
import { getModels, follow, unfollow, fetchCategories, searchModels } from './../../lib/models/hallOfFameModel';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';

export const getUsers = (type, from) => {
    return async (dispatch) => {
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        from ? dispatch({ type: HALL_OF_FAME_CATEGORIES_LOADING }) : dispatch({ type: HALL_OF_FAME_LOADING });

        getModels(type, token, {
            success: (response) => {
                const newArr = [];

                _.each(response.data, item => {
                    newArr.push({ ...item, loading: false });
                });

                dispatch({ type: HALL_OF_FAME_STOP_LOADING });
                dispatch({ type: HALL_OF_FAME_CATEGORIES_STOP_LOADING });
                dispatch({ type: HALL_OF_FAME_GET_ITEMS, items: newArr });
            },
            error: (error) => {
                dispatch({ type: HALL_OF_FAME_STOP_LOADING });
                dispatch({ type: HALL_OF_FAME_CATEGORIES_STOP_LOADING });
                throw (error);
            }
        })
    }
}

export const reset = () => {
    return { type: HALL_OF_FAME_RESET };
}

export const setCategories = (categories) => {
    return { type: HALL_OF_FAME_SET_CATEGORIES, categories: categories };
}

export const getCategories = () => {
    return async (dispatch) => {

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        fetchCategories(token, {
            success: (response) => {
                const newArr = [];

                _.each(response.data, (item, i) => {
                    if (i == 0) {
                        newArr.push({ title: item.name, active: true });
                    } else {
                        newArr.push({ title: item.name, active: false });
                    }
                });

                dispatch(getUsers(newArr[0].title));

                dispatch({ type: HALL_OF_FAME_GET_CATEGORIES, categories: newArr });
            },
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        });
    }
}

export const follow_unfollow = (id, arr, action, index, search) => {
    return async (dispatch) => {
        dispatch({ type: HALL_OF_FAME_GET_ITEMS, items: arr });
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        if (action) {
            unfollow(id, token, {
                success: () => {
                    arr[index].loading = false;
                    arr[index].is_following = false;
                    search ? dispatch({ type: HALL_OF_FAME_SEARCH_SET_ITEMS, items: arr }) : dispatch({ type: HALL_OF_FAME_GET_ITEMS, items: arr });
                },
                error: () => {
                    arr[index].loading = false;
                    arr[index].is_following = true;
                    search ? dispatch({ type: HALL_OF_FAME_SEARCH_SET_ITEMS, items: arr }) : dispatch({ type: HALL_OF_FAME_GET_ITEMS, items: arr });
                }
            });
        } else {
            follow(id, token, {
                success: () => {
                    arr[index].loading = false;
                    arr[index].is_following = true;
                    search ? dispatch({ type: HALL_OF_FAME_SEARCH_SET_ITEMS, items: arr }) : dispatch({ type: HALL_OF_FAME_GET_ITEMS, items: arr });
                },
                error: () => {
                    arr[index].loading = false;
                    arr[index].is_following = false;
                    search ? dispatch({ type: HALL_OF_FAME_SEARCH_SET_ITEMS, items: arr }) : dispatch({ type: HALL_OF_FAME_GET_ITEMS, items: arr });
                }
            });
        }

    }
}

export const toggleSearch = () => {
    return { type: HALL_OF_FAME_TOGGLE_SEARCH };
}

export const getSearchResults = (query) => {
    return async (dispatch) => {
        dispatch({ type: HALL_OF_FAME_SEARCH_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        searchModels(query, token, {
            success: (response) => {
                let newArr = [];

                _.each(response.data, item => {
                    newArr.push({ ...item, loading: false });
                });

                dispatch({ type: HALL_OF_FAME_SEARCH_SET_ITEMS, items: newArr });
                dispatch({ type: HALL_OF_FAME_SEARCH_STOP_LOADING });
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: HALL_OF_FAME_SEARCH_STOP_LOADING });
                throw (error);
            }
        });
    }
}

export const resetSearch = () => {
    return { type: HALL_OF_FAME_RESET_SEARCH };
}