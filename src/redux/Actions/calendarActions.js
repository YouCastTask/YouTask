import {
    CALENDAR_SET_MARKED_DAYS,
    CALENDAR_LOADING,
    CALENDAR_STOP_LOADING,
    CALENDAR_RESET
} from './../types';
import { Colors } from './../../../app.json';
import { updateDates } from './../../lib/models/auditionModel';
import _ from 'underscore';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import { fetchAudition } from './auditionActions';

export const addDay = (day, days, type) => {
    return (dispatch) => {

        days.push({ day: day, type: type ? "free" : "blocked" });
        let newObj = {};

        days.forEach(item => {
            const { day, type } = item;
            let details = type == "free" ? { color: Colors.orange, textColor: Colors.white } : { color: Colors.dark, textColor: Colors.white };
            newObj[day] = details;
        });

        dispatch({
            type: CALENDAR_SET_MARKED_DAYS,
            dates: newObj,
            days: days
        });
    }
}

export const reset = () => {
    return { type: CALENDAR_RESET };
}

export const editCalendar = (dates, id, navigation) => {
    return async (dispatch) => {
        dispatch({ type: CALENDAR_LOADING });
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        let newArr = [];

        _.each(dates, item => {
            const msDate = parseInt(new Date(new Date(moment(item.day)).toUTCString()).getTime()) + 86400000;
            const unixCode = msDate / 1000;

            newArr.push({ dateAt: unixCode, available: item.type == 'free' });
        })

        updateDates(token, {
            calendars: newArr,
            audition: id
        }, {
            success: () => {
                dispatch(fetchAudition(id, true, navigation));
            },
            error: (error) => {
                alert(error.response.data.message);
                dispatch({ type: CALENDAR_STOP_LOADING });
                throw (error);
            }
        })

    }
}