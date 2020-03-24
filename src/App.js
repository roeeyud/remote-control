import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Home from './containers/Home'
import Page from './containers/Page'

export default function App() {
  useEffect(() => {
    Notification.requestPermission();
  }, []);

  function randomNotification() {
    var randomItem = Math.floor(Math.random());
    var notifTitle = 'Test';
    var notifBody = 'Created by Lior';
    var notifImg = 'https://jpg2pdf.com/images/jpg2pdf/icon.png';
    var options = {
      body: notifBody,
      icon: notifImg
    }
    var notif = new Notification(notifTitle, options);
  }

  const onClick = () => {
    randomNotification();
  }

  return (
    <Router>
      <button onClick={onClick}>Notification</button>
      <div className="container">
        <Route path="/" exact component={Page} />
        <Route path="/page" component={Home} />
      </div>
    </Router>
  );
}
