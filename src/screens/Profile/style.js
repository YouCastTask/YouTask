import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RScaler, ToolbarHeight } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isANDROID = Platform.OS === 'android';
const isIPHONEX = Platform.OS === 'ios' && (width >= 800 || height >= 800);
const bigDevice = width >= 700 || height >= 700;
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: isIPHONEX ? height : '100%',
        backgroundColor: Colors.gray
    },
    title: {
        fontFamily: bold,
        fontSize: RScaler(3.5),
        color: Colors.white
    },
    userInfo: {
        width: width,
        height: height - ToolbarHeight() - RScaler(60) - RScaler(isIPHONEX ? 8 : bigDevice ? 10.5 : 12),
        backgroundColor: Colors.dark,
        flexDirection: 'row'
    },
    section: {
        flex: 1,
        height: isIPHONEX ? '71.5%' : '100%',
        backgroundColor: Colors.gray,
        borderBottomWidth: RScaler(.5),
        borderColor: Colors.dark
    },
    username: {
        fontFamily: bold,
        fontSize: RScaler(3),
        color: Colors.white
    },
    extraInfo: {
        fontFamily: light,
        fontSize: RScaler(1.8),
        color: Colors.white,
        marginTop: RScaler(1)
    },
    portfolioText: {
        fontFamily: bold,
        fontSize: RScaler(2.5),
        color: Colors.white,
        textAlign: 'center'
    },
    lockedView: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: Colors.dark,
        alignItems: 'center',
        zIndex: 5,
        paddingTop: ToolbarHeight() + RScaler(5)
    },
    logo: {
        width: RScaler(9),
        height: RScaler(9),
        resizeMode: 'contain',
        marginVertical: '5%'
    },
    whiteText: {
        width: '90%',
        color: Colors.white,
        fontSize: RScaler(2.1),
        fontFamily: regular,
        textAlign: 'center'
    },
    orangeText: {
        color: Colors.orange
    },
    whoopsText: {
        fontFamily: regular,
        fontSize: RScaler(2.8),
        color: Colors.white,
        marginBottom: '5%'
    },
    subscribeBtn: {
        width: '40%',
        backgroundColor: Colors.orange,
        elevation: 0,
        borderRadius: 50,
        borderWidth: 0,
        marginTop: '8%'
    },
    subscribeBtnText: {
        fontFamily: bold,
        fontSize: RScaler(2.3),
        color: Colors.white,
        paddingTop: isANDROID ? null : RScaler(1.3)
    }
});