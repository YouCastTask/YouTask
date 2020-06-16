import React, { Component } from 'react';
import { SafeAreaView, StatusBar, View, TextInput, Text, Clipboard } from 'react-native';
import { Toolbar, Button, ListView, ClickableView } from './../../components';
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import _ from 'underscore';
import { Dropdown } from 'react-native-material-dropdown';
import moment from 'moment';
import { addNewExp, addNewEducation, addNewTalent, addNewTraining, deleteInfo, setValues, updateMediaFormat, insertInfo, togglePicker } from './../../redux/Actions/addInfoActions';
let mediaFormats = [
    {
        value: "TV Series",
        label: "TV Series"
    },
    {
        value: "Film",
        labele: "Film"
    },
    {
        value: "Theatre",
        label: "Theatre"
    },
    {
        value: "TV Ad",
        label: "TV Ad"
    },
];
let mediaRoles = [
    {
        value: "Star",
        label: "Star"
    },
    {
        value: "Regular",
        labele: "Regular"
    },
    {
        value: "Recurring Character",
        label: "Recurring Character"
    },
    {
        value: "Guest Star",
        label: "Guest Star"
    },

    {
        value: "Co-Star",
        labele: "Co-Star"
    },

    {
        value: "Model",
        labele: "Model"
    },
];
class AddInfo extends Component {

    dateType;
    parent;
    index;

    renderInputs(item, parentIndex) {
        const { title, value } = item.item;
        const { navigation, data, setValues, togglePicker } = this.props;
        const { inputView, inputLabel, inputStyle, separator } = style;
        const { educations, talents, experiences, trainings } = data;
        const arr = navigation.state.params.type == "Education" ? educations : navigation.state.params.type == "Talent" ? talents : navigation.state.params.type == "Training" ? trainings : experiences;
        if (arr == experiences)
            return (
                <ClickableView background={null} style={inputView} onPress={() => {
                    if (String(title).includes('date')) {
                        this.dateType = title;
                        togglePicker(true)
                        this.parent = parentIndex;
                        this.index = item.index;
                    } else {
                        return false;
                    }
                }}>

                    {
                        (title == "Media format") ?
                            <View style={style.dateView}>
                                <Dropdown
                                    label='Media format'
                                    labelTextStyle={style.dropDownLabel}
                                    value={item.item.value}
                                    data={mediaFormats}
                                    textColor={Colors.white}
                                    baseColor={Colors.white}
                                    itemColor={Colors.dark}
                                    selectedItemColor={Colors.orange}
                                    itemCount={mediaFormats.length}
                                    itemTextStyle={style.dropText}
                                    onChangeText={(value, index, data) => {
                                        setValues(value, item.index, parentIndex, arr, navigation.state.params.type)
                                    }}
                                    containerStyle={{ flex: 1, }}
                                />
                            </View>
                            :
                            (title == "Media role") ?
                                <View style={style.dateView}>
                                    <Dropdown
                                        label='Media role'
                                        labelTextStyle={style.dropDownLabel}
                                        value={item.item.value}
                                        data={mediaRoles}
                                        textColor={Colors.white}
                                        baseColor={Colors.white}
                                        itemColor={Colors.dark}
                                        selectedItemColor={Colors.orange}
                                        itemCount={mediaRoles.length}
                                        itemTextStyle={style.dropText}
                                        onChangeText={(value, index, data) => {
                                            setValues(value, item.index, parentIndex, arr, navigation.state.params.type)
                                        }}
                                        containerStyle={{ flex: 1, }}
                                    />
                                </View>
                                :
                                <View style={{overflow:"hidden",width:"100%"}}>
                                    <Text style={inputLabel}>{title}</Text>
                                    <TextInput
                                        style={inputStyle}
                                        value={String(title).includes('date') ? !value ? '' : String(moment(value * 1000).format('ddd DD MMM YYYY')) : value}
                                        onChangeText={(value) => {
                                            setValues(value, item.index, parentIndex, arr, navigation.state.params.type)
                                        }}
                                        editable={!String(title).includes('date')}
                                        placeholder={String(title).includes('End date') ? "Leave it empty if you still working there" : ""}
                                        placeholderTextColor={Colors.orange}
                                    />
                                    <View style={separator} />

                                </View>
                    }





                    {data.showPicker ? <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="calendar"
                        onChange={(e, d) => {
                            if (e.type == 'set') {
                                const { date, months, years, hours, minutes, seconds, milliseconds } = moment(d).toObject();
                                const selectedDate = new Date(years, months, date, hours, minutes, seconds, milliseconds).toUTCString();
                                const unixCode = new Date(selectedDate).getTime() / 1000;
                                setValues(unixCode, this.index, this.parent, arr, navigation.state.params.type, this.dateType);
                            } else {
                                setValues('', this.index, this.parent, arr, navigation.state.params.type, this.dateType);
                            }
                        }}
                    /> : null}
                </ClickableView>
            );
        else

            return (
                <ClickableView background={null} style={inputView} onPress={() => {
                    if (String(title).includes('date')) {
                        this.dateType = title;
                        togglePicker(true)
                        this.parent = parentIndex;
                        this.index = item.index;
                    } else {
                        return false;
                    }
                }}>
                    <Text style={inputLabel}>{title}</Text>
                    <TextInput
                        style={inputStyle}
                        value={String(title).includes('date') ? !value ? '' : String(moment(value * 1000).format('ddd DD MMM YYYY')) : value}
                        onChangeText={(value) => {
                            setValues(value, item.index, parentIndex, arr, navigation.state.params.type)
                        }}
                        editable={!String(title).includes('date')}
                        placeholder={String(title).includes('End date') ? "Leave it empty if you still working there" : ""}
                        placeholderTextColor={Colors.orange}
                    />

                    <View style={separator} />


                    {data.showPicker ? <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="calendar"
                        onChange={(e, d) => {
                            if (e.type == 'set') {
                                const { date, months, years, hours, minutes, seconds, milliseconds } = moment(d).toObject();
                                const selectedDate = new Date(years, months, date, hours, minutes, seconds, milliseconds).toUTCString();
                                const unixCode = new Date(selectedDate).getTime() / 1000;
                                setValues(unixCode, this.index, this.parent, arr, navigation.state.params.type, this.dateType);
                            } else {
                                setValues('', this.index, this.parent, arr, navigation.state.params.type, this.dateType);
                            }
                        }}
                    /> : null}
                </ClickableView>
            );
    }

    renderItem(item) {
        const { navigation, deleteInfo, data } = this.props;
        const { educations, talents, experiences, trainings } = data;
        const {
            Infocard,
            deleteBtn
        } = style;
        const removeDelete =
            navigation.state.params.type == "Education" ?
                educations.length > 1 :
                navigation.state.params.type == "Talent" ?
                    talents.length > 1 :
                    navigation.state.params.type == "Training" ?
                        trainings.length > 1 :
                        experiences.length > 1
            ;

        return (
            <View style={Infocard}>
                {removeDelete ? <Button
                    icon="delete-outline"
                    iconColor={Colors.red}
                    iconType="material"
                    style={deleteBtn}
                    background={null}
                    onPress={() => {
                        navigation.state.params.type == "Education" ?
                            deleteInfo(item.index, educations, navigation.state.params.type) :
                            navigation.state.params.type == "Talent" ?
                                deleteInfo(item.index, talents, navigation.state.params.type) :
                                navigation.state.params.type == "Training" ?
                                    deleteInfo(item.index, trainings, navigation.state.params.type) :
                                    deleteInfo(item.index, experiences, navigation.state.params.type)
                    }}
                /> : null}

                <ListView
                    data={item.item}
                    renderItem={info => this.renderInputs(info, item.index)}
                />

            </View>
        );
    }

    renderFooter() {
        const { navigation, data, insertInfo } = this.props;
        const { educations, talents, experiences, trainings } = data;
        const arr = navigation.state.params.type == "Education" ? educations : navigation.state.params.type == "Talent" ? talents : navigation.state.params.type == "Training" ? trainings : experiences;
        return (
            <Button
                style={style.saveBtn}
                text="Save"
                textStyle={style.saveBtnText}
                background={null}
                loading={data.loading}
                indicatorColor={Colors.white}
                onPress={() => { insertInfo(arr, navigation.state.params.type, navigation) }}
            />
        );
    }

    render() {
        const { navigation, data, addNewExp, addNewEducation, addNewTalent, addNewTraining, updateMediaFormat } = this.props;
        const { educations, talents, experiences, trainings } = data;
        const {
            container
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
                    flexs={[1, 4, 1]}
                    center={{
                        color: Colors.white,
                        fontFamily: "OpenSans-Regular",
                        size: RScaler(3),
                        title: `Add ${navigation.state.params.type}`
                    }}
                    rightSide={{
                        icon: "ios-add",
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => {
                            navigation.state.params.type == "Education" ?
                                addNewEducation(educations) :
                                navigation.state.params.type == "Talent" ?
                                    addNewTalent(talents) :
                                    navigation.state.params.type == "Training" ?
                                        addNewTraining(trainings) :
                                        addNewExp(experiences)
                        }
                    }}
                />

                <ListView
                    data={navigation.state.params.type == "Education" ? educations : navigation.state.params.type == "Talent" ? talents : navigation.state.params.type == "Training" ? trainings : experiences}
                    renderItem={this.renderItem.bind(this)}
                    listFooter={this.renderFooter.bind(this)}
                    style={{ backgroundColor: Colors.dark, width: '100%' }}
                    hideScrollIndecator
                />


            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.AddInfo
    }
}

export default connect(MapStateToProps, { updateMediaFormat, addNewExp, addNewEducation, addNewTraining, addNewTalent, deleteInfo, setValues, insertInfo, togglePicker })(AddInfo);