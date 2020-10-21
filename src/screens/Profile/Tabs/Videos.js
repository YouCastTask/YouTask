import React, { PureComponent } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image,ScrollView,TouchableOpacity ,FlatList} from 'react-native';
import Video from 'react-native-video-controls';
import { RScaler } from './../../../lib/utilites';
import { Colors } from './../../../../app.json';
import { ClickableView } from '../../../components';
import { strings } from '../../../translations/translation';

class Videos extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            total: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                total: this.props.data.length
            });
        }, 300);
    }

    renderItem({item}) {
        const { total } = this.state;
        const { height, data, navigation } = this.props;
        const { container, overlay, contetnContainer, title, videoContainer, image, row, counter } = styles;
        return (
            <SafeAreaView style={[container, { height: height }]}>
                <View style={overlay} />
                            <TouchableOpacity style={contetnContainer} background={null}  onPress={() => navigation.navigate('VideoPlayer', { source: { uri: `http://youcast.media${item.model_video_path}` } })}>
                                
                                <Text style={title}>{strings.GeneralCasting} {strings.Video}</Text>
                                <View style={videoContainer}>
                                    {/* {uri: `http://youcast.media/data/uploads/${i.title}` } */}
                                    <Image source={
                                        item.model_video_thumbnail_path?
                                        {uri: `http://youcast.media${item.model_video_thumbnail_path}`}
                                        :
                                        require('./../../../assets/default-cover.png')
                                    }
                        
                                        style={image} />
                                </View>
                            </TouchableOpacity>
             </SafeAreaView> 
            
        );
    }
    render(){
        const { height, data, navigation } = this.props;
        const { container, overlay, contetnContainer, title, videoContainer, image, row, counter } = styles;
        return (
            
                <FlatList
                data={data}
                renderItem={this.renderItem.bind(this)}
          />
            
    
        );
    }
    
}

const { width, height } = Dimensions.get('screen');
const isIPHONEX = Platform.OS === 'ios' && (width >= 650 || height >= 650);
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";
const styles = StyleSheet.create({
    container: {
        width: width,
        paddingTop: RScaler(8),
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        width: width,
        height: '100%',
        backgroundColor: Colors.dark,
        opacity: .6,
        position: 'absolute',
        top: RScaler(8)
    },
    contetnContainer: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        backgroundColor: 'transparent',
        elevation: 0,
        shadowOpacity: 0,
        marginTop: isIPHONEX ? RScaler(7) : null
    },
    title: {
        fontFamily: bold,
        fontSize: RScaler(3),
        color: Colors.white
    },
    videoContainer: {
        width: '90%',
        height: '80%',
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: 10,
        marginTop: RScaler(1),
        marginBottom: RScaler(1),
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    row: {
        width: '90%',
        flexDirection: 'row'
    },
    counter: {
        flex: 1,
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        paddingStart: RScaler(3)
    }
});

export default Videos;