import React, { useContext, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Context as ControllerContext } from '../context/Controller';

export default function WebsocketConnectionDialog({ open, onClose }) {
    const { setWebsocket, password, setPassword, error } = useContext(ControllerContext);
    const [inputPassword, setInputPassword] = useState(password);

    function handleConnect() {
        setWebsocket();
        setPassword(inputPassword);
        onClose();
    }
    function handleClose() {
        onClose();
    }
    return <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Connect to robot</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {error}
            </DialogContentText>
            <TextField
                autoFocus
                label={'Enter Password'}
                value={inputPassword}
                onChange={(event) => setInputPassword(event.target.value)}
                fullWidth
                type="password"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleConnect} color="primary">
                Connect
            </Button>
        </DialogActions>
    </Dialog>;
}
