import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import VideoCall from '@material-ui/icons/VideoCall';
import CallEnd from '@material-ui/icons/CallEnd';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Video from './Video';
import useStreams from '../../hooks/useStreams';

const useStyles = makeStyles({
    local: {
        zIndex: 1,
        position: "absolute",
        bottom: 0,
        left: 0,
        width: '25%',
    },
    remote: {
        zIndex: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'url(/chat-screen-back.jpeg)',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
    videoContainer: {
        padding: 0,
        position: 'relative',
        overflowY: 'hidden',
    },
    toolbar: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    content: {
        padding: 0,
    },
});

function closeStream(stream) {
    stream.getTracks().forEach(function(track) {
        track.stop();
    });
}

export default function Chat({ targetPeerId, peerId }) {
    const classes = useStyles();
    const [chatOn, setChatOn] = useState(false);
    const {
        peer,
        localStream,
        remoteStream,
        setLocalStream,
        setRemoteStream,
    } = useStreams(targetPeerId, peerId, chatOn, setChatOn);
    function startChat() {
        document.documentElement.requestFullscreen();
        setChatOn(true);
    }
    function stopChat() {
        setChatOn(false);
        if (localStream) closeStream(localStream);
        if (remoteStream) closeStream(remoteStream);
        setLocalStream(null);
        setRemoteStream(null);
        if (peer) peer.destroy();
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
            hideBackdrop
            
        >
            <DialogContent  className={classes.videoContainer}>
                <Video className={classes.local} stream={localStream} muted={true} />
                <Video className={classes.remote} stream={remoteStream} muted={false} />
            </DialogContent>
            <DialogActions className={classes.toolbar}>
                <Fab onClick={stopChat} color="secondary">
                    <CallEnd/> 
                </Fab>
            </DialogActions>
      </Dialog>
    </Fragment>;
}