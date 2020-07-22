import { StyleSheet, Dimensions } from 'react-native';
import { RScaler } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const isBigDevice = (height > 650 || width > 650);
const avatarSize = RScaler(11);
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: Colors.gray
    },
    sideMenuHeader: {
        width: width * 80 / 100,
        height: RScaler(35),
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomColor: Colors.dark,
        borderBottomWidth: 8,
        marginBottom: RScaler(5)
    },
    avatar: {
        width: avatarSize,
        height: avatarSize,
        borderRadius: avatarSize / 2,
        overflow: 'hidden',
        alignSelf: 'center',
        marginBottom: RScaler(2)
    },
    name: {
        fontFamily: regular,
        color: Colors.white,
        fontSize: RScaler(2.3)
    },
    jobName: {
        fontFamily: light,
        color: Colors.white,
        fontSize: RScaler(2)
    },
    button: {
        width: '100%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginBottom: RScaler(isBigDevice ? .5 : 0)
    },
    itemTitle: {
        fontFamily: bold,
        fontSize: RScaler(isBigDevice ? 2.2 : 2.5),
        color: Colors.white,
        marginStart: RScaler(3)
    },
    itemIcon: {
        width: RScaler(4),
        height: RScaler(4),
        fontSize: RScaler(4),
        color: Colors.white,
        tintColor: Colors.orange,
        marginStart: RScaler(3)
    }
});