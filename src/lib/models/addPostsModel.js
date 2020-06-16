import {
    post
} from './';

export const upload = (token, params, options) => {
    post(`_uploader/posts/upload`, params, options, token);
}

export const addPhoto = (token, params, options) => {
    post(`posts/add-image`, params, options, token);
}

export const addVideo = (token, params, options) => {
    post(`posts/add-video`, params, options, token);
}