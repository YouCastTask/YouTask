import {
    ADD_INFO_ADD_ITEM_TO_EDUCATION,
    ADD_INFO_ADD_ITEM_TO_EXPERIENCE,
    ADD_INFO_ADD_ITEM_TO_TALENT,
    ADD_INFO_LOADING,
    ADD_INFO_STOP_LOADING,
    PORTFOLIO_GET_TALENTS,
    PORTFOLIO_GET_EXPERIENCE,
    PORTFOLIO_GET_EDUCATION,
    PORTFOLIO_GET_TRAINING,
    ADD_INFO_TOGGLE_PICKER,
    ADD_INFO_ADD_ITEM_TO_TRAINING,
} from './../types';
import { Alert } from 'react-native';
import _ from 'underscore';
import { addEducation, addExp, addTalent, addTraining } from './../../lib/models/addInfoModel';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { strings } from '../../translations/translation';

export const addNewExp = (arr) => {
    return (dispatch) => {
        arr.push([{
            title: strings.Mediaformat,
            value: ""
        }, {
            title: strings.NameOfShow,
            value: ""
        }, {
            title: strings.MediaRole,
            value: ""
        }, {
            title: strings.NameOfDirector,
            value: ""
        }]);

        dispatch({ type: ADD_INFO_ADD_ITEM_TO_EXPERIENCE, experiences: arr });
    }
}

export const addNewTraining = (arr) => {
    return (dispatch) => {
        arr.push([
            {
                title: strings.NameOfClass,
                value: ""
            }, {
                title: strings.NameOfTeacher,
                value: ""
            }, {
                title: strings.PlaceyouLook,
                value: ""
            }
        ]);

        dispatch({ type: ADD_INFO_ADD_ITEM_TO_TRAINING, trainings: arr });
    }
}

export const addNewTalent = (arr) => {
    return (dispatch) => {
        arr.push([
            {
                title: strings.Talents,
                value: ""
            }
        ]);

        dispatch({ type: ADD_INFO_ADD_ITEM_TO_TALENT, talents: arr });
    }
}

export const addNewEducation = (arr) => {
    return (dispatch) => {
        arr.push([
            {
                title: strings.School_university,
                value: ""
            },
            {
                title: strings.Degree,
                value: ""
            },
            {
                title: strings.FieldOfStudy,
                value: ""
            }
        ]);

        dispatch({ type: ADD_INFO_ADD_ITEM_TO_EDUCATION, educations: arr });
    }
}

export const deleteInfo = (index, arr, type) => {
    return (dispatch) => {

        Alert.alert(`${strings.Remove} ${type=="Education"?strings.Education:type=="Talent"?strings.Talents:strings.Training}`, strings.areYouSure, [{
            text: strings.Delete,
            onPress: () => {
                arr.splice(index, 1);
                if (type == "Education") {
                    dispatch({ type: ADD_INFO_ADD_ITEM_TO_EDUCATION, educations: arr });
                } else if (type == "Talent") {
                    dispatch({ type: ADD_INFO_ADD_ITEM_TO_TALENT, talents: arr });
                } else if (type == "Training") {
                    dispatch({ type: ADD_INFO_ADD_ITEM_TO_TRAINING, trainings: arr });
                } else {
                    dispatch({ type: ADD_INFO_ADD_ITEM_TO_EXPERIENCE, experiences: arr });
                }
            }
        }, {
            text: strings.Cancel
        }])

    }
}

export const setValues = (value, index, parentIndex, arr, type, date) => {
    return (dispatch) => {
        if (!date) {
            arr[parentIndex][index]['value'] = value;
        } else {
            _.each(arr[parentIndex], (item, index) => {
                if (item.title == date) {
                    arr[parentIndex][index]['value'] = value;
                    dispatch(togglePicker(false));
                }
            })
        }

        if (type == "Education") {
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_EDUCATION, educations: arr });
        } else if (type == "Talent") {
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_TALENT, talents: arr });
        } else if (type == "Training") {
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_TRAINING, trainings: arr });
        } else {
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_EXPERIENCE, experiences: arr });
        }
    }
}

export const togglePicker = (showPicker) => {
    return { type: ADD_INFO_TOGGLE_PICKER, showPicker: showPicker };
}

export const insertInfo = (arr, type, navigation) => {
    return async (dispatch) => {
        dispatch({ type: ADD_INFO_LOADING });
        const { token } = JSON.parse(await AsyncStorage.getItem('tokens'));
        const newArr = [];

        if (type == "Education") {
            _.each(arr, item => {
                newArr.push({
                    school: item[0]['value'],
                    degree: item[1]['value'],
                    field: item[2]['value']
                });
            });
            addEducation(token, {
                educations: newArr
            }, {
                success: (response) => {
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    dispatch({ type: PORTFOLIO_GET_EDUCATION, education: response.data.educations });
                    navigation.goBack();
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    throw (error);
                }
            })
        } else if (type == "Talent") {
            _.each(arr, item => {
                newArr.push({
                    talent: item[0]['value']
                });
            });
            addTalent(token, {
                talents: newArr
            }, {
                success: (response) => {
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    dispatch({ type: PORTFOLIO_GET_TALENTS, talents: response.data.talents });
                    navigation.goBack();
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    throw (error);
                }
            })
        } else if (type == "Training") {
            _.each(arr, item => {
                newArr.push({
                    class: item[0]['value'],
                    tutor: item[1]['value'],
                    place: item[2]['value']
                });
            });
            addTraining(token, {
                trainings: newArr
            }, {
                success: (response) => {
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    dispatch({ type: PORTFOLIO_GET_TRAINING, trainings: response.data.trainings });
                    navigation.goBack();
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    throw (error);
                }
            })
        }

        else {
            _.each(arr, item => {
                newArr.push({
                    media_format: item[0]['value'],
                    show_name: item[1]['value'],
                    media_role: item[2]['value'],
                    director_name: item[3]['value'],
                });
            });
            addExp(token, {
                work_experiences: newArr
            }, {
                success: (response) => {
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    dispatch({ type: PORTFOLIO_GET_EXPERIENCE, experience: response.data.work_experiences });
                    navigation.goBack();
                },
                error: (error) => {
                    alert(error.response.data.message);
                    dispatch({ type: ADD_INFO_STOP_LOADING });
                    throw (error);
                }
            })
        }
    }
}

export const editInfo = (arr, type, navigation) => {
    return (dispatch) => {
        let newArr = [];

        if (type == "Education") {
            if (arr.length == 0) {
                newArr.push([
                    {
                        title: strings.School_university,
                        value: ""
                    },
                    {
                        title: strings.Degree,
                        value: ""
                    },
                    {
                        title: strings.FieldOfStudy,
                        value: ""
                    }
                ]);
            } else {
                _.each(arr, item => {
                    const { degree, field, school } = item;
                    newArr.push([
                        {
                            title: strings.School_university,
                            value: school
                        },
                        {
                            title: strings.Degree,
                            value: degree
                        },
                        {
                            title: strings.FieldOfStudy,
                            value: field
                        }
                    ]);
                });
            }
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_EDUCATION, educations: newArr });

        } else if (type == "Talent") {
            if (arr.length == 0) {
                newArr.push([
                    {
                        title: strings.Talents,
                        value: ""
                    }
                ]);
            } else {
                _.each(arr, item => {
                    newArr.push([
                        {
                            title: strings.Talents,
                            value: item.talent
                        }
                    ]);
                });
            }
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_TALENT, talents: newArr });

        } else if (type == "Training") {
            if (arr.length == 0) {
                newArr.push([
                    {
                        title: strings.NameOfClass,
                        value: ""
                    }, {
                        title: strings.NameOfTeacher,
                        value: ""
                    }, {
                        title: strings.PlaceyouLook,
                        value: ""
                    }
                ]);
            } else {
                _.each(arr, item => {
                    const { tutor, place } = item;
                    const trainingClass = item.class
                    newArr.push([
                        {
                            title: strings.NameOfClass,
                            value: trainingClass
                        }, {
                            title: strings.NameOfTeacher,
                            value: tutor
                        }, {
                            title: strings.PlaceyouLook,
                            value: place
                        }
                    ]);
                });
            }
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_TRAINING, trainings: newArr });

        } else {
            if (arr.length == 0) {
                newArr.push([{
                    title: strings.Mediaformat,
                    value: ""
                }, {
                    title: strings.NameOfShow,
                    value: ""
                }, {
                    title: strings.MediaRole,
                    value: ""
                }, {
                    title: strings.NameOfDirector,
                    value: ""
                }]);
            } else {
                _.each(arr, item => {
                    const { media_format, show_name, media_role, director_name } = item;
                    newArr.push([{
                        title: strings.Mediaformat,
                        value: media_format
                    }, {
                        title: strings.NameOfShow,
                        value: show_name
                    }, {
                        title: strings.MediaRole,
                        value: media_role
                    }, {
                        title: strings.MediaRole,
                        value: director_name
                    }]);
                });
            }
            dispatch({ type: ADD_INFO_ADD_ITEM_TO_EXPERIENCE, experiences: newArr });
        }
        navigation.navigate('AddInfo', { type: type })
    }
}