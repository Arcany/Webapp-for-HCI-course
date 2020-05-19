import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import Shipping, { StateProps } from '../components/Shipping';
import { ApplicationState } from '../redux/state';
import { editShippingInformation } from '../redux/actions';

function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    shippingInformation: state.shippingInformation,
  };
  return res;
}

const mapDispathToProps = {
  editShippingInformation
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShipping = withRouter(connector(Shipping));

export default ConnectedShipping;
