import React, { PureComponent } from 'react';
import { View, FlatList, StyleSheet, Dimensions, ScrollView, Image, Platform, Text } from 'react-native';
import { RScaler } from '../lib/utilites';
import { Colors } from './../../app.json';
import { Button } from './';
import { ClickableView } from './ClickableView';
import {strings} from "./../translations/translation"

type Props = {
    packages: [{
        title: String,
        cost: String,
        period: String,
        firstCaption: String,
        orangeText: String,
        secondCaption: String,
        footerTitle: String,
        options: [String]
    }],
    tabsHeight: Number,
    page: Number,
    loading: Boolean,
    submitAction: Function,
    closeBtnPress: Function
}

class PackageSlider extends PureComponent<Props> {

    static defaultProps = {
        tabsHeight: 250,
        page: Platform.OS == 'android' ? 1 : 0,
        loading: false
    }

    constructor(props) {
        super(props);

        this.state = {
            currentTab: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.nextIndex(this.props.page);
        }, 800);
    }

    newStr(str: String) {
        let parts = str.replace('youcast', '%1\nYOUCAST\n%1').replace('YOUCAST', '%1\nYOUCAST\n%1').split('%1');

        // if(strings.getLanguage()=="ar")
        // {
        //     for (let i = parts.length; i >0; i--) {
        //         parts[i] = <Text key={i} style={parts[i] == '\nYOUCAST\n' ? { color: Colors.orange } : {}}>{parts[i]}</Text>;
        //     }
        // }

        for (let i = 0; i < parts.length; i++) {
            parts[i] = <Text key={i} style={parts[i] == '\nYOUCAST\n' ? { color: Colors.orange } : {}}>{parts[i]}</Text>;
        }

        return <Text style={styles.itemCaption}>{parts}</Text>
    }

    handleSubmit(id) {
        if (this.props.submitAction) {
            this.props.submitAction(id);
        }
    }

    renderItem({ item }) {
        const { closeBtnPress, loading } = this.props;
        let { title, cost, period, first_caption, second_caption, footer_title, options } = item;
    
        const {
            overlay,
            itemOverlay,
            itemContainer,
            closeBtn,
            itemHeader,
            headerLeftSide,
            headerLeftSideLogo,
            packageName,
            headerSeparator,
            packagePrice,
            packagePeriod,
            itemFooter,
            footerTitleStyle,
            footerOptions,
            footerBtn,
            footerBtnText
        } = styles;
        first_caption = first_caption.concat('\n')
        const str = String(first_caption).concat(String(second_caption));

        return (
            <View style={itemOverlay}>
                <ClickableView style={overlay} background={null} onPress={closeBtnPress} />
                <ScrollView style={itemContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} bounces={false}>
                    <Button
                        icon="close"
                        iconSize={RScaler(3)}
                        iconColor={Colors.white}
                        iconType="material"
                        background={null}
                        activeOpacity={1}
                        style={closeBtn}
                        onPress={closeBtnPress}
                    />
                    <View style={itemHeader}>
                        <View style={headerLeftSide}>
                            <Image source={require('./../assets/logo-with-text.png')} style={headerLeftSideLogo} />
                            <Text style={packageName}>{title}</Text>
                        </View>
                        <View style={headerSeparator} />
                        <Text style={packagePrice}>{cost}<Text style={packagePeriod}>{`EG\n${period}`}</Text></Text>
                    </View>

                    {this.newStr(str)}

                    <View style={itemFooter}>
                        <Text style={footerTitleStyle}>{footer_title}</Text>
                        {
                            options.map((item, index) => {
                                return <Text key={index} style={footerOptions}>{`- ${item}`}</Text>
                            })
                        }

                        <Button
                            text={strings.GetNow}
                            textStyle={footerBtnText}
                            style={footerBtn}
                            onPress={() => this.handleSubmit(item.id)}
                            background={null}
                            loading={loading}
                            indicatorColor="#fff"
                        />
                    </View>
                </ScrollView>
            </View >
        );
    }

    nextIndex(page) {
        if (this.flatList) {
            this.flatList.scrollToOffset({
                offset: page * width,
                animated: true
            })

            this.setState({
                currentTab: page
            });
        }
    }

    onScroll(e) {
        let index = e.nativeEvent.contentOffset.x / width;

        this.setState({
            currentTab: Math.round(index)
        });
    }

    render() {
        const { packages, tabsHeight, loading } = this.props;
        const { container, flatList } = styles;
        return (
            
             <View style={[container, { height: tabsHeight }]}>
                 <FlatList
                     horizontal
                     data={packages}
                     pagingEnabled
                     bounces={false}
                     extraData={width}
                     scrollEnabled={!loading}
                     ref={ref => this.flatList = ref}
                     showsHorizontalScrollIndicator={false}
                     renderItem={this.renderItem.bind(this)}
                     keyExtractor={(item, index) => index.toString()}
                     onScroll={this.onScroll.bind(this)}
                     style={flatList}
                 />

             </View>
        );
    }

}

const { width, height } = Dimensions.get('window');
const logoSize = RScaler(9);
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";
const styles = StyleSheet.create({
    itemOverlay: {
        width: width,
        height: height,
        backgroundColor: '#0007',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemContainer: {
        width: '85%',
        marginTop: RScaler(5),
        marginBottom: RScaler(10),
        backgroundColor: Colors.gray,
        borderRadius: 15,
        zIndex: 10
    },
    closeBtn: {
        width: '15%',
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: 'transparent',
        borderWidth: 0
    },
    itemHeader: {
        width: '100%',
        flexDirection: 'row'
    },
    headerLeftSide: {
        flex: 1.5
    },
    headerSeparator: {
        width: 4,
        height: '80%',
        backgroundColor: Colors.orange,
        alignSelf: 'center'
    },
    headerLeftSideLogo: {
        width: logoSize,
        height: logoSize,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    packageName: {
        fontFamily: bold,
        fontSize: RScaler(3.5),
        color: Colors.white,
        letterSpacing: RScaler(.5),
        alignSelf: 'center'
    },
    packagePrice: {
        flex: 1,
        alignSelf: 'center',
        textAlign: 'center',
        fontSize: RScaler(4),
        fontFamily: bold,
        color: Colors.orange
    },
    packagePeriod: {
        fontSize: RScaler(3),
        color: Colors.white
    },
    itemCaption: {
        fontFamily: regular,
        width: '90%',
        fontSize: RScaler(2),
        alignSelf: 'center',
        textAlign: 'center',
        color: Colors.white,
        marginTop: RScaler(3)
    },
    itemFooter: {
        width: '100%',
        padding: RScaler(3),
        justifyContent: 'center'
    },
    footerTitleStyle: {
        fontFamily: bold,
        fontSize: RScaler(3),
        color: Colors.orange,
        marginBottom: RScaler(1),
        textAlign: 'left'
    },
    footerOptions: {
        width: '90%',
        fontFamily: regular,
        fontSize: RScaler(2.3),
        color: Colors.white,
        marginBottom: RScaler(1)
    },
    footerBtn: {
        width: '80%',
        marginVertical: RScaler(3),
        backgroundColor: Colors.orange,
        borderWidth: 0,
        elevation: 0,
        shadowOpacity: 0,
        alignSelf: 'center'
    },
    footerBtnText: {
        fontFamily: bold,
        letterSpacing: RScaler(.5),
        fontSize: RScaler(2.5),
        color: Colors.dark
    },
    overlay: {
        width: width,
        height: height,
        backgroundColor: 'transparent',
        position: 'absolute',
        top: 0,
        zIndex: 1
    }
});
export { PackageSlider };