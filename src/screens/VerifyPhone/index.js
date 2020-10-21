import React, { Component } from 'react';
import { SafeAreaView, Image, Text, StatusBar, View, ImageBackground, TextInput, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { Button } from '../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { updateInput, VerifyCode, resetInputs } from './../../redux/Actions/signUpActions';
import { strings } from '../../translations/translation';

class VerifyPhone extends Component {

    componentWillUnmount() {
        this.props.resetInputs();
    }

    render() {
        const { navigation, data, updateInput, VerifyCode } = this.props;
        const { _1, _2, _3, _4, _5, verifyLoading } = data;
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
            inputsView
        } = style;
        const disabled = _1 == '' || _2 == '' || _3 == '' || _4 == '' || _5 == '';
        const code = `${_1}${_2}${_3}${_4}${_5}`
        const revCode  = `${_5}${_4}${_3}${_2}${_1}`

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

        <Text style={caption}>{strings.Verification_Code_Phone}</Text>
        <Text style={[caption, { fontSize: RScaler(1.85), marginTop: '1%', marginBottom: '13%' }]}>{strings.Code_Sent_Phone}</Text>

                    <View style={inputsView}>
                        <TextInput
                            style={input}
                            keyboardType="numeric"
                            selectionColor={Colors.orange}
                            onChangeText={(value) => {
                                updateInput(value, 1);
                                if (_1 == '') {
                                    this._2.focus();
                                }
                                if (_1 != '') {
                                    return false;
                                }
                            }}
                            maxLength={1}
                            value={_1}
                            ref={ref => this._1 = ref}
                        />
                        <TextInput
                            style={input}
                            keyboardType="numeric"
                            selectionColor={Colors.orange}
                            onChangeText={(value) => {
                                updateInput(value, 2);
                                if (_2 != '') {
                                    this._1.focus();
                                }
                                if (_2 == '') {
                                    this._3.focus();
                                }
                            }}
                            maxLength={1}
                            value={_2}
                            ref={ref => this._2 = ref}
                        />
                        <TextInput
                            style={input}
                            keyboardType="numeric"
                            selectionColor={Colors.orange}
                            onChangeText={(value) => {
                                updateInput(value, 3);
                                if (_3 != '') {
                                    this._2.focus();
                                }
                                if (_3 == '') {
                                    this._4.focus();
                                }
                            }}
                            maxLength={1}
                            value={_3}
                            ref={ref => this._3 = ref}
                        />
                        <TextInput
                            style={input}
                            keyboardType="numeric"
                            selectionColor={Colors.orange}
                            onChangeText={(value) => {
                                updateInput(value, 4);;
                                if (_4 != '') {
                                    this._3.focus();
                                }
                                if (_4 == '') {
                                    this._5.focus();
                                }
                            }}
                            maxLength={1}
                            value={_4}
                            ref={ref => this._4 = ref}
                        />
                        <TextInput
                            style={input}
                            keyboardType="numeric"
                            selectionColor={Colors.orange}
                            onChangeText={(value) => {
                                updateInput(value, 5);;
                                if (_5 != '') {
                                    this._4.focus();
                                }
                                if (_5 == '') {
                                    Keyboard.dismiss();
                                }
                            }}
                            maxLength={1}
                            value={_5}
                            ref={ref => this._5 = ref}
                        />
                    </View>

                    <Button
                        text={strings.DONE}
                        textStyle={resetBtnText}
                        style={resetBtn}
                        background={null}
                        disabled={disabled}
                        loading={verifyLoading}
                        indicatorColor='#fff'
                        onPress={() => {
                            navigation.navigate("CompleteSignUp")
                            //strings.getLanguage()=="en"?VerifyCode(code, navigation):VerifyCode(revCode, navigation)
                        }}
                    />

                        <Text style={[hintTitle, { marginTop: '32%' }]}>{strings.Have_Account}<Text style={hintSubTitle} onPress={() => navigation.navigate("SignIn")}>{strings.SignIn}</Text></Text>
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

export default connect(MapStateToProps, { updateInput, VerifyCode, resetInputs })(VerifyPhone);