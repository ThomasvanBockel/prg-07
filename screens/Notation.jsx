import {Button, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View, Share} from "react-native";
import {useContext, useEffect, useState} from "react";
import {fetch} from "expo/fetch";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {useNavigation} from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from 'react';
import asyncStorage from "@react-native-async-storage/async-storage/src/AsyncStorage";
import {ThemeContext} from "../providers/ThemeProvider";


export default function Notation({route}) {
    const {name} = route.params;
    const [notationInfo, setNotationInfo] = useState({
        notation: ""
    })
    const {theme} = useContext(ThemeContext);
    const [prevNotation, setPrevNotation] = useState()
    const [storedNotation, setStoredNotation] = useState()
    const [deletingNote, setDeletingNote] = useState(false)


    function changeInput(key, value) {
        setNotationInfo(prev => ({
            ...prev,
            [key]: value
        }));
    }


    async function shareNote(note) {
        await Share.share({
            message: `Brug: ${name}, notitie: ${note}`
        });
    }


    async function saveNotation() {

        if (!prevNotation || prevNotation.length === 0) {
            await AsyncStorage.setItem(
                'notation',
                JSON.stringify([
                    {
                        name: name,
                        notation: notationInfo.notation
                    }
                ])
            );
        } else {
            const findNotation = prevNotation.findIndex(notation => notation.name === name);
            const updated = [...prevNotation];

            if (findNotation !== -1) {

                updated[findNotation] = {
                    ...updated[findNotation],
                    notation: notationInfo.notation
                };
            } else {
                updated.push({
                    name: name,
                    notation: notationInfo.notation
                });
            }
            setStoredNotation(notationInfo.notation)
            setPrevNotation(updated);
            await AsyncStorage.setItem(
                'notation',
                JSON.stringify(updated)
            );


        }
    }

    async function deleteHandler() {
        setDeletingNote(true)
        setNotationInfo({
            notation: ""
        });
        setStoredNotation("")
    }

    useEffect(() => {
        if (deletingNote) {
            setDeletingNote(false)

            async function saveHandler() {

                await saveNotation()
            }

            saveHandler()
        }
    }, [notationInfo]);

    useEffect(() => {
        async function awaitHandler() {


            const savedNotation = await AsyncStorage.getItem('notation');

            if (savedNotation !== null) {
                const parsed = JSON.parse(savedNotation);
                setPrevNotation(parsed)

                const findNotation = parsed.find(notation => notation.name === name);
                if (findNotation) {
                    setNotationInfo({
                        notation: findNotation.notation
                    });
                    setStoredNotation(findNotation.notation)
                } else {
                    setNotationInfo({notation: ""});
                }
            }
        }

        awaitHandler()

    }, []);

    return (
        <View className={theme ? "flex-1  bg-gray-600 p-4" : "flex-1  bg-white p-4"}>
            <Text className={theme ? "color-white" : "color-black"}>{name}</Text>

            <TextInput
                className={theme ? "border border-gray-300 p-2 color-white " : "border border-gray-300 p-2 color-black"}
                onChangeText={(text) => changeInput("notation", text)}
                value={notationInfo.notation ?? ""}
                placeholder="Nice bridge"
                placeholderTextColor={theme ? "gray" : "gray"}
            />

            <Pressable className="bg-green-500 p-3 rounded mt-3" onPress={saveNotation}>
                <Text className="text-white">Opslaan /(0_0)/</Text>
            </Pressable>
            {storedNotation ? (
                <>
                    <Pressable className="bg-red-500 p-3 rounded mt-3" onPress={deleteHandler}>
                        <Text className="text-white">Delete /(0_0)/</Text>
                    </Pressable>
                    <Text className={theme ? "color-white" : ""}>
                        Notitie:
                    </Text>
                    <Text className={theme ? "color-white" : ""}>
                        {storedNotation}
                    </Text>
                    <Pressable className="bg-blue-500 p-3 rounded mt-3" onPress={() => shareNote(storedNotation)}>
                        <Text className={theme ? "color-white" : ""}>Deel notitie</Text>
                    </Pressable>
                </>
            ) : null}
        </View>

    )
}

