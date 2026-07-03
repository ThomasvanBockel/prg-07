import {Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {fetch} from "expo/fetch";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import {Bridge, loadBridgeData} from "../components/Bridge";
import {useTheme} from "../components/Theme";
import {ThemeContext} from "../providers/ThemeProvider";


export default function Home() {
    const [bridges, setBridges] = useState([])
    const {theme} = useContext(ThemeContext);


    useEffect(() => {
        async function load() {
            const data = await loadBridgeData(bridges);
            setBridges(data);
        }

        load();

    }, []);

    return (
        <SafeAreaView className={theme ? 'bg-gray-600' : ' px-1'}>
            <View className={'items-center '}>
                <Text
                    className={theme ? ' color-white text-2xl font-bold py-2' : ' color-black text-2xl font-bold py-2'}>Bruggen:</Text>

            </View>

            <FlatList
                data={bridges}
                renderItem={({item}) => <Bridge item={item}/>}

            />
        </SafeAreaView>

    )
}

