import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Dimensions, Animated, Easing, Platform, Text } from 'react-native';
import { RScaler } from '../lib/utilites';
import { Colors } from './../../app.json';
import { ClickableView } from './';

type Props = {
    tabs: [{ title: String, View: React.Component }],
    tabsHeight: Number,
    pagintaionStyle: StyleSheet,
    page: Number,
    scrollEnabled: Boolean,
    onTabChange: Function,
    optimize: Boolean
}

class TabSlider extends PureComponent<Props> {

    static defaultProps = {
        hidePagination: false,
        tabsHeight: 250,
        page: Platform.OS == 'android' ? 1 : 0,
        scrollEnabled: true,
        optimize: false
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0,
            tabed: false
        }
    }

    renderItem(item) {
        const { optimize } = this.props;
        return optimize ? item.index != this.state.currentTab ? null : (item.item.View) : item.item.View;
    }

    renderPagination() {
        const { currentTab } = this.state;
        const { pagintaionStyle, tabs, onTabChange } = this.props;
        const { paginationContainer, paginationDot } = styles;

        return (
            <View style={[paginationContainer, pagintaionStyle]}>
                {
                    this.props.tabs.map((item, index) => {
                        const active = index == currentTab;
                        return (
                            <ClickableView key={index} style={[paginationDot, { width: width / tabs.length }]} onPress={() => {
                                console.log(index)
                                this.nextIndex(index)
                                this.setState({
                                    tabed: true
                                });

                                setTimeout(() => {
                                    this.setState({
                                        tabed: false
                                    });
                                }, 1000);
                                if (onTabChange) {
                                    onTabChange(tabs[index]['title'])
                                }
                            }} background={null} activeOpacity={1}>
                                <Text style={[styles.title, { color: active ? Colors.orange : Colors.white }]}>{item.title}</Text>
                            </ClickableView>
                        );
                    })
                }
            </View>
        );
    }

    nextIndex(page) {
        this.flatList.scrollToOffset({
            offset: page * width
        });

        this.setState({
            currentTab: page
        });
    }

    onScrollEnd(e) {
        let index = e.nativeEvent.contentOffset.x / width;

        this.setState({
            currentTab: Math.round(index)
        });
    }

    render() {
        const { tabs, tabsHeight, scrollEnabled, onTabChange } = this.props;
        const { container, flatList } = styles;
        return (
            <View style={[container, { height: tabsHeight }]}>

                {this.renderPagination()}

                <FlatList
                    horizontal
                    data={tabs}
                    pagingEnabled
                    bounces={false}
                    extraData={width}
                    ref={ref => this.flatList = ref}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item, index) => index.toString()}
                    onScroll={this.state.tabed ? null : this.onScrollEnd.bind(this)}
                    onMomentumScrollEnd={(e) => {
                        let index = e.nativeEvent.contentOffset.x / width;
                        if (onTabChange) {
                            onTabChange(tabs[index]['title'])
                        }
                    }}
                    style={[flatList, { backgroundColor: tabs.backgroundColor }]}
                    scrollEnabled={scrollEnabled}
                />

            </View>
        );
    }

}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width
    },
    flatList: {
        flex: 1
    },
    paginationContainer: {
        width: width,
        top: 0,
        alignSelf: 'center',
        position: 'absolute',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        zIndex: 3
    },
    paginationDot: {
        height: RScaler(8),
        backgroundColor: Colors.gray,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontFamily: "OpenSans-Bold"
    }
});
export { TabSlider };