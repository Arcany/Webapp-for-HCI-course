import React from 'react';
import { ProductMap, Product, BaseProduct } from '../redux/state';
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
import FormSteps from './FormSteps';

export interface StateProps {
  products: ProductMap;
  showUndoButton: boolean;
}

type CheckoutState = {
  showModal: boolean;
  removableItem: BaseProduct | null;
  removableProductId: string | null;
}

class Checkout extends React.Component<ReduxProps, CheckoutState> {
  constructor(p: ReduxProps) {
    super(p);
    this.state = {
      showModal: false,
      removableItem: null,
      removableProductId: null
    };
  }
  render() {
    const cartIsEmpty = Object.entries(this.props.products).length === 0;

    const onModalClose = (isRemovingItem: boolean, id: string) => {
      if (isRemovingItem) {
        this.props.setProductRemovalUndoButtonProduct(id);
        this.props.setCartProductQuantity(id, 0);
      }
      this.setState({showModal: false});
    };

    const interceptAmountDecrease = (id: string, product: Product ) => {
      if (product.cartAmount === 1) {
        this.setState({showModal: true, removableItem: product, removableProductId: id});
      } else {
        this.props.setCartProductQuantity(id, (product.cartAmount ?? 0) - 1);
      }
    };

    const interceptManualAmountDecrease = (id: string, amount: number, product: Product) => {
      if (amount < 1 || !amount) {
        this.setState({showModal: true, removableItem: product, removableProductId: id});
      } else {
        this.props.setCartProductQuantity(id, amount);
      }
    };

    const interceptUndoingLastCartRemoval = () => {
      this.props.undoLastCartRemoval();
      this.props.setProductRemovalUndoButtonProduct(null);
    };

    const cartItem = (product: Product, id: string) => {
      return (
        <div>
          <span className={styles.productName}>{product.name}</span>
          <span className={styles.productInformation}>
            <span className={styles.productItemButtons}>
              <button className="cartButton" onClick={() => interceptAmountDecrease(id, product)}>
                <Icon path={mdiCartMinus} size={1.2} />
              </button>
              <FormControl className={styles.cartAmount} size="sm" value={product.cartAmount ?? 0}
                onChange={(e) => interceptManualAmountDecrease(id, (parseInt(e.target.value) || 0), product)} />
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

    const cartUndoButton = () => {
      if (!this.props.showUndoButton) {
        return <></>;
      } 
      return (
        <Card.Footer className={styles.cardFooter}>
          <Button className={styles.undoButton + ' primaryButton'} onClick={() => interceptUndoingLastCartRemoval()}>UNDO last removal</Button>
        </Card.Footer>
      );
    };

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
            <CheckoutModal productProp={this.state.removableItem} onClose={(response: any) => onModalClose(response, this.state.removableProductId ?? '')} show={this.state.showModal}/>

          </ListGroup>
        </Card.Body>
        {cartUndoButton()}
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
        <Link to="/">
          <Button className="primaryButton">
              Back to Shopping
          </Button>
        </Link>
        <Link to="/shipping">
          <Button disabled={cartIsEmpty ? true : false} className="primaryButton">
              Proceed with Checkout
          </Button>
        </Link>
      </div>
    );

    return (
      <div className="flex-col">
        <FormSteps stepIndex={0} />
        <div className={styles.checkout}>
          {aboveCard}
          {mainCheckoutCard}
          {underCard}
        </div>
      </div>
    );
  }
}

export default Checkout;
