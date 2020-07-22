import React, { Component } from 'react';
import { TouchableNativeFeedback, ActivityIndicator, View, ScrollView, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListView, Button, ClickableView } from './../../../components';
import { connect } from 'react-redux';
import { style } from './../style';
import { Colors } from './../../../../app.json';
import { } from './../../../redux/Actions/portfolioActions';
import { RScaler } from '../../../lib/utilites';
import { setPost } from '../../../redux/Actions/postDetailsAction';
import { playYoutubeVideo } from '../../../redux/Actions/homeActions';

class Videos extends Component {

    renderItem(item) {
        const { setPost, navigation, playYoutubeVideo } = this.props;
        const { caption, post_video } = item.item;
        const {
            videosContainer,
            videoThumb,
            smPlayIcon,
            thumbView,
            captionView,
            largeSeparator,
            smallSeparator,
            captionStyle,
            watchBtn,
            watchBtnText
        } = style;
        const firstItem = item.index == 0;


        return (
            <ClickableView style={[videosContainer, firstItem ? { marginTop: '3%' } : {}]} background={null} onPress={() => {
                setPost(item.item);
                navigation.navigate('PostDetails');
            }}
            >
                <View style={videosContainer}>
                    <View style={thumbView}>
                        <Icon name="play" style={smPlayIcon} />
                        <Image source={{ uri: post_video ?.video_thumbnail }} defaultSource={require('./../../../assets/default-avatar.png')} style={videoThumb} />
                    </View>
                    <View style={captionView}>
                        <View style={smallSeparator} />
                        <View style={largeSeparator} />
                        <Text style={captionStyle}>{caption}</Text>
                    </View>
                    <Button
                        text="WATCH"
                        textStyle={watchBtnText}
                        style={watchBtn}
                        background={null}
                        onPress={() => {
                            playYoutubeVideo(post_video.video_url);
                        }}
                    />
                </View>
            </ClickableView>
        );
    }

    render() {
        const { navigation, data } = this.props;
        const { me, sectionLoading, videos } = data;
        const {
            scrollContainer,
            addImageBtn,
            separator,
            addImageBtnText,
            list
        } = style;

        return (
            <ScrollView
                style={scrollContainer}
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <View style={separator} />
                {!me || sectionLoading ? null : <Button
                    style={addImageBtn}
                    textStyle={addImageBtnText}
                    text="Add Video"
                    background={TouchableNativeFeedback.Ripple(Colors.orange, false)}
                    onPress={() => navigation.navigate('AddPosts', { type: 'video' })}
                />}

                {sectionLoading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: RScaler(20), alignSelf: 'center' }} /> : <ListView
                    data={videos}
                    renderItem={this.renderItem.bind(this)}
                    style={[list, videos.length < 3 ? { height: RScaler(46) } : {}]}
                    contentContainerStyle={{ alignItems: 'center' }}
                />}

            </ScrollView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Portfolio
    }
}

export default connect(MapStateToProps, { setPost, playYoutubeVideo })(Videos);