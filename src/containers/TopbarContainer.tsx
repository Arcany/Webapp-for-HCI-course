import Topbar, { StateProps } from '../components/Topbar';
import { ApplicationState } from '../redux/state';
import { productPrice } from '../util/price';
import { withRouter } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = { cartPrice: '', cartItemCount: 0 };
  let price = 0;

  Object.entries(state.products).forEach(([id, product]) => {
    price += productPrice(product);
    res.cartItemCount += (product.cartAmount ?? 0);
  });

  res.cartPrice = price.toFixed(2);
  return res;
}

const connector = connect(mapStateToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedTopbar = withRouter(connector(Topbar));

export default ConnectedTopbar;
