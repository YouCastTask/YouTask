import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RScaler, ToolbarHeight } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS == "ios" && (height > 800 || width > 800);
const isBigDevice = (height > 650 || width > 650);
const logoSize = RScaler(9);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const flexs = [isIPHONEX ? 4 : 3, .7, 1];
export const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: Colors.gray
    },
    title: {
        fontFamily: bold,
        fontSize: RScaler(isBigDevice ? 2.5 : 2.8),
        color: Colors.white,
        textAlign: 'left'
    },
    headerView: {
        width: width,
        height: RScaler(5),
        backgroundColor: Colors.gray,
        justifyContent: 'center'
    },
    headerSubTitle: {
        fontFamily: bold,
        fontSize: RScaler(2.5),
        color: Colors.orange,
        letterSpacing: RScaler(1),
        paddingStart: RScaler(2),
        paddingBottom: RScaler(3),
        textAlign: 'left'
    },
    subContainer: {
        width: width,
        height: height - ToolbarHeight() - RScaler(23),
        backgroundColor: Colors.dark
    },
    logo: {
        width: logoSize,
        height: logoSize,
        marginTop: RScaler(5),
        marginBottom: RScaler(5),
        resizeMode: 'contain'
    },
    upperText: {
        width: '85%',
        textAlign: 'center',
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        marginBottom: RScaler(3)
    },
    planView: {
        width: '85%',
        height: RScaler(8),
        backgroundColor: Colors.gray,
        borderRadius: 10,
        marginBottom: RScaler(2),
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: RScaler(3),
        overflow: 'hidden'
    },
    planMainBtn: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.gray,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'hidden'
    },
    planeTitle: {
        flex: 1,
        fontFamily: bold,
        fontSize: RScaler(isBigDevice ? 1.8 : 2),
        color: Colors.white
    },
    planeTitleDash: {
        textAlign: 'center',
        flex: .5,
        fontFamily: bold,
        fontSize: RScaler(2),
        color: Colors.white
    },
    subsctibeBtn: {
        flex: 1.3,
        height: '100%',
        marginStart: RScaler(2),
        backgroundColor: Colors.orange,
        borderWidth: 0
    },
    subsctibeBtnText: {
        fontFamily: bold,
        color: Colors.dark,
        fontSize: RScaler(isBigDevice ? 2 : 2.3)
    },
    dateTimeView: {
        width: '85%',
        height: RScaler(50),
        alignItems: 'center'
    },
    subsctibeText: {
        fontFamily: bold,
        fontSize: RScaler(3.5),
        color: Colors.white,
        position: 'absolute',
        top: RScaler(8),
        left: 0
    },
    periodText: {
        fontFamily: light,
        fontSize: RScaler(3.5),
        color: Colors.white,
        position: 'absolute',
        top: RScaler(8),
        right: 0
    },
    avatar: {
        width: logoSize,
        height: logoSize,
        borderRadius: logoSize / 2,
        overflow: 'hidden',
        marginTop: RScaler(8)
    },
    seperator: {
        width: 1,
        height: RScaler(4),
        backgroundColor: Colors.orange
    },
    dateBox: {
        width: '60%',
        height: RScaler(9),
        backgroundColor: Colors.gray,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dateTitle: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    dateText: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    }
});