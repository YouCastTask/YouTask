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

const initState = {
    educations: [[
        {
            title: "School - University",
            value: ""
        },
        {
            title: "Degree",
            value: ""
        },
        {
            title: "Field Of Study",
            value: ""
        }
    ]],
    talents: [[
        {
            title: "Talent",
            value: ""
        }
    ]],
    experiences: [[{
        title: "Media format",
        value: ""
    }, {
        title: "Name Of Show",
        value: ""
    }, {
        title: "Media role",
        value: ""
    }, {
        title: "Name Of Director",
        value: ""
    }]],
    trainings: [[{
        title: "Name Of Class",
        value: ""
    }, {
        title: "Name Of Teacher",
        value: ""
    }, {
        title: "Place You took it at",
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