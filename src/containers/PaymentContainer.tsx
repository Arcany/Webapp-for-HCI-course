import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ApplicationState } from '../redux/state';
import { clearShoppingCart, editPaymentInformation, addToastWithId, setProductRemovalUndoButtonProduct } from '../redux/actions';
import Payment, { StateProps } from '../components/Payment';


function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    paymentInformation: state.paymentInformation,
    shippingInformation: state.shippingInformation,
    cartHasContents: Object.values(state.products).find((p) => p.cartAmount && p.cartAmount > 0) !== undefined
  };

  return res;
}

const mapDispathToProps = {
  clearShoppingCart,
  editPaymentInformation,
  addToastWithId,
  setProductRemovalUndoButtonProduct
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedPayment = withRouter(connector(Payment));

export default ConnectedPayment;
