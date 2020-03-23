import React, { useContext, useEffect, useState, Fragment } from 'react';

import Fab from '@material-ui/core/Fab';
import Wifi from '@material-ui/icons/Wifi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Context as ControllerContext } from '../context/Controller';

export default function WebsocketConnection() {
    const { websocketConnected, setWebsocketUrl, websocketUrl } = useContext(ControllerContext);
    const [url, setUrl] = useState(websocketUrl);
    const [open, setOpen] = useState(false);
    function handleSubmit() {
        setWebsocketUrl(url);
        setOpen(false);
    }
    function handleClose() {
        setOpen(false);
    }
    function handleOpen() {
        setOpen(true);
    }
    return <Fragment>
        <Fab aria-label="peripheralController" 
            onClick={handleOpen}
            color={websocketConnected ? 'primary' : 'default'}
        >
            <Wifi />
        </Fab>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
            <DialogContent>
            <DialogContentText>
                Enter websocket URL
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
                Submit
            </Button>
            </DialogActions>
      </Dialog>
    </Fragment>
}
