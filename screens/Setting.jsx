import {Button, FlatList, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View} from "react-native";
import {useContext, useEffect, useState} from "react";
import {fetch} from "expo/fetch";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
// import {useTheme} from "../components/Theme";
// import {ThemeProvider} from "../providers/ThemeProvider";
import {ThemeContext} from "../providers/ThemeProvider";


export default function Setting() {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const [darkMode, setDarkMode] = useState(true)


    function changeDarkMode() {
        toggleTheme()
    }


    useEffect(() => {
        setDarkMode(theme)

    }, [theme]);

    return (
        <SafeAreaView className={theme ? "bg-gray-600  flex-1" : ""}>
            <View className={"flex-row items-center justify-center gap-4"}>

                <Text
                    className={theme ? " color-white text-xl" : "text-xl"}>Darkmode: {theme ? "True" : "False"} </Text>
                <Switch value={darkMode} onChange={changeDarkMode}/>


            </View>
        </SafeAreaView>
    )
}
