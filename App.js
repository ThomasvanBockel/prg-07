import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import "./global.css";
import Home from "./screens/Home";
import Setting from "./screens/Setting";
import Map from "./screens/Map";
import Notation from "./screens/Notation";
import {verifyInstallation} from "nativewind";
import {useTheme} from "./components/Theme";
import {useContext, useEffect, useState} from "react";
import {ThemeContext, ThemeProvider} from "./providers/ThemeProvider"

function TabNavigator() {
    const Tab = createBottomTabNavigator();
    const {theme} = useContext(ThemeContext);

    return (
        <Tab.Navigator
            screenOptions={theme ? {

                headerStyle: {
                    backgroundColor: "#1f2937",
                },
                tabBarStyle: {
                    backgroundColor: "#1f2937",
                },
                headerTintColor: "#fff",
            } : {
                headerStyle: {
                    backgroundColor: "#fff",
                },
                headerTintColor: "#000",
            }}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome6 name="bridge-water" size={size} color={color}/>
                    ),
                }}
            />

            <Tab.Screen
                name="Map"
                component={Map}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome6 name="map" size={size} color={color}/>
                    ),
                }}
            />

            <Tab.Screen
                name="Setting"
                component={Setting}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <FontAwesome6 name="gear" size={size} color={color}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

function MainApp() {
    const {theme} = useContext(ThemeContext);

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={theme ? {

                    headerStyle: {
                        backgroundColor: "#1f2937",
                    },
                    tabBarStyle: {
                        backgroundColor: "#1f2937",
                    },
                    headerTintColor: "#fff",
                } : {
                    headerStyle: {
                        backgroundColor: "#fff",
                    },
                    headerTintColor: "#000",
                }}
            >
                <Stack.Screen
                    name="MainTabs"
                    component={TabNavigator}
                    options={{headerShown: false}}
                />

                <Stack.Screen
                    name="Notation"
                    component={Notation}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <ThemeProvider>
            <MainApp/>
        </ThemeProvider>
    );
}