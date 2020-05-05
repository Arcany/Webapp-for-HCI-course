import React from 'react';
import { Link } from 'react-router-dom';
import { ReduxProps } from '../containers/PaymentContainer';

class Payment extends React.Component<ReduxProps, {}> {
  render() {
    return (
      <div>
        <Link to="/shipping">Back</Link>
        <Link to="#">Confirm</Link>
      </div>
    );
  }
}

export default Payment;
