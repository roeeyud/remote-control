import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Camera from '../components/Camera'

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%'
  }
});

export default function Page() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Camera />
    </div>
  );
}
