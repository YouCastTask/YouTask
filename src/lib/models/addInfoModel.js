import {
    post
} from './';

export const addExp = (token, params, options) => {
    post(`models/work-experience`, params, options, token);
}

export const addEducation = (token, params, options) => {
    post(`models/education`, params, options, token);
}
export const addTalent = (token, params, options) => {
    post(`models/talent`, params, options, token);
}

export const addTraining = (token, params, options) => {
    post(`models/training`, params, options, token);
}