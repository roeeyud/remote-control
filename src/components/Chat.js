import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import VideoCall from '@material-ui/icons/VideoCall';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    videoContainer: {
        position: 'relative',
        overflowY: 'hidden',
    }
});

export default function Chat() {
    const [chatOn, setChatOn] = useState(false);
    const classes = useStyles();
    
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
                
            </DialogContent>
            <DialogActions>
                <Button onClick={stopChat} color="secondary">
                    Hangup 
                </Button>
            </DialogActions>
      </Dialog>
    </Fragment>;
}