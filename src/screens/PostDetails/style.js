import { StyleSheet, Dimensions } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const avatarSize = RScaler(7);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: Colors.gray
    },
    subContainer: {
        width: width,
        height: '100%',
        backgroundColor: Colors.dark
    },
    setCovetBtn: {
        width: width,
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: Colors.orange
    },
    setCovetBtnText: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    headerView: {
        width: width,
        height: RScaler(10),
        borderBottomWidth: 1,
        borderColor: Colors.dark,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.gray,
        borderTopWidth: 2
    },
    pPicture: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        overflow: 'hidden',
        marginHorizontal: '5%'
    },
    name: {
        color: Colors.white,
        fontFamily: regular,
        fontSize: RScaler(2)
    },
    details: {
        color: Colors.white,
        fontFamily: regular,
        fontSize: RScaler(2)
    },
    postImage: {
        width: width,
        height: RScaler(30),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2%'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    captionView: {
        width: width,
        backgroundColor: Colors.gray,
        minHeight: '10%',
        borderBottomWidth: 1,
        borderColor: Colors.dark
    },
    input: {
        width: '94%',
        fontFamily: regular,
        fontSize: RScaler(2.2),
        color: Colors.white,
        marginHorizontal: '3%'
    },
    inputEditable: {
        width: '94%',
        fontFamily: regular,
        fontSize: RScaler(2.2),
        color: Colors.white,
        marginHorizontal: '3%',
        backgroundColor: Colors.dark,
        borderTopWidth: 2,
        borderColor: Colors.orange
    },
    footerView: {
        width: width,
        height: RScaler(10),
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    voteBtn: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0
    },
    voteBtnIcon: {
        color: Colors.white,
        borderWidth: .5,
        fontSize: RScaler(2.5),
        borderColor: Colors.white
    },
    voteBtnText: {
        fontFamily: regular,
        fontSize: RScaler(2.2),
        color: Colors.white,
        marginHorizontal: RScaler(.3)
    },
    itemPoints: {
        flex: 1,
        textAlign: 'center',
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    leftSideView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    actionBtn: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        marginHorizontal: '1%',
        backgroundColor: 'transparent'
    },
    separator: {
        width: 1,
        height: '100%',
        backgroundColor: Colors.dark
    },
    iconStyle: {
        color: Colors.white,
        fontSize: RScaler(3.2)
    },
    lengthText: {
        color: Colors.white,
        fontSize: RScaler(2),
        fontFamily: regular,
        alignSelf: 'flex-end',
        marginEnd: '3%',
        marginBottom: '3%'
    },
    upperCaption: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        margin: '3%'
    },
    playIcon: {
        fontSize: RScaler(8),
        color: Colors.white,
        zIndex: 100,
        position: 'absolute'
    }
});