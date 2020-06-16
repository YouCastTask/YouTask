import { StyleSheet, Dimensions, Platform } from 'react-native';
import { RScaler, ToolbarHeight } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 800 || height >= 800);
const logoSize = RScaler(23);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";
const subHeaderHeight = RScaler(7)

export const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: Colors.gray,
        alignItems: 'center'
    },
    content: {
        width: width,
        height: height - ToolbarHeight(),
        backgroundColor: Colors.dark,
        alignItems: 'center'
    },
    logo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain',
        marginTop: RScaler(15)
    },
    caption: {
        width: '85%',
        fontFamily: light,
        color: Colors.white,
        textAlign: 'center',
        fontSize: RScaler(2),
        marginTop: RScaler(5)
    },
    phoneText: {
        fontSize: RScaler(2)
    },
    callUsText: {
        fontFamily: regular,
        fontSize: RScaler(2.2),
        color: Colors.white,
        textAlign: 'center',
        marginTop: RScaler(4)
    }
});