import { get } from './';

export const getContact = (token, options) => {
    get(`contact-us`, options, token);
}