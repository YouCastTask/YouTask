import {
    get
} from './';

export const getPosts = (category, type, token, options) => {
    get(`posts?channel=${category}&query=${type}`, options, token);
}
export const getMainTabs = (token, options) => {
    get('model-category', options, token);
}

export const upVote = (id, token, options) => {
    get(`posts/${id}/upvote`, options, token)
}

export const downVote = (id, token, options) => {
    get(`posts/${id}/downvote`, options, token);
}