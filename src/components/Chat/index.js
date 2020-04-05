import React, { Fragment, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import VideoCall from '@material-ui/icons/VideoCall';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

import Video from './Video';
import startStream from './startStream';

const useStyles = makeStyles({
    local: {
        zIndex: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '30%',
        height: '30%',
    },
    remote: {
        zIndex: 0,
        width: '100%',
        height: '100%',
    },
    videoContainer: {
        position: 'relative',
        overflowY: 'hidden',
    }
});

export default function Chat({ targetPeerId, peerId }) {
    const [chatOn, setChatOn] = useState(false);
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const classes = useStyles();
    useEffect(() => {
        if (!chatOn) return;
        async function setStream() {
            const stream = await startStream(peerId, targetPeerId, setRemoteStream);
           setLocalStream(stream);
        }
        setStream();
    }, [chatOn, peerId, targetPeerId, setRemoteStream]);
    function startChat() {
        setChatOn(true);
    }
    function stopChat() {
        setChatOn(false);
    }
    
    return <Fragment>
        <Fab aria-label="peripheralController" 
            onClick={startChat}
            color={chatOn ? 'primary' : 'default'}
        >
            <VideoCall />
        </Fab>
        <Dialog 
            open={chatOn} 
            onClose={() => {}} 
            fullScreen
        >
            <DialogContent className={classes.videoContainer}>
                <Video className={classes.local} stream={localStream} muted={true} />
                <Video className={classes.remote} stream={remoteStream} muted={false} />
            </DialogContent>
            <DialogActions>
                <Button onClick={stopChat} color="secondary">
                    Hangup 
                </Button>
            </DialogActions>
      </Dialog>
    </Fragment>;
}