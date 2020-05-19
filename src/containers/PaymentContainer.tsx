import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ApplicationState } from '../redux/state';
import { clearShoppingCart, editPaymentInformation } from '../redux/actions';
import Payment, { StateProps } from '../components/Payment';


function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    paymentInformation: state.paymentInformation,
    shippingInformation: state.shippingInformation
  };
  return res;
}

const mapDispathToProps = {
  clearShoppingCart,
  editPaymentInformation
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedPayment = withRouter(connector(Payment));

export default ConnectedPayment;
