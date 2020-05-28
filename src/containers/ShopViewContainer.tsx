import ShopView, { StateProps } from '../components/ShopView';
import { ApplicationState } from '../redux/state';
import { setCartProductQuantity, toggleProductFavorite, addOriginFilter, removeOriginFilter, setFavoriteFilter, clearFilters, setSearchFilter } from '../redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import { withRouter } from 'react-router-dom';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    products: {},
    categories: state.categories,
    originFilters: state.originFilters,
    origins: new Set<string>(Object.entries(state.products).filter(([id, product]) => product.origin)
      .map(([id, product]) => product.origin ?? '')),
    favoriteFilter: state.favoriteFilter,
    searchFilter: state.searchFilter
  };
  if (state.searchFilter && state.searchFilter.replace(/\s/g, '').length > 0) {
    res.products = Object.fromEntries(Object.entries(state.products).filter(([id, product]) => {
      return product.name.toLowerCase().includes(state.searchFilter.toLowerCase());
    }));
  } else {
    res.products = state.products;
  }
  if (state.favoriteFilter) {
    res.products = Object.fromEntries(Object.entries(res.products).filter(([id, product]) => {
      return !!product.isFavorite;
    }));
  }

  return res;
}

const mapDispatchToProps = {
  setCartProductQuantity,
  toggleProductFavorite,
  addOriginFilter,
  removeOriginFilter,
  setFavoriteFilter,
  clearFilters,
  setSearchFilter
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShopView = withRouter(connector(ShopView));

export default ConnectedShopView;
