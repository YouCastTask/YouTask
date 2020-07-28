import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, View, TextInput, Image, ScrollView, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toolbar, Button, ClickableView } from './../../components';
import { connect } from 'react-redux';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import _ from 'underscore';
import { pickImage, reset, updateCaption, updateVideo, addPost, validateUrl } from './../../redux/Actions/addPostsAction';
import {strings} from "./../../translations/translation"
class AddPosts extends Component {

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { navigation, data, pickImage, updateCaption, updateVideo, addPost, validateUrl } = this.props;
        const { image, caption, video, loading, statusCode, status } = data;
        const {
            container,
            uploadBtnText,
            uploadBtn,
            uploadFileView,
            plusView,
            slug,
            captionContainer,
            captionTitle,
            input,
            captionInput,
            lengthText,
            postImage,
            videoContainer,
            tipView,
            tipTexts,
            orangeText,
            whiteText,
            separator,
            tipText,
            checkView,
            checkOrangeText,
            statusCircleView,
            statusView,
            statusText
        } = style;
        const disabled = navigation.state.params.type == "image" ? image?.uri ? false : true : caption == '' || video == '' || !statusCode;
        const equation = image?.dimensions ? ((image.dimensions.height * dWidth) / image.dimensions.width) : RScaler(40);

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    leftSide={{
                        icon: 'ios-arrow-round-back',
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.goBack(),
                        disabled: loading
                    }}
                    flexs={[1, 4, 1]}
                    center={{
                        color: Colors.white,
                        fontFamily: "OpenSans-Regular",
                        size: RScaler(3),
                        title: `Add ${navigation.state.params.type}`
                    }}
                />

                <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                >

                    <Button
                        text={navigation.state.params.type == 'video' ? "Post" : "Upload"}
                        textStyle={uploadBtnText}
                        style={uploadBtn}
                        background={null}
                        loading={loading}
                        disabled={disabled}
                        indicatorColor={Colors.white}
                        onPress={() => addPost({ type: navigation.state.params.type, image: image, video: video }, caption, navigation)}
                    />

                    {
                        navigation.state.params.type == 'video' ?
                            <View style={tipView}>
                                <View style={tipTexts}>
                                    <Text style={orangeText}>Youtube</Text>
                                    <Text style={whiteText}>Video URL</Text>
                                </View>
                                <View style={separator} />
                                <Text style={tipText}>You need to upload your video to youtube before posting a video</Text>
                            </View>
                            : null
                    }

                    {navigation.state.params.type != 'video' ? <ClickableView style={[uploadFileView, { height: equation }]} background={null} onPress={pickImage.bind(this)} >
                        {image?.uri ? <Image source={{ uri: image.uri }} style={postImage} /> : <View style={plusView}>
                            <Icon name="plus" color={Colors.white} size={RScaler(6)} />
                        </View>}
                        {image.uri ? null : <Text style={slug}>{`Please select the photo you\nwant to upload`}</Text>}
                    </ClickableView>
                        :
                        <View style={videoContainer}>
                            <View style={input}>
                                <TextInput
                                    style={captionInput}
                                    placeholder={"Please paste your youtube video url here..."}
                                    placeholderTextColor="#fff5"
                                    selectionColor={Colors.orange}
                                    value={video}
                                    onBlur={() => validateUrl(video)}
                                    keyboardType="url"
                                    onChangeText={updateVideo.bind(this)}
                                />
                            </View>
                        </View>}

                    {
                        navigation.state.params.type == 'video' ?
                            <View style={checkView}>
                                <Text style={checkOrangeText}>Check<Text style={whiteText}> URL</Text></Text>
                                <View style={separator} />
                                <View style={statusView}>
                                    <View style={[statusCircleView, statusCode != null ? { backgroundColor: statusCode ? Colors.orange : Colors.red } : null]} />
                                    <Text style={statusText}>{status}</Text>
                                </View>
                            </View>
                            : null
                    }

                    <View style={captionContainer}>
                        <Text style={captionTitle}>{`Say something about this ${navigation.state.params.type}`}</Text>

                        <View style={input}>
                            <TextInput
                                multiline
                                style={captionInput}
                                placeholder={navigation.state.params.type == 'video' ? "Write caption here..." : "Type Something"}
                                placeholderTextColor="#fff5"
                                maxLength={navigation.state.params.type == 'video' ? 50 : 120}
                                selectionColor={Colors.orange}
                                value={caption}
                                onChangeText={updateCaption.bind(this)}
                            />
                            <Text style={lengthText}>{`${caption.length}/${navigation.state.params.type == 'video' ? '50' : '120'}`}</Text>
                        </View>
                    </View>
                </ScrollView>


            </SafeAreaView>
        );
    }
}

const dWidth = Dimensions.get('screen').width;

function MapStateToProps(state) {
    return {
        data: state.AddPosts
    }
}

export default connect(MapStateToProps, { pickImage, reset, updateCaption, updateVideo, addPost, validateUrl })(AddPosts);