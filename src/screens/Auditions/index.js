import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, TouchableNativeFeedback, View, ActivityIndicator, Image } from 'react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { ClickableView, Toolbar, ListView, Button } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { fetchAuditions } from './../../redux/Actions/auditionActions';
import moment from 'moment';
import {strings} from "./../../translations/translation"

class Auditions extends Component {

    componentDidMount() {
        this.props.fetchAuditions();
    }

    renderItem(item) {
        const { status, date_at, project, location, id } = item.item;
        const {
            itemContainer,
            name,
            date,
            author,
            separator,
            statusStyle,
            lastItem
        } = style;
        const statusText = status == 2 ? "Accepted" : status == 0 ? "Rejected" : "Pending";
        const statusColor = status == 2 ? Colors.orange : status == 0 ? Colors.red : Colors.white;
        const lastIndex = item.index === this.props.data?.auditions.length - 1;

        return (
            <View style={lastIndex ? lastItem : null}>
                <ClickableView key={item.index} onPress={() => this.props.navigation.navigate('AuditionDetails', { id: id })} background={TouchableNativeFeedback.Ripple(Colors.orange, true)} style={itemContainer}>
                    <View style={{ flex: 2 }}>
                        <Text style={name}>{`${project} Audition`}</Text>
                        <Text style={date}>{moment(date_at).format('dddd DD MMMM')}</Text>
                        <Text style={author}>{location ? location : "YOUCAST Main Office"}</Text>
                    </View>
                    <View style={[separator, { backgroundColor: statusColor }]} />
                    <Text style={[statusStyle, { color: statusColor }]}>{statusText}</Text>
                </ClickableView>
            </View>
        );
    }

    renderEmpty() {
        const { emptyContainer, emptyIcon, emptyMsg, reloadBtn, reloadBtnText } = style;
        return (
            <View style={emptyContainer}>
                <Image source={require('./../../assets/auditions-icon.png')} style={emptyIcon} />
                <Text style={emptyMsg}>{strings.Auditions_Message}</Text>

                <Button
                    text={strings.Reload}
                    textStyle={reloadBtnText}
                    style={reloadBtn}
                    background={null}
                    onPress={() => this.props.fetchAuditions()}
                />
            </View>
        );
    }

    render() {
        const { navigation, data } = this.props;
        const { auditions, loading } = data;
        const {
            container,
            title,
            list,
            indicator
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
                    flexs={[2.2, 2, 1]}
                    leftSide={<Text style={title}>{strings.Auditions}</Text>}
                    toolbarHeight={RScaler(10)}
                />

                {!loading ? <ListView
                    data={auditions}
                    renderItem={this.renderItem.bind(this)}
                    style={[list, { padding: RScaler(auditions.length > 0 ? 4 : 0) }]}
                    listEmptyView={this.renderEmpty.bind(this)}
                /> : <ActivityIndicator color={Colors.orange} size="large" style={indicator} />}
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Auditions
    }
}

export default connect(MapStateToProps, { fetchAuditions })(Auditions);