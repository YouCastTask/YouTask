import { StyleSheet, Dimensions } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isBigDevice = (height > 650 || width > 650);
const avatarSize = RScaler(isBigDevice ? 5.5 : 7);
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
    tabStyle: {
        width: '19%',
        height: 35,
        backgroundColor: 'transparent',
        borderWidth: 0,
        borderRadius: 0,
        shadowOpacity: 0
    },

    tabsContainer: {
        width: width,
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        flexWrap:"wrap",
    },
   
    tabStyle1: {
        width: "45%",
        height:60,
        backgroundColor: 'transparent',
        justifyContent:"center",
        alignItems:"center",
        marginBottom:30,
    },
    tabTitleStyle: {
        fontFamily: regular,
        fontSize: RScaler(1.8)
    },
    tabTitleStyle1: {
        width:130,
        fontFamily: regular,
        fontSize: RScaler(3),
        textAlign:'center',
        borderWidth:1,
        borderColor:Colors.white,
        padding:10,
        borderRadius:5
    },
    itemContainer: {
        width: width,
        backgroundColor: Colors.gray,
        marginTop: RScaler(1),
        paddingTop: RScaler(3),
        paddingStart: RScaler(3),
        paddingEnd: RScaler(3)
    },
    itemHeader: {
        width: '100%',
        flexDirection: 'row',
        overflow: 'hidden',
        alignItems: 'center',
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
        borderRadius: 0
    },
    itemAvatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        overflow: 'hidden',
        marginEnd: RScaler(2)
    },
    itemUserInfo: {
        flex: 1
    },
    userName: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2.3)
    },
    info: {
        fontFamily: light,
        fontSize: RScaler(2),
        color: Colors.white
    },
    followBtn: {
        width: '20%',
        borderRadius: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        zIndex: 500
    },
    followBtnText: {
        fontFamily: regular,
        fontSize: RScaler(isBigDevice ? 1.8 : 2.3),
        color: Colors.white
    },
    itemFooter: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemPoints: {
        fontFamily: regular,
        fontSize: RScaler(1.8),
        color: Colors.white,
        paddingStart: RScaler(1),
        paddingEnd: RScaler(1)
    },
    voteBtn: {
        width: '30%',
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
        fontSize: RScaler(isBigDevice ? 2 : 2.2),
        color: Colors.white,
        marginStart: RScaler(.3),
        marginEnd: RScaler(.3)
    },
    itemContent: {
        width: '100%',
        marginTop: RScaler(3),
        justifyContent: 'center'
    },
    itemTitle: {
        width: '75%',
        fontFamily: regular,
        fontSize: RScaler(2),
        color: Colors.white,
        marginBottom: RScaler(1)
    },
    itemImage: {
        width: '100%',
        backgroundColor: 'transparent'
    },
    playIcon: {
        color: Colors.white,
        fontSize: RScaler(8),
        position: 'absolute',
        zIndex: 50,
        alignSelf: 'center'
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
    }
});