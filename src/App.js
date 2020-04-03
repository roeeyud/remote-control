import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './containers/Home'
import ChatPage from './containers/ChatPage'
import Page from './containers/Page'

export default function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/page" exact component={Page} />
      <Route path="/chat" component={ChatPage} />
    </Router>
  );
}
