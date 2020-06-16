import {
    remove,
    get,
    post
} from './';

export const removePost = (id, token, options) => {
    remove(`posts/${id}/delete`, options, token);
}

export const setCover = (id, token, options) => {
    get(`posts/${id}/set-cover`, options, token);
}

export const editCaption = (id, token, params, options) => {
    post(`posts/${id}/edit-caption`, params, options, token);
}