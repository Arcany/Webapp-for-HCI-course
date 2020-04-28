import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import ShopView from './components/ShopView';
import Checkout from './components/Checkout';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">
                Main View
              </Link>
            </li>
            <li>
              <Link to="/checkout">
                Checkout
              </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/">
            <ShopView />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default App;
