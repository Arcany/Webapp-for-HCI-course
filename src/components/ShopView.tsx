import React from 'react';
import { ProductMap, CategoryMap, ProductType } from '../redux/state';
import { ReduxProps } from '../containers/ShopViewContainer';

import styles from './ShopView.module.scss';
import Icon from '@mdi/react';
import { mdiChevronUp, mdiChevronDown, mdiClose } from '@mdi/js';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import UnitProductCard from './products/UnitProductCard';
import MassProductCard from './products/MassProductCard';
import { Alert, Button } from 'react-bootstrap';
import FilterDropdown from './elements/FilterDropdown';

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

class ShopView extends React.PureComponent<ReduxProps & RouteComponentProps<RouteProps>, {}> {
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

          <div className={styles.filters}>
            <h5>Filters:</h5>
            <div className={styles.filterContainer}>
              <FilterDropdown id="filter-origin" items={Array.from(this.props.origins)} selectedItems={this.props.originFilters}
                onItemSelect={(item: string, checked: boolean) => {
                  if (checked) {
                    this.props.addOriginFilter(item);
                  } else {
                    this.props.removeOriginFilter(item);
                  }
                }} />
            </div>
          </div>

          <Button variant="secondary" size="sm" onClick={() => this.props.clearFilters()}>
            <Icon path={mdiClose} size={0.65} />
            Clear filters
          </Button>

          <div className={styles.productArea}>
            {productCards.length > 0 ? productCards : noProductsFound}
          </div>
        </div>
      </div>
    );
  }
}

export default ShopView;
