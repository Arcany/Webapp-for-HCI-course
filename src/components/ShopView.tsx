import React from "react";
import { Product } from "../redux/state";
import { ReduxProps } from "../containers/ShopViewContainer";

export interface StateProps {
  products: {[productId: string]: Product};
}

class ShopView extends React.Component<ReduxProps, {}> {
  render() {
    const products = Object.entries(this.props.products).map(([id, product]) =>
      <li key={id}>
        {product.name} - {product.price}€
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
