import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isAndroid = Platform.OS === 'android';
const isIPHONEX = Platform.OS === 'ios' && (width >= 750 || height >= 750);
const logoSize = RScaler(11);
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
    logo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain',
        marginTop: '40%',
        marginBottom: '3%'
    },
    input: {
        borderWidth: 1,
        padding: isAndroid ? '3%' : '4%',
        marginStart: '3%',
        marginEnd: '3%',
        borderColor: Colors.orange,
        borderRadius: 10,
        color: Colors.white,
        textAlign: 'center',
        fontFamily: bold,
        fontWeight: 'normal'
    },
    resetBtn: {
        width: '80%',
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
    },
    caption: {
        fontFamily: regular,
        fontSize: RScaler(2.6),
        color: Colors.white
    },
    inputsView: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RScaler(10)
    }
});