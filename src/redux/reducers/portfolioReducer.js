import {
    PORTFOLIO_EDIT_BIO,
    PORTFOLIO_GET_ABOUT,
    PORTFOLIO_GET_EDUCATION,
    PORTFOLIO_GET_EXPERIENCE,
    PORTFOLIO_GET_TALENTS,
    PORTFOLIO_GET_PHOTO,
    PORTFOLIO_GET_POSTS,
    PORTFOLIO_GET_VIDEO,
    PORTFOLIO_LOADING,
    PORTFOLIO_SECTION_LOADING,
    PORTFOLIO_SECTION_STOP_LOADING,
    PORTFOLIO_STOP_LOADING,
    PORTFOLIO_SET_USER_INFO,
    PORTFOLIO_GET_FOLLOWERS,
    PORTFOLIO_GET_COVER,
    PORTFOLIO_GET_PROFILE_PIC,
    PORTFOLIO_GET_ID,
    PORTFOLIO_IS_IT_ME,
    PORTFOLIO_IS_FOLLOWING,
    PORTFOLIO_RESET,
    PORTFOLIO_GET_TRAINING
} from './../types';

const initState = {
    loading: true,
    sectionLoading: false,
    about: '',
    coverUrl: '',
    education: [],
    experience: [],
    trainings:[],
    talents: [],
    editable: false,
    followers: 0,
    user: {
        name: '',
        age: '',
        location: ''
    },
    images: [],
    videos: [],
    posts: [],
    id: '',
    me: false,
    is_following: false
}

export default (state = initState, action) => {
    switch (action.type) {

        case PORTFOLIO_RESET:
            return {
                loading: true,
                sectionLoading: false,
                about: '',
                coverUrl: '',
                education: [],
                experience: [],
                trainings:[],
                talents: [],
                editable: false,
                followers: 0,
                user: {
                    name: '',
                    age: '',
                    location: ''
                },
                images: [],
                videos: [],
                posts: [],
                id: '',
                me: false,
                is_following: false
            };

        case PORTFOLIO_IS_IT_ME:
            return { ...state, me: action.me };

        case PORTFOLIO_GET_ID:
            return { ...state, id: action.id };

        case PORTFOLIO_GET_COVER:
            return { ...state, coverUrl: action.url };

        case PORTFOLIO_GET_PROFILE_PIC:
            return { ...state, profileUrl: action.profilepic };

        case PORTFOLIO_EDIT_BIO:
            return { ...state, editable: !state.editable };

        case PORTFOLIO_GET_ABOUT:
            return { ...state, about: action.about };

        case PORTFOLIO_GET_EDUCATION:
            return { ...state, education: action.education };

        case PORTFOLIO_GET_EXPERIENCE:
            return { ...state, experience: action.experience };
        case PORTFOLIO_GET_TRAINING:
            return { ...state, trainings: action.trainings };
        case PORTFOLIO_GET_PHOTO:
            return { ...state, images: action.images };

        case PORTFOLIO_GET_POSTS:
            return { ...state, posts: action.posts };

        case PORTFOLIO_GET_TALENTS:
            return { ...state, talents: action.talents };

        case PORTFOLIO_GET_VIDEO:
            return { ...state, videos: action.videos };

        case PORTFOLIO_LOADING:
            return { ...state, loading: true };

        case PORTFOLIO_SECTION_LOADING:
            return { ...state, sectionLoading: true };

        case PORTFOLIO_SECTION_STOP_LOADING:
            return { ...state, sectionLoading: false };

        case PORTFOLIO_SET_USER_INFO:
            return { ...state, user: action.user };

        case PORTFOLIO_STOP_LOADING:
            return { ...state, loading: false };

        case PORTFOLIO_GET_FOLLOWERS:
            return { ...state, followers: action.followers };

        case PORTFOLIO_IS_FOLLOWING:
            return { ...state, is_following: action.is_following };

        default:
            return state;
    }
}