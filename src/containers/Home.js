import React from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HighlightIcon from '@material-ui/icons/Highlight';
import { makeStyles } from '@material-ui/core/styles';

import { Provider as ControllerProvider } from '../context/Controller';
import Nipple from '../components/Nipple';
import WebSocketConnection from '../components/WebSocketConnection';
import GamepadController from '../components/GamepadController';
import LinearController from '../components/LinearController';
import Fullscreen from '../components/Fullscreen';
import ToggleButton from '../components/ToggleButton';
import Chat from '../components/Chat';

const useStyles = makeStyles({
  stream: {
    // padding: 0,
    // display: 'block',
    // margin: '0 auto',
    // maxHeight: '100%',
    // maxWidth: '100%',
  },
  root: {
    textAlign: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#222',
    margin: '0 auto',
    backgroundSize: 'contain',
    backgroundImage: `url(http://${window.location.hostname}:1181/stream)`,
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: 'center',
    backgroundPositionY: 'center',
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
  },
  nippleContainer: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    opacity: 0.5,
  },
  linearContainer: {
    position: 'absolute',
    bottom: 20,
    left: 50,
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ControllerProvider>
        <div className={classes.buttonsContainer}>
          <div className={classes.buttons}>
            <Fullscreen />
            <WebSocketConnection />
            <GamepadController />
            <Chat />
          </div>
          <div className={classes.buttons}>
            <ToggleButton name="siren" >
              <NotificationsIcon />
            </ToggleButton>
            <ToggleButton name="light" >
              <HighlightIcon />
            </ToggleButton>
          </div>
        </div>
        <div className={classes.nippleContainer}>
          <Nipple />
        </div>
        <div className={classes.linearContainer}>
          <LinearController />
        </div>
      </ControllerProvider>
    </div>
  );
}
