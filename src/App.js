import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect, Link } from "react-router-dom";
import appRoutes from "./shared/appRoutes";
import './App.css';

import Home from './containers/home/home.js';
import Explore from './containers/explore/explore.js';
import Place from './containers/place/place.js';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="header">
          <nav>
            <ul>

                <li>
                    <Link to={appRoutes.explore} exact>Explore Places</Link>
                </li>
                <li>
                    <Link to={appRoutes.home} exact>Home</Link>
                </li>
            </ul>
          </nav>
          <div className="childPage">
            <Switch>
              <Route exact path={appRoutes.home}>
                <Home />
              </Route>
              <Route exact path={appRoutes.explore}>
                <Explore />
              </Route>
              <Route exact path={appRoutes.place}>
                <Place />
              </Route>
              <Redirect to={appRoutes.home} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
