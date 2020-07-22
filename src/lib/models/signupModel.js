import {
    post,
    get
} from './';

export const getCountries = (options) => {
    get(`cities`, options);
}

export const signUp = (params, options) => {
    post(`users/register`, params, options);
}

export const validate = (params, options) => {
    post(`users/valid-register`, params, options);
}