import React, { Component } from 'react';
import { SafeAreaView, Image, Text, StatusBar, View, ImageBackground, TextInput } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { updatePassword, updatePasswordAgain, resetPasswords, changePassword } from './../../redux/Actions/forgetPasswordActions';

class ChangePassword extends Component {
    render() {
        const { navigation, data, changePassword, updatePassword, updatePasswordAgain } = this.props;
        const { newPassword, newPasswordRepeat, newPasswordLoading } = data;
        const {
            container,
            logo,
            input,
            resetBtn,
            resetBtnText,
            backBtnIcon,
            backBtn,
            hintTitle,
            hintSubTitle,
            caption,
            inputsView,
            inputContainer
        } = style;
        const disabled = newPasswordRepeat == '' || newPassword == '';

        return (
            <SafeAreaView style={container}>
                <ImageBackground source={require('./../../assets/bg1.png')} style={container}>
                    <StatusBar hidden />
                    <Button
                        icon="ios-arrow-round-back"
                        iconStyle={backBtnIcon}
                        style={backBtn}
                        background={null}
                        onPress={() => navigation.goBack()}
                    />

                    <Image source={require('./../../assets/logo-with-text.png')} style={logo} />

                    <Text style={caption}>Please enter a new password</Text>

                    <View style={inputsView}>
                        <View style={inputContainer}>
                            <Icon name="lock-outline" color='#ffffff99' size={RScaler(3.5)} />
                            <TextInput
                                style={input}
                                placeholder="New Password"
                                placeholderTextColor='#ffffff99'
                                selectionColor={Colors.orange}
                                onChangeText={updatePassword.bind(this)}
                                returnKeyType="next"
                                keyboardType="default"
                                value={newPassword}
                                onSubmitEditing={() => this.confirm.focus()}
                            />
                        </View>
                        <View style={inputContainer}>
                            <Icon name="lock-outline" color='#ffffff99' size={RScaler(3.5)} />
                            <TextInput
                                style={input}
                                placeholder="Confirm Password"
                                placeholderTextColor='#ffffff99'
                                selectionColor={Colors.orange}
                                onChangeText={updatePasswordAgain.bind(this)}
                                keyboardType="default"
                                value={newPasswordRepeat}
                                ref={ref => this.confirm = ref}
                            />
                        </View>
                    </View>

                    <Button
                        text="Change Password"
                        textStyle={resetBtnText}
                        style={resetBtn}
                        background={null}
                        indicatorColor="#fff"
                        disabled={disabled}
                        loading={newPasswordLoading}
                        onPress={() => changePassword(newPassword, newPasswordRepeat, navigation.state.params.code, navigation)}
                    />

                    <Text style={[hintTitle, { marginTop: '32%' }]}>HAVE AN ACCOUNT? <Text style={hintSubTitle} onPress={() => navigation.goBack()}>LOG IN!</Text></Text>
                    <Text style={hintTitle}>DON'T HAVE AN ACCOUNT? <Text style={hintSubTitle} onPress={() => navigation.replace('SignUp')}>SIGN UP!</Text></Text>
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

export default connect(MapStateToProps, { updatePassword, changePassword, updatePasswordAgain, resetPasswords })(ChangePassword);