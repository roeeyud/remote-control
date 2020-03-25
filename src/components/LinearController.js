import React, { useContext } from 'react';
import ReactNipple from 'react-nipple';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import { Context as ControllerContext } from '../context/Controller';


const useStyles = makeStyles({
    root: {
        width: 300,
    }
});

const CustomSlider = withStyles({}, Slider)
export default function LinearController() {
    const classes = useStyles();
    const { onControllerChange, gamepadConnected } = useContext(ControllerContext);

    if (gamepadConnected) {
        return null;
    }
    
    function setValue(values) {
    
    }
    const onMove = (evt, data) => {
    
    }

    function onEnd() {
        setValue({ x: 0, y: 0 })
    }

    return (
        <Slider className={classes.root} />
    );
}