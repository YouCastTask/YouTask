import {
    get
} from './';

export const getModels = (type, token, options) => {
    get(`models?category=${type}`, options, token);
}

export const follow = (id, token, options) => {
    get(`models/${id}/follow`, options, token);
}

export const unfollow = (id, token, options) => {
    get(`models/${id}/unfollow`, options, token);
}

export const fetchCategories = (token, options) => {
    get(`model-category`, options, token);
}

export const searchModels = (name, token, options) => {
    get(`models?term=${name}`, options, token);
}