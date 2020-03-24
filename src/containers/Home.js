import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HighlightIcon from '@material-ui/icons/Highlight';
import { makeStyles } from '@material-ui/core/styles';

import { Provider as ControllerProvider } from '../context/Controller';
import Nipple from '../components/Nipple';
import WebSocketConnection from '../components/WebSocketConnection';
import GamepadController from '../components/GamepadController';
import ToggleButton from '../components/ToggleButton';

const useStyles = makeStyles({
  stream: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
  root: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    background: '#222',
    margin: '0 auto',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '70px',
    padding: '0 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '30%',
    maxWidth: '120px'
  },
  controllers: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    minHeight: '200px',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 50,
  },
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img className={classes.stream} src="/stream.jpg" alt="stream" />
      <ControllerProvider>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <WebSocketConnection />
            <GamepadController />
          </div>
          <div className={classes.buttons}>
            <ToggleButton name="siran" >
              <NotificationsIcon />
            </ToggleButton>
            <ToggleButton name="light" >
              <HighlightIcon />
            </ToggleButton>
          </div>
        </div>
        <div className={classes.controllers}>
          <Nipple />
        </div>
      </ControllerProvider>
    </div>
  );
}
