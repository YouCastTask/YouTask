import {
    get,
    post
} from './';

export const getAuditions = (token, options) => {
    get(`audition`, options, token);
}

export const actionOnAudition = (id, type, token, options) => {
    get(`audition/${id}/${type}`, options, token);
}

export const getAudition = (id, token, options) => {
    get(`audition/${id}`, options, token);
}

export const updateDates = (token, params, options) => {
    post(`models/calendar`, params, options, token);
}