import React, { Component } from 'react';
import { SafeAreaView, Image, Text, StatusBar, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-materialui-textfield';
import { Button } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { signIn, updateEmail, updatePassword } from './../../redux/Actions/signInActions';
import {strings} from "./../../translations/translation"

/**
 * TODO: add dropdown alerts and listeners
 */

class SignIn extends Component {
    render() {
        const { navigation, data, updateEmail, updatePassword, signIn } = this.props;
        const { loading, username, password, errorMSG } = data;
        const {
            container,
            logo,
            input,
            labelPadding,
            inputIcon,
            forgetPasswordBtn,
            signInBtn,
            signInBtnText,
            createAccountText,
            createAccountBtn
        } = style;
        const disable = username == '' || password == '';

        return (
            <SafeAreaView style={container}>
                <ImageBackground source={require('./../../assets/bg.png')} style={container}>
                    <StatusBar hidden />
                    <Image source={require('./../../assets/logo-with-text.png')} style={logo} />

                    <TextField
                        label={strings.Email}
                        textColor={Colors.white}
                        baseColor={Colors.white}
                        containerStyle={input}
                        tintColor={Colors.orange}
                        value={username}
                        onChangeText={updateEmail.bind(this)}
                        returnKeyType="next"
                        iconPosition="left"
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()}
                        labelTextStyle={labelPadding}
                        renderAccessory={() => <Icon name="email-outline" style={inputIcon} />}
                    />

                    <TextField
                        label={strings.Password}
                        textColor={Colors.white}
                        baseColor={Colors.white}
                        containerStyle={input}
                        tintColor={Colors.orange}

                        value={password}
                        onChangeText={updatePassword.bind(this)}
                        secureTextEntry
                        iconPosition="left"
                        ref={ref => this.password = ref}
                        labelTextStyle={labelPadding}
                        renderAccessory={() => <Icon name="lock-outline" style={inputIcon} />}
                    />
                    <Text style={forgetPasswordBtn} onPress={() => navigation.navigate('ForgetPassword')}>{strings.ForgotPassword}</Text>

                    <Button
                        text={strings.SignIn}
                        textStyle={signInBtnText}
                        style={signInBtn}
                        background={null}
                        loading={loading}
                        indicatorColor={Colors.white}
                        onPress={() => signIn(username, password, navigation)}
                        disabled={disable}
                    />
                    <Text style={createAccountText}>{strings.DontHaveAccount} <Text style={createAccountBtn} onPress={() => navigation.navigate('SignUp')}>{strings.SignUp}</Text></Text>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.SignIn
    }
}

export default connect(MapStateToProps, { signIn, updateEmail, updatePassword })(SignIn);