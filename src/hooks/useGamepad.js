import { useEffect, useState } from 'react';

export default function useGamepad() {
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        function handleGamepadConnected() {
            setConnected(true); 
        }
        function handleGamepadDisconnected() {
            setConnected(false);
        }
        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        return function cleanup() {
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        };
    }, []);
    return connected;
}