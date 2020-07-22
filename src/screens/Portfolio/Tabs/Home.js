import React, { Component } from 'react';
import { Text, TouchableNativeFeedback, View, ScrollView, Alert, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { TextField } from 'react-native-materialui-textfield';
import { Button } from './../../../components';
import { style } from './../style';
import { Colors } from './../../../../app.json';
import { setBio, updateBio, postBio } from './../../../redux/Actions/portfolioActions';
import { editInfo } from '../../../redux/Actions/addInfoActions';
import { RScaler } from '../../../lib/utilites';

class Home extends Component {
    render() {
        const { navigation, data, setBio, updateBio, postBio, editInfo } = this.props;
        const { about, education, experience, talents, trainings,editable, user, me } = data;
        const { name, age, location } = user;
        const {
            separator,
            homeHeader,
            homeLocationView,
            homeLocationViewText,
            homeHeaderName,
            section,
            sectionTitle,
            sectionDescription,
            addBtnText,
            addBtn,
            sectionTitleWD,
            options,
            optionBtn,
            educationView,
            educationSchool,
            educationInfo,
            talentView,
            talentName,
            experienceView,
            companyName,
            jobTitle,
            dates,
            diffText,
            list
        } = style;

        return (
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                style={{ marginBottom: Platform.OS == 'android' ? 0 : 35 }}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <View style={separator} />
                <View style={homeHeader}>
                    <Text style={homeHeaderName}>{`${name} - ${age}`}</Text>
                    <View style={homeLocationView}>
                        <Icon name="map-marker" color={Colors.white} size={RScaler(3.2)} />
                        <Text style={homeLocationViewText}>{location}</Text>
                    </View>
                </View>

                <View style={section}>
                    {!me ? null : <View style={options}>
                        <Button
                            icon={editable ? "check-circle-outline" : "circle-edit-outline"}
                            iconType="material"
                            iconColor={Colors.white}
                            style={optionBtn}
                            onPress={() => {
                                updateBio();
                                setBio(this.bio.value());
                                editable ? postBio(this.bio.value()) : null;
                            }}
                            background={TouchableNativeFeedback.Ripple(Colors.orange, true)}
                        />
                        {about == '' || about == null || !me ? null : <Button
                            icon="delete-outline"
                            iconType="material"
                            iconColor={Colors.white}
                            style={optionBtn}
                            background={TouchableNativeFeedback.Ripple(Colors.orange, true)}
                            onPress={() => {
                                Alert.alert('Confirmation', "Are you sure you wanna delete bio?", [{
                                    text: "YES",
                                    onPress: () => {
                                        setBio('');
                                        postBio(null);
                                    }
                                }, {
                                    text: "NO"
                                }]);
                            }}
                        />}
                    </View>}
                    <Text style={sectionTitle}>About me</Text>
                    <TextField
                        value={about}
                        multiline
                        style={sectionDescription}
                        baseColor={editable ? Colors.orange : 'transparent'}
                        tintColor={Colors.white}
                        editable={editable}
                        characterRestriction={editable ? 120 : null}
                        ref={ref => this.bio = ref}
                        maxLength={120}
                        errorColor="transparent"
                    />
                </View>

                <View style={section}>
                    {education.length == 0 || !me ? null : <View style={options}>
                        <Button
                            icon="circle-edit-outline"
                            iconType="material"
                            iconColor={Colors.white}
                            style={[optionBtn, { marginEnd: '10%' }]}
                            background={TouchableNativeFeedback.Ripple(Colors.orange, true)}
                            onPress={() => editInfo(education, 'Education', navigation)}
                        />
                    </View>}
                    <Text style={education.length == 0 ? sectionTitleWD : sectionTitle}>Education</Text>
                    {
                        education.length != 0 ?
                            education.map(item => {
                                const { degree, field, school, id } = item;
                                return (
                                    <View style={educationView} key={id}>
                                        <Text style={educationSchool}>{school}</Text>
                                        <Text style={educationInfo}>{`${degree} - ${field}`}</Text>
                                    </View>
                                );

                            })
                            : null
                    }
                    {education.length != 0 ? null : me ? <Button
                        text="ADD"
                        textStyle={addBtnText}
                        style={addBtn}
                        background={null}
                        onPress={() => navigation.navigate('AddInfo', { type: "Education" })}
                    /> : null}
                </View>

                <View style={section}>
                    {experience.length == 0 || !me ? null : <View style={options}>
                        <Button
                            icon="circle-edit-outline"
                            iconType="material"
                            iconColor={Colors.white}
                            style={[optionBtn, { marginEnd: '10%' }]}
                            background={TouchableNativeFeedback.Ripple(Colors.orange, true)}
                            onPress={() => editInfo(experience, 'Experience', navigation)}
                        />
                    </View>}
                    <Text style={experience.length == 0 ? sectionTitleWD : sectionTitle}>Work-Experience</Text>
                    {
                        experience.map(item => {
                            const { media_format, show_name, media_role, director_name, title, id, is_present, work_period } = item;

                            return (
                                <View style={experienceView} key={id}>
                                    <Text style={companyName}>{media_format}</Text>
                                    <Text style={jobTitle}>{`${show_name}`}</Text>
                                    <Text style={dates}>{`${media_role}`}</Text>
                                    <Text style={diffText}>{director_name}</Text>
                                </View>
                            );
                        })
                    }
                    {experience.length != 0 ? null : me ? <Button
                        text="ADD"
                        textStyle={addBtnText}
                        style={addBtn}
                        background={null}
                        onPress={() => navigation.navigate('AddInfo', { type: "Experience" })}
                    /> : null}
                </View>

                <View style={section}>
                    {talents.length == 0 || !me ? null : <View style={options}>
                        <Button
                            icon="circle-edit-outline"
                            iconType="material"
                            iconColor={Colors.white}
                            style={[optionBtn, { marginEnd: '10%' }]}
                            background={TouchableNativeFeedback.Ripple(Colors.orange, true)}
                            onPress={() => editInfo(talents, 'Talent', navigation)}
                        />
                    </View>}
                    <Text style={talents.length == 0 ? sectionTitleWD : sectionTitle}>Talents</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {
                            talents.length != 0 ?
                                talents.map(item => {
                                    return (
                                        <View style={talentView} key={item.id}>
                                            <Text style={talentName}>{item.talent}</Text>
                                        </View>
                                    );

                                })
                                : null
                        }
                    </View>
                    {talents.length != 0 ? null : me ? <Button
                        text="ADD"
                        textStyle={addBtnText}
                        style={addBtn}
                        background={null}
                        onPress={() => navigation.navigate('AddInfo', { type: "Talent" })}
                    /> : null}
                </View>

                <View style={section}>
                    {trainings.length == 0 || !me ? null : <View style={options}>
                        <Button
                            icon="circle-edit-outline"
                            iconType="material"
                            iconColor={Colors.white}
                            style={[optionBtn, { marginEnd: '10%' }]}
                            background={TouchableNativeFeedback.Ripple(Colors.orange, true)}
                            onPress={() => editInfo(trainings, 'Training', navigation)}
                        />
                    </View>}
                    <Text style={trainings.length == 0 ? sectionTitleWD : sectionTitle}>Training</Text>
                    {
                        trainings.map(item => {
                            const { tutor, place,id } = item;
                            const trainingClass=item.class;

                            return (
                                <View style={experienceView} key={id}>
                                    <Text style={companyName}>{trainingClass}</Text>
                                    <Text style={jobTitle}>{`${tutor}`}</Text>
                                    <Text style={dates}>{`${place}`}</Text>
                                   
                                </View>
                            );
                        })
                    }
                    {trainings.length != 0 ? null : me ? <Button
                        text="ADD"
                        textStyle={addBtnText}
                        style={addBtn}
                        background={null}
                        onPress={() => navigation.navigate('AddInfo', { type: "Training" })}
                    /> : null}
                </View>

            </ScrollView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Portfolio
    }
}

export default connect(MapStateToProps, { setBio, updateBio, postBio, editInfo })(Home);