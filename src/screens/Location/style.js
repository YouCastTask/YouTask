import { StyleSheet, Dimensions } from 'react-native';
import { RScaler, ToolbarHeight } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 800 || height >= 800);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";
const subHeaderHeight = RScaler(7)

export const style = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        backgroundColor: Colors.gray,
        alignItems: 'center'
    },
    map: {
        width: width,
        height: height - ToolbarHeight() - subHeaderHeight
    },
    subHeader: {
        width: width,
        height: subHeaderHeight,
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    subHeaderTitle: {
        fontFamily: light,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    LocationView: {
        width: width,
        height: RScaler(13),
        backgroundColor: '#1d2c3350',
        position: 'absolute',
        top: ToolbarHeight() + subHeaderHeight + (isIPHONEX ? RScaler(5) : 0),
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationIcon: {
        fontSize: RScaler(4),
        color: Colors.white
    },
    locationText: {
        fontFamily: bold,
        fontSize: RScaler(2.4),
        color: Colors.white
    },
    openMapsBtn: {
        width: width,
        height: RScaler(10),
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#1d2c3350',
        justifyContent: 'center',
        alignItems: 'center'
    },
    openMapsBtnText: {
        fontFamily: light,
        fontSize: RScaler(3),
        color: Colors.white,
        letterSpacing: RScaler(.5)
    },
    openMapsBtnIcon: {
        fontSize: RScaler(4),
        position: 'absolute',
        right: RScaler(4),
        color: Colors.white
    }
});