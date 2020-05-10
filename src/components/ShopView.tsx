import React from 'react';
import { ProductMap, CategoryMap, ProductType } from '../redux/state';
import { ReduxProps } from '../containers/ShopViewContainer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';

import styles from './ShopView.module.scss';
import Icon from '@mdi/react';
import { mdiChevronUp, mdiChevronDown, mdiCartPlus, mdiCartMinus, mdiHeart } from '@mdi/js';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import UnitProductCard from './products/UnitProductCard';
import MassProductCard from './products/MassProductCard';

export interface StateProps {
  products: ProductMap;
  categories: CategoryMap;
}

interface RouteProps {
  primaryCategory?: string;
  subCategory?: string;
}

class ShopView extends React.Component<ReduxProps & RouteComponentProps<RouteProps>, {}> {
  render() {
    const sidebarItems = Object.entries(this.props.categories).map(([name, category]) => {
      const isActive = name === this.props.match.params.primaryCategory;
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

    const productCards = Object.entries(this.props.products).filter(([id, product]) => {
      const primary = this.props.match.params.primaryCategory;
      const sub = this.props.match.params.subCategory;
      if (sub) {
        if (product.categories.find(v => v.primary === primary && v.sub === sub)) {
          return true;
        } else {
          return false;
        }
      } else if (primary && !product.categories.find(v => v.primary === primary)) {
        return false;
      }
      return true;
    }).map(([id, product]) => {
      switch (product.type) {
      case ProductType.UNIT:
        return <UnitProductCard product={product} productId={id} toggleProductFavorite={this.props.toggleProductFavorite}
          setCartProductQuantity={this.props.setCartProductQuantity} key={id} />;
      case ProductType.MASS:
        return <MassProductCard product={product} productId={id} toggleProductFavorite={this.props.toggleProductFavorite}
          setCartProductQuantity={this.props.setCartProductQuantity} key={id} />;
      }
      return null;
    });

    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={`${styles.primaryCategory} ${styles.noSubcategories}`}>
            <NavLink exact={true} to="/" className={styles.header} activeClassName={styles.activeHeader}>
              <span>All Categories</span>
            </NavLink>
          </div>
          {sidebarItems}
        </div>
        <div className={styles.productArea}>
          {productCards}
        </div>
      </div>
    );
  }
}

export default ShopView;
