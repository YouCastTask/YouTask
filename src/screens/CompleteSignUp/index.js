import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, View, Image, ImageBackground, TouchableNativeFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, ClickableView } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { selectImage, upload, reset } from './../../redux/Actions/signUpActions';
import { strings } from '../../translations/translation';

class CompleteSignUp extends Component {

    componentWillUnmount() {
       this.props.reset();
    }

    images = [1,2,3];

    render() {
        const { navigation, selectImage, data, upload } = this.props;
        const { images, month, year, day, iso, id, fullname, email, password, phone, loading } = data;
        const {
            container,
            backBtnIcon,
            backBtn,
            caption,
            imageContainer,
            imageBtn,
            signUpBtnText,
            signUpBtn,
            imageBtnIcon,
            profilePics
        } = style;
        const disabled = images.length < 3;

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

                    <View style={imageContainer}>
                        {
                            this.images.map((item, index) => {
                                const lastIndex = index == this.images.length - 1;
                                return (
                                    <ClickableView disabled={loading} style={[imageBtn, { marginEnd: !lastIndex ? RScaler(2.6) : null }]} background={TouchableNativeFeedback.Ripple(Colors.orange, true)} key={index} onPress={() => selectImage(images, index)} >
                                        {
                                            images[index] != undefined ?
                                                <Image source={{ uri: images[index].uri }} style={profilePics} />
                                                : <Icon name="plus" style={imageBtnIcon} />
                                        }
                                    </ClickableView>
                                );
                            })
                        }
                    </View>

                    <Text style={caption}>{strings.ReadyAccount}</Text>

                    <Button
                        text="Sign Up"
                        textStyle={signUpBtnText}
                        style={signUpBtn}
                        background={null}
                        disabled={disabled}
                        loading={loading}
                        indicatorColor="#fff"
                        onPress={() => { upload(images, { month: month, year: year, day: day, iso: iso, id: id, fullname: fullname, email: email, password: password, phone: phone }, navigation) }}
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

export default connect(MapStateToProps, { selectImage, upload, reset })(CompleteSignUp);