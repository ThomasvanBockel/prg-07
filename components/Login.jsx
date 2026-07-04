import {useContext, useEffect} from "react";
import {View, Text} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import {ThemeContext} from "../providers/ThemeProvider";

export function Login({setLoggedIn}) {
    const {theme} = useContext(ThemeContext);
    useEffect(() => {
        async function login() {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Log in",
            });

            if (result.success) {
                setLoggedIn(true);
            }
        }

        const timeout = setTimeout(login, 300);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <View
            className={theme ? "flex-1 justify-center items-center bg-gray-600" : "flex-1 justify-center items-center bg-white"}>
            <Text className={theme ? "color-white" : "color-black"}>Inloggen</Text>
        </View>
    );
}