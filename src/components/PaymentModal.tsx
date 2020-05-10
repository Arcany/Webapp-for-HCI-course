import React from 'react';
import { BaseProduct } from '../redux/state';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ModalProps = {
	onClose: Function;
	show: boolean;
}

class PaymentModal extends React.Component<ModalProps, {}> {
  render () {
    const handleClose = (value: boolean) => {
      this.props.onClose(value);
    };

    return (
      <Modal show={this.props.show} onHide={handleClose} animation={false}>
        <Modal.Body>Your order has been accepted. You will be notified when the courier is on their way!  Press "Yes" to be redirected to the home page.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(true)}>
						Yes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default PaymentModal;