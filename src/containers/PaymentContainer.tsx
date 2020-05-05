import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ApplicationState } from '../redux/state';
import Payment from '../components/Payment';


function mapStateToProps(state: ApplicationState): {} {
  // TODO
  return {};
}

const mapDispathToProps = {
  // TODO
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedPayment = withRouter(connector(Payment));

export default ConnectedPayment;
