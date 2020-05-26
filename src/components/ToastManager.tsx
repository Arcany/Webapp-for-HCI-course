import React from 'react';
import styles from './ToastManager.module.scss';
import Toast from 'react-bootstrap/Toast';
import { ToastData } from '../redux/state';
import { ReduxProps } from '../containers/ToastManagerContainer';

export interface StateProps {
  toasts: ToastData[];
}

export default class ToastManager extends React.PureComponent<ReduxProps, {}> {
  render() {
    return (
      <div className={styles.toastContainer}>
        {this.props.toasts.map((toast) => (
          <Toast key={toast.id} autohide={!!toast.delay} delay={toast.delay} onClose={() => this.props.removeToast(toast.id)}>
            <Toast.Header>
              <strong className="mr-auto">{toast.title}</strong>
            </Toast.Header>
            <Toast.Body>
              {toast.body}
            </Toast.Body>
          </Toast>
        ))}
      </div>
    );
  }
}