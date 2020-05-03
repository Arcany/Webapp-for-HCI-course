import Checkout, { StateProps } from "../components/Checkout";
import { ApplicationState } from "../redux/state";
import { connect, ConnectedProps } from "react-redux";
import { setCartProductQuantity } from "../redux/actions";
import { withRouter } from "react-router-dom";

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {products: {}};

  Object.entries(state.products).forEach(([id, item]) => {
    if ((item.cartAmount ?? 0) > 0) {
      res.products[id] = item
    }
  });

  return res;
}

const mapDispatchToProps = {
  setCartProductQuantity
}

const connector = connect(mapStateToProps, mapDispatchToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedCheckout = withRouter(connector(Checkout));

export default ConnectedCheckout;
