import React, { useContext, useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Gamepad from '@material-ui/icons/Gamepad';

import { Context as ControllerContext } from '../context/Controller';

export default function GamepadComponent() {
    const [connected, setConnected] = useState(false)
    useEffect(() => {
        window.addEventListener('gamepadconnected', function(e) {
            console.log('gamepadconnected');
            setConnected(true); 
        });
        window.addEventListener('gamepaddisconnected', function(e) {
            console.log('gamepadconnected');
            setConnected(false);
        });

        return function cleanup() {
            
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
