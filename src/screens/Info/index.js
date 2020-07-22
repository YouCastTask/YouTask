import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, View, Image, ScrollView, ActivityIndicator, DeviceEventEmitter } from 'react-native';
import { Button, Toolbar, ClickableView } from './../../components';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { style, flexs } from './style';
import Modal from './modal';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { fetchPackages, subscripe } from './../../redux/Actions/infoActions';
import moment from 'moment';

class Info extends Component {

    constructor() {
        super();

        this.state = {
            visible: false,
            page: 0,
            user: null
        }
    }

    async componentDidMount() {
        const user = await AsyncStorage.getItem('user');

        this.props.fetchPackages();

        this.setState({
            user: JSON.parse(user)
        });
        DeviceEventEmitter.addListener("CloseModal", () => this.setState({ visible: false }));
    }

    componentWillUnmount() {
        DeviceEventEmitter.removeListener("CloseModal", () => this.setState({ visible: false }));
    }

    render() {
        const { user } = this.state;
        const { navigation, data, subscripe } = this.props;
        const { loading, packages, details, userInfo, subscribeLoading } = data;
        const {
            container,
            title,
            headerView,
            headerSubTitle,
            subContainer,
            logo,
            upperText,
            planView,
            planeTitle,
            planeTitleDash,
            subsctibeBtn,
            subsctibeBtnText,
            dateTimeView,
            subsctibeText,
            periodText,
            avatar,
            seperator,
            dateBox,
            dateTitle,
            dateText,
            planMainBtn
        } = style;

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
                    flexs={flexs}
                    leftSide={<Text style={title}>{`Welcome ${user ? user.name : "YOUCAST"}`}</Text>}
                    toolbarHeight={RScaler(10)}
                />

                <View style={headerView}>
                    <Text style={headerSubTitle}>{global.type == "Invalid" ? "LOCKED" : global.type}</Text>
                </View>

                {loading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: '50%' }} /> : <ScrollView style={subContainer} showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
                    {global.type == "Invalid" ? <Image source={require('./../../assets/logo-with-text.png')} style={logo} /> :

                        <View style={dateTimeView}>
                            <Text style={subsctibeText}>{global.type}</Text>
                            <Text style={periodText}>{userInfo.subscription_plan.period}</Text>

                            <Image source={require('./../../assets/default-avatar.png')} style={avatar} />
                            <View style={seperator} />
                            <View style={dateBox}>
                                <Text style={dateTitle}>Start Date</Text>
                                <Text style={dateText}>{moment(userInfo.started_from * 1000).format('DD MMMM YYYY')}</Text>
                            </View>
                            <View style={seperator} />
                            <View style={dateBox}>
                                <Text style={dateTitle}>End Date</Text>
                                <Text style={dateText}>{moment(userInfo.end_in * 1000).format('DD MMMM YYYY')}</Text>
                            </View>
                        </View>
                    }

                    {global.type == "Basic" ? <Text style={[headerSubTitle, { textAlign: 'center' }]}>{'GET\nPREMIUM'}</Text> : null}

                    {global.type == "Invalid" ? <Text style={upperText}>Locked account means it's unavailable for agencies to find your profile in our database</Text> : null}
                    {global.type == "Invalid" ? <Text style={upperText}>If you'd like your account to be <Text style={{ color: Colors.orange }}>Activated</Text> please select one of our plans below and we will notify with a date for your casting audition</Text> : null}

                    {global.type == "Premium" ? <Text style={upperText}>Thank you for choosing <Text style={{ color: Colors.orange }}>YOUCAST Premium,</Text> You are featured in our top picks and points system and all your posts are public</Text> : null}
                    {global.type == "Premium" ? <Text style={upperText}>It's time for you to show your talent to the world</Text> : null}

                    {global.type != "Premium" ?
                        packages.map((item, index) => {
                            const { type, price, period } = item;
                            const lastIndex = index >= packages.length - 1;

                            return (
                                <View key={index} style={[planView, lastIndex ? { marginBottom: RScaler(13) } : {}]}>
                                    <ClickableView style={planMainBtn} background={null} onPress={() => this.setState({ page: index, visible: true })}>
                                        <Text style={planeTitle}>{type}</Text>
                                        <Text style={planeTitleDash}>-</Text>
                                        <Text style={planeTitle}>{price}</Text>
                                        <Button
                                            text={period}
                                            textStyle={subsctibeBtnText}
                                            style={subsctibeBtn}
                                            background={null}
                                            activeOpacity={1}
                                            onPress={() => this.setState({ page: index, visible: true })}
                                        />
                                    </ClickableView>
                                </View>
                            );
                        })
                        : null}
                </ScrollView>}

                <Modal
                    visible={this.state.visible}
                    packages={details}
                    closeBtnPress={() => this.setState({ visible: false })}
                    submitAction={subscripe.bind(this)}
                    page={this.state.page}
                    loading={subscribeLoading}
                />

            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Info
    }
}

export default connect(MapStateToProps, { fetchPackages, subscripe })(Info);