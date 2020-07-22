import { combineReducers } from 'redux';
import calendarReducer from './calendarReducer';
import signUpReducer from './signUpReducer';
import signInReducer from './signInReducer';
import auditionReducer from './auditionReducer';
import hallOfFamesReducer from './hallOfFamesReducer';
import forgetPasswordReducer from './forgetPasswordReducer';
import profileReducer from './profileReducer';
import contactUsReducer from './contactUsReducer';
import infoReducer from './infoReducer';
import portfolioReducer from './portfolioReducer';
import homeReducer from './homeReducer';
import addPostsReducer from './addPostsReducer';
import postDetailsReducer from './postDetailsReducer';
import addInfoReducer from './addInfoReducer';
import notificationReducer from './notificationReducer';

export default combineReducers({
    SignIn: signInReducer,
    SignUp: signUpReducer,
    Calendar: calendarReducer,
    Auditions: auditionReducer,
    HallOfFame: hallOfFamesReducer,
    ForgetPassword: forgetPasswordReducer,
    Profile: profileReducer,
    ContactUs: contactUsReducer,
    Info: infoReducer,
    Portfolio: portfolioReducer,
    Home: homeReducer,
    AddPosts: addPostsReducer,
    PostDetails: postDetailsReducer,
    AddInfo: addInfoReducer,
    Notification: notificationReducer
});