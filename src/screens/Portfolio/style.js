import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isBigDevice = (height > 650 || width > 650);
const isANDROID = Platform.OS === 'android';
const isIPHONEX = Platform.OS === 'ios' && (width >= 750 || height >= 750);
const avatarSize = RScaler(isBigDevice ? 5.5 : 7);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: isIPHONEX ? height : '100%',
        backgroundColor: Colors.gray
    },
    pPicture: {
        width: width,
        height: RScaler(40),
        backgroundColor: Colors.dark
    },
    followerCount: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        position: 'absolute',
        right: RScaler(6),
        top: RScaler(29),
        zIndex: 100,
        padding: '1%',
        backgroundColor: '#0003'
    },
    followBtn: {
        width: '35%',
        height: RScaler(4),
        position: 'absolute',
        right: RScaler(3),
        top: RScaler(34),
        borderWidth: 0,
        backgroundColor: Colors.gray,
        zIndex: 50
    },
    followBtnText: {
        fontFamily: bold,
        letterSpacing: RScaler(.3),
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    separator: {
        marginTop: RScaler(8.1),
        width: width,
        height: 2,
        backgroundColor: Colors.dark
    },
    separatorPhotoMainPage: {
        marginTop: RScaler(1),
        width: width,
        height: 2,
        backgroundColor: Colors.dark
    },
    homeHeader: {
        width: width,
        borderBottomWidth: 2,
        borderColor: Colors.dark,
        paddingVertical: RScaler(1)
    },
    homeLocationView: {
        width: width,
        height: RScaler(5),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginHorizontal: '3%'
    },
    homeLocationViewText: {
        fontFamily: light,
        color: Colors.white,
        marginEnd: RScaler(3.5),
        fontSize: RScaler(2.3)
    },
    homeHeaderName: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(3.5),
        marginStart: '3.5%'
    },
    section: {
        width: width,
        padding: RScaler(3),
        borderBottomWidth: 2,
        borderColor: Colors.dark
    },
    sectionTitle: {
        fontFamily: bold,
        fontSize: RScaler(2.5),
        color: Colors.orange
    },
    sectionTitleWD: {
        fontFamily: bold,
        fontSize: RScaler(2.8),
        color: Colors.white,
        alignSelf: 'center'
    },
    sectionDescription: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2.1),
        marginVertical: RScaler(1)
    },
    addBtn: {
        width: '30%',
        height: RScaler(3),
        alignSelf: 'center',
        borderRadius: 15,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Colors.orange,
        borderWidth: 0,
        marginVertical: RScaler(1)
    },
    addBtnText: {
        fontFamily: bold,
        fontSize: RScaler(2),
        letterSpacing: RScaler(.5),
        color: Colors.white,
        zIndex: 500
    },
    options: {
        position: 'absolute',
        top: 0,
        right: RScaler(2),
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: 50
    },
    optionBtn: {
        width: 40,
        borderRadius: 50,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    addImageBtn: {
        width: width,
        height: RScaler(8),
        backgroundColor: Colors.gray,
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: Colors.dark
    },
    addImageBtnText: {
        fontFamily: bold,
        color: Colors.white,
        fontSize: RScaler(2),
        letterSpacing: 2
    },
    list: {
        width: width,
        backgroundColor: Colors.dark,
        marginBottom: isANDROID ? 7 : 35
    },
    photosContainer: {
        width: width / 3.2,
        height: RScaler(18),
        borderRadius: 15,
        backgroundColor: Colors.gray,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%'
    },
    scrollContainer: {
        width: width
    },
    scrollContainerPhotoHome: {
        width: width,
        height:"90%"
    },
    photo: {
        width: width / 3.2,
        height: RScaler(18)
    },
    itemContainer: {
        width: width,
        backgroundColor: Colors.gray,
        marginVertical: RScaler(1),
        paddingTop: RScaler(3),
        paddingHorizontal: RScaler(3)
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
        fontSize: RScaler(2.2),
        color: Colors.white,
        marginStart: RScaler(.3),
        marginEnd: RScaler(.3)
    },
    itemContent: {
        width: '100%',
        marginTop: RScaler(3),
        justifyContent: 'center'
    },
    itemImage: {
        width: '100%',
        height: RScaler(30)
    },
    itemTitle: {
        width: '75%',
        fontFamily: regular,
        fontSize: RScaler(2),
        color: Colors.white,
        marginBottom: RScaler(1)
    },
    playIcon: {
        color: Colors.white,
        fontSize: RScaler(8),
        position: 'absolute',
        zIndex: 50,
        alignSelf: 'center'
    },
    smPlayIcon: {
        color: Colors.orange,
        fontSize: RScaler(4),
        position: 'absolute',
        zIndex: 50
    },
    educationView: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '3%'
    },
    educationSchool: {
        fontFamily: regular,
        color: Colors.white
    },
    educationInfo: {
        fontFamily: regular,
        color: Colors.white,
        marginVertical: '1%'
    },
    talentView: {
        backgroundColor: Colors.dark,
        paddingHorizontal: '4%',
        paddingVertical: '3%',
        borderRadius: 5,
        marginEnd: '3%',
        marginBottom: '2%'
    },
    talentName: {
        fontFamily: bold,
        color: Colors.white,
        fontSize: RScaler(2)
    },
    experienceView: {
        width: '100%',
        justifyContent: 'center',
        marginTop: '3%'
    },
    companyName: {
        fontFamily: regular,
        color: Colors.white
    },
    jobTitle: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2)
    },
    dates: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2)
    },
    diffText: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2)
    },
    videosContainer: {
        width: width,
        height: RScaler(18),
        flexDirection: 'row',
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1%'
    },
    thumbView: {
        flex: 1,
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: '3%',
        overflow: 'hidden',
        backgroundColor: 'black'
    },
    videoThumb: {
        width: '100%',
        height: '100%',
        aspectRatio: 16 / 9
    },
    captionView: {
        flex: 2,
        height: '80%',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.orange,
        padding: '2%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    smallSeparator: {
        width: 1,
        height: '40%',
        backgroundColor: Colors.orange,
        marginHorizontal: '3%'
    },
    largeSeparator: {
        width: 1,
        height: '70%',
        backgroundColor: Colors.orange,
        marginHorizontal: '3%'
    },
    captionStyle: {
        fontFamily: light,
        color: Colors.white,
        fontSize: RScaler(2)
    },
    watchBtn: {
        width: width * 25 / 100,
        position: 'absolute',
        bottom: '5%',
        height: RScaler(3),
        backgroundColor: Colors.orange,
        right: '5%',
        borderWidth: 0,
    },
    watchBtnText: {
        fontFamily: light,
        fontSize: RScaler(1.9),
        color: Colors.dark
    }
});