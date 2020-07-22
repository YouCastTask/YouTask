import {
    get,
    post,
    remove,
    put
} from './';

export const myPortfolio = (token, options) => {
    get(`models/portfolio`, options, token);
}

export const getPortfolios = (id, token, options) => {
    get(`models/${id}/portfolio`, options, token);
}

export const editBio = (token, params, options) => {
    post(`models/edit-bio`, params, options, token);
}

export const getOtherImages = (id, token, options) => {
    get(`models/${id}/list-images`, options, token);
}

export const getOtherPosts = (id, token, options) => {
    get(`models/${id}/list-posts`, options, token);
}

export const getOtherVideos = (id, token, options) => {
    get(`models/${id}/list-videos`, options, token);
}

export const getImages = (token, options) => {
    get(`models/list-images`, options, token);
}

export const getVideos = (token, options) => {
    get(`models/list-videos`, options, token);
}

export const getPosts = (token, options) => {
    get(`models/list-posts`, options, token);
}