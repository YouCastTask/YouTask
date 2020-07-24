import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 750 || height >= 750);
const logoSize = RScaler(25);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: isIPHONEX ? height : '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    logo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain'
    },
    input: {
        width: '80%'
    },
    labelPadding: {
        paddingStart: RScaler(4),
        paddingEnd: RScaler(5),
        opacity: .5,
        fontFamily: light,
        fontSize: RScaler(1.8)
    },
    inputIcon: {
        fontSize: isIPHONEX ? RScaler(3) : RScaler(3.5),
        color: Colors.white
    },
    forgetPasswordBtn: {
        color: Colors.white,
        alignSelf: 'flex-end',
        marginEnd: width * 10 / 100,
        fontFamily: light,
        fontSize: RScaler(1.8)
    },
    signInBtn: {
        width: '80%',
        marginTop: RScaler(5),
        borderRadius: 0,
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.orange
    },
    signInBtnText: {
        color: Colors.white,
        fontFamily: bold,
        fontSize: RScaler(2.3)
    },
    createAccountText: {
        color: Colors.white,
        position: 'absolute',
        bottom: RScaler(4),
        fontFamily: light
    },
    createAccountBtn: {
        color: Colors.orange,
        fontFamily: bold
    }
});