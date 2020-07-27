import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, Image, View, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Toolbar, Button, TabSlider } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import Home from './Tabs/Home';
import Photos from './Tabs/Photos';
import Videos from './Tabs/Videos';
import Posts from './Tabs/Posts';
import { getPortfolio, fetchImages, fetchPosts, fetchVideos, follow_unfollow, reset } from './../../redux/Actions/portfolioActions';

class Portfolio extends Component {
    state = { width: 750, height: 500 }
    tabs = [
        {
            title: 'Home',
            View: <Home navigation={this.props.navigation} />
        }, {
            title: 'Photos',
            View: <Photos navigation={this.props.navigation} />
        }, {
            title: 'Videos',
            View: <Videos navigation={this.props.navigation} />
        }, {
            title: 'Posts',
            View: <Posts navigation={this.props.navigation} />
        }]

    componentDidMount() {
        const { getPortfolio, navigation } = this.props;
        getPortfolio(navigation.state.params?.id);
    }

    componentWillUnmount() {
        this.props.reset();
    }

    render() {
        const { navigation, data, fetchImages, fetchPosts, fetchVideos, follow_unfollow } = this.props;
        const { loading, followers, me, coverUrl, is_following, id } = data;
        const {
            container,
            pPicture,
            followerCount,
            followBtn,
            followBtnText
        } = style;
        const screenWidth = Dimensions.get('window').width
        let imageHeight = RScaler(40);

        if (coverUrl != "" && coverUrl != null && coverUrl.width != null && coverUrl.height != null) {
            const scaleFactor = coverUrl.width / screenWidth
            imageHeight = coverUrl.height / scaleFactor
        }
        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    center={{
                        title: "Portfolio",
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
                <ScrollView style={{ flex: 1 }}>
                    {loading ? null : <View>
                        <TouchableOpacity
                            onPress={() => {
                               
                                    fetchImages(false, navigation.state.params?.id);
                                    navigation.navigate("PhotosMainPage")
                                

                            }}
                        >
                            <Image source={coverUrl?.image_path ?
                                { uri: `http://youcast.media/${coverUrl.image_path}` }
                                :
                                require('./../../assets/default-cover.png')}
                                style={[pPicture, { height: imageHeight }]}

                            />
                        </TouchableOpacity>
                        <Text style={[followerCount, { top: imageHeight != RScaler(40) ? imageHeight - RScaler(5) : RScaler(29) }]}>{`${followers > 1 ? followers + " Followers" : followers + " Follower"}`}</Text>
                        {me ? null : <Button
                            text={is_following ? "Unfollow" : "Follow"}
                            textStyle={followBtnText}
                            style={[followBtn, is_following ? { backgroundColor: Colors.orange } : {}]}
                            background={null}
                            onPress={() => follow_unfollow(id, is_following, followers)}
                        />}
                    </View>}
                    {loading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: '50%' }} /> :
                        <TabSlider
                            scrollEnabled
                            optimize
                            tabsHeight={RScaler(55)}
                            onTabChange={(tab) => {
                                if (tab == 'Photos') {
                                    fetchImages(false, navigation.state.params?.id);
                                } else if (tab == 'Posts') {
                                    fetchPosts(navigation.state.params?.id);
                                } else if (tab == 'Videos') {
                                    fetchVideos(false, navigation.state.params?.id);
                                }
                            }}
                            tabs={this.tabs}
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

export default connect(MapStateToProps, { getPortfolio, fetchImages, fetchPosts, fetchVideos, follow_unfollow, reset })(Portfolio);