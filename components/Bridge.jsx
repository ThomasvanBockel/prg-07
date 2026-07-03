import React, {useContext, useEffect, useState} from "react";
import {fetch} from "expo/fetch";
import {useNavigation} from "@react-navigation/native";
import {Pressable, Text, View} from "react-native";
import {useTheme} from "./Theme";
import {ThemeContext} from "../providers/ThemeProvider";

export function Bridge({item}) {
    const navigation = useNavigation();

    const {theme} = useContext(ThemeContext);


    function pressHandler() {
        let name = item.name

        navigation.navigate('Notation', {
            name: name
        })

    }

    function mapHandler() {
        navigation.navigate('Map', {
            latitude: item.latitude,
            longitude: item.longitude
        })
    }

    return (
        <View
            className={theme ? 'bg-blue-950 my-2 m flex pt-2  border-black border-2 rounded-lg  ' : 'bg-blue-50 my-2 m flex pt-2  border-black border-2 rounded-lg  '}>
            <View
                className={theme ? 'bg-blue-700 border-black border-b-1 rounded-lg' : 'bg-blue-100 border-black border-b-1 rounded-lg'}>

                <View className={"bg-amber-800 items-center border-solid border-t-4 py-2 border-amber-700 "}>
                    <Text className={'color-white font-bold'}>{item?.name}</Text>
                </View>

                <View className={'flex-row justify-between'}>
                    <Pressable
                        className={" bg-amber-900 w-1/6  items-center ml-4 py-4  border-t-8 border-amber-950"}>
                        <Text className={'color-white'} onPress={mapHandler}>Map</Text>
                    </Pressable>
                    <Pressable
                        className={" bg-amber-900 w-1/6 py-4  items-center mr-4   border-t-8 border-amber-950"}>
                        <Text className={'color-white'} onPress={pressHandler}>Notitie</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export async function loadBridgeData() {
    const result = await fetch('https://isdebrugopen.nl/bridges.json', {
        method: 'GET',
        headers: {
            "Accept": " application/json"
        }
    })
    const data = await result.json();


    return data.bridges

}