import React, { Component } from 'react';
import { SafeAreaView, Text, StatusBar, Platform, View, Linking } from 'react-native';
import { ClickableView, Toolbar } from './../../components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import { style } from './style';
import { Colors } from './../../../app.json';
import { RScaler } from '../../lib/utilites';

class Location extends Component {

    openMaps(lat, lng) {
        const url = Platform.select({ ios: `maps://maps.google.com/maps?daddr=${lat},${lng}`, android: `https://www.google.com/maps?daddr=${lat},${lng}` });;
        Linking.openURL(url);
    }

    render() {
        const { navigation } = this.props;
        const {
            container,
            map,
            subHeader,
            subHeaderTitle,
            LocationView,
            locationIcon,
            locationText,
            openMapsBtn,
            openMapsBtnText,
            openMapsBtnIcon
        } = style;

        return (
            <SafeAreaView style={container}>
                <StatusBar hidden />

                <Toolbar
                    toolbarColor={Colors.gray}
                    leftSide={{
                        icon: "ios-arrow-round-back",
                        color: Colors.white,
                        size: RScaler(4),
                        onPress: () => navigation.goBack()
                    }}
                    center={{
                        title: "Location",
                        fontFamily: "OpenSans-Bold",
                        color: Colors.white,
                        size: RScaler(3)
                    }}
                />

                <View style={subHeader}>
                    <Text style={subHeaderTitle}>YOUCAST Main Office</Text>
                </View>

                <View style={LocationView}>
                    <Icon name="map-marker" style={locationIcon} />
                    <Text style={locationText}>Almohandseen</Text>
                </View>

                <MapView
                    style={map}
                    region={{
                        latitude: 30.0541854,
                        longitude: 31.1980717,
                        latitudeDelta: 0.003,
                        longitudeDelta: 0.003
                    }}
                >
                    <Marker
                        coordinate={{
                            latitude: 30.0541854,
                            longitude: 31.1980717
                        }}
                    />
                </MapView>

                <ClickableView background={null} activeOpacity={1} style={openMapsBtn} onPress={() => this.openMaps(30.0541854, 31.1980717)}>
                    <Text style={openMapsBtnText}>Go To Maps</Text>
                    <IIcon name="ios-arrow-round-forward" style={openMapsBtnIcon} />
                </ClickableView>

            </SafeAreaView>
        );
    }
}

export default Location;