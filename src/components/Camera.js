import React, { useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        flexDirection: 'column'
    },
    video: {
        width: '100%',
        height: '50%'
    },
    canvasContainer: {
        width: '100%',
        height: '50%',
        position: 'relative'
    },
    canvas: {
        width: '100%',
        height: '100%'
    },
    button: {
        position: 'absolute'
    }
});

export default function Camera() {
    const classes = useStyles();
    const $video = useRef(null);
    const $canvas = useRef(null);

    const snap = (e) => {
        const context = $canvas.current.getContext('2d');
        context.drawImage($video.current, 0, 0, 640, 480);
    }

    useEffect(() => {
        // Get access to the camera!
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices.getUserMedia({ video: true }).then(function (stream) {
                //video.src = window.URL.createObjectURL(stream);
                $video.current.srcObject = stream;
                $video.current.play();
            });
        }
    }, []);

    return (
        <div className={classes.root}>
            <video className={classes.video} ref={$video} autoplay></video>
            <div className={classes.canvasContainer}>
                <Button className={classes.button} color="primary" variant="contained" onClick={snap}>Snap Photo</Button>
                <canvas className={classes.canvas} ref={$canvas}></canvas>
            </div>
        </div>
    );
}
