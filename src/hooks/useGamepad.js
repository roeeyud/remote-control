import { useEffect, useState, useContext } from 'react';

import { Context as ControllerContext } from '../context/Controller';

function getGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    return gamepads[0];
}

export default function useGamepad() {
    const { onControllerChange } = useContext(ControllerContext);
    const [connected, setConnected] = useState(false)
    
    useEffect(() => {
        function handleGamepadConnected(e) {
            if(e.gamepad.index !== 0) {
                console.warn(`Gamepad event from invalid index "${e.gamepad.index}"`)
            }  
            setConnected(true); 
        }
        function handleGamepadDisconnected(e) {
            if(e.gamepad.index !== 0) {
                console.warn(`Gamepad event from invalid index "${e.gamepad.index}"`)
            }  
            setConnected(false);
        }
        function pollGamepads() {
            const gamepad = getGamepad();
            if(!gamepad) {
                return;
            }
            onControllerChange({ gamepadX: gamepad.axes[0], gamepadY: gamepad.axes[1] });
        }

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        const interval = setInterval(pollGamepads, 30);

        return function cleanup() {
            clearInterval(interval);
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        };
    }, []);
    return connected;
}