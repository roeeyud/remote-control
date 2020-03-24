import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import Home from './containers/Home'
import Page from './containers/Page'

export default function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" exact component={Page} />
        <Route path="/page" component={Home} />
      </div>
    </Router>
  );
}
