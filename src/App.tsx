import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import ShopView from './containers/ShopViewContainer';
import Checkout from './containers/CheckoutContainer';
import Shipping from './containers/ShippingContainer';
import Payment from './containers/PaymentContainer';
import Topbar from './containers/TopbarContainer';
import ToastManager from './containers/ToastManagerContainer';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Topbar />

        <Switch>
          <Route path="/checkout">
            <Checkout />
          </Route>
          <Route path="/shipping">
            <Shipping />
          </Route>
          <Route path="/payment">
            <Payment />
          </Route>
          <Route path={['/:primaryCategory/:subCategory', '/:primaryCategory', '/']}>
            <ShopView />
          </Route>
          <Route>
            Unknown route.
          </Route>
        </Switch>
        <ToastManager />
      </div>
    );
  }
}

export default App;
