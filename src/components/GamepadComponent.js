import React, { useContext } from 'react';

import Fab from '@material-ui/core/Fab';
import Gamepad from '@material-ui/icons/Gamepad';

import { Context as ControllerContext } from '../context/Controller';

export default function GamepadComponent() {
    const { onControllerChange } = useContext(ControllerContext);

    return <Fab aria-label="peripheralController" 
        onMouseDown={() => onControllerChange('demo-value', 'down')}
        onMouseUp={() => onControllerChange('demo-value', 'up')}
    >
        <Gamepad />
  </Fab>
}
