import React, { useContext } from 'react';
import ReactNipple from 'react-nipple';
import { makeStyles } from '@material-ui/core/styles';
import { Context as ControllerContext } from '../context/Controller';

const useStyles = makeStyles({
    nipple: {
        width: '150px',
        height: '150px',
        position: 'relative',
    }
});

export default function Nipple() {
    const classes = useStyles();
    const { onControllerChange, gamepadConnected } = useContext(ControllerContext);

    if (gamepadConnected) {
        return null;
    }
    
    function setValue(values) {
        onControllerChange(values);
    }
    const onMove = (evt, data) => {
        const force = Math.min(data.force, 1);
        const degree = data.angle.degree;
        if(degree <= 45) {
            setValue({ x: force, y: force * (degree/45) });
        } else if (degree <= 90) {
            const ratio = 1 - ((degree - 45) / 45);
            setValue({ x: force * ratio, y: force });
        } else if (degree <= 135) {
            const ratio = (degree - 90) / 45 * force * -1;
            setValue({ x: force * ratio, y: force });
        } else if (degree <= 180) {
            const ratio = 1 - ((degree - 135) / 45 * force);
            setValue({ x: force * -1, y: force * ratio });
        } else if (degree <= 225) {
            const ratio = ((degree - 180) / 45 * force) * -1;
            setValue({ x: force * -1, y: force * ratio });
        } else if (degree <= 270) {
            const ratio = (1 - ((degree - 225) / 45 * force)) * -1;
            setValue({ x: force * ratio, y: force * -1 });
        } else if (degree <= 315) {
            const ratio = ((degree - 270) / 45 * force);
            setValue({ x: force * ratio, y: force * -1 });
        }  else {
            const ratio = (1 - ((degree - 315) / 45 * force)) * -1;
            setValue({ x: force, y: force * ratio });
        }
        
    }

    function onEnd() {
        setValue({ x: 0, y: 0 })
    }

    return (
        <div>
            <ReactNipple
                className={classes.nipple}
                options={{ mode: 'static', position: { top: '50%', left: '50%' }, size: 150 }}
                onMove={onMove}
                onEnd={onEnd}
            />
        </div>
    );
}