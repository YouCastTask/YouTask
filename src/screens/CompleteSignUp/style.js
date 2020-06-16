import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const bigDevice = width >= 700 || height >= 700;
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
        fontFamily: regular,
        color: Colors.white,
        textAlign: 'center',
        fontSize: RScaler(2.3)
    },
    imageContainer: {
        flexDirection: 'row',
        width: '90%',
        marginBottom: RScaler(8),
        marginTop: RScaler(25)
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
    imageBtn: {
        flex: 1,
        height: RScaler(15),
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: Colors.orange
    },
    imageBtnIcon: {
        fontSize: RScaler(5),
        color: Colors.orange
    },
    profilePics: {
        width: '100%',
        height: '100%'
    }
});