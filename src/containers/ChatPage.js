import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Chat from '../components/Chat';
import Fullscreen from '../components/Fullscreen';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    backgroundImage: 'url(/chat-screen-back.jpeg)',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
  },
});
export default function Home() {
  const classes = useStyles();

  return <div className={classes.root}>
      <Fullscreen />
      <Chat peerId={'robot-call-on-robot'} />
  </div>;
}
