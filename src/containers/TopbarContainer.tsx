import Topbar, { StateProps } from '../components/Topbar';
import { ApplicationState } from '../redux/state';
import { setSearchFilter } from '../redux/actions';
import { productPrice } from '../util/price';
import { withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = { cartPrice: '', cartItemCount: 0, products: {}, searchFilter: state.searchFilter };
  let price = 0;

  Object.entries(state.products).forEach(([id, item]) => {
    if ((item.cartAmount ?? 0) > 0) {
      res.products[id] = item;
      price += productPrice(item);
      res.cartItemCount += (item.cartAmount ?? 0);
    }
  });

  res.cartPrice = price.toFixed(2);
  return res;
}

const mapDispatchToProps = {
  setSearchFilter
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedTopbar = withRouter(connector(Topbar));

export default ConnectedTopbar;
