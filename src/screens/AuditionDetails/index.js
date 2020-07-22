import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, Image, ScrollView, View, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import { ClickableView, Toolbar } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { handleAudition, fetchAudition } from './../../redux/Actions/auditionActions';

class AuditionDetails extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: []
        }
    }

    componentDidMount() {
        const { fetchAudition, data } = this.props;
        fetchAudition(this.props.navigation.state.params.id, 'way');
        const { start_time, end_time, director_name, project, date_at } = data.auditionDetails;

        if (!data.loadingDetails) {
            this.setState({
                data: [{
                    title: "Project Name",
                    value: project
                }, {
                    title: "Director Name",
                    value: director_name
                }, {
                    title: "Date",
                    value: moment(date_at).format('dddd DD MMMM')
                }, {
                    title: "Hour",
                    value: `${start_time.slice(-14, -9)} - ${end_time.slice(-14, -9)}`
                }]
            });
        }
    }


    shootingDate(timing, month, day, year) {
        const { shootingDateView, shootingDateTime, shootingDateRow, shootingDateDetails, shootingDateText } = style;

        return (
            <View style={shootingDateView}>
                <Text style={shootingDateTime}>{`Shooting ${timing} date`}</Text>

                <View style={shootingDateRow}>
                    <View style={[shootingDateDetails, { flex: 2 }]}>
                        <Text style={shootingDateText}>{month}</Text>
                    </View>
                    <View style={shootingDateDetails}>
                        <Text style={shootingDateText}>{day}</Text>
                    </View>
                    <View style={shootingDateDetails}>
                        <Text style={shootingDateText}>{year}</Text>
                    </View>
                </View>
            </View>
        );
    }

    actionButton(title, start, end, action) {
        const { button, buttonText } = style;

        return (
            <ClickableView style={[button, { marginEnd: end, marginStart: start }]} background={null} onPress={action}>
                <Text style={buttonText}>{title}</Text>
            </ClickableView>
        );
    }

    status(state, id) {
        const { navigation, handleAudition } = this.props;
        const {
            row,
            status,
            topBorder,
            bottomBorder,
            statusAction
        } = style;

        switch (state) {
            case 0:
                return (
                    <View style={row}>
                        <LinearGradient style={topBorder} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#0000', '#0003', "#0005", "#0003", "#0000"]} />
                        <Text style={status}>Audition</Text>
                        <Text style={statusAction}>Rejected</Text>
                        <LinearGradient style={bottomBorder} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#0000', '#0003', "#0005", "#0003", "#0000"]} />
                    </View>
                );

            case 2:
                return (
                    <View style={row}>
                        <LinearGradient style={topBorder} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#0000', '#0003', "#0005", "#0003", "#0000"]} />
                        <Text style={status}>Audition</Text>
                        <Text style={[statusAction, { color: Colors.orange }]}>Accepted</Text>
                        <LinearGradient style={bottomBorder} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#0000', '#0003', "#0005", "#0003", "#0000"]} />
                    </View>
                );

            case 1:
                return (
                    <View style={row}>
                        {this.actionButton("Accept", '5%', null, () => handleAudition(id, 'confirm'))}
                        {this.actionButton("Reject", '2.5%', '2.5%', () => handleAudition(id, 'cancel'))}
                        {this.actionButton("Busy? Suggest New", null, '5%', () => navigation.navigate('Calendar', { id: this.props.navigation.state.params.id }))}
                    </View>
                );

            case 3:
                return (
                    <View style={row}>
                        <LinearGradient style={topBorder} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#0000', '#0003', "#0005", "#0003", "#0000"]} />
                        <Text style={status}>Audition</Text>
                        <Text style={[statusAction, { color: Colors.white }]}>Pending</Text>
                        <LinearGradient style={bottomBorder} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} colors={['#0000', '#0003', "#0005", "#0003", "#0000"]} />
                    </View>
                );
        }
    }

    render() {
        const { navigation, data } = this.props;
        const { shooting_start_date, shooting_end_date, status, id } = data.auditionDetails;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const startM = String(shooting_start_date).slice(5, 7);
        const startD = String(shooting_start_date).slice(8, 10);
        const startY = String(shooting_start_date).slice(0, 4);
        const endM = String(shooting_end_date).slice(5, 7);
        const endD = String(shooting_end_date).slice(8, 10);
        const endY = String(shooting_end_date).slice(0, 4);
        const {
            container,
            contentContainer,
            upperSection,
            upperSectionImg,
            textContainer,
            leftSide,
            rightSide,
            locationView,
            locationTitle,
            subTitle,
            caption,
            loadingModal,
            loadingText
        } = style;

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
                        title: "Audition Details",
                        color: Colors.white,
                        fontFamily: "OpenSans-Bold",
                        size: RScaler(3.3)
                    }}
                    flexs={[1, 4, 1]}
                    toolbarHeight={RScaler(10)}
                />

                {!data.loadingDetails ? <ScrollView style={contentContainer} contentContainerStyle={{ alignItems: 'center' }}>
                    <View style={upperSection}>
                        <Image source={require('./../../assets/avatar.jpg')} style={upperSectionImg} />
                        {
                            this.state.data.map((item, index) => {
                                return (
                                    <View key={index} style={textContainer} >
                                        <Text style={leftSide}>{item.title}</Text>
                                        <Text style={rightSide}>{item.value}</Text>
                                    </View>
                                );
                            })
                        }
                    </View>

                    <View style={locationView}>
                        <Text style={locationTitle}>Location</Text>
                        <Text style={subTitle}>YOUCAST Office</Text>
                        <Text style={subTitle}>12 - Almohandsen - cairo - egypt</Text>
                    </View>

                    {this.shootingDate('start', months[startM - 1], startD, startY)}
                    {this.shootingDate('end', months[endM - 1], endD, endY)}

                    {this.status(status, id)}

                    <Text style={caption}>If You Got Any Questions Contact Us</Text>
                </ScrollView> : <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: '50%' }} />}
                {
                    data.detailsLoading ? <View style={loadingModal}>
                        <ActivityIndicator color={Colors.orange} size="large" />
                        <Text style={loadingText}>Loading...</Text>
                    </View> : null
                }
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Auditions
    }
}

export default connect(MapStateToProps, { handleAudition, fetchAudition })(AuditionDetails);