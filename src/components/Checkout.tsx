import React from 'react';
import { Product } from '../redux/state';
import { ReduxProps } from '../containers/CheckoutContainer';
import styles from './Checkout.module.scss';

export interface StateProps {
  products: {[productId: string]: Product};
}

class Checkout extends React.Component<ReduxProps, {}> {
  render() {
    const cartItems = Object.entries(this.props.products).map(([id, product]) =>
      <li key={id}>
        {product.name} - {product.price}€
        <button onClick={() => this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) - 1)}>-</button>
        {product.cartAmount ?? 0}
        <button onClick={() => this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) + 1)}>+</button>
      </li>
    );

    return (
      <div className={styles.checkout}>
        <ul>
          {cartItems}
        </ul>
      </div>
    )
  }
}

export default Checkout;
