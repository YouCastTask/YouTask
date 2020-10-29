import React, { Component } from 'react';
import { SafeAreaView,StyleSheet, Text, StatusBar, View, Image, Dimensions, ScrollView, Platform, ActivityIndicator ,Modal,TouchableHighlight,TouchableOpacity} from 'react-native';
import { ClickableView, Toolbar, ListView, Button } from './../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerActions } from 'react-navigation-drawer';
import { connect } from 'react-redux';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';
import _, { reduce } from 'underscore';
import { fetchPosts, setMainTabs, setTabs, follow_unfollow, voteDown, voteUp, playYoutubeVideo } from './../../redux/Actions/homeActions';
import AsyncStorage from '@react-native-community/async-storage';
import {strings} from "./../../translations/translation"
import { fetchImages, getPortfolio } from './../../redux/Actions/portfolioActions';
import { get } from '../../lib/models';
import { Avatar } from 'react-native-paper';

const styles = StyleSheet.create({
    centeredView: {
  
      marginTop:100,
      borderWidth:9,
      borderColor:'red',
      zIndex:1

    },
    modalView: {
      backgroundColor: Colors.gray,
      opacity:0.9,
      paddingTop:30,
      paddingBottom:30,
      paddingLeft:15,
      paddingRight:15,
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    channel:{
        flexDirection:'row',
        justifyContent:"space-evenly",
        borderWidth:1,
        borderRadius:15,
        backgroundColor:Colors.orange,
        alignItems:"center",
        paddingLeft:5,
        paddingRight:5,
        marginBottom:15
    },
    SelectText:{
        color: Colors.white,
        fontSize:35,
        marginBottom:50,
        textAlign:"center"
    }
  });

let mainCategoryTabName
let subCategoryTabName

class Home extends Component {
    id;
    constructor() {
        super();

        this.state = {
            modalVisible:false
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    async componentDidMount() {
        const { getPortfolio, navigation } = this.props;
        
        this.props.setMainTabs();
        setTimeout(
            async () => {
                subCategoryTabName = this.props.data.tabs[0].title
                mainCategoryTabName = this.props.data.mainTabs[0].name
                this.id = JSON.parse(await AsyncStorage.getItem('user'))['id'];
                this.props.fetchPosts(mainCategoryTabName, subCategoryTabName);
            }, 3000
        )

        ///console.log(this.props)

    }

    renderItem(item) {
        const { data, navigation, follow_unfollow, voteDown, voteUp, playYoutubeVideo} = this.props;
        
        const { caption, id, model, points, post_image, post_video, type, vote_value, post_time, height } = item.item;
        const { avatar, is_following, user ,cover_photo} = model;
        const { name } = user;

        const {
            itemContainer,
            itemHeader,
            itemAvatar,
            itemUserInfo,
            userName,
            info,
            followBtn,
            followBtnText,
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
        const lastIndex = item.index >= data.posts.length - 1;
        

        return (
            <View style={[itemContainer, { marginBottom: lastIndex ? isIPHONEX ? RScaler(12) : isANDROID ? RScaler(2) : RScaler(8.5) : null }]}>
                <ClickableView style={itemHeader} background={null} onPress={() => {
                    navigation.navigate('Portfolio', { id: model.id });
                }}>
                    <Image source={cover_photo? { uri: `http://youcast.media/${cover_photo.image_path}` } : require('./../../assets/default-avatar.png')} defaultSource={require('./../../assets/default-avatar.png')} style={itemAvatar} />
                    <View style={itemUserInfo}>
                        <Text style={userName}>{name}</Text>
                        <Text style={info}>{`${strings.Posted} ${type.toLowerCase()=="image"?strings.Image.toLowerCase():strings.Video.toUpperCase()}    ${post_time}`}</Text>
                    </View>
                    {user.id == this.id ? null : <Button
                        text={is_following ? strings.UnFollow : strings.Follow}
                        textStyle={followBtnText}
                        style={followBtn}
                        background={null}
                        onPress={() => {
                            follow_unfollow(model.id, data.posts, is_following, model)
                        }}
                    />}
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
                        voteUp(id, data.posts, item.index)
                    }}>
                        <Text style={[voteBtnText, vote_value == 1 ? { color: Colors.orange } : {}]}>{strings.Upvote}</Text>
                        <Icon name="chevron-triple-up" style={[voteBtnIcon, vote_value == 1 ? { color: Colors.orange, borderColor: Colors.orange } : {}]} />
                    </ClickableView>
                    <Text style={itemPoints}>{`${points} ${strings.points}`}</Text>
                    <ClickableView style={voteBtn} background={null} onPress={() => {
                        voteDown(id, data.posts, item.index)
                    }}>
                        <Icon name="chevron-triple-down" style={[voteBtnIcon, vote_value == -1 ? { color: Colors.orange, borderColor: Colors.orange } : {}]} />
                <Text style={[voteBtnText, vote_value == -1 ? { color: Colors.orange } : {}]}>{strings.Downvote}</Text>
                    </ClickableView>
                </View>
            </View>
        );
    }

    onRefresh() {
        const { data, fetchPosts } = this.props;
        _.each(data.tabs, item => {
            if (item.active) {
               fetchPosts(mainCategoryTabName, subCategoryTabName, true);
            }
        })
    }

    renderEmpty() {
        const { emptyContainer, emptyIcon, emptyMsg } = style;
        return (
            <View style={emptyContainer}>
                <Image source={require('./../../assets/posts-icon.png')} style={emptyIcon} />
                <Text style={emptyMsg}>{strings.noPost}</Text>
            </View>
        );
    }

    render() {
        const { navigation, data, setTabs, fetchPosts } = this.props;
        const { mainTabs, tabs, loading, posts, sectionLoading } = data;
        const {
            container,
            title,
            tabsContainer,
            tabStyle,
            tabTitleStyle,
            tabTitleStyle1,
            tabStyle1
        } = style;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    rightSide={{
                        icon: 'menu',
                        iconType: 'material',
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => {
                            const { getPortfolio, navigation } = this.props;
                            getPortfolio(navigation.state.params?.id)
                            navigation.dispatch(DrawerActions.openDrawer())
                        }
                    }}
                    flexs={[2, 2.5, 1]}
                leftSide={<Text style={title}>{strings.Discover}</Text>}
                />

                 
                {!loading ?
                    <View style={tabsContainer}>
                        {
                            tabs.map((item, index) => {
                                const { title, active } = item;
                                return (
                                    <ClickableView key={index} style={tabStyle} background={null} onPress={() => {
                                        _.each(tabs, (item, index) => {
                                            subCategoryTabName = title
                                            if (item.title != title) {
                                                tabs[index].active = false;

                                            } else {
                                                tabs[index].active = true;

                                                fetchPosts(mainCategoryTabName, subCategoryTabName, true);
                                            }
                                            setTabs(tabs);
                                        });
                                    }}>
                                        <Text style={[tabTitleStyle, { color: active ? Colors.orange : Colors.white }]}>{title}</Text>
                                    </ClickableView>
                                );
                            })
                        }
                        <TouchableOpacity style={styles.channel} 
                        onPress={()=>{
                            this.setModalVisible(!this.state.modalVisible)
                        }}>
                            <Text style={{color:Colors.white,marginLeft:8}}>Channel</Text>
                            <Icon name="chevron-double-down" size={25} color={Colors.white}/>
                    <Text style={{color:Colors.white,marginRight:8}}>{mainCategoryTabName}</Text>
                        </TouchableOpacity>
                    </View>
                    : null}

                {loading || sectionLoading ? <ActivityIndicator color={Colors.orange} size="large" style={{ marginTop: '50%' }} /> : <ListView
                    data={posts}
                    initRefresh
                    onRefresh={this.onRefresh.bind(this)}
                    renderItem={this.renderItem.bind(this)}
                    hideScrollIndecator
                    refreshIndecatorColors={[Colors.grade1, Colors.grade2]}
                    listEmptyView={this.renderEmpty.bind(this)}
                    style={{ backgroundColor: Colors.dark }}
                />}

        <Modal
          animationType="slide"
          visible={this.state.modalVisible}
          transparent={true}
        >
          <TouchableOpacity style={styles.centeredView}
          onPressOut={() => {this.setModalVisible(false)}}
          >
              <ScrollView>
            <View style={styles.modalView}>
            <Text style={styles.SelectText}>{"Select a Channel"}</Text>
            {!loading ?
                     <View style={tabsContainer}>
                         {
                             mainTabs.map((item, index) => {
                                 const { id, name } = item;
                                 return (
                                     <ClickableView key={index} style={tabStyle1} background={null} onPress={() => {
                                         _.each(mainTabs, (item, index) => {
                                             if (name != mainCategoryTabName) {
                                                 mainCategoryTabName = name
                                                 fetchPosts(mainCategoryTabName, subCategoryTabName, true);
                                             }
                                             setMainTabs();
                                             this.setModalVisible(!this.state.modalVisible)
                                         });
                                     }}>
                                         <Text style={[tabTitleStyle1, { color: mainCategoryTabName == name ? Colors.orange : Colors.white }]}>{name}</Text>
                                     </ClickableView>
                                 );
                             })
                         }
                     </View>
                     : null}
              
            </View>
            </ScrollView>
          </TouchableOpacity>
        </Modal>
            
            </SafeAreaView>
            
        );
    }
}

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 800 || height >= 800);
const isANDROID = Platform.OS === 'android';

function MapStateToProps(state) {
    return {
        data: state.Home,
    }
}

export default connect(MapStateToProps, { fetchPosts, setMainTabs, setTabs, follow_unfollow, voteDown, voteUp, playYoutubeVideo, getPortfolio })(Home);