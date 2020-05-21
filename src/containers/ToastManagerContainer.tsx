import { withRouter } from 'react-router-dom';
import { ConnectedProps, connect } from 'react-redux';
import { ApplicationState } from '../redux/state';
import { removeToast } from '../redux/actions';
import ToastManager, { StateProps } from '../components/ToastManager';


function mapStateToProps(state: ApplicationState): StateProps {
  const res: StateProps = {
    toasts: Object.values(state.toasts)
  };

  return res;
}

const mapDispathToProps = {
  removeToast
};

const connector = connect(mapStateToProps, mapDispathToProps);

export type ReduxProps = ConnectedProps<typeof connector>;

const ConnectedToastManager = withRouter(connector(ToastManager));

export default ConnectedToastManager;
