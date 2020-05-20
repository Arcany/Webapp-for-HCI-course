import React from 'react';
import {ReduxProps} from '../containers/PaymentContainer';
import { PaymentInformationObject, ShippingInformationObject } from '../redux/state';
import {Button, Col, Form, Card} from 'react-bootstrap';
import styles from './Payment.module.scss';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Formik, FormikState } from 'formik';
import * as yup from 'yup';
import PaymentModal from './PaymentModal';

export interface StateProps {
  paymentInformation: PaymentInformationObject;
  shippingInformation: ShippingInformationObject;
}

type PaymentState = {
  showModal: boolean;
}

class Payment extends React.Component<ReduxProps & RouteComponentProps,PaymentState, {}> {
  constructor(p: ReduxProps & RouteComponentProps) {
    super(p);
    this.state = {
      showModal: false
    };
  }
  render() {
    const showProp = () => {
      this.setState({showModal: true});
    };
    const closeProp = () => {
      this.setState({showModal: false});
    };
    
    const schema = yup.object().shape({
      'Expiration Date': yup.string().required()
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid expiration date'),
      'Card Number': yup.string().length(19, 'Card number must be 16 numbers long').required()
        .matches(/^[^0-9]+$/, 'Card number must include numbers only'),
      'CVV': yup.number().required()
        .typeError('CVV must be a number')
        .min(100, 'CVV must be 3 numbers long')
        .max(999, 'CVV must be 3 numbers long'),
      deliveryCheckbox: yup.bool(),
      'Card Type': yup.string().required(),
      'Payment Type': yup.string().required()
    });


    const handleCustomSubmit = async (event: any) => {
      closeProp();
      this.props.history.push('/');
      this.props.clearShoppingCart();
      console.log(event);
      
    };
    const handleCustomChange = (e: any, setFieldValue: any) => {
      // Adding characters
      let newValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      if (!e.nativeEvent.inputType ||e.nativeEvent.inputType !== 'deleteContentBackward') {
        if (e.target.id === 'Expiration Date') {
          if (e.target.value.length >= 5) {
            newValue = e.target.value.substring(0,5);
          } else if (e.target.value.length === 2) {
            newValue = `${e.target.value}/`;
          } else if (e.target.value.length === 3) {
            newValue = `${e.target.value.substring(0,2)}/${e.target.value.substring(2,1)}`;
          }
        } else if (e.target.id === 'Card Number') {
          const len = e.target.value.toString().length;
          if (len === 20) {
            newValue = e.target.value.substring(0,19);
          } else if (len === 4 || len === 9 || len === 14) {
            newValue = `${e.target.value} `;
          }
        } else if (e.target.id === 'CVV') {
          const len = e.target.value.toString().length;
          if (len === 4) {
            newValue = e.target.value.substring(0,3);
          }
        }
      } else {
        if (e.target.id === 'Expiration Date' && e.target.value.length === 3) {
          newValue = e.target.value.substring(0,2);
        } 
      }
      this.props.editPaymentInformation(e.target.id, newValue);
      setFieldValue(e.target.id, newValue);
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

    const footerWithShippingDetails = Object.entries(this.props.shippingInformation).map(([key, value]) => {
      if (value !== '') {
        return <p key={key} className={styles.paymentPageShippingInfo}>{key}: {value}</p>;
      } return undefined;
    }).filter(value => value !== undefined);

    return (
      <Card className={styles.paymentCard}>
        <Card.Body>
          <h1>Payment information</h1>
          <Formik
            validationSchema={schema}
            onSubmit={showProp}
            initialValues={this.props.paymentInformation}
            
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isInvalid,
              errors,
              setFieldValue
            }: any) => (
              <Form noValidate onSubmit={handleSubmit} onChange={(e: any) => handleCustomChange(e, setFieldValue)}>
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
                  <Link to="/">
                    <Button className="primaryButton">
                        Back to Shopping
                    </Button>
                  </Link>
                  <Link to="/shipping">
                    <Button className="primaryButton">
                      Back to Shipping
                    </Button>
                  </Link>
                  <Button type="submit" className="primaryButton">
                    Order!
                  </Button>
                </div>
                <div>
                  <PaymentModal onClose={(response: any) => handleCustomSubmit(response)} show={this.state.showModal}/>
                </div>
              </Form>
            )}
          </Formik>
        </Card.Body>
        <Card.Footer>
          {footerWithShippingDetails}
        </Card.Footer>
      </Card>
    );
  }

}

export default Payment;
