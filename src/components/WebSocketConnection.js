import React, { useContext, useState, Fragment, useEffect } from 'react';

import Fab from '@material-ui/core/Fab';
import Wifi from '@material-ui/icons/Wifi';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import WebSocketConnectionDialog from './WebSocketConnectionDialog';
import { Context as ControllerContext } from '../context/Controller';

export default function WebsocketConnection() {
    const { websocketConnected, password, websocket } = useContext(ControllerContext);
    const [open, setOpen] = useState(false);
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
        <WebSocketConnectionDialog open={open || !password || !websocket} onClose={handleClose}/>
    </Fragment>
}
