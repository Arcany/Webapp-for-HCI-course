import ShopView, { StateProps } from '../components/ShopView';
import { ApplicationState } from '../redux/state';
import { setCartProductQuantity } from '../redux/actions';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    products: state.products
  };
  return res;
}

const mapDispatchToProps = {
  setCartProductQuantity
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShopView = connector(ShopView);

export default ConnectedShopView;
