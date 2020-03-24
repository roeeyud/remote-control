import React, { useState } from 'react';
import ReactNipple from 'react-nipple';
import DebugView from "react-nipple/lib/DebugView";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    nipple: {
        width: '150px',
        height: '150px',
        position: 'relative',
    }
});

export default function Nipple() {
    const classes = useStyles();
    const [data, setData] = useState(undefined);

    const onMove = (evt, data) => {
        let y;
        if (data.angle.degree < 90){
            y = (data.angle.degree * 100 / 90)/100;
        } else if (data.angle.degree < 180){
            y = ((data.angle.degree-90) * 100 / 90)/100;
        } else if (data.angle.degree < 270){
            y = ((data.angle.degree-180) * 100 / 90)/100 * -1;
        } else if (data.angle.degree < 360){
            y = ((data.angle.degree-270) * 100 / 90)/100 * -1;
        }
        console.log(data.angle.degree, y)
        setData(data);
    }

    return (
        <div>
            <ReactNipple
                className={classes.nipple}
                options={{ mode: 'static', position: { top: '50%', left: '50%' } }}
                onMove={onMove}
            />
        </div>
    );
}