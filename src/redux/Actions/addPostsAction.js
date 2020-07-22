import {
    ADD_POSTS_LOADING,
    ADD_POSTS_STOP_LOADING,
    ADD_POSTS_UPDATE_CAPTION,
    ADD_POSTS_UPDATE_PHOTO,
    ADD_POSTS_UPDATE_VIDEO,
    ADD_POSTS_RESET,
    ADD_POSTS_SET_STATUS
} from './../types';
import { upload, addPhoto, addVideo } from './../../lib/models/addPostsModel';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-community/async-storage';
import { PermissionsAndroid } from 'react-native';
import { fetchImages, fetchVideos } from './portfolioActions';

export const reset = () => {
    return { type: ADD_POSTS_RESET };
}

const checkPermission = () => {
    return async (dispatch) => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                dispatch(checkPermission());
            }
        } catch (error) {
            throw (error);
        }
    }
}

export const pickImage = () => {
    return (dispatch) => {
        dispatch(checkPermission());

        ImagePicker.openPicker({
            cropping: true,
            mediaType: "photo",
            disableCropperColorSetters: true
        }).then(image => {
            let imageName=""//image.path.toString().substring(image.path.toString().indexOf("crop-picker/")).replace("crop-picker/","")
           const imageType=image.mime.toString().replace("image/","");
           if(imageName=="")
           {
               imageName="image."+imageType
           }
             //alert(imageName+"  "+imageType)
            const { size, height, width, mime, path, cropRect } = image;
            dispatch({ type: ADD_POSTS_UPDATE_PHOTO, image: { name: imageName, size: size, path: path, uri: path, width: width, height: height, type: mime, dimensions: cropRect } });
        })
    }
}

export const updateCaption = (caption) => {
    return { type: ADD_POSTS_UPDATE_CAPTION, caption: caption };
}

export const updateVideo = (video) => {
    return { type: ADD_POSTS_UPDATE_VIDEO, video: video };
}

export const addPost = (data, caption, navigation) => {
    return async (dispatch) => {
        dispatch({ type: ADD_POSTS_LOADING });

        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        const { type, image, video } = data;

        if (type == 'image') {
            const form = new FormData();

            form.append('images', image);

            upload(token, form, {
                success: (response) => {
                    dispatch(postPost(token, caption, { type: type, image: response.data[0] }, navigation));
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_POSTS_STOP_LOADING });
                    throw (error);
                }
            });
        } else {
            dispatch(postPost(token, caption, { type: type, video: video }, navigation));
        }

    }
}

const postPost = (token, caption, data, navigation) => {
    return (dispatch) => {
        const { type, image, video } = data;

        if (type == 'image') {
            addPhoto(token, {
                caption: caption,
                post_image: image
            }, {
                success: () => {
                    dispatch(fetchImages(navigation));
                    alert("Your Photo Is Posted Successfully");
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_POSTS_STOP_LOADING });
                    throw (error);
                }
            });
        } else {
            addVideo(token, {
                caption: caption,
                video_url: video
            }, {
                success: () => {
                    dispatch(fetchVideos(navigation));
                    alert("Your Video Was Posted Successfully");
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_POSTS_STOP_LOADING });
                    throw (error);
                }
            })
        }
    }
}

export const validateUrl = (url) => {
    return (dispatch) => {
        let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
        let match = url.match(regExp);
        if (url == '') {
            dispatch({ type: ADD_POSTS_SET_STATUS, status: 'No url found', statusCode: null });
        } else if (match && match[2].length == 11) {
            dispatch({ type: ADD_POSTS_SET_STATUS, status: 'You can post your video', statusCode: 1 });
        } else {
            dispatch({ type: ADD_POSTS_SET_STATUS, status: 'Invalid URL', statusCode: 0 });
        }
    }
}