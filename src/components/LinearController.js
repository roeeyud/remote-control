import React, { useContext, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import { Context as ControllerContext } from '../context/Controller';

const size = 50;
const CustomSlider = withStyles({
    root: {
        color: '#FFF',
        opacity: 0.2,
        width: '25vw',
        height: 50,
    },
    thumb: {
        top: 0,
        height: size,
        width: size/ 2,
        borderRadius: 5,
        margin: 0,
        marginLeft: -1 * size / 4,
    },
    track: {
        display: 'none',
    },
    rail: {
        top: 0,
        height: size,
        borderRadius: 4,
    },
})(Slider);
export default function LinearController() {
    const [value, setValue] = useState(0);
    const { onControllerChange, gamepadConnected } = useContext(ControllerContext);

    if (gamepadConnected) {
        return null;
    }
    
    function onChangeValue(newValue) {
        console.log(newValue);
        setValue(newValue);
        onControllerChange({ yaw: newValue });
    }
    function onChange(evt, data) {
        onChangeValue(data);
    }
    function onChangeCommitted() {
        onChangeValue(0);
    }

    return (<CustomSlider 
        min={-1} 
        max={1} 
        value={value} 
        onChange={onChange} 
        step={0.00000001} 
        onChangeCommitted={onChangeCommitted}
    />);
}