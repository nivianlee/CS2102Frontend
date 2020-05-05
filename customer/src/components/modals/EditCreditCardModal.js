import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SERVER_PREFIX from '../ServerConfig';
import FormErrors from '../FormErrors.js';

class EditCreditCardModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNum: '',
      cardName: '',
      expMM: '',
      expYYYY: '',
      oldCCNum: '',
      postalCodeValid: false,
      formValid: false,
      formErrors: { cardNum: '', cardName: '', expMM: '', expYYYY: '' },
    };
  }

  handleUserInput = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    // this.setState({ [name]: value });
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let cardNumValid = this.state.cardNumValid;
    let expMMValid = this.state.expMM;
    let expYYYYValid = this.state.expYYYY;

    switch (fieldName) {
      case 'cardNum':
        cardNumValid = value.match(/\d{4}-?\d{4}-?\d{4}-?\d{4}/);
        fieldValidationErrors.cardNum = cardNumValid
          ? ''
          : 'Card Number must contains 16 digits with or without hyphen.';
        break;
      case 'expMM':
        expMMValid = value.match(/0[1-9]|10|11|12$/);
        fieldValidationErrors.expMM = expMMValid ? '' : 'Month must be in the following format: 01-12';
        break;
      case 'expYYYY':
        expYYYYValid = value.match(/20[2]{1}[0-9]{1}$/);
        fieldValidationErrors.expYYYY = expYYYYValid
          ? ''
          : 'Year must be between this year and 2030 and follow this format: 2020';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        cardNumValid: cardNumValid,
        expMMValid: expMMValid,
        expYYYYValid: expYYYYValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.cardNumValid && this.state.expMMValid && this.state.expYYYYValid,
    });
  }

  handleSubmit = (event) => {
    let values = {
      customerid: parseInt(localStorage.getItem('loggedInUserId')),
      creditcardnumber: this.state.cardNum,
      creditcardname: this.state.cardName,
      expirymonth: parseInt(this.state.expMM),
      expiryyear: parseInt(this.state.expYYYY),
      oldcreditcardnumber: this.props.ccNum,
    };
    console.log(values);
    fetch(SERVER_PREFIX + '/customers/creditcard/' + localStorage.getItem('loggedInUserId'), {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          // console.log('SUCCESSS');
          Swal.fire({
            icon: 'success',
            title: 'Credit Card has been updated successfully',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 1500,
          });
          this.setState(this.props.onHide, this.props.reload);
          // console.log('redirect: ' + this.state.redirect);
          return response.json();
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Failed!',
            text: 'Please try again!',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 1000,
          });
          this.setState({ requestFailed: true });
        }
      })
      .then((data) => {
        // console.log('data: ', data);
      })
      .catch(console.log);
    this.setState({
      cardNum: '',
      cardName: '',
      expMM: '',
      expYYYY: '',
      oldCCNum: '',
      cardNumValid: false,
      expMMValid: false,
      expYYYYValid: false,
      formValid: false,
      formErrors: { cardNum: '', cardName: '', expMM: '', expYYYY: '' },
    });
    event.preventDefault();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-cc">
            Edit Credit Card Details
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormErrors formErrors={this.state.formErrors} />
          <Form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <Form.Group className="col-md-12" controlId="cardName">
                <Form.Label>Credit Card Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="cardName"
                  placeholder={this.props.ccName}
                  value={this.state.cardName}
                  onChange={this.handleUserInput}
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-12" controlId="cardNum">
                <Form.Label>Credit Card Number: </Form.Label>
                <Form.Control
                  type="text"
                  name="cardNum"
                  placeholder={this.props.ccNum}
                  value={this.state.cardNum}
                  onChange={(event) => this.handleUserInput(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-6" controlId="expMM">
                <Form.Label>Expiry Month:</Form.Label>
                <Form.Control
                  type="text"
                  name="expMM"
                  placeholder={this.props.ccExpMM}
                  value={this.state.expMM}
                  onChange={(event) => this.handleUserInput(event)}
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-6" controlId="expYYYY">
                <Form.Label>Expiry Year:</Form.Label>
                <Form.Control
                  type="text"
                  name="expYYYY"
                  placeholder={this.props.ccExpYYYY}
                  value={this.state.expYYYY}
                  onChange={(event) => this.handleUserInput(event)}
                  required
                />
              </Form.Group>
              <Button
                type="button"
                onClick={this.props.onHide}
                variant="outline-primary"
                className="d-flex w-50 text-center justify-content-center"
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                // onClick={this.handleSubmit}
                variant="primary"
                className="d-flex w-50 text-center justify-content-center"
                disabled={!this.state.formValid}
              >
                SUBMIT
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default EditCreditCardModal;
