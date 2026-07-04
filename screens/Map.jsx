import {Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {fetch} from "expo/fetch";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useNavigation, useRoute} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import MapView, {Marker} from "react-native-maps";
import * as Location from 'expo-location'
import {ThemeContext} from "../providers/ThemeProvider";
import {BridgeMarkers} from "../components/BridgeMarker";


export default function Map() {
    const route = useRoute();
    const {latitude, longitude} = route.params || {};
    const {theme} = useContext(ThemeContext);
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [watchingLocation, setWatchingLocation] = useState({
        latitude: latitude ?? null,
        longitude: longitude ?? null
    })


    function findUser() {

        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            setPermissionStatus(status);

            if (status !== "granted") {
                return;
            }


            await Location.watchPositionAsync(
                {},
                (location) => {
                    setWatchingLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                })

        })();
    }

    useEffect(() => {
        if (route.params?.latitude && route.params?.longitude) {
            setWatchingLocation({
                latitude: route.params.latitude,
                longitude: route.params.longitude,
                latitudeDelta: 0.025,
                longitudeDelta: 0.0125
            });
        }
    }, [route.params]);


    useEffect(() => {
        findUser()
    }, []);

    return (
        // used styles because map doesn't load with w-full and h-full from native-wind
        <MapView style={styles.map}
                 customMapStyle={theme ? darkMapStyle : []}
                 region={{
                     latitude: watchingLocation.latitude ?? 0,
                     longitude: watchingLocation.longitude ?? 0,
                     latitudeDelta: watchingLocation.latitudeDelta ?? 0.05,
                     longitudeDelta: watchingLocation.longitudeDelta ?? 0.025,
                 }} showsUserLocation={true}
        >
            <BridgeMarkers/>
        </MapView>
    )
}
const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
const darkMapStyle = [
    {
        elementType: "geometry",
        stylers: [{color: "#212121"}],
    },
    {
        elementType: "labels.icon",
        stylers: [{visibility: "off"}],
    },
    {
        elementType: "labels.text.fill",
        stylers: [{color: "#757575"}],
    },
    {
        elementType: "labels.text.stroke",
        stylers: [{color: "#212121"}],
    },
    {
        featureType: "road",
        elementType: "geometry",
        stylers: [{color: "#2c2c2c"}],
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{color: "#000000"}],
    },
    {
        featureType: "poi",
        stylers: [{visibility: "off"}],
    },
];
