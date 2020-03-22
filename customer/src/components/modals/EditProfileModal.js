import React from 'react';
import { Form, Modal, Button } from 'react-bootstrap';

class EditProfileModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = event => {
    console.log('click!');
    event.preventDefault();
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} size='sm' centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as='h5' id='edit-profile'>
            Edit profile
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={this.handleSubmit}>
            <div className='form-row'>
              <Form.Group className='col-md-12'>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='text'
                  defaultValue={localStorage.getItem('loggedInUserEmail')}
                  placeholder='Enter Email id'
                />
              </Form.Group>
              <Form.Group className='col-md-12'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  defaultValue={localStorage.getItem('loggedInUserPassword')}
                  placeholder='Enter password'
                />
              </Form.Group>
              <Form.Group className='col-md-12'>
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type='text'
                  defaultValue={localStorage.getItem('loggedInUserPhone')}
                  placeholder='Enter Phone number'
                />
              </Form.Group>
              <Form.Group className='col-md-12 mb-0'>
                <Modal.Footer>
                  <Button
                    type='button'
                    onClick={this.props.onHide}
                    variant='outline-primary'
                    className='d-flex w-50 text-center justify-content-center'
                  >
                    CANCEL
                  </Button>
                  <Button type='submit' variant='primary' className='d-flex w-50 text-center justify-content-center'>
                    UPDTAE
                  </Button>
                </Modal.Footer>
              </Form.Group>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default EditProfileModal;
