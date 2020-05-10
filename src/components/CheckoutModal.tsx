import React from 'react';
import { BaseProduct } from '../redux/state';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type ModalProps = {
	productProp: BaseProduct;
	onClose: Function;
	show: boolean;
}

class CheckoutModal extends React.Component<ModalProps, {}> {
	render () {
		const handleClose = (value: boolean) => {
			this.props.onClose(value);
		};

		return (
			<Modal show={this.props.show} onHide={handleClose} animation={false}>
				<Modal.Body>Are you sure that you want to remove all of "{this.props.productProp.name}?"</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => handleClose(true)}>
						Yes
					</Button>
					<Button variant="primary" onClick={() => handleClose(false)}>
						No
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default CheckoutModal;