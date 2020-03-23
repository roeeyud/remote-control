import React, { useContext, useEffect, useState } from 'react';

import Fab from '@material-ui/core/Fab';
import Gamepad from '@material-ui/icons/Gamepad';

import useGamepad from '../hooks/useGamepad';

export default function GamepadComponent() {
    const connected = useGamepad();

    return <Fab aria-label="peripheralController" 
        color={connected ? 'primary' : 'default'}
    >
        <Gamepad />
  </Fab>
}
