import { get } from './';

export const getPackages = (token, options) => {
    get(`subscription-plans/details`, options, token);
}

export const subscripeToPlane = (id, token, options) => {
    get(`users/subscribe/${id}`, options, token);
}