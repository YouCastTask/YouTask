import {
    SIGN_UP_UPDATE_NAME,
    SIGN_UP_UPDATE_EMAIL,
    SIGN_UP_UPDATE_PASSWORD,
    SIGN_UP_UPDATE_PHONE,
    SIGN_UP_UPDATE_MONTH,
    SIGN_UP_UPDATE_YEAR,
    SIGN_UP_UPDATE_DAY,
    SIGN_UP_UPDATE_IMAGES,
    SIGN_UP_SET_MONTHS,
    SIGN_UP_SET_YEARS,
    SIGN_UP_SET_DAYS,
    SIGN_UP_LOADING,
    SIGN_UP_RESET,
    SIGN_UP_STOP_LOADING,
    SIGN_UP_SET_CITES,
    SIGN_UP_SET_COUNTRIES,
    SIGN_UP_UPDATE_CITY,
    SIGN_UP_UPDATE_COUNTRY
} from './../types';

const initState = {
    fullname: '',
    email: '',
    emailError: '',
    password: '',
    phone: '',
    phoneError: '',
    month: '',
    day: '',
    year: '',
    country: '',
    city: '',
    iso: '',
    id: 0,
    cites: [],
    countries: [],
    images: [],
    months: [],
    days: [],
    years: [],
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case SIGN_UP_UPDATE_CITY:
            return { ...state, city: action.city, id: action.id };

        case SIGN_UP_UPDATE_COUNTRY:
            return { ...state, country: action.country, iso: action.iso };

        case SIGN_UP_UPDATE_NAME:
            return { ...state, fullname: action.name };

        case SIGN_UP_UPDATE_PASSWORD:
            return { ...state, password: action.password };

        case SIGN_UP_UPDATE_PHONE:
            return { ...state, phone: action.phone, phoneError: action.error };

        case SIGN_UP_UPDATE_YEAR:
            return { ...state, year: action.year };

        case SIGN_UP_LOADING:
            return { ...state, loading: true };

        case SIGN_UP_SET_CITES:
            return { ...state, cites: action.cites };

        case SIGN_UP_SET_COUNTRIES:
            return { ...state, countries: action.countries };

        case SIGN_UP_SET_DAYS:
            return { ...state, days: action.days };

        case SIGN_UP_SET_MONTHS:
            return { ...state, months: action.months };

        case SIGN_UP_SET_YEARS:
            return { ...state, years: action.years };

        case SIGN_UP_STOP_LOADING:
            return { ...state, loading: false };

        case SIGN_UP_UPDATE_DAY:
            return { ...state, day: action.day };

        case SIGN_UP_UPDATE_EMAIL:
            return { ...state, email: action.email, emailError: action.error };

        case SIGN_UP_UPDATE_IMAGES:
            return { ...state, images: action.images };

        case SIGN_UP_UPDATE_MONTH:
            return { ...state, month: action.month };

        case SIGN_UP_RESET:
            return {
                fullname: '',
                email: '',
                password: '',
                phone: '',
                month: '',
                day: '',
                year: '',
                country: '',
                city: '',
                images: [],
                loading: false
            };

        default:
            return state;
    }
}