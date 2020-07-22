import {
    HOME_CATEGORY_LOADING,
    HOME_CATEGORY_STOP_LOADING,
    HOME_GET_ITEMS,
    HOME_LOADING,
    HOME_STOP_LOADING,
    HOME_SET_CATEGORIES,
    PORTFOLIO_GET_POSTS,
    HOME_SET_MIAN_TABS
} from './../types';
import { Platform, Image, Dimensions } from 'react-native';
import { YouTubeStandaloneAndroid, YouTubeStandaloneIOS } from 'react-native-youtube';
import { getPosts, upVote, downVote ,getMainTabs} from './../../lib/models/homeModel';
import { follow, unfollow } from './../../lib/models/hallOfFameModel';
import AsyncStorage from '@react-native-community/async-storage';
import _ from 'underscore';
import { getUser } from '../../lib/models/signinModel';
import { RScaler } from '../../lib/utilites';

const { width } = Dimensions.get('screen');

export const fetchPosts = (category,type, from) => {
    return async (dispatch) => {
        let newArr = [];
        dispatch(getUserInfo());
        dispatch({ type: HOME_GET_ITEMS, posts: [] });
        from ? dispatch({ type: HOME_CATEGORY_LOADING }) : dispatch({ type: HOME_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        getPosts(String(category).toLowerCase(),type.toLowerCase(), token, {
            success: (response) => {
                if(response.data.length>0)
                {
                    _.each(response.data, (item, index) => {
                        let height;
                        if(item.type!=null)
                        {
                            Image.getSize(item.type == "IMAGE" ? `http://youcast.media/${item.post_image?.image_path}` : item.post_video?.video_thumbnail, (w, h) => {
                                height = (h * (width - RScaler(6))) / w;
                                newArr.push({ ...item, height: height });
                                if (response.data.length - 1 == index) {
                                    dispatch({ type: HOME_GET_ITEMS, posts: newArr });
                                    dispatch({ type: HOME_CATEGORY_STOP_LOADING });
                                    dispatch({ type: HOME_STOP_LOADING });
                                }
                            }, error => {
                                console.log('error', error);
                            });
                        }
                        else
                        {
                            dispatch({ type: HOME_GET_ITEMS, posts: newArr });
                            dispatch({ type: HOME_CATEGORY_STOP_LOADING });
                            dispatch({ type: HOME_STOP_LOADING });
                        }
                       
                    });
                }
                else
                {
                    
                    dispatch({ type: HOME_GET_ITEMS, posts: newArr });
                    dispatch({ type: HOME_CATEGORY_STOP_LOADING });
                    dispatch({ type: HOME_STOP_LOADING });
                }
              
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: HOME_CATEGORY_STOP_LOADING });
                dispatch({ type: HOME_STOP_LOADING });
            }
        });
    }
}

export const setTabs = (tabs) => {
    return { type: HOME_SET_CATEGORIES, tabs: tabs }
}

export const setMainTabs = () => {
    return async (dispatch) => {
    dispatch({ type: HOME_LOADING });
    const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
    getMainTabs( token, {
        success: (response) => {
                dispatch({type:HOME_SET_MIAN_TABS,mainTabs:response.data})
        },
        error: (error) => {
            alert(error.response.data.message);
        }
    });
    }
  
}

export const voteUp = (id, arr, index, from) => {
    return async (dispatch) => {

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        upVote(id, token, {
            success: (res) => {
                arr[index].vote_value = res.data.vote_value;
                arr[index].points = res.data.points;
                dispatch({ type: HOME_GET_ITEMS, posts: arr });
                from ? dispatch({ type: PORTFOLIO_GET_POSTS, posts: arr }) : null;
            },
            error: () => { }
        });
    }
}

export const voteDown = (id, arr, index, from) => {
    return async (dispatch) => {

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        downVote(id, token, {
            success: (res) => {
                arr[index].vote_value = res.data.vote_value;
                arr[index].points = res.data.points;
                dispatch({ type: HOME_GET_ITEMS, posts: arr });
                from ? dispatch({ type: PORTFOLIO_GET_POSTS, posts: arr }) : null;
            },
            error: () => { }
        });
    }
}

export const follow_unfollow = (id, arr, action, model) => {
    return async (dispatch) => {

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        if (action) {
            dispatch({ type: HOME_GET_ITEMS, posts: dispatch(changeArr(arr, model, false)) });
            unfollow(id, token, {
                error: () => {
                    dispatch({ type: HOME_GET_ITEMS, posts: dispatch(changeArr(arr, model, true)) });
                }
            });
        } else {
            dispatch({ type: HOME_GET_ITEMS, posts: dispatch(changeArr(arr, model, true)) });
            follow(id, token, {
                error: () => {
                    dispatch({ type: HOME_GET_ITEMS, posts: dispatch(changeArr(arr, model, false)) });
                }
            });
        }
    }
}

const changeArr = (arr, model, action) => {
    return () => {
        const newArr = [];

        _.each(arr, item => {
            newArr.push({
                ...item, model: {
                    "avatar": item.model.avatar,
                    "followers_number": item.model.followers_number,
                    "id": item.model.id,
                    "is_following": item.model.id == model.id ? action : item.model.is_following,
                    "user": { "id": item.model.user.id, "name": item.model.user.name }
                }
            });
        });

        return newArr;
    }

}

export const playYoutubeVideo = (url) => {
    return () => {
        const key = 'AIzaSyCPFY7365Q1Zl5vLS5GlUd1xtO0uno3UC4';
        const VID_REGEX = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        const videoId = url.match(VID_REGEX)[1];
        if (Platform.OS === 'android') {
            YouTubeStandaloneAndroid.playVideo({
                apiKey: key,
                videoId: videoId,
                autoplay: true
            }).catch(error => alert(JSON.stringify(error)));
        } else if (Platform.OS === 'ios') {
            YouTubeStandaloneIOS.playVideo(videoId)
                .catch(error => alert(JSON.stringify(error)));
        }
    }
}

const getUserInfo = () => {
    return async () => {
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        getUser(token, {
            success: async (response) => {
                await AsyncStorage.setItem('user', JSON.stringify(response.data), (error) => {
                    if (!error) {
                        global.type = response.data.current_user_subscription_plan?.confirmed ? response.data.current_user_subscription_plan.subscription_plan.title : 'Invalid';
                    }
                });
            },
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        })
    }
}