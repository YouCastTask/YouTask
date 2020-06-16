import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ImageSlider } from './../../../components';
import { RScaler } from './../../../lib/utilites';
import { Colors } from './../../../../app.json';

class Images extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            current: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                total: this.props.data.length
            });
        }, 300);
    }

    render() {
        const { total, current } = this.state;
        const { height, data } = this.props;

        return (
            <View>
                <View style={styles.counter}>
                    <Icon name="image" style={styles.icon} />
                    <Text style={styles.counterText}>{`${(current + 1)}/${total}`}</Text>
                </View>
                <ImageSlider
                    sliderHeight={height}
                    slides={data}
                    horizontal={false}
                    imageStyle={styles.image}
                    defaultSource={require('./../../../assets/default-avatar.png')}
                    hideFloatingButton hidePagination
                    currentIndex={(index) => this.setState({ current: index })} />
            </View>
        );
    }
}

const { width } = Dimensions.get('screen');
const regular = "OpenSans-Regular";
const styles = StyleSheet.create({
    image: {
        width: width,
        height: '100%'
    },
    counter: {
        flexDirection: 'row',
        position: 'absolute',
        top: RScaler(8),
        right: RScaler(3),
        zIndex: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: RScaler(1)
    },
    icon: {
        fontSize: RScaler(4),
        color: Colors.white
    },
    counterText: {
        fontFamily: regular,
        color: Colors.white,
        marginStart: RScaler(.5),
        fontSize: RScaler(3)
    }
});

export default Images;