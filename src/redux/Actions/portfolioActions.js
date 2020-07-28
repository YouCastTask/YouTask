import {
    PORTFOLIO_EDIT_BIO,
    PORTFOLIO_GET_ABOUT,
    PORTFOLIO_GET_EDUCATION,
    PORTFOLIO_GET_EXPERIENCE,
    PORTFOLIO_GET_TALENTS,
    PORTFOLIO_GET_TRAINING,
    PORTFOLIO_GET_PHOTO,
    PORTFOLIO_GET_POSTS,
    PORTFOLIO_GET_VIDEO,
    PORTFOLIO_LOADING,
    PORTFOLIO_SECTION_LOADING,
    PORTFOLIO_SECTION_STOP_LOADING,
    PORTFOLIO_STOP_LOADING,
    PORTFOLIO_SET_USER_INFO,
    PORTFOLIO_GET_FOLLOWERS,
    PORTFOLIO_GET_COVER,
    PORTFOLIO_GET_PROFILE_PIC,
    PORTFOLIO_GET_ID,
    PORTFOLIO_IS_IT_ME,
    ADD_POSTS_STOP_LOADING,
    PORTFOLIO_IS_FOLLOWING,
    PORTFOLIO_RESET
} from './../types';
import { Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { myPortfolio, editBio, getImages, getPosts, getVideos, getPortfolios, getOtherImages, getOtherPosts, getOtherVideos } from './../../lib/models/portfolioModel';
import { follow, unfollow } from './../../lib/models/hallOfFameModel';
import _ from 'underscore';
import { RScaler } from '../../lib/utilites';

const { width } = Dimensions.get('screen');

export const updateBio = () => {
    return { type: PORTFOLIO_EDIT_BIO };
}

export const setBio = (about) => {
    return { type: PORTFOLIO_GET_ABOUT, about: about };
}

export const getPortfolio = (id) => {
    return async (dispatch) => {

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        const info = JSON.parse(await AsyncStorage.getItem('user'));

        if (id) {
            dispatch({ type: PORTFOLIO_LOADING });

            getPortfolios(id, token, {
                success: (response) => {
                    const { bio, cover_photo, educations, age, followers_number, is_following, talents, user, work_experiences,trainings } = response.data;
                    const { city, location, name } = user;

                    dispatch({
                        type: PORTFOLIO_SET_USER_INFO, user: {
                            name: name,
                            age: age,
                            location: `${location.printable_name}, ${city.full_city_name}`
                        }
                    });

                    dispatch({ type: PORTFOLIO_GET_FOLLOWERS, followers: followers_number });
                    dispatch({ type: PORTFOLIO_GET_ABOUT, about: bio });
                    dispatch({ type: PORTFOLIO_GET_EDUCATION, education: educations });
                    dispatch({ type: PORTFOLIO_GET_EXPERIENCE, experience: work_experiences });
                    dispatch({ type: PORTFOLIO_GET_TRAINING, trainings: trainings });
                    dispatch({ type: PORTFOLIO_GET_TALENTS, talents: talents });
                    dispatch({ type: PORTFOLIO_GET_COVER, url: cover_photo });
                    dispatch({ type: PORTFOLIO_GET_PROFILE_PIC, profilepic: cover_photo });
                    dispatch({ type: PORTFOLIO_GET_ID, id: response.data.id });
                    dispatch({ type: PORTFOLIO_STOP_LOADING });
                    dispatch({ type: PORTFOLIO_IS_IT_ME, me: info.id == user.id });
                    dispatch({ type: PORTFOLIO_IS_FOLLOWING, is_following: is_following });
                },
                error: (error) => {
                    dispatch({ type: PORTFOLIO_STOP_LOADING });
                    throw (error);
                }
            })

        } else {
            dispatch({ type: PORTFOLIO_LOADING });
            const { name, location, city, model, id } = JSON.parse(await AsyncStorage.getItem('user'));

            dispatch({
                type: PORTFOLIO_SET_USER_INFO, user: {
                    name: name,
                    age: model.age,
                    location: `${location.printable_name}, ${city.full_city_name}`
                }
            });

            myPortfolio(token, {
                success: async (response) => {
                    const { id } = JSON.parse(await AsyncStorage.getItem('user'));
                    const { bio, cover_photo, educations, followers_number, talents, work_experiences, trainings } = response.data;
                    dispatch({ type: PORTFOLIO_GET_FOLLOWERS, followers: followers_number });
                    dispatch({ type: PORTFOLIO_GET_ABOUT, about: bio });
                    dispatch({ type: PORTFOLIO_GET_EDUCATION, education: educations });
                    dispatch({ type: PORTFOLIO_GET_EXPERIENCE, experience: work_experiences });
                    dispatch({ type: PORTFOLIO_GET_TRAINING, trainings: trainings });
                    dispatch({ type: PORTFOLIO_GET_TALENTS, talents: talents });
                    dispatch({ type: PORTFOLIO_GET_COVER, url: cover_photo });
                    dispatch({ type: PORTFOLIO_GET_PROFILE_PIC, profilepic: cover_photo });
                    dispatch({ type: PORTFOLIO_GET_ID, id: response.data.id });
                    dispatch({ type: PORTFOLIO_STOP_LOADING });
                    dispatch({ type: PORTFOLIO_IS_IT_ME, me: response.data.user.id == id });
                },
                error: (error) => {
                    dispatch({ type: PORTFOLIO_STOP_LOADING });
                    alert(error.response.data.message);
                    throw (error);
                }
            })

        }
    }
}

export const follow_unfollow = (id, action, number) => {
    return async (dispatch) => {

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        if (action) {
            dispatch({ type: PORTFOLIO_IS_FOLLOWING, is_following: false });
            dispatch({ type: PORTFOLIO_GET_FOLLOWERS, followers: number - 1 });

            unfollow(id, token, {
                error: () => {
                    dispatch({ type: PORTFOLIO_IS_FOLLOWING, is_following: true });
                    dispatch({ type: PORTFOLIO_GET_FOLLOWERS, followers: number + 1 });
                }
            })
        } else {
            dispatch({ type: PORTFOLIO_IS_FOLLOWING, is_following: true });
            dispatch({ type: PORTFOLIO_GET_FOLLOWERS, followers: number + 1 });

            follow(id, token, {
                error: (error) => {
                    dispatch({ type: PORTFOLIO_IS_FOLLOWING, is_following: false });
                    dispatch({ type: PORTFOLIO_GET_FOLLOWERS, followers: number - 1 });
                }
            })
        }
    }
}

export const postBio = (bio) => {
    return async () => {
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        editBio(token, {
            bio: bio
        }, {
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        })
    }
}

export const fetchImages = (navigation, id, from) => {
    return async (dispatch) => {
        dispatch({ type: PORTFOLIO_SECTION_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        if (id) {
            getOtherImages(id, token, {
                success: (response) => {
                    dispatch({ type: PORTFOLIO_GET_PHOTO, images: response.data });
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    from ? navigation.goBack() : null
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    throw (error);
                }
            })
        } else {
            getImages(token, {
                success: (response) => {
                    dispatch({ type: PORTFOLIO_GET_PHOTO, images: response.data });
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    navigation ? dispatch({ type: ADD_POSTS_STOP_LOADING }) : null;
                    navigation ? navigation.goBack() : null;
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    throw (error);
                }
            });
        }

    }
}

export const fetchVideos = (navigation, id, from) => {
    return async (dispatch) => {
        dispatch({ type: PORTFOLIO_SECTION_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        if (id) {
            getOtherVideos(id, token, {
                success: (response) => {
                    dispatch({ type: PORTFOLIO_GET_VIDEO, videos: response.data });
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    from ? navigation.goBack() : null;
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    throw (error);
                }
            })
        } else {
            getVideos(token, {
                success: (response) => {
                    dispatch({ type: PORTFOLIO_GET_VIDEO, videos: response.data });
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    navigation ? dispatch({ type: ADD_POSTS_STOP_LOADING }) : null;
                    navigation ? navigation.goBack() : null;
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    throw (error);
                }
            });
        }
    }
}

export const fetchPosts = (id) => {
    return async (dispatch) => {
        let newArr = [];
        dispatch({ type: PORTFOLIO_SECTION_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));

        if (id) {
            getOtherPosts(id, token, {
                success: (response) => {
                    if (response.data.length > 0) {
                        _.each(response.data, (item, index) => {
                            let height;
                            Image.getSize(item.type == "IMAGE" ? `http://youcast.media/${item.post_image?.image_path}` : item.post_video?.video_thumbnail, (w, h) => {
                                height = (h * (width - RScaler(6))) / w;
                                newArr.push({ ...item, height: height });
                                if (response.data.length - 1 == index) {
                                    dispatch({ type: PORTFOLIO_GET_POSTS, posts: newArr });
                                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                                }
                            }, error => {
                                console.log('error', error);
                            });
                        });
                    } else {
                        dispatch({ type: PORTFOLIO_GET_POSTS, posts: response.data });
                        dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    }
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    throw (error);
                }
            });
        } else {
            getPosts(token, {
                success: (response) => {
                    if (response.data.length > 0) {
                        _.each(response.data, (item, index) => {
                            let height;
                            Image.getSize(item.type == "IMAGE" ? `http://youcast.media/${item.post_image?.image_path}` : item.post_video?.video_thumbnail, (w, h) => {
                                height = (h * (width - RScaler(6))) / w;
                                newArr.push({ ...item, height: height });
                                if (response.data.length - 1 == index) {
                                    dispatch({ type: PORTFOLIO_GET_POSTS, posts: newArr });
                                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                                }
                            }, error => {
                                console.log('error', error);
                            });
                        });
                    } else {
                        dispatch({ type: PORTFOLIO_GET_POSTS, posts: response.data });
                        dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    }
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: PORTFOLIO_SECTION_STOP_LOADING });
                    throw (error);
                }
            });
        }

    }
}

export const reset = () => {
    return { type: PORTFOLIO_RESET };
}