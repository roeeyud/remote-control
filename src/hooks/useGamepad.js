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
            onControllerChange({ x: 0, y: 0 });
        }
        function pollGamepads() {
            const gamepad = getGamepad();
            if(!gamepad) {
                return;
            }
            const x = gamepad.axes[0];
            const y = gamepad.axes[3] * -1;
            onControllerChange({ x, y });
        }

        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        const interval = setInterval(pollGamepads, 30);

        return function cleanup() {
            clearInterval(interval);
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
            onControllerChange({ x: 0, y: 0 });
        };
    }, [onControllerChange, setGamepadConnected]);
    return gamepadConnected;
}