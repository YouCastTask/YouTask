import { StyleSheet, Dimensions } from 'react-native';
import { RScaler } from './../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const logoSize = RScaler(15);
const light = "OpenSans-Light";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: '100%',
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain'
    },
    title: {
        fontFamily: light,
        fontSize: RScaler(5),
        marginTop: RScaler(2),
        color: Colors.white
    },
    subTitle: {
        fontFamily: bold
    }
});