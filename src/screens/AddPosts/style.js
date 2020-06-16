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
        height: height,
        backgroundColor: Colors.gray,
        alignItems: 'center'
    },
    uploadBtn: {
        width: width,
        backgroundColor: Colors.orange,
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 2,
        borderColor: Colors.dark
    },
    uploadBtnText: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2.3)
    },
    uploadFileView: {
        width: width,
        height: RScaler(40),
        backgroundColor: Colors.gray,
        borderBottomWidth: 2,
        borderColor: Colors.dark,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 0,
        borderWidth: 0
    },
    plusView: {
        backgroundColor: Colors.orange,
        padding: '3%',
        borderRadius: 50
    },
    slug: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        marginVertical: '5%',
        textAlign: 'center'
    },
    captionContainer: {
        paddingHorizontal: '5%',
        marginVertical: '5%',
        width: width,
        height: RScaler(25),
        borderBottomWidth: 5,
        borderColor: '#0001'
    },
    videoContainer: {
        paddingHorizontal: '5%',
        marginBottom: '5%',
        width: width,
        height: RScaler(20),
        borderBottomWidth: 5,
        borderColor: '#0001'
    },
    captionTitle: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    input: {
        width: '100%',
        marginVertical: '5%',
        height: '75%',
        backgroundColor: Colors.dark
    },
    captionInput: {
        fontFamily: regular,
        fontSize: RScaler(2),
        color: Colors.white,
        minHeight: '10%',
        maxHeight: '80%'
    },
    lengthText: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2),
        position: 'absolute',
        bottom: '3%',
        right: '3%'
    },
    postImage: {
        width: '100%',
        height: '100%'
    },
    checkView: {
        width: width,
        height: '10%',
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: Colors.dark
    },
    tipView: {
        width: width,
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        marginTop: '8%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tipTexts: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkOrangeText: {
        color: Colors.orange,
        fontSize: RScaler(2.8),
        fontFamily: regular
    },
    orangeText: {
        color: Colors.orange,
        fontSize: RScaler(2.3),
        fontFamily: regular
    },
    whiteText: {
        color: Colors.white,
        fontSize: RScaler(2.8),
        fontFamily: regular
    },
    separator: {
        width: 1,
        height: '100%',
        marginHorizontal: '3%',
        backgroundColor: Colors.orange
    },
    tipText: {
        flex: 2.2,
        fontFamily: light,
        fontSize: RScaler(1.8),
        color: Colors.white
    },
    statusCircleView: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: Colors.white
    },
    statusView: {
        flex: 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    statusText: {
        fontFamily: regular,
        fontSize: RScaler(2),
        marginStart: '5%',
        color: Colors.white
    }
});