import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, View, ActivityIndicator, Image, TouchableNativeFeedback } from 'react-native';
import { ClickableView, Toolbar, TabSlider, Button } from './../../components';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import Images from './Tabs/Images';
import About from './Tabs/About';
import Videos from './Tabs/Videos';
import { getUserInfo } from './../../redux/Actions/profileActions';

class Profile extends Component {

    componentDidMount() {
        this.props.getUserInfo();
    }

    render() {
        const { navigation, data } = this.props;
        const { loading, info, images, videos } = data;
        const { user, age, nationality, height, skin_tone, weight, hair_type, hair_color, eye_color, body_shape, languages, tattoos, scars, model_categories } = info;
        const {
            container,
            title,
            userInfo,
            section,
            username,
            extraInfo,
            portfolioText,
            lockedView,
            logo,
            whoopsText,
            orangeText,
            whiteText,
            subscribeBtn,
            subscribeBtnText
        } = style;
        const information = info ? [
            { attr: 'Name', value: user.name },
            { attr: 'Age', value: age },
            { attr: "Nationality", value: nationality },
            { attr: "Location", value: user.location ? user.location.printable_name : '' },
            { attr: "City", value: user.city.full_city_name },
            { attr: "Height", value: height },
            { attr: "Weight", value: weight },
            { attr: "Hair Color", value: hair_color },
            { attr: "Hair Type", value: hair_type },
            { attr: "Eye Color", value: eye_color },
            { attr: "Body Shape", value: body_shape },
            { attr: "Skin Tone", value: skin_tone },
            { attr: "Spoken Language", value: languages.map(e => e.name).join(" - ")},
            { attr: "Tattoos", value: tattoos },
            { attr: "Scars", value: scars }
        ] : [];

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    rightSide={{
                        icon: 'menu',
                        iconType: 'material',
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.dispatch(DrawerActions.openDrawer())
                    }}
                    flexs={[2, 3, 1]}
                    leftSide={<Text style={title}>Profile</Text>}
                    toolbarHeight={RScaler(10)}
                />

                {!loading ? <TabSlider
                    scrollEnabled
                    tabsHeight={RScaler(60)}
                    tabs={[
                        {
                            title: 'Photos',
                            View: <Images
                                height={RScaler(60)}
                                data={images} />
                        }, {
                            title: 'General Casting',
                            View: <Videos
                                data={videos}
                                navigation={navigation}
                                height={RScaler(60)} />
                        }, {
                            title: 'About',
                            View: <About
                                height={RScaler(60)}
                                data={information}
                            />
                        }]}
                /> : global.type == "Invalid" ? null : <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: '50%' }} />}

                {!loading ? <View style={userInfo}>
                    <ClickableView background={null} style={[section, { marginEnd: RScaler(.5) }]}>
                        <Text style={username}>{info ? user.name : ''}</Text>
                        <Text style={extraInfo}>{`${age}, ${info ? model_categories[0]?.name : ''}`}</Text>
                    </ClickableView>

                    <ClickableView background={TouchableNativeFeedback.Ripple(Colors.orange, false)} style={section} onPress={() => navigation.navigate('Portfolio')}>
                        <Text style={portfolioText}>{`View\nPortfolio`}</Text>
                    </ClickableView>
                </View> : null}

                {global.type == "Invalid" ? <View style={lockedView}>
                    <Image source={require('./../../assets/logo-with-text.png')} style={logo} />
                    <Text style={whoopsText}>Whoops!</Text>
                    <Text style={whiteText}>Your profile is currently <Text style={orangeText}>{'locked'}</Text></Text>
                    <Text style={whiteText}>{'Your profile is what directors first see when they search for talents.\n'}</Text>
                    <Text style={whiteText}>{'It containt all your data, photo sessions and casting videos.\n'}</Text>
                    <Text style={whiteText}>{'You need to select one of our plans and wait for your casting audition to '}<Text style={orangeText}>activate</Text> {' your profile.\n'}</Text>
                    <Text style={whiteText}>{'Meanwhile you can enjoy our app update your portfolio and vote on other users posts.'}</Text>
                    <Button
                        text="View Plans"
                        textStyle={subscribeBtnText}
                        style={subscribeBtn}
                        background={null}
                        onPress={() => navigation.navigate('Info')}
                    />
                </View> : null}

            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Profile
    }
}

export default connect(MapStateToProps, { getUserInfo })(Profile);