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

        const double = data.angle.degree > 180 ? -1 : 1;
        const y = (((data.angle.degree - (Math.floor(data.angle.degree / 90) * 90)) * 100 / 90) / 100) * double;

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