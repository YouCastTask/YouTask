import React, { PureComponent } from 'react';
import Video from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import { Colors } from './../../../app.json';

class VideoPlayer extends PureComponent {

    componentDidMount() {
        Orientation.lockToLandscape();
    }

    componentWillUnmount() {
        Orientation.lockToPortrait();
    }

    render() {
        const { navigation } = this.props;
        return (
            <Video source={navigation.state.params.source}
                style={{ width: '100%', height: '100%' }}
                disableFullscreen
                disableVolume
                navigator={navigation}
                seekColor={Colors.orange}
                onEnd={() => {
                    Orientation.lockToPortrait();
                    navigation.goBack();
                }}
            />
        );
    }
}

export default VideoPlayer;