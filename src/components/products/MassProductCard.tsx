import { ProductMass } from '../../redux/state';
import { setCartProductQuantity, toggleProductFavorite } from '../../redux/actions';
import { mdiCartMinus, mdiCartPlus, mdiHeart } from '@mdi/js';
import Card from 'react-bootstrap/Card';
import React from 'react';
import Price from './Price';
import PriceWide from './PriceWide';
import Icon from '@mdi/react';
import FormControl from 'react-bootstrap/FormControl';

interface Props {
  product: ProductMass;
  productId: string;
  setCartProductQuantity: setCartProductQuantity;
  toggleProductFavorite: toggleProductFavorite;
}

export default class MassProductCard extends React.Component<Props, {}> {
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
            <span className="productUnitWeight">{product.massIncrement} {product.massLabel ?? 'kg'}</span>
            <span className="productOrigin">{product.origin}</span>
          </div>

          <div className="productFooter">
            <div className="productPriceCol">
              <Price price={product.massPrice} label={`/${product.massLabel ?? 'kg'}`}/>
            </div>

            <div className="productActionsCol">
              {product.cartAmount !== undefined && product.cartAmount > 0 &&
                <PriceWide price={product.massPrice * product.massIncrement * (product.cartAmount ?? 0)}
                  label={`${(product.massIncrement * (product.cartAmount ?? 0)).toFixed(2)} ${product.massLabel ?? 'kg'}`} />
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
                kg
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