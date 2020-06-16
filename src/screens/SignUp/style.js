import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 750 || height >= 750);
const bigDevice = width >= 700 || height >= 700;
const logoSize = RScaler(20);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: isIPHONEX ? height : '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    container2: {
        width: width,
        height: isIPHONEX ? height : '100%',
        justifyContent: 'center',
      },
    logo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain',
        marginTop: RScaler(10)
    },
    input: {
        width: '80%'
    },
    labelPadding: {
        paddingStart: RScaler(4),
        opacity: .5,
        fontFamily: light,
        fontSize: RScaler(1.8)
    },
    inputIcon: {
        fontSize: isIPHONEX ? RScaler(3) : RScaler(3.5),
        color: Colors.white
    },
    signUpBtn: {
        width: width,
        height: bigDevice ? RScaler(9) : 44,
        position: 'absolute',
        bottom: 0,
        borderRadius: 0,
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.orange
    },
    signUpBtnText: {
        color: Colors.white,
        fontFamily: bold,
        fontSize: RScaler(2.3)
    },
    backBtnIcon: {
        color: Colors.white,
        fontSize: RScaler(5)
    },
    backBtn: {
        width: '15%',
        position: 'absolute',
        top: RScaler(5),
        left: RScaler(1),
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0
    },
    dateView: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dropText: {
        fontFamily: regular
    },
    dropDownLabel: {
        opacity: .5,
        fontFamily: light,
        fontSize: RScaler(1.8)
    }
});