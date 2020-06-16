import {
    post
} from './';

export const sendMail = (params, options) => {
    post(`users/forgot-password`, params, options);
}

export const verify = (params, options) => {
    post(`users/validate-code`, params, options);
}

export const changePass = (params, options) => {
    post(`users/reset-password`, params, options);
}