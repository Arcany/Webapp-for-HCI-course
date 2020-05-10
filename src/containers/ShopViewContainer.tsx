import ShopView, { StateProps } from '../components/ShopView';
import { ApplicationState } from '../redux/state';
import { setCartProductQuantity, toggleProductFavorite, addOriginFilter, RemoveOriginFilter } from '../redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    products: state.products,
    categories: state.categories,
    originFilters: state.originFilters,
    origins: new Set<string>(Object.entries(state.products).filter(([id, product]) => product.origin)
      .map(([id, product]) => product.origin ?? ''))
  };

  return res;
}

const mapDispatchToProps = {
  setCartProductQuantity,
  toggleProductFavorite,
  addOriginFilter,
  RemoveOriginFilter
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShopView = withRouter(connector(ShopView));

export default ConnectedShopView;
