import React, { useContext, useState, Fragment } from 'react';

import Fab from '@material-ui/core/Fab';
import Wifi from '@material-ui/icons/Wifi';

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
