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
    subContainer: {
        width: width,
        height: height - RScaler(10),
        backgroundColor: Colors.dark
    },
    caption: {
        width: '90%',
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        textAlign: 'center',
        alignSelf: 'center',
        lineHeight: RScaler(3.5),
        marginTop: RScaler(4)
    },
    btnsSection: {
        width: width,
        height: RScaler(10),
        backgroundColor: Colors.gray,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0
    },
    btn: {
        flex: 1,
        height: '100%',
        backgroundColor: 'transparent'
    },
    btnText: {
        fontFamily: bold,
        fontSize: RScaler(3),
        color: Colors.white
    },
    calendar: {
        backgroundColor: Colors.gray,
        marginTop: RScaler(4)
    }
});

export const theme = {
    calendarBackground: Colors.gray,
    textSectionTitleColor: Colors.white,
    selectedDayTextColor: '#ffffff',
    todayTextColor: Colors.white,
    dayTextColor: Colors.white,
    textDisabledColor: "#777",
    arrowColor: Colors.orange,
    monthTextColor: Colors.white,
    indicatorColor: Colors.red,
    textDayFontFamily: light,
    textMonthFontFamily: bold,
    textDayHeaderFontFamily: regular,
    textDayFontSize: RScaler(2.2),
    textMonthFontSize: RScaler(2.5),
    textDayHeaderFontSize: RScaler(2.2)
}