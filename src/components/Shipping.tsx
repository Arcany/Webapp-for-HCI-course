import React from 'react';
import {ReduxProps} from '../containers/ShippingContainer';
import {Button, Col, Form} from 'react-bootstrap';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';

class Shipping extends React.Component<ReduxProps & RouteComponentProps, {}> {
    render() {

        const schema = yup.object().shape({
            'Delivery method': yup.string().required(),
            'First Name': yup.string().required(),
            'Last Name': yup.string().required(),
            'Address': yup.string().required(),
            'Specifics about address': yup.string(),
            'City': yup.string().required(),
            'County': yup.string().required(),
            'Zip code': yup.number().required()
                .typeError('Zip code must be a number')
                .min(10000, 'Zip code must be 5 numbers long')
                .max(99999, 'Zip code must be 5 numbers long'),
            'Phone Number': yup.string().required(),
            'Notes to Driver': yup.string(),    
        });

        const countyOptions = [
            {id: 1, name: 'Harju County', available: true}, 
            {id: 2, name: 'Tartu County', available: true}, 
            {id: 3, name: 'Ida-Viru County', available: true},
            {id: 4, name: 'Lääne-Viru County', available: true},
            {id: 5, name: 'Pärnu County', available: true},
            {id: 6, name: 'Viljandi County', available: true},
            {id: 7, name: 'Rapla County', available: true},
            {id: 8, name: 'Võru County', available: true},
            {id: 9, name: 'Saare County', available: true},
            {id: 10, name: 'Jõgeva County', available: true},
            {id: 11, name: 'Valga County', available: true},
            {id: 12, name: 'Põlva County', available: true},
            {id: 13, name: 'Lääne County', available: true},
            {id: 14, name: 'Hiiu County', available: true},
            {id: 15, name: 'Järva County', available: true}
        ];

        const deliveryMethods = [
            {id: 1, name: 'Scheduled delivery', available: true}, 
            {id: 2, name: 'Parcel locker -> Not available yet', available: false}, 
            {id: 3, name: 'Pickup at the store -> Not available yet', available: false}
        ];

        const handleCustomSubmit = async (event: any) => {
            // Redirect to some page with form values
            console.log(event);
            this.props.history.push('/payment');
        };

        return (
            <div>
                <h1>Shipping information</h1>
                <div id="andmed">
                <Formik
                    validationSchema={schema}
                    onSubmit={handleCustomSubmit}
                    initialValues={{
                        'Delivery method': 'Scheduled delivery',
                        'First Name': '',
                        'Last Name': '',
                        'Address': '',
                        'Specifics about address': '',
                        'City': '',
                        'County': 'Tartu County',
                        'Zip code': '',
                        'Phone Number': '',
                        'Notes to Driver': ''
                    }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isInvalid,
                        errors
                    }: any) => (
                        <Form noValidate onSubmit={handleSubmit}>
                            <Form.Row>
                                <Form.Group as={Col} controlId="Delivery method">
                                    <Form.Label>Card type</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        custom
                                        value={values['Delivery method']}
                                        onChange={handleChange}
                                    >
                                        {deliveryMethods.map(method => (
                                            <option 
                                                key={method.id} 
                                                value={method.name}
                                                disabled={method.available ? false : true}
                                            >
                                                {method.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="First Name">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="First Name"
                                        placeholder="John"
                                        value={values['First Name']}
                                        onChange={handleChange}
                                        isInvalid={touched['First Name'] && errors['First Name']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['First Name']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="Last Name">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Last Name"
                                        placeholder="Doe"
                                        value={values['Last Name']}
                                        onChange={handleChange}
                                        isInvalid={touched['Last Name'] && errors['Last Name']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['Last Name']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Row>
                                <Form.Group as={Col} controlId="Address">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Address"
                                        placeholder="1234 Main St"
                                        value={values['Address']}
                                        onChange={handleChange}
                                        isInvalid={touched['Address'] && errors['Address']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['Address']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="Specifics about address">
                                    <Form.Label>Specifics about address</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Specifics about address"
                                        placeholder="Apratment, studio, floor, etc"
                                        value={values['Specifics about address']}
                                        onChange={handleChange}
                                        isInvalid={touched['Specifics about address'] && errors['Specifics about address']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['Specifics about address']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="City">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="City"
                                        placeholder="City"
                                        value={values['City']}
                                        onChange={handleChange}
                                        isInvalid={touched['City'] && errors['City']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['City']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="County">
                                    <Form.Label>Card type</Form.Label>
                                    <Form.Control 
                                        as="select" 
                                        custom
                                        value={values['County']}
                                        onChange={handleChange}
                                    >
                                        {countyOptions.map(method => (
                                            <option 
                                                key={method.id} 
                                                value={method.name}
                                                disabled={method.available ? false : true}
                                            >
                                                {method.name}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} controlId="Zip code">
                                    <Form.Label>Zip code</Form.Label>
                                    <Form.Control 
                                        type="number" 
                                        name="Zip code"
                                        placeholder="Zip code"
                                        value={values['Zip code']}
                                        onChange={handleChange}
                                        isInvalid={touched['Zip code'] && errors['Zip code']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['Zip code']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                                
                            <Form.Row>
                                <Form.Group as={Col} controlId="Phone Number">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Phone Number"
                                        placeholder="Phone Number"
                                        value={values['Phone Number']}
                                        onChange={handleChange}
                                        isInvalid={touched['Phone Number'] && errors['Phone Number']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['Phone Number']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <Form.Row>
                                <Form.Group as={Col} controlId="Notes to Driver">
                                    <Form.Label>Notes to Driver</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        name="Notes to Driver"
                                        placeholder="Notes to Driver"
                                        value={values['Notes to Driver']}
                                        onChange={handleChange}
                                        isInvalid={touched['Notes to Driver'] && errors['Notes to Driver']}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors['Notes to Driver']}
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>

                            <div id="nupud2">
                                <Link to="/checkout">
                                    <Button className="primaryButton">
                                        BACK TO CHECKOUT
                                    </Button>
                                </Link>
                                
                                <Button type="submit" className="primaryButton">
                                    SUBMIT SHIPPING
                                </Button>
                                
                            </div>
                        </Form>
                    )}
                </Formik>
                </div>
            </div>
        );
    }
}

export default Shipping;
