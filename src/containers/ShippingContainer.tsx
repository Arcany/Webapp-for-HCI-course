import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import Shipping from '../components/Shipping';
import { ApplicationState } from '../redux/state';


function mapStateToProps(state: ApplicationState): {} {
  // TODO
  return {};
}

const mapDispathToProps = {
  // TODO
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedShipping = withRouter(connector(Shipping));

export default ConnectedShipping;
