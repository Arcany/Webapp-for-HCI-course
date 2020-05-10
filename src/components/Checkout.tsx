import React from 'react';
import { ProductMap, Product } from '../redux/state';
import { ReduxProps } from '../containers/CheckoutContainer';
import styles from './Checkout.module.scss';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Icon from '@mdi/react';
import ListGroup from 'react-bootstrap/ListGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { mdiCartPlus, mdiCartMinus } from '@mdi/js';
import CheckoutModal from './CheckoutModal';
import { cartItemPrice, getTotalPriceOfOrder } from '../util/price';

export interface StateProps {
  products: ProductMap;
}

type CheckoutState = {
  showModal: boolean;
}

class Checkout extends React.Component<ReduxProps, CheckoutState> {
  constructor(p: ReduxProps) {
    super(p);
    this.state = {
      showModal: false
    };
  }
  render() {
    const cartIsEmpty = Object.entries(this.props.products).length === 0;

    const onModalClose = (isRemovingItem: boolean, id: string) => {
      if (isRemovingItem) {
        this.props.setCartProductQuantity(id, 0);
      }
      this.setState({showModal: false});
    };

    const interceptAmountDecrease = (id: string, product: Product ) => {
      if (product.cartAmount === 1) {
        this.setState({showModal: true});
      } else {
        this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) - 1);
      }
    };

    const interceptManualAmountDecrease = (id: string, amount: number) => {
      if (amount < 1 || !amount) {
        this.setState({showModal: true});
      } else {
        this.props.setCartProductQuantity(id, amount);
      }
    };

    const cartItem = (product: Product, id: string) => {
      return (
        <div>
          <CheckoutModal productProp={product} onClose={(response: any) => onModalClose(response, id)} show={this.state.showModal}/>
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.productInformation}>
            <span className={styles.productItemButtons}>
              <button className="cartButton" onClick={() => interceptAmountDecrease(id, product)}>
                <Icon path={mdiCartMinus} size={1.2} />
              </button>
              <FormControl className={styles.cartAmount} size="sm" value={product.cartAmount ?? 0}
                onChange={(e) => interceptManualAmountDecrease(id, (parseInt(e.target.value) || 0))} />
              <button className="cartButton" onClick={() => this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) + 1)}>
                <Icon path={mdiCartPlus} size={1.2} />
              </button>
            </span>
            <span className={styles.totalPrice}>Total price: {cartItemPrice(product)}€</span>
          </span>
        </div>
      );
    };

    const makeCartList = Object.entries(this.props.products).map(([id, product]) =>
      <ListGroup.Item key={id} className={styles.productItem}>
        {cartItem(product, id)}
      </ListGroup.Item>
    );

    const cartItems = () => {
      if (cartIsEmpty) {
        return <b className={styles.emptyCart}>Your cart is empty!</b>;
      }
      return (
        <>{makeCartList}</>
      );
    };

    const mainCheckoutCard = (
      <Card className={styles.mainCard}>
        <Card.Body>
          <ListGroup>
            {cartItems()}
          </ListGroup>
        </Card.Body>
      </Card>
    );

    const aboveCard = (
      <ListGroup className={styles.aboveCard}>
        <ListGroup.Item>
          Total price of your order: {getTotalPriceOfOrder(this.props.products)}€
        </ListGroup.Item>
      </ListGroup>
    );

    const underCard = (
      <div className={styles.underCard}>
        <div>
          <Link to="/shipping">
            <Button disabled={cartIsEmpty ? true : false} className="primaryButton">
              Check out
            </Button>
          </Link>
        </div>
        <div>
          <Link to="/">
            <Button className="primaryButton">
              Back to shopping
            </Button>
          </Link>
        </div>
      </div>
    );

    return (
      <div className={styles.checkout}>
        {aboveCard}
        {mainCheckoutCard}
        {underCard}
      </div>
    );
  }
}

export default Checkout;
