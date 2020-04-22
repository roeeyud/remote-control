import React, { useContext } from 'react';

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import Fab from '@material-ui/core/Fab';
import { Context as ControllerContext } from '../context/Controller';

export default function EnableButton() {
    const { onControllerChange, enabled } = useContext(ControllerContext);
    
    function handleClick() {        
        onControllerChange({ enabled: !enabled });
    }

    return <Fab aria-label="peripheralController" 
        color={enabled ? 'primary' : 'secondary'}
        onClick={handleClick}
    >
        <PowerSettingsNewIcon />
  </Fab>
}
