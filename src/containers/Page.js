import React from 'react';
import Nipple from '../components/Nipple';
import { makeStyles } from '@material-ui/core/styles';

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
      <Nipple />
    </div>
  );
}
