import React, { Component } from 'react';
import { SafeAreaView, Image, Text, StatusBar, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-materialui-textfield';
import { Button } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { requestPassword, updateEmail, reset } from './../../redux/Actions/forgetPasswordActions';
import {strings} from './../../translations/translation'
class ForgetPassword extends Component {

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { navigation, data, requestPassword, updateEmail } = this.props;
        const { loading, email, emailError } = data;
        const {
            container,
            logo,
            input,
            labelPadding,
            inputIcon,
            resetBtn,
            resetBtnText,
            backBtnIcon,
            backBtn,
            caption,
            hintTitle,
            hintSubTitle,
            errorText
        } = style;
        const disabled = email == '' || emailError;

        return (
            <SafeAreaView style={container}>
                <ImageBackground source={require('./../../assets/bg1.png')} style={container}>
                    <StatusBar hidden />
                    <Button
                        icon="ios-arrow-round-back"
                        iconStyle={backBtnIcon}
                        style={backBtn}
                        background={null}
                        disabled={loading}
                        onPress={() => navigation.goBack()}
                    />

                    <Text style={caption}>{strings.Forgot_Message_Header}</Text>

                    <TextField
                        label={strings.Email}
                        textColor={Colors.white}
                        baseColor={Colors.white}
                        containerStyle={input}
                        tintColor={Colors.orange}
                        value={email}
                        iconPosition="right"
                        keyboardType="email-address"
                        labelTextStyle={labelPadding}
                        titleTextStyle={errorText}
                        error={emailError}
                        errorColor={Colors.red}
                        autoCompleteType="off"
                        onChangeText={updateEmail.bind(this)}
                        renderAccessory={() => emailError ? <Icon name="alert-circle-outline" style={inputIcon} /> : null}
                    />

                    <Button
                        text={strings.Reset_Password}
                        textStyle={resetBtnText}
                        style={resetBtn}
                        background={null}
                        loading={loading}
                        disabled={disabled}
                        indicatorColor={Colors.white}
                        onPress={() => requestPassword(email, navigation)}
                    />

                    <Image source={require('./../../assets/logo-with-text.png')} style={logo} />

        <Text style={hintTitle}>{strings.Have_Account}<Text style={hintSubTitle} onPress={() => navigation.goBack()}>{strings.SignIn}</Text></Text>
        <Text style={hintTitle}>{strings.DontHaveAccount} <Text style={hintSubTitle} onPress={() => navigation.replace('SignUp')}>{strings.SignUp}</Text></Text>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.ForgetPassword
    }
}

export default connect(MapStateToProps, { requestPassword, updateEmail, reset })(ForgetPassword);