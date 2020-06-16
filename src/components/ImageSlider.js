import React, { PureComponent } from 'react';
import { View, Image, Text, FlatList, StyleSheet, Dimensions, Platform, TouchableNativeFeedback } from 'react-native';
import { Button } from './';
import { RScaler } from '../lib/utilites';

type Props = {
    slides: [{ source: Image, topLine: String, bottomLine: String }],
    sliderHeight: Number,
    captionStyles: [StyleSheet],
    defaultSource: ImageData,
    activeDotColor: String,
    inactiveDotColor: String,
    imageStyle: [StyleSheet],
    onSkipPressed: Function,
    onNextPressed: Function,
    horizontal: Boolean,
    hidePagination: Boolean,
    hideFloatingButton: Boolean,
    currentIndex: Function
}

class ImageSlider extends PureComponent<Props> {

    static defaultProps = {
        sliderHeight: 250,
        activeDotColor: '#777777',
        inactiveDotColor: '#ffffff',
        horizontal: true
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            left: 0
        }

        if (props.currentIndex) {
            props.currentIndex(0);
        }
    }

    renderItem(item) {
        const { source, topLine, bottomLine } = item.item;
        const { sliderHeight, captionStyles, defaultSource, imageStyle } = this.props;
        const { itemContainer, itemImage, itemCaption, captionContainer } = styles;
        const index = item.index;
        const styleIndex = index > imageStyle.length - 1 ? imageStyle.length - 1 : index;
        const imageCustomStyle = imageStyle.constructor === Array ? imageStyle[styleIndex] : imageStyle;

        return (
            <View style={[itemContainer, { height: sliderHeight }]}>
                <Image source={source} defaultSource={defaultSource} style={[itemImage, imageCustomStyle]} />
                <View style={captionContainer}>
                    {!topLine ? null : <Text style={[itemCaption, captionStyles.constructor === Array ? captionStyles[0] : captionStyles]}>{topLine}</Text>}
                    {!bottomLine ? null : <Text style={[itemCaption, captionStyles.constructor === Array ? captionStyles[1] : captionStyles]}>{bottomLine}</Text>}
                </View>
            </View>
        );
    }

    renderPagination() {
        let dots = [];

        const { activeDotColor, inactiveDotColor } = this.props;
        const { paginationContainer, paginationDot, paginationActiveDot } = styles;

        const Dot = <View style={[paginationDot, { backgroundColor: inactiveDotColor }]} />;

        const activeDot = <View style={[paginationActiveDot, { backgroundColor: activeDotColor, left: this.state.left }]} />;

        for (let i = 0; i < this.props.slides.length; i++) {
            dots.push(React.cloneElement(Dot, { key: i }));
        }
        dots.push(React.cloneElement(activeDot, { key: 100 }));

        return (
            <View style={paginationContainer} pointerEvents="none">
                {dots}
            </View>
        );
    }

    handleScroll(e) {
        const { slides } = this.props;
        const isANDROID = Platform.OS == 'android';
        const dotSpace = (dotWidth + 6);
        let index = isANDROID ? e.nativeEvent.contentOffset.x / width : (slides.length - 1) - e.nativeEvent.contentOffset.x / width;
        const movementSpeed = index * dotSpace;

        this.setState({
            left: isANDROID ? parseInt(movementSpeed) : ((slides.length - 1) * dotSpace) - parseInt(movementSpeed)
        });
    }

    handleEndScroll(e) {
        const { currentIndex, sliderHeight } = this.props;
        let index = e.nativeEvent.contentOffset.y / sliderHeight;

        this.setState({
            currentTab: index
        });

        if (currentIndex) {
            currentIndex(index);
        }
    }

    handleNextPress() {
        const { onNextPressed, slides } = this.props;
        const { currentTab } = this.state;

        if (this.state.currentTab < slides.length - 1) {
            let nextIndex = currentTab + 1;

            this.flatList.scrollToOffset({
                offset: nextIndex * width
            });

            this.setState({
                currentTab: nextIndex
            });

        } else {
            if (onNextPressed) {
                onNextPressed();
            }
        }
    }

    render() {
        const { slides, sliderHeight, onSkipPressed, horizontal, hideFloatingButton, hidePagination } = this.props;
        const { container, flatList, skipBtn, nextBtn, nextBtnIcon } = styles;
        return (
            <View style={[container, { height: sliderHeight }]}>
                {hideFloatingButton ? null : <Text style={skipBtn} onPress={onSkipPressed}>Skip</Text>}

                <FlatList
                    horizontal={horizontal}
                    data={slides}
                    pagingEnabled
                    bounces={false}
                    extraData={width}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    ref={ref => this.flatList = ref}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    style={[flatList, { backgroundColor: slides.backgroundColor }]}
                    onScroll={this.handleScroll.bind(this)}
                    onMomentumScrollEnd={this.handleEndScroll.bind(this)}
                />
                {hidePagination ? null : this.renderPagination()}

                {hideFloatingButton ? null : <Button
                    icon={!this.state.currentTab < slides.length - 1 ? "ios-checkmark" : "ios-arrow-round-forward"}
                    iconColor="#ffffff"
                    iconStyle={nextBtnIcon}
                    style={nextBtn}
                    background={TouchableNativeFeedback.Ripple('#FDD5D0', true)}
                    onPress={this.handleNextPress.bind(this)}
                />}
            </View>
        );
    }

}

const { width } = Dimensions.get('window');
const isANDROID = Platform.OS == 'android';
const dotWidth = RScaler(3);
const dotHeight = RScaler(.7);
const fontFamily = "OpenSans-Regular";
const btnSize = RScaler(8);

const styles = StyleSheet.create({
    container: {
        width,
    },
    flatList: {
        flex: 1
    },
    itemContainer: {
        width: width,
        alignItems: 'center'
    },
    itemImage: {
        width: width,
        marginTop: RScaler(8)
    },
    captionContainer: {
        position: 'absolute',
        bottom: RScaler(20),
        left: RScaler(2)
    },
    itemCaption: {
        textAlign: 'left',
        color: '#000',
        fontSize: RScaler(3.3),
        fontFamily: fontFamily
    },
    paginationContainer: {
        height: 30,
        bottom: RScaler(7),
        left: RScaler(2),
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row'
    },
    paginationDot: {
        width: dotWidth,
        height: dotHeight,
        borderRadius: 6,
        marginEnd: 3,
        marginStart: 3,
        minHeight: 4,
        minWidth: 15,
        opacity: .4
    },
    paginationActiveDot: {
        width: dotWidth,
        height: dotHeight,
        borderRadius: 6,
        marginEnd: 3,
        marginStart: 3,
        position: 'absolute',
        minHeight: 4,
        minWidth: 15
    },
    skipBtn: {
        fontFamily: fontFamily,
        fontSize: RScaler(2.5),
        position: 'absolute',
        right: RScaler(4),
        top: RScaler(4),
        color: '#1fbcd6',
        zIndex: 30
    },
    nextBtn: {
        position: 'absolute',
        width: btnSize,
        height: btnSize,
        backgroundColor: '#F78173',
        borderRadius: btnSize / 2,
        bottom: RScaler(5.5),
        right: RScaler(2),
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0
    },
    nextBtnIcon: {
        fontSize: RScaler(6),
        paddingTop: isANDROID ? null : RScaler(.8)
    }
});
export { ImageSlider };