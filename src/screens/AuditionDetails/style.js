import { StyleSheet, Dimensions } from 'react-native';
import { RScaler, ToolbarHeight } from '../../lib/utilites';
import { Colors } from './../../../app.json';

const { width, height } = Dimensions.get('screen');
const light = "OpenSans-Light";
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";

export const style = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: Colors.gray
    },
    contentContainer: {
        width: width,
        height: height - ToolbarHeight(),
        backgroundColor: Colors.dark,
        paddingTop: RScaler(5)
    },
    upperSection: {
        width: '90%',
        height: RScaler(35),
        backgroundColor: Colors.gray,
        borderRadius: 10,
        overflow: 'hidden'
    },
    upperSectionImg: {
        width: '100%',
        height: '100%',
        opacity: .3,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RScaler(4)
    },
    leftSide: {
        flex: 1,
        fontFamily: bold,
        fontSize: RScaler(2.5),
        color: Colors.orange,
        marginStart: RScaler(3)
    },
    rightSide: {
        fontFamily: light,
        fontSize: RScaler(2.3),
        color: Colors.white,
        marginEnd: RScaler(3)
    },
    locationView: {
        width: '90%',
        backgroundColor: Colors.gray,
        borderRadius: 10,
        marginTop: RScaler(4),
        marginBottom: RScaler(4),
        padding: RScaler(2)
    },
    locationTitle: {
        fontFamily: bold,
        fontSize: RScaler(3),
        color: Colors.orange
    },
    subTitle: {
        textAlign: 'right',
        fontFamily: light,
        fontSize: RScaler(2.5),
        color: Colors.white
    },
    row: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: RScaler(4),
        marginBottom: RScaler(4),
        paddingTop: RScaler(3),
        paddingBottom: RScaler(3)
    },
    button: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: Colors.gray
    },
    buttonText: {
        width: '85%',
        fontFamily: bold,
        color: Colors.white,
        fontSize: RScaler(2.1),
        textAlign: 'center'
    },
    caption: {
        fontFamily: light,
        color: Colors.white,
        fontSize: RScaler(2.3),
        marginBottom: RScaler(10)
    },
    status: {
        flex: 1,
        fontFamily: bold,
        textAlign: 'center',
        color: Colors.white,
        alignSelf: 'center',
        fontSize: RScaler(2.3)
    },
    topBorder: {
        width: '80%',
        height: 5,
        position: 'absolute',
        top: 0
    },
    bottomBorder: {
        width: '80%',
        height: 5,
        position: 'absolute',
        bottom: 0
    },
    statusAction: {
        flex: 1,
        fontFamily: bold,
        textAlign: 'left',
        color: Colors.red,
        fontSize: RScaler(3),
        letterSpacing: RScaler(.5)
    },
    shootingDateView: {
        width: '85%',
        marginTop: RScaler(1)
    },
    shootingDateTime: {
        fontFamily: light,
        fontSize: RScaler(1.8),
        color: Colors.white,
        marginBottom: RScaler(1)
    },
    shootingDateRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    shootingDateDetails: {
        flex: 1,
        borderLeftWidth: 5,
        borderColor: Colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.gray,
        marginStart: RScaler(.5),
        marginEnd: RScaler(.5),
        paddingTop: RScaler(2),
        paddingBottom: RScaler(2)
    },
    shootingDateText: {
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white
    },
    loadingModal: {
        width: '100%',
        height: '100%',
        backgroundColor: '#0e151850',
        position: 'absolute',
        zIndex: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    loadingText: {
        fontFamily: bold,
        fontSize: RScaler(4.5),
        color: Colors.orange,
        marginStart: '5%'
    }
});