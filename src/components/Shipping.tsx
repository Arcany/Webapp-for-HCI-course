import React from 'react';
import { Link } from 'react-router-dom';
import { ReduxProps } from '../containers/ShippingContainer';

class Shipping extends React.Component<ReduxProps, {}> {
  render() {
    return (
      <div>
        <Link to="/checkout">Back</Link>
        <Link to="/payment">Payment</Link>
      </div>
    );
  }
}

export default Shipping;
