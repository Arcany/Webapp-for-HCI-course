import React from 'react';
import {ReduxProps} from '../containers/PaymentContainer';
import {Button, Col, Form, Card} from 'react-bootstrap';
import styles from './Payment.module.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik } from 'formik';
import * as yup from 'yup';


class Payment extends React.Component<ReduxProps & RouteComponentProps, {}> {
  render() {

    const schema = yup.object().shape({
      'Expiration Date': yup.string().required()
        .matches(/^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, 'Invalid expiration date'),
      'Card Number': yup.string().length(16, 'Incorrect card number').required(),
      'CVV': yup.number().required()
        .typeError('CVV must be a number')
        .min(100, 'CVV must be 3 numbers long')
        .max(999, 'CVV must be 3 numbers long'),
      deliveryCheckbox: yup.bool(),
      'Card Type': yup.string().required(),
      'Payment Type': yup.string().required()
    });


    const handleCustomSubmit = async (event: any) => {
      // Redirect to some page with form values
      console.log(event);
      this.props.history.push('/');
    };

    const paymentMethods = [
      {id: 1, name: 'Credit card', available: true},
      {id: 2, name: 'Bank Transfer -> Not available yet', available: false},
      {id: 3, name: 'Cash on Pickup -> Not available yet', available: false}
    ];

    const creditCards = [
      {id: 1, name: 'Visa', available: true},
      {id: 2, name: 'MasterCard', available: true},
      {id: 3, name: 'Maestro', available: true},
      {id: 4, name: 'American Express', available: true},
    ];

    return (
      <Card className={styles.paymentCard}>
        <Card.Body>
          <h1>Payment information</h1>
          <Formik
            validationSchema={schema}
            onSubmit={handleCustomSubmit}
            initialValues={{
              'Payment Type': 'Credit card',
              'Card Type': 'Visa',
              'Expiration Date': '',
              'Card Number': '',
              'CVV': '',
              'Delivery Checkbox': true
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
                  <Form.Group as={Col} controlId="Payment Type">
                    <Form.Label className="requiredFormFieldLabel">Payment type</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      value={values['Payment Type']}
                      onChange={handleChange}
                    >
                      {paymentMethods.map(method => (
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
                  <Form.Group as={Col} controlId="Card Type">
                    <Form.Label className="requiredFormFieldLabel">Card type</Form.Label>
                    <Form.Control
                      as="select"
                      custom
                      value={values['Card Type']}
                      onChange={handleChange}
                    >
                      {creditCards.map(method => (
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
                  <Form.Group as={Col} controlId="Expiration Date">
                    <Form.Label className="requiredFormFieldLabel">Expiration Date</Form.Label>
                    <Form.Control
                      type="text"
                      name="Expiration Date"
                      placeholder="MM/YY"
                      value={values['Expiration Date']}
                      onChange={handleChange}
                      isInvalid={touched['Expiration Date'] && errors['Expiration Date']}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors['Expiration Date']}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} controlId="Card Number">
                    <Form.Label className="requiredFormFieldLabel">Card Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="Card Number"
                      placeholder="1111 2222 3333 9999"
                      value={values['Card Number']}
                      onChange={handleChange}
                      isInvalid={touched['Card Number'] && errors['Card Number']}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors['Card Number']}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} controlId="CVV">
                    <Form.Label  className="requiredFormFieldLabel">CVV</Form.Label>
                    <Form.Control

                      type="number"
                      name="CVV"
                      placeholder="367"
                      value={values['CVV']}
                      onChange={handleChange}
                      isInvalid={touched['CVV'] && errors['CVV']}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors['CVV']}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Form.Row>
                <Form.Group controlId="Delivery Checkbox">
                  <Form.Check
                    type="checkbox"
                    label="Use delivery address as card holder address"
                    checked={values['Delivery Checkbox']}
                    onChange={handleChange}
                  />
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

                  <Button type="submit" className="primaryButton">
                                        SUBMIT PAYMENT
                  </Button>

                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
    );
  }

}

export default Payment;
