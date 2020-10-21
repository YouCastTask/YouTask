import React from 'react';
import { Image, Dimensions, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { fromLeft, fromRight } from 'react-navigation-transitions';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { Colors } from './../../app.json';
import Splash from './../screens/Splash';
import SignIn from './../screens/SignIn';
import SignUp from './../screens/SignUp';
import ForgetPassword from './../screens/ForgetPassword';
import CompleteSignUp from './../screens/CompleteSignUp';
import Home from './../screens/Home';
import SideMenu from './../screens/SideMenu';
import Location from './../screens/Location';
import ContactUs from './../screens/ContactUs';
import Notification from './../screens/Notification';
import Auditions from './../screens/Auditions';
import Profile from './../screens/Profile';
import AuditionDetails from './../screens/AuditionDetails';
import HallOfFames from './../screens/HallOfFames';
import Info from './../screens/Info';
import Calendar from './../screens/Calendar';
import Portfolio from './../screens/Portfolio';
import VerifyCode from './../screens/VerifyCode';
import ChangePassword from './../screens/ChangePassword';
import AddPosts from './../screens/AddPosts';
import AddInfo from './../screens/AddInfo';
import PostDetails from './../screens/PostDetails';
import VideoPlayer from './../screens/VideoPlayer';
import PhotosMainPage from '../screens/Portfolio/PhotosMainPage'
import VerifyPhone from '../screens/VerifyPhone'
import { RScaler } from './utilites.js';

const initialRouteName = "Splash";

const handleCustomTransition = ({ scenes }) => {
    const prevScene = scenes[scenes.length - 2];
    const nextScene = scenes[scenes.length - 1];

    if (prevScene && prevScene.route.routeName === "SignUp" && nextScene.route.routeName === "VerifyPhone") {
        return fromRight();
    } else if (prevScene && nextScene.route.routeName === "SignUp" && prevScene.route.routeName === "VerifyPhone") {
        return fromLeft();
    } 
    else if (prevScene && prevScene.route.routeName === "VerifyPhone" && nextScene.route.routeName === "CompleteSignUp"){
        return fromRight();
    }
    else if(prevScene && prevScene.route.routeName === "CompleteSignUp" && nextScene.route.routeName === "VerifyPhone"){
        return fromRight();
    }
    else if (prevScene && prevScene.route.routeName === "ForgetPassword" && nextScene.route.routeName === "VerifyCode") {
        return fromRight();
    } else if (prevScene && nextScene.route.routeName === "VerifyCode" && prevScene.route.routeName === "ForgetPassword") {
        return fromLeft();
    } else if (prevScene && prevScene.route.routeName === "VerifyCode" && nextScene.route.routeName === "ChangePassword") {
        return fromRight();
    } else if (prevScene && nextScene.route.routeName === "ChangePassword" && prevScene.route.routeName === "VerifyCode") {
        return fromLeft();
    }
}

const tabsIcon = (icon, focused, type) => {
    const size = focused ? isIPHONEX ? RScaler(3.1) : RScaler(3.5) : isIPHONEX ? RScaler(2.5) : RScaler(3);
    const color = global.type == 'Invalid' && type == 'changable' ? Colors.red : focused ? Colors.orange : Colors.white;
    const newIcon = global.type != 'Invalid' && type == 'changable' ? "check-circle" : icon;
    return (
        type === 'img'
            ?
            <Image source={icon} style={{ width: size, height: size, resizeMode: 'contain' }} />
            :
            <Icon name={newIcon} size={size} color={color} />
    );
}

const bottomTabs = createMaterialBottomTabNavigator({
    Profile: {
        screen: Profile,
        navigationOptions: {
            tabBarIcon: ({ focused }) => tabsIcon("account", focused, "icon")
        }
    },
    Auditions: {
        screen: Auditions,
        navigationOptions: {
            tabBarIcon: ({ focused }) => tabsIcon("calendar-text", focused, "icon")
        }
    },
    Home: {
        screen: Home,
        navigationOptions: {
            tabBarIcon: ({ focused }) => tabsIcon(require('./../assets/logo.png'), focused, "img")
        }
    },
    Notification: {
        screen: Notification,
        navigationOptions: {
            tabBarIcon: ({ focused }) => tabsIcon("bell", focused, "icon")
        }
    },
    Info: {
        screen: Info,
        navigationOptions: {
            tabBarIcon: ({ focused }) => tabsIcon("help-circle", focused, "changable")
        }
    },
}, {
    shifting: true,
    labeled: false,
    activeColor: Colors.orange,
    inactiveColor: Colors.white,
    backBehavior: "initialRoute",
    initialRouteName: 'Home',
    barStyle: { backgroundColor: Colors.gray }
});

const drawer = createDrawerNavigator({
    Tabs: bottomTabs
}, {
    contentComponent: SideMenu,
    backBehavior: 'initialRoute',
    drawerPosition: 'right',
    drawerType: 'slide',
    drawerWidth: '80%',
    drawerBackgroundColor: Colors.dark
});

const WindowStack = createStackNavigator({
    Splash: { screen: Splash },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    ForgetPassword: { screen: ForgetPassword },
    VerifyPhone:{screen: VerifyPhone},
    CompleteSignUp: { screen: CompleteSignUp },
    Location: { screen: Location },
    ContactUs: { screen: ContactUs },
    AuditionDetails: { screen: AuditionDetails },
    HallOfFame: { screen: HallOfFames },
    Calendar: { screen: Calendar },
    Portfolio: { screen: Portfolio },
    VerifyCode: { screen: VerifyCode },
    ChangePassword: { screen: ChangePassword },
    AddPosts: { screen: AddPosts },
    AddInfo: { screen: AddInfo },
    PostDetails: { screen: PostDetails },
    VideoPlayer: { screen: VideoPlayer },
    PhotosMainPage:{screen:PhotosMainPage},
    Home: drawer,
}, {
    initialRouteName: initialRouteName,
    headerMode: 'none',
    transitionConfig: (nav) => handleCustomTransition(nav)
});

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 800 || height >= 800);

export default createAppContainer(WindowStack);