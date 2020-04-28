import React from "react";
import { ProductMap, CategoryMap } from "../redux/state";
import { ReduxProps } from "../containers/ShopViewContainer";
import Button from "react-bootstrap/Button";

import styles from './ShopView.module.scss';
import Icon from "@mdi/react";
import { mdiChevronUp, mdiChevronDown } from "@mdi/js";
import { RouteComponentProps, NavLink } from "react-router-dom";

export interface StateProps {
  products: ProductMap;
  categories: CategoryMap
}

interface RouteProps {
  primaryCategory?: string;
  subCategory?: string;
}

class ShopView extends React.Component<ReduxProps & RouteComponentProps<RouteProps>, {}> {
  render() {
    const products = Object.entries(this.props.products).map(([id, product]) =>
      <li key={id}>
        {product.name} - {product.price}€
        <Button onClick={() => this.props.setCartProductQuantity(id, (product.cart?.quantity ?? 0) - 1)}>-</Button>
        {product.cart?.quantity ?? 0}
        <Button onClick={() => this.props.setCartProductQuantity(id, (product.cart?.quantity ?? 0) + 1)}>+</Button>
      </li>
    );

    const sidebarItems = Object.entries(this.props.categories).map(([name, category]) => {
      const isActive = name === this.props.match.params.primaryCategory;
      const activeSub = this.props.match.params.subCategory;
      const hasSubs = !!category.subCategories;

      return (
        <div className={`${styles.primaryCategory} ${hasSubs ? '' : styles.noSubcategories}`} key={name}>
          <NavLink to={`/${name}`} className={styles.header} activeClassName={styles.activeHeader}>
            <span>{name}</span>
            {hasSubs && (
              isActive ? <Icon path={mdiChevronDown} size={1} /> : <Icon path={mdiChevronUp} size={1} />)}
          </NavLink>
          {isActive &&
            <div className={styles.subCatList}>
              {category.subCategories?.map((sub) =>
                <NavLink to={`/${name}/${sub}`} activeClassName={styles.activeSub} key={sub}>
                  {sub}
                </NavLink>
              )}
            </div>
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
