import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { connect } from 'react-redux';
import { Toolbar, ClickableView } from './../../components';
import { style, theme } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import moment from 'moment';
import { addDay, editCalendar, reset } from './../../redux/Actions/calendarActions';
import { strings } from '../../translations/translation';

class Calendars extends Component {

    componentWillUnmount() {
        this.props.reset();
    }

    lastDay() {
        let currentDate = moment(new Date());
        let futureMonth = moment(currentDate).add(1, 'M');
        let futureMonthEnd = moment(futureMonth).endOf('month');

        if (currentDate.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('YYYY-MM-DD'))) {
            futureMonth = futureMonth.add(1, 'd');
        }

        return futureMonth.format('YYYY-MM-DD');
    }

    dayPressed(day) {
        const { data, addDay } = this.props;
        const { dateString } = day;

        addDay(dateString, data.days);
    }

    dayLongPress(day) {
        const { data, addDay } = this.props;
        const { dateString } = day;

        addDay(dateString, data.days, 'long')
    }

    render() {
        const { navigation, data, editCalendar } = this.props;
        const { days, initDate, markedDates, loading } = data;
        const {
            container,
            subContainer,
            caption,
            btnsSection,
            btn,
            btnText,
            calendar
        } = style;
        const disabled = days.length <= 0;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    leftSide={{
                        icon: 'ios-arrow-round-back',
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.goBack()
                    }}
                    center={{
                        title: "Calendar",
                        color: Colors.white,
                        fontFamily: "OpenSans-Bold",
                        size: RScaler(3.3)
                    }}
                    flexs={[1, 4, 1]}
                    toolbarHeight={RScaler(10)}
                />

                <View style={subContainer}>
                    <Text style={caption}>{strings.pleaseRemoveBusy}</Text>

                    <Calendar
                        minDate={initDate}
                        maxDate={this.lastDay()}
                        disableMonthChange
                        firstDay={6}
                        theme={theme}
                        markedDates={markedDates}
                        markingType='period'
                        onPressArrowLeft={null}
                        hideExtraDays
                        style={calendar}
                        onDayPress={this.dayPressed.bind(this)}
                        onDayLongPress={this.dayLongPress.bind(this)}
                    />

                    <View style={btnsSection}>
                        <ClickableView disabled={disabled} indicatorColor={Colors.white} style={[btn, { backgroundColor: Colors.orange }]} loading={loading} background={null} onPress={() => editCalendar(days, this.props.navigation.state.params.id, navigation)}>
                <Text style={btnText}>{StyleSheet.apply}</Text>
                        </ClickableView>
                        <ClickableView style={btn} background={null} onPress={() => navigation.goBack()}>
                <Text style={btnText}>{strings.Cancel}</Text>
                        </ClickableView>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Calendar
    }
}

export default connect(MapStateToProps, { addDay, editCalendar, reset })(Calendars);