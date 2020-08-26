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
import {strings} from "./../../translations/translation"

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
            { attr: strings.NAME, value: user.name },
            { attr: strings.AGE, value: age },
            { attr: strings.NATIONALITY, value: nationality },
            { attr: strings.LOCATION, value: user.location ? user.location.printable_name : '' },
            { attr: strings.City, value: user.city.full_city_name },
            { attr: strings.HEIGHT, value: height },
            { attr: strings.WEIGHT, value: weight },
            { attr: strings.HAIR_COLOR, value: hair_color },
            { attr: strings.HAIR_TYPE, value: hair_type },
            { attr: strings.EYE_COLOR, value: eye_color },
            { attr: strings.BODY_SHAPE, value: body_shape },
            { attr: strings.SKIN_TONE, value: skin_tone },
            { attr: strings.SPOKEN_LANGUAGE, value: languages.map(e => e.name).join(" - ")},
            { attr: strings.TATOOS, value: tattoos },
            { attr: strings.SCARS, value: scars }
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
                    flexs={[3, 2, 1]}
                leftSide={<Text style={title}>{strings.Profile}</Text>}
                    toolbarHeight={RScaler(10)}
                />

                {!loading ? <TabSlider
                    scrollEnabled
                    tabsHeight={RScaler(60)}
                    tabs={[
                        {
                            title: (strings.getLanguage()=="en")?strings.Photos:strings.About,
                            View: <Images
                                height={RScaler(60)}
                                data={images} />
                        }, {
                            title: strings.GeneralCasting,
                            View: <Videos
                                data={videos}
                                navigation={navigation}
                                height={RScaler(60)} />
                        }, {
                            title: (strings.getLanguage()=="en")?strings.About:strings.Photos,
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
                        <Text style={portfolioText}>{strings.View_Portfolio}</Text>
                    </ClickableView>
                </View> : null}

                {global.type == "Invalid" ? <View style={lockedView}>
                    <Image source={require('./../../assets/logo-with-text.png')} style={logo} />
                    <Text style={whoopsText}>{strings.Whoops}</Text>
                    <Text style={whiteText}>{strings.yourProfile}<Text style={orangeText}>{strings.Locked}</Text></Text>
                    <Text style={whiteText}>{strings.directorsSee}</Text>
                    <Text style={whiteText}>{strings.ConstraintMessage}</Text>
                    <Text style={whiteText}>{strings.activateMessage}<Text style={orangeText}>{strings.activate}</Text> {strings.yourProfile}</Text>
                    <Text style={whiteText}>{strings.meanWhile}</Text>
                    <Button
                        text={strings.viewPlans}
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