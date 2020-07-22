import { StyleSheet, Platform, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const logoSize = RScaler(11);
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
        marginTop: '30%'
    },
    input: {
        flex: 1,
        color: Colors.white,
        fontFamily: regular,
        paddingStart: '5%',
        fontSize: RScaler(2.3),
        color: Colors.white,
        height: RScaler(8)
    },
    inputContainer: {
        width: '70%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ffffff99'
    },
    resetBtn: {
        width: '80%',
        borderRadius: 0,
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.orange,
        marginTop: RScaler(10)
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
        color: Colors.white,
        marginVertical: RScaler(4)
    },
    inputsView: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center'
    }
});