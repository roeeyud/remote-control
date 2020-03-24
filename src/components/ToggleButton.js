import React, { useState, useContext } from 'react';

import Fab from '@material-ui/core/Fab';
import { Context as ControllerContext } from '../context/Controller';

export default function ToggleButton({ children, name }) {
    const [state, setState] = useState(false);
    const { onControllerChange } = useContext(ControllerContext);
    
    function handleClick() {
        const newState = !state;
        onControllerChange({ [name]: newState ? 1 : 0 });
        setState(newState);
    }

    return <Fab aria-label="peripheralController" 
        color={state ? 'primary' : 'default'}
        onClick={handleClick}
    >
        {children}
  </Fab>
}
