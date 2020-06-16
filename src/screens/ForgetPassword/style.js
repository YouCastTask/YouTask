import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const logoSize = RScaler(13);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        alignItems: 'center',
        position: 'absolute',
        top: 0
    },
    logo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain',
        marginTop: RScaler(10),
        marginBottom: RScaler(5)
    },
    input: {
        width: '80%',
        marginTop: RScaler(5)
    },
    labelPadding: {
        opacity: .5,
        fontFamily: light,
        fontSize: RScaler(1.8)
    },
    inputIcon: {
        fontSize: RScaler(3.5),
        color: Colors.red
    },
    resetBtn: {
        width: '80%',
        marginTop: RScaler(5),
        borderRadius: 0,
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.orange
    },
    resetBtnText: {
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
    caption: {
        width: '80%',
        fontFamily: bold,
        fontSize: RScaler(5.2),
        color: Colors.white,
        marginTop: RScaler(15)
    },
    hintTitle: {
        fontFamily: light,
        fontSize: RScaler(2.3),
        color: '#fff9',
        marginBottom: RScaler(1)
    },
    hintSubTitle: {
        fontFamily: bold,
        color: Colors.white
    },
    errorText: {
        fontFamily: light
    }
});