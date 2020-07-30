import {
    ADD_INFO_ADD_ITEM_TO_EDUCATION,
    ADD_INFO_ADD_ITEM_TO_EXPERIENCE,
    ADD_INFO_ADD_ITEM_TO_TALENT,
    ADD_INFO_LOADING,
    ADD_INFO_STOP_LOADING,
    ADD_INFO_SET_TALENTS_VALUES,
    ADD_INFO_SET_EDUCATION_VALUES,
    ADD_INFO_SET_EXPERIENCES_VALUES,
    ADD_INFO_TOGGLE_PICKER,
    ADD_INFO_ADD_ITEM_TO_TRAINING,
    ADD_INFO_SET_TRAINING_VALUES
} from './../types';
import {strings} from "./../../translations/translation"

const initState = {
    educations: [[
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
    ]],
    talents: [[
        {
            title: strings.Talents,
            value: ""
        }
    ]],
    experiences: [[{
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
    }]],
    trainings: [[{
        title: strings.NameOfClass,
        value: ""
    }, {
        title: strings.NameOfTeacher,
        value: ""
    }, {
        title: strings.PlaceyouLook,
        value: ""
    }]],
    loading: false,
    showPicker: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case ADD_INFO_STOP_LOADING:
            return { ...state, loading: false };

        case ADD_INFO_ADD_ITEM_TO_EDUCATION || ADD_INFO_SET_EDUCATION_VALUES:
            return { ...state, educations: action.educations };

        case ADD_INFO_ADD_ITEM_TO_EXPERIENCE || ADD_INFO_SET_EXPERIENCES_VALUES:
            return { ...state, experiences: action.experiences };

        case ADD_INFO_ADD_ITEM_TO_TALENT || ADD_INFO_SET_TALENTS_VALUES:
            return { ...state, talents: action.talents };

        case ADD_INFO_ADD_ITEM_TO_TRAINING || ADD_INFO_SET_TRAINING_VALUES:
            return { ...state, trainings: action.trainings };

        case ADD_INFO_LOADING:
            return { ...state, loading: true };

        case ADD_INFO_TOGGLE_PICKER:
            return { ...state, showPicker: action.showPicker };

        default:
            return state;
    }
}