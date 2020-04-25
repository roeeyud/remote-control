import React, { createContext, useEffect, useState } from 'react';
import CryptoJS from 'crypto-js';

export const Context = createContext();

let values = {
    x: 0,
    y: 0,
    enabled: false,
};
let reverseDelayTimeout;
const wsUrl = `ws://${window.location.hostname}:5000`;
export function Provider({ children }) {
    const [enabled, setEnabled] = useState(false);    
    const [websocket, setWebsocket] = useState(null);
    const [password, setPassword] = useState(localStorage.getItem('pass') || '');
    const [error, setError] = useState(null);
    const [websocketConnected, setWebsocketConnected] = useState(false);
    const [gamepadConnected, setGamepadConnected] = useState(false);
    const [reversing, setReversing] = useState(false);
    useEffect(() => {
        setWebsocket(new WebSocket(wsUrl));
    }, []);

    useEffect(() => {
        if (!websocket || !password) {
            return;
        }
        function handleWebsocketError() {
            websocket.close();
            setWebsocket(null);
            setWebsocketConnected(false);
            setError('Connection Error');
        }
        function handleWebsocketClose({ code, reason }) {
            if (code === 1002) {
                setError('Enter password');
                setPassword(null);
            }
            setWebsocket(null);
            setError(reason);
            setWebsocketConnected(false);
        }
        websocket.onerror = handleWebsocketError;
        websocket.onclose = handleWebsocketClose;
        const interval = setInterval(() => {
            if (!websocket || websocket.readyState !== 1) {
                setWebsocketConnected(false);
                return;
            }
            setWebsocketConnected(true);
            const textMessage = JSON.stringify(values);
            const encrypted = CryptoJS.AES.encrypt(textMessage, password).toString();
            websocket.send(encrypted);
        }, 30);
        return () => {
            clearInterval(interval);
            if (websocket) websocket.close();
        };
    }, [websocket, password]);

    function onControllerChange(newValues) {
        if (newValues.enabled !== undefined) {
            setEnabled(newValues.enabled);
        }

        if (newValues.y && Math.abs(newValues.y) < 0.08) newValues.y = 0;
        if (newValues.x && Math.abs(newValues.x) < 0.08) newValues.x = 0;
        
        if (newValues.y < 0) {
            if(!reverseDelayTimeout) {
                reverseDelayTimeout = setTimeout(() => setReversing(true), 400);
            }
        } else {
            if (reversing) setReversing(false);
            if (reverseDelayTimeout) {
                clearTimeout(reverseDelayTimeout);
                reverseDelayTimeout = null;
            }
        }
        values = {
            ...values,
            ...newValues,
        };
    }

    return <Context.Provider
        value={{
            onControllerChange,
            websocketConnected,
            gamepadConnected,
            setGamepadConnected,
            enabled,
            error, 
            password,
            websocket,
            reversing,
            setWebsocket: () => {
                setWebsocket(null);
                setError('');
                setTimeout(() => {
                    setWebsocket(new WebSocket(wsUrl));
                }, 50);
            },
            setPassword: (newPassword) => {
                localStorage.setItem('pass', newPassword);
                setPassword(newPassword);
            },
        }}
    >
        {children},
    </Context.Provider>;
}
