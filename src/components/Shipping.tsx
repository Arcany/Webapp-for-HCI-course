import React from 'react';
import {ReduxProps} from '../containers/ShippingContainer';
import {Button, Col, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Shipping extends React.Component<ReduxProps, {}> {
    render() {
        return (<div>
                <h1>Shipping information</h1>
                <div id="andmed">
                    <Form>
                        <Form.Group controlId="formGridCounty">
                            <Form.Label>Delivery method</Form.Label>
                            <Form.Control as="select" custom>
                                <option>Scheduled delivery</option>
                                <option disabled>Parcel locker -> Not available yet</option>
                                <option disabled> Pickup at the store -> Not available yet</option>
                            </Form.Control>

                        </Form.Group>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFname">
                                <Form.Label>FIRST NAME</Form.Label>
                                <Form.Control type="text" placeholder="John"/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLname">
                                <Form.Label>LAST NAME</Form.Label>
                                <Form.Control type="text" placeholder="Bee"/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control placeholder="1234 Main St"/>
                        </Form.Group>

                        <Form.Group controlId="formGridAddress2">

                            <Form.Control placeholder="Apartment, studio, or floor"/>
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                            <Form.Group controlId="formGridCounty">
                                <Form.Label>County</Form.Label>
                                <Form.Control as="select" custom>
                                    <option>Choose...</option>
                                    <option>Harju County</option>
                                    <option>Tartu County</option>
                                    <option>Ida-Viru County</option>
                                    <option>Pärnu County</option>
                                    <option>Lääme-Viru County</option>
                                    <option>Viljandi County</option>
                                    <option>Rapla County</option>
                                    <option>Võru County</option>
                                    <option>SaareCounty</option>
                                    <option>Jõgeva County</option>
                                    <option>Järva County</option>
                                    <option>Valga County</option>
                                    <option>Põlva County</option>
                                    <option>Lääne County</option>
                                    <option>Hiiu County</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Phone number</Form.Label>
                            <Form.Control placeholder="+372 5584930"/>
                        </Form.Group>
                        <Form.Group controlId="formGridAddress1">
                            <Form.Label>Notes to driver</Form.Label>
                            <Form.Control as="textarea" placeholder="Hi! ...."/>
                        </Form.Group>
                        <div id="nupud2">
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Link to="/checkout">
                                        <Button className="primaryButton">
                                            BACK TO CHECKOUT
                                        </Button>
                                    </Link>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Link to="/payment">
                                        <Button className="primaryButton">
                                            SUBMIT SHIPPING
                                        </Button>
                                    </Link>
                                </Form.Group>
                            </Form.Row>
                        </div>
                    </Form>
                </div>
            </div>
        );
    }
}

export default Shipping;
