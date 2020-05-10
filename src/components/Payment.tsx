import React from 'react';
import {ReduxProps} from '../containers/PaymentContainer';
import {Button, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class Payment extends React.Component<ReduxProps, {}> {
    render() {
        return (
            <div>
                <h1>Payment information:</h1>
                <div id="andmed">
                    <Form>
                        <Form.Group controlId="formGridPaymentType">
                            <Form.Label>Payment type</Form.Label>
                            <Form.Control as="select" custom>
                                <option>Credit Card</option>
                                <option disabled>Bank Transfer -> Not available yet</option>
                                <option disabled> Cash On Pickup -> Not available yet</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCardType">
                                <Form.Label>Card type</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>Visa</option>
                                    <option>MasterCard</option>
                                    <option> Maestro</option>
                                    <option> American Express</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridExprDate">
                                <Form.Label>Expiration Date </Form.Label>
                                <Form.Control type="text" placeholder="12/20"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCardNR">
                                <Form.Label>Card Number</Form.Label>
                                <Form.Control type="text" placeholder="1111 2222 3333 9999"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridCVV">
                                <Form.Label>CVV </Form.Label>
                                <Form.Control type="password" placeholder="367"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Use delivery address as card holder address"/>
                        </Form.Group>
                        <Form.Text className="text-muted">
                            We'll never share your personal information with anyone else.
                        </Form.Text>
                        <div id="nupud">
                            <Link to="/shipping">
                                <Button className="primaryButton">
                                    BACK TO DELIVERY
                                </Button>
                            </Link>
                            <Link to="/payment">
                                <Button className="primaryButton">
                                    SUBMIT PAYMENT
                                </Button>
                            </Link>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }

}

export default Payment;
