import {
    POST_DETAILS_LOADING,
    POST_DETAILS_RESET,
    POST_DETAILS_SET_ITEM,
    POST_DETAILS_STOP_LOADING,
    POST_DETAILS_EDIT,
    POST_DETAILS_UPADTE_CAPTION,
    PORTFOLIO_GET_COVER
} from './../types';
import { Alert } from 'react-native';
import { upVote, downVote } from './../../lib/models/homeModel';
import AsyncStorage from '@react-native-community/async-storage';
import { removePost, editCaption, setCover } from './../../lib/models/postDetailsModel';
import { fetchImages, fetchVideos } from './portfolioActions';
import { strings } from '../../translations/translation';

export const setPost = (post) => {
    return { type: POST_DETAILS_SET_ITEM, item: post };
}

export const editPost = (editable) => {
    return { type: POST_DETAILS_EDIT, editable: editable };
}

export const reset = () => {
    return { type: POST_DETAILS_RESET };
}

export const voteUp = (id) => {
    return async (dispatch) => {
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        upVote(id, token, {
            success: (response) => {
                dispatch({ type: POST_DETAILS_SET_ITEM, item: response.data });
            },
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        })
    }
}

export const voteDown = (id) => {
    return async (dispatch) => {
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        downVote(id, token, {
            success: (response) => {
                dispatch({ type: POST_DETAILS_SET_ITEM, item: response.data });
            },
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        })
    }
}

export const deletePost = (id, navigation, userId) => {
    return async (dispatch) => {
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        Alert.alert(`${strings.Delete} ${strings.Post}`, strings.areYouSure, [{
            text: strings.Delete,
            onPress: () => {
                removePost(id, token, {
                    success: () => {
                        dispatch(fetchImages(navigation, userId, true));
                        dispatch(fetchVideos(navigation, userId, true));
                        alert(strings.postDeletedSuccessfully);
                    },
                    error: (error) => {
                        alert(error.response.data.message);
                        throw (error);
                    }
                });
            }
        }, {
            text: strings.Cancel
        }]);
    }
}

export const updateCaption = (caption) => {
    return { type: POST_DETAILS_UPADTE_CAPTION, caption: caption };
}

export const updatePost = (caption, item, navigation) => {
    return async (dispatch) => {
        dispatch({ type: POST_DETAILS_SET_ITEM, item: { ...item, caption: caption } });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        editCaption(item.id, token, {
            caption: caption
        }, {
            success: () => {
                dispatch(fetchImages(navigation, item.model.id));
                dispatch(fetchVideos(navigation, item.model.id));
                alert(strings.postChangedSuccessfully);
            },
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        })
    }
}

export const updateCover = (id) => {
    return async (dispatch) => {
        dispatch({ type: POST_DETAILS_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        setCover(id, token, {
            success: (response) => {
                dispatch({ type: PORTFOLIO_GET_COVER, url: response.data.cover_photo });
                dispatch({ type: POST_DETAILS_STOP_LOADING });
                alert(strings.coverPhotoUpdatedSuccessfully);
            },
            error: (error) => {
                alert(error.response.data.error.message);
                dispatch({ type: POST_DETAILS_STOP_LOADING });
                throw (error);
            }
        })
    }
}

export const updateProfile = (id) => {
    return async (dispatch) => {
        dispatch({ type: POST_DETAILS_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        setCover(id, token, {
            success: (response) => {
                dispatch({ type: PORTFOLIO_GET_PROFILE_PIC, profilepic: response.data.cover_photo });
                dispatch({ type: POST_DETAILS_STOP_LOADING });
                alert("Your Profile Photo Was Updated");
            },
            error: (error) => {
                alert(error.response.data.error.message);
                dispatch({ type: POST_DETAILS_STOP_LOADING });
                throw (error);
            }
        })
    }
}