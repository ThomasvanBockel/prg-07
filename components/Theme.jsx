import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";


export function useTheme() {

    const [theme, setTheme] = useState(null);

    useEffect(() => {
        async function loadTheme() {
            const value = await AsyncStorage.getItem("mode");
            setTheme(value ? JSON.parse(value) : "light");
        }

        loadTheme();
    }, []);

    return theme;
}

export function setNewTheme() {
    setTheme(e => {

        const newMode = !e

        async function setStorage() {

            await AsyncStorage.setItem('mode', JSON.stringify(newMode));
        }

        setStorage()

        return newMode
    })
}