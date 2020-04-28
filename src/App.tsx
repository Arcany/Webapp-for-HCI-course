import React from 'react';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom';
import ShopView from './containers/ShopViewContainer';
import Checkout from './containers/CheckoutContainer';

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
