import { useEffect, useContext } from 'react';

import { Context as ControllerContext } from '../context/Controller';

function getGamepad() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
    return gamepads[0];
}

export default function useGamepad() {
    const { onControllerChange, gamepadConnected, setGamepadConnected } = useContext(ControllerContext);
    
    useEffect(() => {
        function handleGamepadConnected(e) {
            if(e.gamepad.index !== 0) {
                console.warn(`Gamepad event from invalid index "${e.gamepad.index}"`)
            }  
            setGamepadConnected(true); 
        }
        function handleGamepadDisconnected(e) {
            if(e.gamepad.index !== 0) {
                console.warn(`Gamepad event from invalid index "${e.gamepad.index}"`)
            }  
            setGamepadConnected(false);
            onControllerChange({ x: 0, y: 0, yaw: 0 });
        }
        function pollGamepads() {
            const gamepad = getGamepad();
            if(!gamepad) {
                return;
            }
            onControllerChange({ x: gamepad.axes[0], y: gamepad.axes[1], yaw: gamepad.axes[5] });
        }

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        const interval = setInterval(pollGamepads, 30);

        return function cleanup() {
            clearInterval(interval);
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
            onControllerChange({ x: 0, y: 0, yaw: 0 });
        };
    }, [onControllerChange, setGamepadConnected]);
    return gamepadConnected;
}