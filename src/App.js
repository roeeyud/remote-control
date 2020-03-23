import React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Home from './containers/Home'
import Page from './containers/Page'
import GamepadComponent from './components/GamepadComponent';
import { Provider as ControllerProvider } from './context/Controller';

export default function App() {
  return (
    <Router>
      <ControllerProvider>
        <div className="container">
          <GamepadComponent />
          <Route path="/" exact component={Home} />
          <Route path="/page" component={Page} />
        </div>
      </ControllerProvider>
  </Router>
  );
}
