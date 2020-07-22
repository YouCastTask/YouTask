import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, TouchableNativeFeedback, View, Image, ActivityIndicator, Linking } from 'react-native';
import { ClickableView, Toolbar, ListView, Button } from './../../components';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { style, flexs } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { getNotifications } from './../../redux/Actions/notificationActions';

class Notification extends Component {

    componentDidMount() {
        this.props.getNotifications();
    }

    renderItem(item) {
        const { body, height } = item.item;
        const {
            itemContainer,
            name,
            date
        } = style;
        const lastIndex = item.index === this.props.data.notifications.length - 1;

        return (
            <ClickableView key={item.index} background={TouchableNativeFeedback.Ripple(Colors.orange, true)} style={[itemContainer, { height: height }]} onPress={() => {
                if (item.item?.link) {
                    if (Linking.canOpenURL(item.item.link) || item.item.link != '' || item.item.link != null || item.item.link != undefined) {
                        Linking.openURL(item.item.link);
                    }
                }
            }}>
                <Text style={name}>{body}</Text>
                {/* <Text style={date}>Monday 24 March</Text> */}
            </ClickableView>
        );
    }

    renderEmpty() {
        const { emptyContainer, emptyIcon, emptyMsg, reloadBtn, reloadBtnText } = style;
        return (
            <View style={emptyContainer}>
                <Image source={require('./../../assets/notification-icon.png')} style={emptyIcon} />
                <Text style={emptyMsg}>{`No Notification Yet.\nYou don't have any notifications`}</Text>

                <Button
                    text="Reload"
                    textStyle={reloadBtnText}
                    style={reloadBtn}
                    background={null}
                    onPress={() => this.props.getNotifications()}
                />
            </View>
        );
    }

    render() {
        const { navigation, data } = this.props;
        const { notifications, loading } = data;
        const {
            container,
            title,
            list
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
                    leftSide={<Text style={title}>Notification</Text>}
                    toolbarHeight={RScaler(10)}
                />

                {!loading ? <ListView
                    data={notifications}
                    renderItem={this.renderItem.bind(this)}
                    style={[list, { padding: RScaler(0 > 0 ? 4 : 0) }]}
                    listEmptyView={this.renderEmpty.bind(this)}
                    contentContainerStyle={{ alignItems: 'center' }}
                /> : <ActivityIndicator size="large" color={Colors.orange} style={{ marginTop: '25%' }} />}
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Notification
    };
}

export default connect(MapStateToProps, { getNotifications })(Notification);