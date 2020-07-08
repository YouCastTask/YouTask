import {
    post,
    get
} from './';

export const login = (params, options) => {
    post(`login_check`, params, options);
}

export const getUser = (token, options) => {
    get(`users/user-data`,  token,options);
}