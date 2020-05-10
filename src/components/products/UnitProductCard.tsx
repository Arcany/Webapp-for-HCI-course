import React from 'react';
import { Product, ProductUnit } from '../../redux/state';
import Card from 'react-bootstrap/Card';
import { mdiCartMinus, mdiCartPlus, mdiHeart } from '@mdi/js';
import { setCartProductQuantity, toggleProductFavorite } from '../../redux/actions';
import Icon from '@mdi/react';
import FormControl from 'react-bootstrap/FormControl';
import Price from './Price';
import PriceWide from './PriceWide';

interface Props {
  product: ProductUnit;
  productId: string;
  setCartProductQuantity: setCartProductQuantity;
  toggleProductFavorite: toggleProductFavorite;
}

export default class UnitProductCard extends React.Component<Props, {}> {
  render() {
    const product = this.props.product;

    return (
      <Card className="productCard">
        {product.imgPath &&
          <Card.Img variant="top" src={`/products/${product.imgPath}`} />
        }
        <Card.Body className="productBody">
          <Card.Title className="productName">{product.name}</Card.Title>
          <div className="productSubtitleRow">
            <span className="productUnitWeight">{product.unitMass} {product.massLabel ?? 'kg'}</span>
            <span className="productOrigin">{product.origin}</span>
          </div>
          <div className="productFooter">
            <div className="productPriceCol">
              <span className="productSubPrice">{(product.unitPrice / product.unitMass).toFixed(2)}€/{product.massLabel ?? 'kg'}</span>
              <Price price={product.unitPrice} label="/pcs" />
            </div>

            <div className="productActionsCol">
              {product.cartAmount !== undefined && product.cartAmount > 0 &&
                <PriceWide price={product.unitPrice * (product.cartAmount ?? 0)}
                    label={`${((product.cartAmount ?? 0) * product.unitMass).toFixed(2)} ${product.massLabel ?? 'kg'}`}
                    size={14}/>
              }

              <div className="productActions">
                <button className="cartButton" onClick={() => this.props.toggleProductFavorite(this.props.productId)}>
                  <Icon path={mdiHeart} size={1.2} className={`favIcon ${product.isFavorite ? 'active' : ''}`} />
                </button>
                <button className="cartButton" onClick={() => this.props.setCartProductQuantity(this.props.productId, (product.cartAmount ?? 0) - 1)}>
                  <Icon path={mdiCartMinus} size={1.2} />
                </button>
                <FormControl className="cartAmount" size="sm" value={product.cartAmount ?? 0}
                  onChange={(e) => this.props.setCartProductQuantity(this.props.productId, (parseInt(e.target.value) || 0))} />
                <button className="cartButton" onClick={() => this.props.setCartProductQuantity(this.props.productId, (product.cartAmount ?? 0) + 1)}>
                  <Icon path={mdiCartPlus} size={1.2} />
                </button>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }
}