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
import moment from 'moment';
import _ from 'underscore';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';
import axios from 'axios';
import { getCountries, signUp, validate } from './../../lib/models/signupModel';
import { signIn } from './signInActions';

export const selectImage = (images, index) => {
    return (dispatch) => {
        dispatch(checkPermission());

        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: "photo",
            avoidEmptySpaceAroundImage: true,
            enableRotationGesture: false,
            showCropGuidelines: true,
            hideBottomControls: true
        }).then(image => {
            const { size, height, width, mime, path } = image;
            dispatch(setImages(images, { name: image?.filename ? image?.filename : `${width}_${height}_${size}`, uri: path, size: size, path: path, width: width, height: height, type: mime }, index));
        })
    }
}

const checkPermission = () => {
    return async (dispatch) => {
        try {
            const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.CAMERA, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE]);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                dispatch(checkPermission());
            }
        } catch (error) {
            throw (error);
        }
    }
}

export const setImages = (images, newImage, index) => {
    return (dispatch) => {
        images[index] = newImage;

        dispatch({ type: SIGN_UP_UPDATE_IMAGES, images: images });
    }
}

export const setStaticData = () => {
    return (dispatch) => {
        let days = [];
        for (let i = 1; i <= 31; i++) {
            days.push({ value: i });
        }

        dispatch({ type: SIGN_UP_SET_DAYS, days: days });
        dispatch(setMonths());
    }
}

const setMonths = () => {
    return (dispatch) => {
        const stringMonths = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        let months = [];
        for (let i = 0; i < 12; i++) {
            months.push({ value: stringMonths[i] });
        }

        dispatch({ type: SIGN_UP_SET_MONTHS, months: months });
        dispatch(setYears());
    }
}

const setYears = () => {
    return (dispatch) => {
        const currentYear = moment(new Date()).format('YYYY');
        let years = [];
        for (let i = 1960; i <= parseInt(currentYear); i++) {
            years.push({ value: i });
        }

        dispatch({ type: SIGN_UP_SET_YEARS, years: years });
    }
}

export const setCities = (city) => {
    return (dispatch) => {
        const cities = [];
        _.each(city, item => {
            cities.push({ value: item.full_city_name, id: item.id });
        });

        dispatch({ type: SIGN_UP_SET_CITES, cites: cities });
    }
}

export const setCountries = () => {
    return (dispatch) => {
        getCountries({
            success: (res) => {
                const countries = [];
                _.each(res, item => {
                    if (item.cities.length > 0) {
                        countries.push({ value: item.name, cities: item.cities, iso: item.iso });
                    }
                });
                dispatch({ type: SIGN_UP_SET_COUNTRIES, countries: countries });
            },
            error: (error) => {
                alert(error.response.data.message);
                throw (error);
            }
        });

    }
}

export const updateCity = (city, id) => {
    const trim = String(city).trim();
    return { type: SIGN_UP_UPDATE_CITY, city: trim, id: id };
}

export const updateCountry = (country, iso) => {
    const trim = String(country).trim();
    return { type: SIGN_UP_UPDATE_COUNTRY, country: trim, iso: iso };
}

export const updateName = (name) => {
    return { type: SIGN_UP_UPDATE_NAME, name: name };
}

export const updateEmail = (email) => {
    const EmailRegExp = RegExp(/^([a-zA-Z0-9._-]+@[a-z.-]+\.[a-z]{2,6})$/);
    const valid = EmailRegExp.test(email);

    if (email.length == 0) {
        return {
            type: SIGN_UP_UPDATE_EMAIL,
            error: '',
            email: email.trim()
        }
    } else if (!valid) {
        return {
            type: SIGN_UP_UPDATE_EMAIL,
            error: 'Invalid email format.',
            email: email.trim()
        }
    } else {
        return {
            type: SIGN_UP_UPDATE_EMAIL,
            error: '',
            email: email.trim()
        }
    }
}

export const updatePassword = (password) => {
    const trim = String(password).trim();
    const passwordRegx = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)
    const valid = passwordRegx.test(password);

    if(password.length==0)
    {
        return {
            type: SIGN_UP_UPDATE_PASSWORD,
            error: '',
            password: trim
        }
    }
    else if (!valid) {
        return {
            type: SIGN_UP_UPDATE_PASSWORD,
            error: 'password must be 8 characters long,contain alphanumeric digits and 1 special character like @/#/&',
            password: trim
        }
    } else {
        return {
            type: SIGN_UP_UPDATE_PASSWORD,
            error: '',
            password: trim
        }
    }
    //return { type: SIGN_UP_UPDATE_PASSWORD, password: trim };
}

export const updatePhone = (phone) => {
    const trim = String(phone).trim();
    if (trim.length < 11) {
        return { type: SIGN_UP_UPDATE_PHONE, phone: trim, error: 'Phone number can\'t be less than 11 number.' };
    } else {
        return { type: SIGN_UP_UPDATE_PHONE, phone: trim, error: '' };
    }
}

export const updateDay = (day) => {
    const trim = String(day).trim();
    return { type: SIGN_UP_UPDATE_DAY, day: trim };
}

export const updateMonth = (month) => {
    const trim = String(month).trim();
    return { type: SIGN_UP_UPDATE_MONTH, month: trim };
}

export const updateYear = (year) => {
    const trim = String(year).trim();
    return { type: SIGN_UP_UPDATE_YEAR, year: trim };
}

export const reset = () => {
    return { type: SIGN_UP_RESET };
}

export const upload = (images, data, navigation) => {
    return (dispatch) => {
        dispatch({ type: SIGN_UP_LOADING });

        let arr = [];

        [...Array(3)].map((e, i) => {
            const formData = new FormData();
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            formData.append('Images[]', images[i]);

            axios.post('http://youcast.media/api/_uploader/gallery/upload', formData, config)
                .then(res => {
                    arr.push(res.data.data[0]);
                    if (i >= 2 && arr.length >= 2) {
                        const { month, year, day, iso, id, fullname, email, password, phone } = data;
                        const getDate = new Date(`${day < 10 ? '0' + day : day} ${month} ${year}`).toUTCString();
                        const ms = parseInt(new Date(getDate).getTime()) + 86400000;

                        signUp({
                            email: String(email).toLowerCase(),
                            password: String(password),
                            name: String(fullname),
                            phone: String(phone),
                            images: arr,
                            location: String(iso),
                            city: parseInt(id),
                            model: {
                                birth_date: (ms / 1000)
                            }
                        }, {
                            success: () => {
                                dispatch(signIn(email, password, navigation, true));
                            },
                            error: (error) => {
                                dispatch({ type: SIGN_UP_STOP_LOADING });
                                console.log("i'm getting error 1")
                                throw (error);
                            }
                        })
                    } else if (i >= 2 && arr.length < 2) {
                        alert('error has been occured while uploading please try again.');
                        dispatch({ type: SIGN_UP_STOP_LOADING });
                    }
                })
                .catch(error => {
                    console.log("i'm getting error 2")
                    if (i >= 2) {
                        dispatch({ type: SIGN_UP_STOP_LOADING });
                    }
                    throw (error);
                });
        });
    }
}

export const validation = (data, navigation) => {
    return (dispatch) => {
        dispatch({ type: SIGN_UP_LOADING });

        const { fullname, email, password, phone } = data;

        validate({
            email: email,
            password: password,
            name: fullname,
            phone: phone
        }, {
            success: () => {
                navigation.navigate('CompleteSignUp');
                dispatch({ type: SIGN_UP_STOP_LOADING });
            },
            error: (error) => {
                dispatch({ type: SIGN_UP_STOP_LOADING });

                if (error.response.data.errors.phone) {
                    dispatch({ type: SIGN_UP_UPDATE_PHONE, phone: phone, error: error.response.data.errors.phone });
                }

                if (error.response.data.errors.email) {
                    dispatch({ type: SIGN_UP_UPDATE_EMAIL, email: email, error: error.response.data.errors.email });
                }

                throw (error);
            }
        })
    }
}