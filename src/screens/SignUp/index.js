import React, { Component } from 'react';
import { SafeAreaView, Image, View, StatusBar, ImageBackground, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TextField } from 'react-native-materialui-textfield';
import { Dropdown } from 'react-native-material-dropdown';
import { Button } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { updateDay, updateEmail, updateMonth, updateName, updatePassword, updatePhone, updateYear, updateCity, updateCountry, setCities, validation } from './../../redux/Actions/signUpActions';

class SignUp extends Component {

    render() {
        const { navigation, data, updateDay, updateEmail, updateMonth, updateName, updatePassword, updatePhone, updateYear, updateCity, updateCountry, setCities, validation } = this.props;
        const { fullname, email, password, phone, emailError, months, days, years, countries, cites, city, country, month, year, day, phoneError, loading } = data;
        const {
            container,
            logo,
            input,
            labelPadding,
            inputIcon,
            inputHeight,
            signUpBtn,
            signUpBtnText,
            backBtn,
            backBtnIcon,
            dateView,
            dropText,
            dropDownLabel,
            container2
        } = style;
        const disabled = fullname == '' || email == '' || password == '' || phone == '' || month == '' || day == '' || year == '' || city == '' || country == '' || emailError || phoneError;

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
                    <KeyboardAvoidingView behavior={'padding'} style={container2} >
                        <ScrollView
                            style={{ width: '100%' }}
                            contentContainerStyle={{ alignItems: 'center' }}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                        >

                            <TextField
                                label="Full Name"
                                returnKeyType="next"
                                onSubmitEditing={() => this.email.focus()}
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                iconPosition="left"
                                value={fullname}
                                onChangeText={updateName.bind(this)}
                                containerStyle={input}
                                inputContainerStyle={inputHeight}
                                tintColor={Colors.orange}
                                labelTextStyle={labelPadding}
                                renderAccessory={() => <Icon name="account-outline" style={inputIcon} />}
                            />

                            <TextField
                                label="Email"
                                returnKeyType="next"
                                keyboardType="email-address"
                                iconPosition="left"
                                ref={ref => this.email = ref}
                                onSubmitEditing={() => this.password.focus()}
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                containerStyle={input}
                                value={email}
                                onChangeText={updateEmail.bind(this)}
                                inputContainerStyle={inputHeight}
                                tintColor={Colors.orange}
                                labelTextStyle={labelPadding}
                                renderAccessory={() => <Icon name="email-outline" style={inputIcon} />}
                                error={emailError}
                            />

                            <TextField
                                label="Password"
                                returnKeyType="next"
                                iconPosition="left"
                                ref={ref => this.password = ref}
                                onSubmitEditing={() => this.phone.focus()}
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                containerStyle={input}
                                value={password}
                                onChangeText={updatePassword.bind(this)}
                                inputContainerStyle={inputHeight}
                                secureTextEntry
                                tintColor={Colors.orange}
                                labelTextStyle={labelPadding}
                                renderAccessory={() => <Icon name="lock-outline" style={inputIcon} />}
                            />

                            <TextField
                                label="Phone"
                                keyboardType="number-pad"
                                iconPosition="left"
                                value={phone}
                                onChangeText={updatePhone.bind(this)}
                                ref={ref => this.phone = ref}
                                textColor={Colors.white}
                                baseColor={Colors.white}
                                containerStyle={input}
                                inputContainerStyle={inputHeight}
                                tintColor={Colors.orange}
                                labelTextStyle={labelPadding}
                                renderAccessory={() => <Icon name="cellphone-android" style={inputIcon} />}
                                error={phoneError}
                            />

                            <View style={dateView}>
                                <Dropdown
                                    label='Country'
                                    labelTextStyle={dropDownLabel}
                                    value={country}
                                    data={countries}
                                    textColor={Colors.white}
                                    baseColor={Colors.white}
                                    itemColor={Colors.dark}
                                    selectedItemColor={Colors.orange}
                                    itemCount={5}
                                    itemTextStyle={dropText}
                                    onChangeText={(value, index, data) => {
                                        setCities(data[index].cities);
                                        updateCountry(value, data[index].iso);
                                    }}
                                    containerStyle={{ flex: 1, marginEnd: RScaler(2) }}
                                />
                                <Dropdown
                                    label='City'
                                    data={cites}
                                    value={city}
                                    textColor={Colors.white}
                                    labelTextStyle={dropDownLabel}
                                    baseColor={Colors.white}
                                    itemColor={Colors.dark}
                                    selectedItemColor={Colors.orange}
                                    itemCount={5}
                                    onChangeText={(value, index, data) => {
                                        updateCity(value, data[index].id);
                                    }}
                                    itemTextStyle={dropText}
                                    containerStyle={{ flex: 1 }}
                                />
                            </View>

                            <View style={[dateView, { marginBottom: RScaler(10) }]}>
                                <Dropdown
                                    label='Month'
                                    value={month}
                                    onChangeText={updateMonth.bind(this)}
                                    labelTextStyle={dropDownLabel}
                                    data={months}
                                    textColor={Colors.white}
                                    baseColor={Colors.white}
                                    itemColor={Colors.dark}
                                    selectedItemColor={Colors.orange}
                                    itemCount={5}
                                    itemTextStyle={dropText}
                                    containerStyle={{ flex: 2, marginEnd: RScaler(2) }}
                                    dropdownPosition={3}
                                />
                                <Dropdown
                                    label='Day'
                                    onChangeText={updateDay.bind(this)}
                                    value={day}
                                    data={days}
                                    textColor={Colors.white}
                                    labelTextStyle={dropDownLabel}
                                    baseColor={Colors.white}
                                    itemColor={Colors.dark}
                                    selectedItemColor={Colors.orange}
                                    itemCount={5}
                                    itemTextStyle={dropText}
                                    containerStyle={{ flex: 1, marginEnd: RScaler(2) }}
                                    dropdownPosition={3}
                                />
                                <Dropdown
                                    label='Year'
                                    value={year}
                                    onChangeText={updateYear.bind(this)}
                                    data={years}
                                    textColor={Colors.white}
                                    labelTextStyle={dropDownLabel}
                                    baseColor={Colors.white}
                                    itemColor={Colors.dark}
                                    selectedItemColor={Colors.orange}
                                    itemCount={5}
                                    itemTextStyle={dropText}
                                    containerStyle={{ flex: 1 }}
                                    dropdownPosition={3}
                                />
                            </View>
                        </ScrollView>


                    </KeyboardAvoidingView>

                    <Button
                        text="Next step"
                        textStyle={signUpBtnText}
                        style={signUpBtn}
                        background={null}
                        loading={loading}
                        indicatorColor="#fff"
                        disabled={disabled}
                        onPress={() => validation({ fullname: fullname, email: email, password: password, phone: phone }, navigation)}
                    />
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.SignUp
    }
}

export default connect(MapStateToProps, { validation, setCities, updateCity, updateCountry, updateDay, updateEmail, updateMonth, updateName, updatePassword, updatePhone, updateYear })(SignUp);