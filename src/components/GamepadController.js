import React, { useContext, useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Gamepad from '@material-ui/icons/Gamepad';

import useGamepad from '../hooks/useGamepad';

import { Context as ControllerContext } from '../context/Controller';

export default function GamepadComponent() {
    const connected = useGamepad();
    const { onControllerChange } = useContext(ControllerContext);

    return <Fab aria-label="peripheralController" 
        onMouseDown={() => onControllerChange('demo-value', 'down')}
        onMouseUp={() => onControllerChange('demo-value', 'up')}
        color={connected ? 'primary' : 'default'}
    >
        <Gamepad />
  </Fab>
}
