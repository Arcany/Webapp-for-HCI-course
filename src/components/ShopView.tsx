import React from 'react';
import { ProductMap, CategoryMap, PriceType } from '../redux/state';
import { ReduxProps } from '../containers/ShopViewContainer';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import FormControl from 'react-bootstrap/FormControl';

import styles from './ShopView.module.scss';
import Icon from '@mdi/react';
import { mdiChevronUp, mdiChevronDown, mdiCartPlus, mdiCartMinus, mdiHeart } from '@mdi/js';
import { RouteComponentProps, NavLink } from 'react-router-dom';

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

    const productCards = Object.entries(this.props.products).map(([id, product]) => {
      let priceComponent;
      switch(product.priceType) {
        case PriceType.PER_KILO:
          priceComponent = (<div className={styles.productPrice}>
            <span className={styles.productPriceNr}>{product.priceKg}</span>
            <span className={styles.productPriceLabel}>€/kg</span>
          </div>);
          break;
        case PriceType.PER_UNIT:
          priceComponent = (
            <Card.Text className={styles.productPrice}>{product.price}€</Card.Text>
          );
          break;
        case PriceType.PER_LITRE:
          priceComponent = (<div className={styles.productPrice}>
            <span className={styles.productPriceNr}>{product.priceL}</span>
            <span className={styles.productPriceLabel}>€/L</span>
          </div>);
          break;
      }

      return (
        <Card key={id} className={styles.productCard}>
          {product.imgPath &&
            <Card.Img variant="top" src={`/products/${product.imgPath}`} />
          }
          <Card.Body className={styles.productBody}>
            <Card.Title className={styles.productTitle}>{product.name}</Card.Title>

            <div className={styles.productFooter}>
              {priceComponent}
              <button className="cartButton" onClick={() => this.props.toggleProductFavorite(id)}>
                <Icon className={`favIcon ${product.isFavorite ? 'active' : ''}`} path={mdiHeart} size={1.2} />
              </button>
              <button className="cartButton" onClick={() => this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) - 1)}>
                <Icon path={mdiCartMinus} size={1.2} />
              </button>
              <FormControl className={styles.cartAmount} size="sm" value={product.cartAmount ?? 0}
                onChange={(e) => this.props.setCartProductQuantity(id, (parseInt(e.target.value) || 0))} />
              <button className="cartButton" onClick={() => this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) + 1)}>
                <Icon path={mdiCartPlus} size={1.2} />
              </button>
            </div>
          </Card.Body>
        </Card>
      );
    }

    );

    return (
      <div className={styles.container}>
        <div className={styles.sidebar}>
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
