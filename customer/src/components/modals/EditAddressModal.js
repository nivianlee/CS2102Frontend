import React from 'react';
import { Form, InputGroup, Modal, ButtonToolbar, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Icofont from 'react-icofont';

class EditAddressModal extends React.Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="add-address">
            Edit Delivery Address
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <div className="form-row">
              <Form.Group className="col-md-12">
                <Form.Label>Address:</Form.Label>
                <Form.Control type="text" placeholder={this.props.address} />
              </Form.Group>
              <Form.Group className="mb-0 col-md-12">
                <Form.Label>Postal Code:</Form.Label>
                <Form.Control type="text" placeholder={this.props.postalCode} />
              </Form.Group>
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
          <Button type="button" variant="primary" className="d-flex w-50 text-center justify-content-center">
            SUBMIT
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default EditAddressModal;
