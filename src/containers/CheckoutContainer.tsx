import Checkout, { StateProps } from "../components/Checkout";
import { ApplicationState } from "../redux/state";
import { connect, ConnectedProps } from "react-redux";
import { setCartProductQuantity } from "../redux/actions";

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {items: {}};

  Object.entries(state.cart).forEach(([id, item]) => {
    res.items[id] = Object.assign({}, state.products[id], {cart: item});
  });

  return res;
}

const mapDispatchToProps = {
  setCartProductQuantity
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedCheckout = connector(Checkout);

export default ConnectedCheckout;
