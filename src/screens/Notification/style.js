import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS == "ios" && (height > 800 || width > 800);
const avatarSize = RScaler(11);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const flexs = [isIPHONEX ? 4 : 3, 2, 1];
export const style = StyleSheet.create({
    container: {
        width: width,
        height: isIPHONEX ? height : '100%',
        backgroundColor: Colors.gray
    },
    emptyContainer: {
        width: width,
        backgroundColor: Colors.dark,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '35%'
    },
    title: {
        fontFamily: bold,
        fontSize: RScaler(3.5),
        color: Colors.white
    },
    list: {
        backgroundColor: Colors.dark
    },
    itemContainer: {
        width: width * 90 / 100,
        minHeight: RScaler(8),
        backgroundColor: Colors.gray,
        marginVertical: RScaler(1),
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 15,
        alignItems: 'flex-start',
    },
    name: {
        fontFamily: bold,
        fontSize: RScaler(2.2),
        marginHorizontal: RScaler(3),
        color: Colors.white,
        marginBottom: RScaler(.5),
        alignSelf: 'flex-start'
    },
    date: {
        fontFamily: regular,
        fontSize: RScaler(2.5),
        color: Colors.white,
        marginStart: RScaler(3),
        marginBottom: RScaler(.5)
    },
    emptyIcon: {
        width: '40%',
        height: RScaler(20),
        resizeMode: 'contain',
        marginBottom: '10%'
    },
    emptyMsg: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        marginBottom: '30%',
        textAlign: 'center'
    },
    reloadBtn: {
        width: '40%',
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.orange,
        borderWidth: 0
    },
    reloadBtnText: {
        fontFamily: light,
        fontSize: RScaler(2.3),
        color: Colors.white
    }
});