import React, { Component } from 'react';
import { ActivityIndicator, View, ScrollView, Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { ListView, ClickableView } from './../../../components';
import { style } from './../style';
import { Colors } from './../../../../app.json';
import { RScaler } from '../../../lib/utilites';
import { voteDown, voteUp, playYoutubeVideo } from './../../../redux/Actions/homeActions';

class Posts extends Component {

    renderItem(item) {
        const { data, voteDown, voteUp, playYoutubeVideo } = this.props;
        const { caption, id, model, points, post_image, post_video, type, vote_value, post_time, height } = item.item;
        const { avatar, user } = model;
        const { name } = user;
        const {
            itemContainer,
            itemHeader,
            itemAvatar,
            itemUserInfo,
            userName,
            info,
            itemFooter,
            itemPoints,
            voteBtn,
            voteBtnIcon,
            voteBtnText,
            itemContent,
            itemImage,
            itemTitle,
            playIcon
        } = style;

        return (
            <View style={itemContainer}>
                <ClickableView style={itemHeader} background={null}>
                    <Image source={avatar ? { uri: `http://youcast.media/${avatar}` } : require('./../../../assets/default-avatar.png')} defaultSource={require('./../../../assets/default-avatar.png')} style={itemAvatar} />
                    <View style={itemUserInfo}>
                        <Text style={userName}>{name}</Text>
                        <Text style={info}>{`Posted a ${type.toLowerCase()}    ${post_time}`}</Text>
                    </View>
                </ClickableView>

                <View style={itemContent}>
                    <Text style={itemTitle}>{caption}</Text>
                    <ClickableView style={[itemImage, { height: height }]} background={null} onPress={() => {
                        if (type == 'VIDEO') {
                            playYoutubeVideo(post_video.video_url);
                        } else {
                            return false;
                        }
                    }}>
                        {type == 'VIDEO' ? <Icon name="play-circle-outline" style={playIcon} /> : null}
                        <Image source={{ uri: type == 'IMAGE' ? `http://youcast.media/${post_image?.image_path}` : post_video?.video_thumbnail }} style={[itemImage, { height: height }]} />
                    </ClickableView>
                </View>
                <View style={itemFooter}>
                    <ClickableView style={voteBtn} background={null} onPress={() => {
                        voteUp(id, data.posts, item.index, true)
                    }}>
                        <Text style={[voteBtnText, vote_value == 1 ? { color: Colors.orange } : {}]}>Upvote</Text>
                        <Icon name="chevron-triple-up" style={[voteBtnIcon, vote_value == 1 ? { color: Colors.orange, borderColor: Colors.orange } : {}]} />
                    </ClickableView>
                    <Text style={itemPoints}>{`${points} points`}</Text>
                    <ClickableView style={voteBtn} background={null} onPress={() => {
                        voteDown(id, data.posts, item.index, true)
                    }}>
                        <Icon name="chevron-triple-down" style={[voteBtnIcon, vote_value == -1 ? { color: Colors.orange, borderColor: Colors.orange } : {}]} />
                        <Text style={[voteBtnText, vote_value == -1 ? { color: Colors.orange } : {}]}>Downvote</Text>
                    </ClickableView>
                </View>
            </View>
        );
    }

    render() {
        const { data } = this.props;
        const { sectionLoading, posts } = data;
        const {
            scrollContainer,
            separator,
            list
        } = style;

        return (
            <ScrollView
                style={scrollContainer}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <View style={separator} />

                {sectionLoading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: RScaler(20), alignSelf: 'center' }} /> : <ListView
                    data={posts}
                    renderItem={this.renderItem.bind(this)}
                    contentContainerStyle={{ alignItems: 'center' }}
                    style={[list, posts.length < 1 ? { height: RScaler(46) } : {}]}
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

export default connect(MapStateToProps, { voteDown, voteUp, playYoutubeVideo })(Posts);