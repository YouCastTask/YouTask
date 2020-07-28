import React, { Component } from 'react';
import { TouchableNativeFeedback, ActivityIndicator, View, ScrollView, Image } from 'react-native';
import { ListView, Button, ClickableView } from './../../../components';
import { connect } from 'react-redux';
import { style } from './../style';
import { Colors } from './../../../../app.json';
import { setPost } from './../../../redux/Actions/postDetailsAction';
import { RScaler } from '../../../lib/utilites';
import {strings} from "./../../../translations/translation"

class Photos extends Component {

    renderItem(item) {
        const { navigation, data, setPost } = this.props;
        const { post_image } = item.item;
        const {
            photosContainer,
            photo
        } = style;

        const firstItems = item.index == 0 || item.index == 1 || item.index == 2;
        const lastItems = item.index == data.images.length - 1;
        const extraStyle = {
            marginTop: firstItems ? '3%' : null,
            marginBottom: lastItems ? '3%' : null
        }

        return (
            <ClickableView style={[photosContainer, extraStyle]} background={null} onPress={() => {
                setPost(item.item);
                navigation.navigate('PostDetails');
            }}>
                <Image source={post_image?.image_path ? { uri: `http://youcast.media/${post_image?.image_path}` } : require('./../../../assets/default-avatar.png')} style={photo} />
            </ClickableView>
        );
    }

    render() {
        const { navigation, data } = this.props;
        const { me, sectionLoading, images } = data;
        const {
            scrollContainer,
            addImageBtn,
            separator,
            addImageBtnText,
            list
        } = style;
        console.log(images)

        return (
            <ScrollView
                style={scrollContainer}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <View style={separator} />
                {!me || sectionLoading ? null : <Button
                    style={addImageBtn}
                    textStyle={addImageBtnText}
                    text={strings.Add_Photo}
                    background={TouchableNativeFeedback.Ripple(Colors.orange, false)}
                    onPress={() => navigation.navigate('AddPosts', { type: 'image' })}
                />}

                {sectionLoading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: RScaler(20), alignSelf: 'center' }} /> : <ListView
                    data={images}
                    renderItem={this.renderItem.bind(this)}
                    numColumns={3}
                    style={[list, images.length < 7 ? { height: RScaler(46) } : {}]}
                    contentContainerStyle={{ alignItems: 'flex-start' }}
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

export default connect(MapStateToProps, { setPost })(Photos);