import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, Image, TouchableNativeFeedback, ScrollView, ActivityIndicator, View, TextInput, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ClickableView, Toolbar, ListView, Button } from './../../components';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import _ from 'underscore';
import { getUsers, follow_unfollow, setCategories, getCategories, reset, toggleSearch, getSearchResults, resetSearch } from './../../redux/Actions/hallOfFameActions';

class HallOfFames extends Component {

    interval;

    componentDidMount() {
        const { getCategories } = this.props;
        getCategories();
    }

    componentWillUnmount() {
        this.props.reset();
    }

    renderItem(item) {
        const { avatar, user, is_following, age, id, loading } = item.item;
        const mod = item.index % 2;
        const lastIndex = item.index === this.props.data.items.length - 1;
        const { follow_unfollow, data, navigation } = this.props;
        const {
            itemContainer,
            itemImage,
            shadeView,
            name,
            followBtn,
            followBtnText
        } = style;
        const extraStyle = {
            marginEnd: !mod ? RScaler(1) : null,
            marginBottom: lastIndex ? RScaler(6) : RScaler(1)
        }

        return (
            <ClickableView key={item.index} background={null} style={[itemContainer, extraStyle]} onPress={() => navigation.navigate('Portfolio', { id: id })}>
                <Image source={avatar ?.title ? { uri: `http://youcast.media/${avatar.title}` } : require('./../../assets/default-avatar.png')} defaultSource={require('./../../assets/avatar.jpg')} style={itemImage} />
                <LinearGradient style={shadeView} colors={['#0000', '#0003', '#0006', '#0009']}>
                    <Text style={name}>{`${user.name} . ${age}`}</Text>
                    <Button
                        text={is_following ? "Unfollow" : "Follow"}
                        textStyle={followBtnText}
                        style={[followBtn, is_following ? { backgroundColor: Colors.orange } : {}]}
                        background={TouchableNativeFeedback.Ripple(Colors.white, true)}
                        loading={loading}
                        indicatorColor="#fff"
                        onPress={() => {
                            data.items[item.index].loading = true;
                            follow_unfollow(id, data.items, is_following, item.index);
                        }}
                    />
                </LinearGradient>
            </ClickableView>
        );
    }

    renderSearchItem(item) {
        const { follow_unfollow, data, navigation } = this.props;
        const { age, avatar, id, is_following, user, loading } = item.item;
        const {
            searchItemContainer,
            avatarView,
            modelInfo,
            modelInfoText,
            followingBtn,
            followingBtnText
        } = style;

        return (
            <ClickableView style={searchItemContainer} background={null} onPress={() => {
                navigation.navigate('Portfolio', { id: id });
                toggleSearch();
            }}>
                <Image source={avatar ?.title ? { uri: `http://youcast.media/${avatar.title}` } : require('./../../assets/default-avatar.png')} style={avatarView} />
                <View style={modelInfo}>
                    <Text style={modelInfoText}>{user.name}</Text>
                    <Text style={modelInfoText}>{`${age}, undefined`}</Text>
                </View>
                <Button
                    text={is_following ? "Unfollow" : "Follow"}
                    textStyle={[followingBtnText, is_following ? { color: Colors.orange } : {}]}
                    style={followingBtn}
                    background={null}
                    loading={loading}
                    indicatorColor={Colors.white}
                    onPress={() => {
                        data.search[item.index].loading = true;
                        follow_unfollow(id, data.search, is_following, item.index, true);
                    }}
                />
            </ClickableView>
        );
    }

    render() {
        const { navigation, data, getUsers, setCategories, toggleSearch, getSearchResults, resetSearch } = this.props;
        const { items, loading, categories, categoryLoading, search, showSearch, searchLoading } = data;
        const {
            container,
            list,
            header,
            tabStyle,
            tabTitleStyle,
            bottomButton,
            bottomButtonTitle,
            ModalOverlay,
            searchToolbar,
            cancelBtn,
            cancelBtnText,
            searchInputView,
            searchIcon,
            searchInput
        } = style;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    rightSide={{
                        icon: 'magnify',
                        iconType: 'material',
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => toggleSearch()
                    }}
                    center={{
                        title: "Hall Of Fame",
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

                {loading ? null : <ScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    style={header}
                    horizontal
                >
                    {
                        categories.map((item, index) => {
                            const { title, active } = item;
                            return (
                                <ClickableView key={index} style={tabStyle} background={null} onPress={() => {
                                    _.each(categories, (item, index) => {
                                        if (item.title != title) {
                                            categories[index].active = false;
                                        } else {
                                            categories[index].active = true;
                                            getUsers(item.title, true);
                                        }
                                        setCategories(categories);
                                    });
                                }}>
                                    <Text style={[tabTitleStyle, { color: active ? Colors.orange : Colors.white }]}>{title}</Text>
                                </ClickableView>
                            );
                        })
                    }
                </ScrollView>}

                {loading || categoryLoading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: categoryLoading ? null : '50%', marginBottom: categoryLoading ? '70%' : null }} /> : <ListView
                    data={items}
                    numColumns={2}
                    renderItem={this.renderItem.bind(this)}
                    style={list}
                    hideScrollIndecator
                />}

                {loading ? null : <ClickableView style={bottomButton} background={null} onPress={() => navigation.navigate('Info')}>
                    <Text style={bottomButtonTitle}>{`Become a member now\nPromote Your Talent`}</Text>
                </ClickableView>}

                <Modal
                    animated
                    animationType="fade"
                    transparent
                    visible={showSearch}
                >
                    <View style={ModalOverlay} />

                    <View style={searchToolbar}>
                        <View style={searchInputView}>
                            <Icon name="magnify" style={searchIcon} />
                            <TextInput
                                placeholder="Search"
                                placeholderTextColor={Colors.dark}
                                style={searchInput}
                                selectionColor={Colors.orange}
                                returnKeyType="search"
                                ref={ref => this.search = ref}
                                onSubmitEditing={() => {
                                    getSearchResults(this.search._lastNativeText);
                                }}
                            />
                        </View>
                        <Button
                            text="Cancel"
                            style={cancelBtn}
                            textStyle={cancelBtnText}
                            background={null}
                            onPress={() => {
                                toggleSearch();
                                resetSearch();
                            }}
                        />
                    </View>

                    {searchLoading || search.length == 0 ? null : <ListView
                        data={search}
                        style={{ flex: 1, backgroundColor: Colors.dark }}
                        renderItem={this.renderSearchItem.bind(this)}
                    />}
                    {searchLoading ? <ActivityIndicator size="large" color={Colors.orange} style={{ marginTop: '50%' }} /> : null}
                </Modal>
            </SafeAreaView>
        );
    }
}

function MapStateToProps(state) {
    return {
        data: state.HallOfFame
    }
}

export default connect(MapStateToProps, { getUsers, reset, follow_unfollow, setCategories, getCategories, toggleSearch, getSearchResults, resetSearch })(HallOfFames);