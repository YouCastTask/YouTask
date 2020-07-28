import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, ScrollView, View, Image, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { ClickableView } from './../../components';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import { DrawerActions } from 'react-navigation-drawer';
import { style } from './style';
import { Colors } from './../../../app.json';
import { setStaticData, setCountries } from './../../redux/Actions/signUpActions';
import { fetchImages, getPortfolio } from './../../redux/Actions/portfolioActions';

class SideMenu extends Component {

    constructor() {
        super();

        this.state = {
            user: null
        }
    }

    componentDidMount() {
        const { getPortfolio, navigation } = this.props;
        getPortfolio(navigation.state.params?.id);
        this.getUserData()
    }

    async getUserData() {
        const user = await AsyncStorage.getItem('user');

        this.setState({
            user: JSON.parse(user)
        });
    }

    list = [
        {
            title: 'Portfolio',
            icon: 'file',
            action: 'Portfolio'
        },
        {
            title: 'Hall Of Fame',
            icon: require('./../../assets/logo.png'),
            action: 'HallOfFame',
            image: true
        },
        {
            title: 'Location',
            icon: 'map-marker',
            action: 'Location'
        },
        {
            title: 'Contact Us',
            icon: 'account-multiple-outline',
            action: 'ContactUs'
        },
        {
            title: 'Logout',
            icon: 'logout',
            action: 'logout'
        }
    ];

    async navigateTo(to, params: []) {
        if (to == 'logout') {
            const { navigation, setStaticData, setCountries } = this.props;
            
            await AsyncStorage.removeItem('tokens');
            await AsyncStorage.removeItem('user', (error) => {
                if (!error) {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
                    });
                    navigation.dispatch(resetAction);
                    setStaticData();
                    setCountries();
                }
            })
        } else {
            this.props.navigation.navigate(to, params);
        }
    }

    render() {
        const { user } = this.state;
        const { data, fetchImages, navigation } = this.props;
        const {profileUrl, id } = data;
        const {
            container,
            sideMenuHeader,
            avatar,
            name,
            jobName,
            button,
            itemIcon,
            itemTitle
        } = style;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    style={{ position: 'absolute', left: 0 }}
                >
                    <View style={sideMenuHeader}>
                        <TouchableOpacity onPress={() => {
                            fetchImages(false, navigation.state.params?.id);
                            navigation.navigate("PhotosMainPage")
                       }}>
                            <Image source={profileUrl?.image_path ?
                                { uri: `http://youcast.media/${profileUrl.image_path}` }
                                :
                                require('./../../assets/default-avatar.png')}
                                style={avatar}
                            />
                            {/* <Image source={require('./../../assets/default-avatar.png')} style={avatar}/> */}
                        </TouchableOpacity>
                        <Text style={name}>{user ? user.name : "YouCast"}</Text>
                        <Text style={jobName}>{user ?.type ? user.type : ''}</Text>
                    </View>

                    {
                        this.list.map((item, index) => {
                            const { title, icon, action, image } = item;

                            return (
                                <ClickableView key={index} style={button} background={TouchableNativeFeedback.Ripple(Colors.orange, false)} onPress={() => {
                                    this.navigateTo(action);
                                    this.props.navigation.dispatch(DrawerActions.closeDrawer());
                                }}>
                                    {image ? <Image source={icon} style={itemIcon} /> : <Icon name={icon} style={itemIcon} />}
                                    <Text style={itemTitle}>{title}</Text>
                                </ClickableView>
                            );
                        })
                    }
                </ScrollView>

            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Portfolio
    }
}

export default connect(MapStateToProps, { setStaticData, setCountries, fetchImages, getPortfolio })(SideMenu);