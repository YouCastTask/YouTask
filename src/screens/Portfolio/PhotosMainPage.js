import React, { Component } from 'react';
import { TouchableNativeFeedback, ActivityIndicator, View, ScrollView, Image ,SafeAreaView} from 'react-native';
import { ListView, Button, ClickableView, Toolbar } from './../../components';
import { connect } from 'react-redux';
import { style } from './style';
import { Colors } from './../../../app.json';
import { setPost } from './../../redux/Actions/postDetailsAction';
import { RScaler } from '../../lib/utilites';

class PhotosMainPage extends Component {

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
                <Image source={post_image?.image_path ? { uri: `http://youcast.media/${post_image?.image_path}` } : require('./../../assets/default-avatar.png')} style={photo} />
            </ClickableView>
        );
    }

    render() {
        const { navigation, data } = this.props;
        const { me, sectionLoading, images } = data;
        const {
            scrollContainer,
            addImageBtn,
            scrollContainerPhotoHome,
            separatorPhotoMainPage,
            addImageBtnText,
            list
        } = style;

        return (
            <SafeAreaView style={style.container}>

                <Toolbar
                    toolbarColor={Colors.gray}
                    center={{
                        title: "Photos",
                        fontFamily: "OpenSans-Bold",
                        color: Colors.white,
                        size: RScaler(3.5)
                    }}
                    leftSide={{
                        icon: "ios-arrow-round-back",
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.goBack()
                    }}
                    toolbarHeight={RScaler(10)}
                />
                <ScrollView
                    style={scrollContainerPhotoHome}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <View style={separatorPhotoMainPage} />
                    {!me || sectionLoading ? null : <Button
                        style={addImageBtn}
                        textStyle={addImageBtnText}
                        text="Add Photo"
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
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.Portfolio
    }
}

export default connect(MapStateToProps, { setPost })(PhotosMainPage);