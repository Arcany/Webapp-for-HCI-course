import React, { ChangeEvent } from 'react';
import { ProductMap, CategoryMap, ProductType } from '../redux/state';
import { ReduxProps } from '../containers/ShopViewContainer';

import styles from './ShopView.module.scss';
import Icon from '@mdi/react';
import { mdiChevronUp, mdiChevronDown } from '@mdi/js';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import UnitProductCard from './products/UnitProductCard';
import MassProductCard from './products/MassProductCard';
import { Form, Alert } from 'react-bootstrap';

export interface StateProps {
  products: ProductMap;
  categories: CategoryMap;
  originFilters: string[];
  origins: Set<string>;
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

    const noProductsFound = (
      <Alert variant="warning">
        No products found with currently applied filters
      </Alert>
    );

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
    }).filter(([id, product]) => {
      if (this.props.originFilters.length === 0) {
        return true;
      }
      if (!product.origin) {
        return false;
      }
      if (this.props.originFilters.includes(product.origin)) {
        return true;
      }
      return false;
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
        <div className={styles.primaryContainer}>
          <div className={styles.filterContainer}>
            <span className={styles.tempHeader}>Origin:</span>
            <div className={styles.toggleList}>
              {Array.from(this.props.origins).map(origin => (
                <Form.Group controlId={origin} className={styles.formGroup} key={origin}>
                  <Form.Check label={origin} type="checkbox" checked={this.props.originFilters.includes(origin)}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      if (e.target.checked) {
                        this.props.addOriginFilter(origin);
                      } else {
                        this.props.RemoveOriginFilter(origin);
                      }
                    }}
                  />
                </Form.Group>
              ))}
            </div>
          </div>

          <div className={styles.productArea}>
            {productCards.length > 0 ? productCards : noProductsFound}
          </div>
        </div>
      </div>
    );
  }
}

export default ShopView;
