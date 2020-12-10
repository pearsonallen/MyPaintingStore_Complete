import React from "react";
import './style.scss';
import Orders from './Orders';
import Store from "./Paintings";
import Distance from "./Distance";
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <div className="navbar">
          <div>
            <Link to="/">Paintings</Link>
            <Link to="/orders">Orders</Link>
          </div>
          <Distance />
        </div>
        <Switch>
          <Route path="/orders">
            <Orders />
          </Route>
          <Route path="/">
            <Store />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
