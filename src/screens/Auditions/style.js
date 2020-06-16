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
        width: '100%',
        height: RScaler(20),
        backgroundColor: Colors.gray,
        marginBottom: RScaler(1),
        elevation: 0,
        shadowOpacity: 0,
        borderRadius: 15,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    lastItem: {
        marginBottom: RScaler(15)
    },
    name: {
        fontFamily: bold,
        fontSize: RScaler(2.5),
        color: Colors.white,
        marginStart: RScaler(3),
        marginBottom: RScaler(.5)
    },
    date: {
        fontFamily: regular,
        fontSize: RScaler(2.1),
        color: Colors.white,
        marginStart: RScaler(3),
        marginBottom: RScaler(.5)
    },
    author: {
        fontFamily: light,
        fontSize: RScaler(1.6),
        color: Colors.white,
        marginStart: RScaler(3)
    },
    separator: {
        flex: .035,
        width: 3,
        height: '80%',
        marginStart: RScaler(4),
        marginEnd: RScaler(4),
        backgroundColor: Colors.white
    },
    statusStyle: {
        flex: 1,
        fontFamily: regular,
        fontSize: RScaler(2.5),
        color: Colors.white
    },
    indicator: {
        marginTop: '50%'
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