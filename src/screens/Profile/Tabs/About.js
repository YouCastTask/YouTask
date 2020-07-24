import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { RScaler } from './../../../lib/utilites';
import { Colors } from './../../../../app.json';

class About extends PureComponent {
    render() {
        const { height, data } = this.props;

        return (
            <View style={[styles.container, { height: height }]}>
                <ScrollView bounces={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <View style={styles.overlay}>
                        {
                            data.map((item, index) => {
                                const { attr, value } = item;
                                const mod = index % 2;
                                
                                if (typeof value === 'string') {
                                    return (
                                        <View key={index} style={styles.row}>
                                            <Icon name={!mod ? "md-arrow-dropright" : "md-arrow-dropleft"} style={!mod ? styles.leftIcon : styles.rightIcon} />
                                            <Text style={styles.title}>{String(attr).toUpperCase()}</Text>
                                            <Text style={styles.value}>{value}</Text>
                                        </View>
                                    );
                                } else if (typeof value === 'object' && value !== null) {
                                    return (
                                        <View key={index} style={styles.row}>
                                            <Icon name={!mod ? "md-arrow-dropright" : "md-arrow-dropleft"} style={!mod ? styles.leftIcon : styles.rightIcon} />
                                            <Text style={styles.title}>{String(attr).toUpperCase()}</Text>
                                            <Text style={styles.value}>{(Object.values(value))[0]}</Text>
                                        </View>
                                    );
                                }
                                
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const { width, height } = Dimensions.get('screen');
const regular = "OpenSans-Regular";
const bold = "OpenSans-Bold";
const isIPHONEX = Platform.OS === 'ios' && (width >= 800 || height >= 800);
const styles = StyleSheet.create({
    container: {
        width: width,
        paddingTop: RScaler(8)
    },
    overlay: {
        backgroundColor: '#0e151899',
        paddingStart: RScaler(2),
        paddingEnd: RScaler(2),
        paddingTop: RScaler(5),
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: RScaler(4)
    },
    title: {
        fontFamily: bold,
        fontSize: RScaler(3),
        color: Colors.orange,
        letterSpacing: RScaler(.5)
    },
    value: {
        fontFamily: regular,
        fontSize: RScaler(2.5),
        color: Colors.white
    },
    leftIcon: {
        fontSize: RScaler(8),
        color: Colors.orange,
        position: 'absolute',
        left: 0
    },
    rightIcon: {
        fontSize: RScaler(8),
        color: Colors.orange,
        position: 'absolute',
        right: 0

    }
});

export default About;