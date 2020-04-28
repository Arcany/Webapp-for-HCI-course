import React from 'react';
import { Product, ShoppingCartItem } from '../redux/state';
import { ReduxProps } from '../containers/CheckoutContainer';

interface CartProduct extends Product {
  cart: ShoppingCartItem
}

export interface StateProps {
  items: {[productId: string]: CartProduct};
}

class Checkout extends React.Component<ReduxProps, {}> {
  render() {
    const cartItems = Object.entries(this.props.items).map(([id, product]) =>
      <li key={id}>
        {product.name} - {product.price}€
      </li>
    );

    return (
      <div className="checkout">
        <ul>
          {cartItems}
        </ul>
      </div>
    )
  }
}

export default Checkout;
