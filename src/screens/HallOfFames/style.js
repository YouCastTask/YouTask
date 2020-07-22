import { StyleSheet, Dimensions } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width } = Dimensions.get('screen');
const avatarSize = RScaler(8);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        backgroundColor: Colors.gray
    },
    list: {
        width: width,
        height: '85%',
        backgroundColor: Colors.dark,
        padding: RScaler(3),
    },
    itemContainer: {
        width: '49%',
        height: RScaler(25),
        minHeight: RScaler(20),
        marginBottom: RScaler(1),
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 15,
        alignItems: 'flex-start',
        overflow: 'hidden'
    },
    itemImage: {
        width: '100%',
        height: '100%'
    },
    shadeView: {
        width: '100%',
        height: '35%',
        position: 'absolute',
        bottom: 0
    },
    name: {
        textAlign: 'center',
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    followBtn: {
        width: '80%',
        alignSelf: 'center',
        height: '45%',
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        marginTop: RScaler(1),
        backgroundColor: Colors.gray
    },
    followBtnText: {
        fontFamily: bold,
        fontSize: RScaler(2),
        color: Colors.white,
        letterSpacing: RScaler(.5)
    },
    header: {
        width: width,
        height: RScaler(7),
        backgroundColor: Colors.gray
    },
    tabStyle: {
        width: width * 25 / 100,
        height: 35,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        shadowOpacity: 0
    },
    tabTitleStyle: {
        fontFamily: regular,
        fontSize: RScaler(2.1)
    },
    bottomButton: {
        width: width,
        height: RScaler(15),
        backgroundColor: Colors.gray
    },
    bottomButtonTitle: {
        fontFamily: bold,
        fontSize: RScaler(2.8),
        color: Colors.white,
        textAlign: 'center'
    },
    ModalOverlay: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.dark,
        opacity: .5,
        position: 'absolute',
        top: 0
    },
    searchToolbar: {
        width: width,
        height: RScaler(10),
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cancelBtn: {
        width: '25%',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0
    },
    cancelBtnText: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    searchInputView: {
        width: '70%',
        height: '60%',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center'
    },
    searchIcon: {
        fontSize: RScaler(3),
        color: Colors.dark,
        marginStart: '3%'
    },
    searchInput: {
        flex: 1,
        fontFamily: regular,
        fontSize: RScaler(2.1),
        color: Colors.dark
    },
    searchItemContainer: {
        width: width,
        height: RScaler(15),
        backgroundColor: Colors.gray,
        marginVertical: '1.5%',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    avatarView: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        marginHorizontal: '5%'
    },
    modelInfo: {
        flex: 1
    },
    modelInfoText: {
        fontFamily: bold,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    followingBtn: {
        width: '25%',
        backgroundColor: 'transparent',
        borderRadius: 0,
        borderWidth: 0,
        shadowOpacity: 0,
        elevation: 0
    },
    followingBtnText: {
        fontFamily: light,
        fontSize: RScaler(2.3),
        color: Colors.white
    }
});