import { StyleSheet, Dimensions } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        backgroundColor: Colors.gray,
        alignItems: 'center'
    },
    saveBtn: {
        width: width * 50 / 100,
        backgroundColor: Colors.orange,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
        borderRadius: 0,
        marginVertical: '3%',
        alignSelf: 'center'
    },
    saveBtnText: {
        fontFamily: bold,
        fontSize: RScaler(2.3),
        color: Colors.white,
        letterSpacing: 3
    },
    Infocard: {
        width: '95%',
        marginTop: '3%',
        backgroundColor: Colors.gray,
        alignSelf: 'center',
        borderRadius: 10
    },
    deleteBtn: {
        width: '15%',
        alignSelf: 'flex-end',
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 2000
    },
    inputView: {
        width: '90%',
        height: RScaler(12),
        alignSelf: 'center',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        elevation: 0,
        borderRadius: 0,
        borderWidth: 0
    },
    inputLabel: {
        fontFamily: regular,
        fontSize: RScaler(2.2),
        color: Colors.white,
        marginVertical: '2%',
        position: 'absolute',
        top: 0
    },
    inputStyle: {
        width: '100%',
        marginTop: '3%',
        color: Colors.white,
        fontFamily: regular,
        backgroundColor: 'transparent',
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0,
        borderRadius: 0,
        alignItems: 'flex-start'
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: Colors.white,
        position: 'absolute',
        bottom: '15%'
    },
    dateView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    dropDownLabel: {
        width:"100%",
        fontFamily: light,
        fontSize: RScaler(1.8)
    },
    dropText: {
        fontFamily: regular,
        color:"#000"
    },
});