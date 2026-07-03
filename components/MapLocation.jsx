import {useEffect, useState} from "react";


import * as FindLocation from "expo-location";

export function MapLocation({setUserLocation}) {
    const [permissionStatus, setPermissionStatus] = useState(null);

    useEffect(() => {
        async function findUser() {

            const {status} = await FindLocation.requestForegroundPermissionsAsync();
            setPermissionStatus(status);

            if (status !== "granted") {
                return;
            }


            const watcher = await FindLocation.watchPositionAsync(
                {},
                (location) => {
                    setUserLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    })
                })
            return watcher
        }
    }, [setUserLocation]);

}