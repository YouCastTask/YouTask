import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SafeAreaView, Text, StatusBar, Animated } from 'react-native';
import { style } from './style';
import { setStaticData, setCountries } from './../../redux/Actions/signUpActions';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends Component {
    constructor() {
        super();

        this.state = {
            rotate: new Animated.Value(0),
            opacity: new Animated.Value(0)
        }
    }

    async componentDidMount() {
        const { rotate, opacity } = this.state;
        const user = await AsyncStorage.getItem('user');

        if (!user) {
            this.props.setStaticData();
            this.props.setCountries();
        }
        

        Animated.sequence([
            Animated.timing(rotate, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true
            })
        ]).start(async () => {
            let route = "SignIn";
            if (user) {
                route = "Home";
            }
            setTimeout(() => {
                this.props.navigation.replace(route);
            }, 3000);
        });
    }

    render() {
        const { rotate, opacity } = this.state;
        const {
            container,
            logo,
            title,
            subTitle
        } = style;
        const rotation = rotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['90deg', '0deg']
        });

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Animated.Image source={require('./../../assets/logo.png')} style={[logo, { transform: [{ rotate: rotation }] }]} />
                <Animated.Text style={[title, { opacity: opacity }]}>YOU<Text style={subTitle}>CAST</Text></Animated.Text>

            </SafeAreaView>
        );
    }
}

export default connect(null, { setStaticData, setCountries })(Splash);