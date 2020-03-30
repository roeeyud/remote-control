import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib(`https://source.zoom.us/1.7.2/lib`, `/av`);
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

const API_KEY = 'VjQsEcJuSr-aEb3QeRdSmQ';
const API_SECRET = '8AIyrTWTExrbYvOD1gcLiWoYDfwn5JFpWOYr';

const config = {
  apiKey: API_KEY,
  apiSecret: API_SECRET,
  leaveUrl: 'https://zoom.us',
  role: 0
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'relative'
  },
  form: {
    background: '#fff',
    '& > *': {
      width: '25ch',
    }
  }
});

export default function Page() {
  const [meetingNumber, setMeetingNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const doZoom = () => {
    const meetConfig = {
      ...config,
      meetingNumber: parseInt(meetingNumber, 10),
      username,
      passWord: password
    }

    ZoomMtg.generateSignature({
      meetingNumber: meetConfig.meetingNumber,
      apiKey: meetConfig.apiKey,
      apiSecret: meetConfig.apiSecret,
      role: meetConfig.role,
      success(res) {
        console.log('signature', res.result);
        ZoomMtg.init({
          leaveUrl: 'http://www.zoom.us',
          success() {
            ZoomMtg.join(
              {
                meetingNumber: meetConfig.meetingNumber,
                userName: meetConfig.userName,
                signature: res.result,
                apiKey: meetConfig.apiKey,
                userEmail: 'lior@gmail.com',
                passWord: meetConfig.passWord,
                success() {
                  console.log('join meeting success');
                },
                error(res) {
                  console.log(res);
                }
              }
            );
          },
          error(res) {
            console.log(res);
          }
        });
      }
    });
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <TextField label="Meeting Number" color="secondary" variant="outlined" value={meetingNumber} onChange={(e) => setMeetingNumber(e.target.value)} />
        <TextField label="username" color="secondary" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="password" color="secondary" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button color="primary" variant="contained" onClick={doZoom}>Zoom</Button>
      </form>
    </div>
  );
}
