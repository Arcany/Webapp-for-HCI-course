import React from "react";
import { Product } from "../redux/state";
import { ReduxProps } from "../containers/ShopViewContainer";
import Button from "react-bootstrap/Button";

import styles from './ShopView.module.scss';
import Icon from "@mdi/react";
import { mdiChevronUp, mdiFormatSuperscript, mdiChevronDown } from "@mdi/js";

export interface StateProps {
  products: {[productId: string]: Product};
}

interface Category {
  subCategories: string[] | null;
}

const categories: {[catName: string]: Category} = {
  'Fruits and vegetables': {
    subCategories: ['Fruits', 'Vegetables']
  },
  'Milk': {
    subCategories: ['Drinking milk', 'Yogurt', 'Cheese']
  },
  'Bread': {
    subCategories: ['White bread', 'Normal Bread']
  },
  'Meat': {
    subCategories: ['Processed', 'Raw']
  },
  'Grains': {
    subCategories: null
  }
}

interface State {
  primaryCategory: string|null;
  subCategory: string|null;
}

class ShopView extends React.Component<ReduxProps, State> {
  constructor(props: ReduxProps) {
    super(props);
    this.state = {
      primaryCategory: null,
      subCategory: null
    };
  }

  render() {
    const products = Object.entries(this.props.products).map(([id, product]) =>
      <li key={id}>
        {product.name} - {product.price}€
        <Button onClick={() => this.props.setCartProductQuantity(id, (product.cart?.quantity ?? 0) - 1)}>-</Button>
        {product.cart?.quantity ?? 0}
        <Button onClick={() => this.props.setCartProductQuantity(id, (product.cart?.quantity ?? 0) + 1)}>+</Button>
      </li>
    );

    const sidebarItems = Object.entries(categories).map(([name, category]) => {
      const isActive = name === this.state.primaryCategory;
      const hasSubs = !!category.subCategories;

      return (
        <div className={`${styles.primaryCategory} ${hasSubs ? '' : styles.noSubcategories}`}>
          <div className={`${styles.header} ${isActive ? styles.activeHeader : ''}`}
              onClick={() => this.setState({primaryCategory: name})}>
            <span>{name}</span>
            {hasSubs && (
              isActive ? <Icon path={mdiChevronDown} size={1} /> : <Icon path={mdiChevronUp} size={1} />)}
          </div>
          {this.state.primaryCategory === name &&
            <ul>
              {category.subCategories?.map((sub) =>
                <li onClick={() => this.setState({subCategory: sub})} className={this.state.subCategory === sub ? styles.activeSub : ''}>
                  {sub}
                </li>
              )}
            </ul>
          }
        </div>
      );
    });

    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          {sidebarItems}
        </div>
        <div className={styles.productArea}>
          {/* {products} */}
          Container
        </div>
      </div>
    );
  }
}

export default ShopView;
