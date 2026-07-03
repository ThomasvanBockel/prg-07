import React, {useEffect, useState} from "react";
import {Marker as MapMarker} from "react-native-maps";
import {loadBridgeData} from "./Bridge";

export function BridgeMarkers() {
    const [bridges, setBridges] = useState([]);

    useEffect(() => {
        async function load() {
            const data = await loadBridgeData();
            setBridges(data);
        }

        load();
    }, []);

    return (
        <>
            {bridges.map((bridge, index) => (
                <MapMarker
                    key={index}
                    coordinate={{
                        latitude: bridge.latitude,
                        longitude: bridge.longitude,
                    }}
                    title={`Bridge ${index + 1}`}
                    description={bridge.name}
                />
            ))}
        </>
    );
}