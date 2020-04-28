import React from "react";
import { Product } from "../redux/state";
import { ReduxProps } from "../containers/ShopViewContainer";
import Button from "react-bootstrap/Button";

export interface StateProps {
  products: {[productId: string]: Product};
}

class ShopView extends React.Component<ReduxProps, {}> {
  render() {
    const products = Object.entries(this.props.products).map(([id, product]) =>
      <li key={id}>
        {product.name} - {product.price}€
        <Button onClick={() => this.props.setCartProductQuantity(id, (product.cart?.quantity ?? 0) - 1)}>-</Button>
        {product.cart?.quantity}
        <Button onClick={() => this.props.setCartProductQuantity(id, (product.cart?.quantity ?? 0) + 1)}>+</Button>
      </li>
    );

    return (
      <div className="shopview">
        {products}
      </div>
    );
  }
}

export default ShopView;
