import React, { useContext } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Context as ControllerContext } from '../context/Controller';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        position: 'absolute'
    },
    frontVideo: {
        backgroundSize: 'contain',
        backgroundImage: `url(http://${window.location.hostname}:1181/stream)`,
        // backgroundImage: `url(https://i.redd.it/0x8zopjxrcry.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        flex: 1,
        height: '100%',
    },
    backVideo: {
        width: '25%',
        height: '100%',
        backgroundSize: 'contain',
        backgroundImage: `url(http://${window.location.hostname}:1182/stream)`,
        // backgroundImage: `url(https://www.superkit.co.il/wp-content/uploads/2020/03/20_20-19-600x600.jpg)`,
        backgroundRepeat: 'no-repeat',
        backgroundPositionX: 'center',
        backgroundPositionY: 'bottom'
    }
});

export default function VideoStreams() {
    const classes = useStyles();
    const { reversing } = useContext(ControllerContext);

    return <div className={classes.root}>
        <div className={classes.backVideo} />
        <div className={classes.frontVideo} />
    </div>;
}