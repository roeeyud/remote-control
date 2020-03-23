import React, { useContext, useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Gamepad from '@material-ui/icons/Gamepad';

import { Context as ControllerContext } from '../context/Controller';

export default function GamepadComponent() {
    const [connected, setConnected] = useState(false)

    useEffect(() => {
        function handleGamepadConnected() {
            console.log('gamepadconnected');
            setConnected(true); 
        }
        function handleGamepadDisconnected() {
            console.log('gamepadconnected');
            setConnected(false);
        }
        window.addEventListener('gamepadconnected', handleGamepadConnected);
        window.addEventListener('gamepaddisconnected', handleGamepadDisconnected);

        return function cleanup() {
            window.removeEventListener('gamepadconnected', handleGamepadConnected);
            window.removeEventListener('gamepaddisconnected', handleGamepadDisconnected);
        };
    }, []);
    const { onControllerChange } = useContext(ControllerContext);

    return <Fab aria-label="peripheralController" 
        onMouseDown={() => onControllerChange('demo-value', 'down')}
        onMouseUp={() => onControllerChange('demo-value', 'up')}
        color={connected ? 'primary' : 'default'}
    >
        <Gamepad />
  </Fab>
}
