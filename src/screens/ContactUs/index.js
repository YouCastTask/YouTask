import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, View, Image, ActivityIndicator } from 'react-native';
import { Toolbar } from './../../components';
import { connect } from 'react-redux';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import _ from 'underscore';
import { getInfo } from './../../redux/Actions/contactUsActions';
import { strings } from '../../translations/translation';

class ContactUs extends Component {

    componentDidMount() {
        this.props.getInfo();
    }

    render() {
        const { navigation, data } = this.props;
        const { loading, info } = data;
        const { email, phone, inquiry_text } = info;
        const {
            container,
            content,
            logo,
            caption,
            callUsText,
            phoneText
        } = style;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    leftSide={{
                        icon: "ios-arrow-round-back",
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.goBack()
                    }}
                    center={{
                        title: strings.Contact_Us,
                        fontFamily: "OpenSans-Bold",
                        color: Colors.white,
                        size: RScaler(3)
                    }}
                />

                {loading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: '50%' }} /> : <View style={content}>
                    <Image source={require('./../../assets/logo-with-text.png')} style={logo} />

                    <Text style={caption}>{inquiry_text}</Text>
                    <Text style={callUsText}>{`${strings.trouble}\n\n`}<Text style={phoneText}>{phone}</Text></Text>
                    <Text style={callUsText}>{`${strings.Email}: ${email}`}</Text>
                </View>}
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.ContactUs
    }
}

export default connect(MapStateToProps, { getInfo })(ContactUs);