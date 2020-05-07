import React from 'react';
import {ReduxProps} from '../containers/PaymentContainer';
import {Button, Col, Form, Row} from "react-bootstrap";


class Payment extends React.Component<ReduxProps, {}> {
    render() {
        return (
            <div>
                <h1>Payment information:</h1>

                <Form className="text-center">
                    <Form.Group controlId="formNumber">
                        <Form.Label>CARD NUMBER</Form.Label>
                        <Col md={{span: 4, offset: 4}}> <Form.Control type="digits" placeholder="1111 2222 3333 9999"/></Col>
                    </Form.Group>


                    <Form.Group controlId="formName">
                        <Form.Label>CARDHOLDERS NAME</Form.Label>
                        <Col sm={5} md={{span: 4, offset: 4}}> <Form.Control type="name" placeholder="Alex Bee"/></Col>
                    </Form.Group>
                    <div id="keskele">
                        <Row>
                            <div id="ex">
                                <Form.Group controlId="formDate">
                                    <Form.Label>EXPIRATION DATE</Form.Label>
                                    <Col><Form.Control type="text" placeholder="12/20"/></Col>
                                </Form.Group>
                            </div>
                            <div id="cvv">
                                <Form.Group controlId="formCVV">
                                    <Form.Label>CVV</Form.Label>
                                    <Col><Form.Control type="text" placeholder="000"/></Col>
                                </Form.Group>
                            </div>
                        </Row>
                    </div>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I agree with the terms and conditions"/>
                    </Form.Group>
                    <Form.Text className="text-muted">
                        We'll never share your personal information with anyone else.
                    </Form.Text>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" href="/shipping">
                                BACK
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                CONFIRM
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default Payment;
