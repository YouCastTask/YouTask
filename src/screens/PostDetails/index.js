import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, Image, ScrollView, TextInput, View, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Toolbar, Button, ClickableView } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import { voteDown, voteUp, deletePost, editPost, updateCaption, updatePost, updateCover, updateProfile } from './../../redux/Actions/postDetailsAction';
import { playYoutubeVideo } from '../../redux/Actions/homeActions';
import { strings } from '../../translations/translation';

class PostDetails extends Component {

    constructor() {
        super();

        this.state = {
            height: RScaler(30)
        }
    }

    componentDidMount() {
        const { item } = this.props.data;

        Image.getSize(item.type == "IMAGE" ? `http://youcast.media/${item.post_image?.image_path}` : item.post_video?.video_thumbnail, (width, height) => {
            this.setState({ height: height * (dWidth) / width });
        }, error => {
            console.log('error', error);
        });
    }

    rightSide() {
        const { deletePost, data, navigation, editPost, updateCaption, updatePost } = this.props;
        const {
            leftSideView,
            actionBtn,
            separator,
            iconStyle
        } = style;

        return (
            <View style={leftSideView}>
                <Button
                    style={actionBtn}
                    icon={data.editable ? "check-circle-outline" : "circle-edit-outline"}
                    iconType="material"
                    iconStyle={iconStyle}
                    background={null}
                    onPress={() => {
                        editPost(!data.editable);
                        data.editable ? updatePost(data.caption, data.item, navigation) : updateCaption(data.item.caption);
                    }}
                />
                <View style={separator} />
                <Button
                    style={actionBtn}
                    icon="delete-outline"
                    iconType="material"
                    iconStyle={iconStyle}
                    background={null}
                    onPress={() => deletePost(data.item.id, navigation, data.item.model.id)}
                />
            </View>
        );
    }

    render() {
        const { navigation, data, voteDown, voteUp, updateCaption, updateCover, info, playYoutubeVideo, updateProfile } = this.props;
        const { item, loading, editable } = data;
        const { model, post_image, post_video, caption, points, post_time, vote_value, type, id } = item;
        const {
            container,
            subContainer,
            setCovetBtn,
            setCovetBtnText,
            headerView,
            pPicture,
            userInfo,
            name,
            details,
            postImage,
            image,
            captionView,
            input,
            footerView,
            voteBtn,
            voteBtnText,
            voteBtnIcon,
            itemPoints,
            lengthText,
            upperCaption,
            inputEditable,
            playIcon
        } = style;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    rightSide={info.me ? this.rightSide() : null}
                    leftSide={{
                        icon: "ios-arrow-round-back",
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.goBack()
                    }}
                    toolbarHeight={RScaler(10)}
                    flexs={[1, 3, 1.5]}
                />

                <ScrollView
                    style={subContainer}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                >
                    {info.me && item?.post_image ? <Button
                        text={strings.SetAsCover}
                        textStyle={setCovetBtnText}
                        style={setCovetBtn}
                        loading={loading}
                        background={null}
                        indicatorColor={Colors.white}
                        onPress={() => updateCover(id)}
                    /> : null}

                    <View style={headerView}>
                        <Image source={model?.avatar ? { uri: `http://youcast.media/${model.avatar}` } : require('./../../assets/default-avatar.png')} style={pPicture} />
                        <View style={userInfo}>
                            <Text style={name}>{model.user.name}</Text>
                            <Text style={details}>{`${strings.Posted} ${type.toLowerCase()=='image'?strings.Image.toLowerCase():strings.Video.toLowerCase()}    ${post_time}`}</Text>
                        </View>
                    </View>

                    <ClickableView style={[postImage, { height: this.state.height }]} background={null} onPress={() => {
                        if (item?.post_video) {
                            playYoutubeVideo(post_video.video_url)
                        } else {
                            return false;
                        }
                    }}>
                        <Image source={{ uri: item?.post_image ? `http://youcast.media/${post_image.image_path}` : post_video.video_thumbnail }} style={[image, { height: this.state.height }]} />
                        {item?.post_video ? <Icon name="play-circle" style={playIcon} /> : null}
                    </ClickableView>

                    <View style={captionView}>
                        {editable ? <Text style={upperCaption}>{`${strings.saySomething} ${type.toLowerCase()=='image'?strings.Image.toLowerCase():strings.Video.toLowerCase()}`}</Text> : null}
                        <TextInput
                            placeholder="Type Something"
                            style={editable ? inputEditable : input}
                            value={editable ? data.caption : caption}
                            multiline
                            editable={editable}
                            onChangeText={updateCaption.bind(this)}
                        />
                        {editable ? <Text style={lengthText}>{`${data.caption.length}/120`}</Text> : null}
                    </View>

                    <View style={footerView}>
                        <ClickableView style={voteBtn} background={null} onPress={() => {
                            voteUp(id);
                        }}>
                            <Text style={[voteBtnText, vote_value == 1 ? { color: Colors.orange } : {}]}>${strings.Upvote}</Text>
                            <Icon name="chevron-triple-up" style={[voteBtnIcon, vote_value == 1 ? { color: Colors.orange, borderColor: Colors.orange } : {}]} />
                        </ClickableView>
                        <Text style={itemPoints}>{`${points} points`}</Text>
                        <ClickableView style={voteBtn} background={null} onPress={() => {
                            voteDown(id);
                        }}>
                            <Icon name="chevron-triple-down" style={[voteBtnIcon, vote_value == -1 ? { color: Colors.orange, borderColor: Colors.orange } : {}]} />
                    <Text style={[voteBtnText, vote_value == -1 ? { color: Colors.orange } : {}]}>{strings.Downvote}</Text>
                        </ClickableView>
                    </View>
                </ScrollView>

            </SafeAreaView>
        );
    }
}

const dWidth = Dimensions.get('screen').width;

function MapStateToProps(state) {
    return {
        data: state.PostDetails,
        info: state.Portfolio
    }
}

export default connect(MapStateToProps, { voteDown, playYoutubeVideo, voteUp, deletePost, editPost, updateCaption, updatePost, updateCover, updateProfile })(PostDetails);