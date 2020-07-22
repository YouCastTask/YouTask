import {
    get
} from './';

export const getInfo = (token, options) => {
    get(`models/profile`, options, token);
}