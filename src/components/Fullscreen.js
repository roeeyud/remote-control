import React, { useState } from 'react';

import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import Fab from '@material-ui/core/Fab';

export default function FullscreenComponent() {
    const [value, setValue] = useState(!!document.fullscreenElement );
    function handleClick() {
        if (value) {
            setValue(!value);
            return document.exitFullscreen();   
        }
        setValue(!value);
        return document.documentElement.requestFullscreen();
    }
    return <Fab 
        onClick={handleClick}
        color={value ? 'primary' : 'default'}
    >
        {!value ? <Fullscreen /> : <FullscreenExit />}
    </Fab>;
}
