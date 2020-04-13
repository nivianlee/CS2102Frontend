import React from 'react';
import { Form, InputGroup, Modal, ButtonToolbar, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Icofont from 'react-icofont';
import Swal from 'sweetalert2';
import SERVER_PREFIX from '../ServerConfig';
import FormErrors from '../FormErrors.js';

class EditAddressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editAddress: '',
      postalCode: '',
      postalCodeValid: false,
      formValid: false,
      formErrors: { postalCode: '' },
    };
  }

  handleUserInput = (event) => {
    const name = event.target.id;
    const value = event.target.value;
    // this.setState({ [name]: value });
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
    // this.setState({
    //   [event.target.name]: event.target.value,
    // });
    // console.log('results: ', this.state.newAddress, this.state.postalCode);
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let postalCodeValid = this.state.postalCodeValid;

    switch (fieldName) {
      case 'postalCode':
        postalCodeValid = value.match(/\b\d{6}\b/);
        fieldValidationErrors.postalCode = postalCodeValid ? '' : ' must contains 6 digits.';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        postalCodeValid: postalCodeValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.postalCodeValid,
    });
  }

  handleSubmit = (event) => {
    let values = {
      addressid: this.props.addressId,
      address: this.state.editAddress,
      postalcode: this.state.postalCode,
    };
    console.log('addressid: ', values.addressid);
    console.log('address: ', values.address);
    console.log('postalcode: ', values.postalcode);

    fetch(SERVER_PREFIX + '/customers/' + localStorage.getItem('loggedInUserId') + '/addresses', {
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
            title: 'Address has been updated successfully',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 1500,
          });
          this.setState(this.props.onHide, this.props.reload, {
            editAddress: '',
            postalCode: '',
            postalCodeValid: false,
            formValid: false,
            formErrors: { postalCode: '' },
          });
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
    event.preventDefault();
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="add-address">
            Edit Delivery Address
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormErrors formErrors={this.state.formErrors} />

          <Form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <Form.Group className="col-md-12" controlId="editAddress">
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="editAddress"
                  defaultValue={this.props.address}
                  onChange={this.handleUserInput}
                  required
                />
              </Form.Group>
              <Form.Group className="col-md-12" controlId="postalCode">
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control
                  type="text"
                  name="postalCode"
                  defaultValue={this.props.postalCode}
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
export default EditAddressModal;
