import React, { useState } from 'react';
import ReactNipple from 'react-nipple';
import DebugView from "react-nipple/lib/DebugView";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
    },
    nipple: {
        width: '100%',
        height: '100%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
    },
    debug: {
        position: 'absolute',
        top: '0',
        left: '0',
        color: '#fff'
    }
});

export default function Nipple() {
    const classes = useStyles();
    const [data, setData] = useState(undefined);

    const onMove = (evt, data) =>{
        console.log(evt, data)
        setData(data);
    }

    return (
        <div className={classes.root}>
            <ReactNipple
                className={classes.nipple}
                options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
                onMove={onMove}
            />
            <div className={classes.debug}><DebugView data={data} /></div>

        </div>
    );
}
