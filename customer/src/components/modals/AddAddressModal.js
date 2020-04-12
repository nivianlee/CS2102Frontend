import React from 'react';
import {
  Form,
  Col,
  Row,
  InputGroup,
  Modal,
  ButtonToolbar,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from 'react-bootstrap';
import Icofont from 'react-icofont';
import Swal from 'sweetalert2';
import SERVER_PREFIX from '../ServerConfig';

class AddAddressModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAddress: '',
      postalCode: '',
    };
  }
  handleUserInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log('results: ', this.state.newAddress, this.state.postalCode);
  };

  handleSubmit = (event) => {
    event.preventDefault();

    let values = {
      address: this.state.newAddress,
      postalcode: this.state.postalCode,
      customerid: localStorage.getItem('loggedInUserId'),
    };

    fetch(SERVER_PREFIX + '/customers/' + localStorage.getItem('loggedInUserId') + '/address', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.status === 201) {
          // console.log('SUCCESSS');
          Swal.fire({
            icon: 'success',
            title: 'New address has been added successfully',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 700,
          });

          this.setState(this.props.onHide);
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
        console.log('data: ', data);
      })
      .catch(console.log);
    console.log('handleSubmit is clicked! ');
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="add-address">
            Add Delivery Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="invalid-feedback">Please don't leave blanks.</div>
          <Form>
            <div className="form-row">
              <Form.Group className="col-md-12">
                <Form.Label>Address:</Form.Label>
                <Form.Control type="text" name="newAddress" onChange={this.handleUserInput} required />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control type="text" name="postalCode" onChange={this.handleUserInput} required />
              </Form.Group>
              {/* <Form.Group className="col-md-12">
                <Form.Label>Delivery Instructions</Form.Label>
                <Form.Control type="text" placeholder="Delivery Instructions e.g. Opposite Gold Souk Mall" />
              </Form.Group> */}
              {/* <Form.Group className="mb-0 col-md-12">
                <Form.Label>Nickname</Form.Label>
                <ButtonToolbar>
                  <ToggleButtonGroup className="d-flex w-100" type="radio" name="options" defaultValue={1}>
                    <ToggleButton variant="info" value={1}>
                      Home
                    </ToggleButton>
                    <ToggleButton variant="info" value={2}>
                      Work
                    </ToggleButton>
                    <ToggleButton variant="info" value={3}>
                      Other
                    </ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>
              </Form.Group> */}
            </div>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            onClick={this.props.onHide}
            variant="outline-primary"
            className="d-flex w-50 text-center justify-content-center"
          >
            CANCEL
          </Button>
          <Button
            type="button"
            onClick={this.handleSubmit}
            variant="primary"
            className="d-flex w-50 text-center justify-content-center"
          >
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default AddAddressModal;
