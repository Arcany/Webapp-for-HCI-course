import ShopView, { StateProps } from '../components/ShopView';
import { ApplicationState } from '../redux/state';
import { setCartProductQuantity, toggleProductFavorite } from '../redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    products: state.products,
    categories: state.categories
  };
  return res;
}

const mapDispatchToProps = {
  setCartProductQuantity,
  toggleProductFavorite
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShopView = withRouter(connector(ShopView));

export default ConnectedShopView;
