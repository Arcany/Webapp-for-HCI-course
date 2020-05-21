import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import Shipping, { StateProps } from '../components/Shipping';
import { ApplicationState } from '../redux/state';
import { editShippingInformation, addToastWithId } from '../redux/actions';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    shippingInformation: state.shippingInformation,
    cartHasContents: Object.values(state.products).find((p) => p.cartAmount && p.cartAmount > 0) !== undefined
  };
  return res;
}

const mapDispathToProps = {
  editShippingInformation,
  addToastWithId
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShipping = withRouter(connector(Shipping));

export default ConnectedShipping;
