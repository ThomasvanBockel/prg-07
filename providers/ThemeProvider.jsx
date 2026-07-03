import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState(null);

    useEffect(() => {
        async function load() {
            const value = await AsyncStorage.getItem("mode");
            setTheme(value ? JSON.parse(value) : false);
        }

        load();
    }, [theme]);

    async function toggleTheme() {
        const newTheme = !theme;
        setTheme(newTheme);
        await AsyncStorage.setItem("mode", JSON.stringify(newTheme));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}