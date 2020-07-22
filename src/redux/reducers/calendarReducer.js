import {
    CALENDAR_SET_MARKED_DAYS,
    CALENDAR_LOADING,
    CALENDAR_STOP_LOADING,
    CALENDAR_RESET
} from './../types';

const initState = {
    days: [],
    markedDates: {},
    initDate: new Date(),
    loading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case CALENDAR_SET_MARKED_DAYS:
            return { ...state, markedDates: action.dates, days: action.days };

        case CALENDAR_LOADING:
            return { ...state, loading: true };

        case CALENDAR_STOP_LOADING:
            return { ...state, loading: false };

        case CALENDAR_RESET:
            return {
                days: [],
                markedDates: {},
                initDate: new Date(),
                loading: false
            };

        default:
            return state;
    }
}