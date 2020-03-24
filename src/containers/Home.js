import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import WifiIcon from '@material-ui/icons/Wifi';
import GamesIcon from '@material-ui/icons/Games';
import NotificationsIcon from '@material-ui/icons/Notifications';
import HighlightIcon from '@material-ui/icons/Highlight';
import { makeStyles } from '@material-ui/core/styles';

import Nipple from '../components/Nipple';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    width: '100%',
    height: '100%',
    maxWidth: '640px',
    maxHeight: '360px',
    background: '#222',
    margin: '0 auto',
    top: '50%',
    transform: 'translateY(-50%)'
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '30%',
    padding: '0 5%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '20%'
  },
  controllers: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  nipple: {
    // position: 'absolute',
    // top: '50%',
    // right: 0,
    // transform: 'translateY(-50%)'
  }
});

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.buttonsContainer}>
        <div className={classes.buttons}>
          <IconButton color="secondary">
            <WifiIcon />
          </IconButton>
          <IconButton color="secondary">
            <GamesIcon />
          </IconButton>
        </div>
        <div className={classes.buttons}>
          <IconButton color="secondary">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="secondary">
            <HighlightIcon />
          </IconButton>
        </div>
      </div>
      <div className={classes.controllers}>
        <div className={classes.nipple}><Nipple /></div>
        <div className={classes.nipple}><Nipple /></div>
      </div>
    </div>
  );
}
