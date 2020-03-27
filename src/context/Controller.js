import React, { createContext, useEffect, useState } from 'react';

export const Context = createContext();

let values = {
    x: 0,
    y: 0,
    yaw: 0,
    light: false,
    siren: false,
};

export function Provider({ children }) {
    const [websocketUrl, setWebsocketUrl] = useState(`wss://${window.location.hostname}:5000`);
    const [websocket, setWebsocket] = useState(null);
    const [websocketConnected, setWebsocketConnected] = useState(false);
    const [gamepadConnected, setGamepadConnected] = useState(false);
    useEffect(() => {
        let interval;
        setWebsocket(new WebSocket(websocketUrl));
        return () => {
            if(interval) clearInterval(interval);
        };
    }, [websocketUrl]);

    useEffect(() => {
        if(!websocket) {
            return;
        }
        const interval = setInterval(() => {
            if(!websocket || websocket.readyState !== 1) {
                setWebsocketConnected(false);
                return;
            }
            setWebsocketConnected(true);
            websocket.send(JSON.stringify(values)); 
        }, 30);
        return () => clearInterval(interval);
    }, [websocket]);

    function onControllerChange(newValues) {
        values = {
            ...values,
            ...newValues,
        };
    }

    return <Context.Provider 
        value={{ 
            onControllerChange, 
            setWebsocketUrl, 
            websocketUrl, 
            websocketConnected,
            gamepadConnected,
            setGamepadConnected,
        }}
    >
        {children}, 
    </Context.Provider>;
}