import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import { Context as ControllerContext } from '../context/Controller';

const margin = 23;
const useStyles = makeStyles({
    root: {
        textAlign: 'center'
    },
    leftButton: {
        marginRight: margin,
    },
    rightButton: {
        marginLeft: margin,
    },
  });

export default function TouchpadController() {
    const classes = useStyles();
    const { onControllerChange } = useContext(ControllerContext);

    return <div className={classes.root}>
        <div>
            <Fab 
                onMouseDown={() => onControllerChange({ touchY: 1 })}
                onMouseUp={() => onControllerChange({ y: 0 })} 
            >
                <KeyboardArrowUp />
            </Fab>
        </div>
        <div>
            <Fab 
                className={classes.leftButton}
                onMouseDown={() => onControllerChange({ x: -1 })}
                onMouseUp={() => onControllerChange({ x: 0 })} 
            >
                <KeyboardArrowLeft />
            </Fab>
            <Fab 
                className={classes.rightButton}
                onMouseDown={() => onControllerChange({ touchX: 1 })}
                onMouseUp={() => onControllerChange({ touchX: 0 })} 
            >
                <KeyboardArrowRight />
            </Fab>
        </div>
        <div>
            <Fab
                onMouseDown={() => onControllerChange({ y: -1 })}
                onMouseUp={() => onControllerChange({ y: 0 })} 
            >
                <KeyboardArrowDown />
            </Fab>
        </div>       
    </div>;
}
