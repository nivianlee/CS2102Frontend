import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SERVER_PREFIX from '../ServerConfig';
import Swal from 'sweetalert2';

class DeleteCreditCardModal extends React.Component {
  handleDelete = (event) => {
    let values = {
      customerid: localStorage.getItem('loggedInUserId'),
      creditcardnumber: this.props.ccNum,
    };
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/creditcard/' + localStorage.getItem('loggedInUserId'), {
        method: 'DELETE',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // console.log("response.status: " + response.status);
          if (response.status === 200) {
            // console.log('SUCCESSS');
            Swal.fire({
              icon: 'success',
              title: 'Deleted successfully!',
              timerProgressBar: true,
              showConfirmButton: false,
              timer: 1000,
            });
            this.setState(this.props.onHide, this.props.reload);
          } else {
            // console.log('SOMETHING WENT WRONG');
            Swal.fire({
              icon: 'error',
              title: 'Delete Failed!',
              text: 'Please try again!',
              timerProgressBar: true,
              showConfirmButton: false,
              timer: 700,
            });
          }
        })
        .catch(() => console.log('Can’t access the url response. Blocked by browser?')),
      1
    );
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="delete-cc">
            Delete
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p className="mb-0 text-black">
            Do you want to delete this Credit Card?
            <br />
            {this.props.ccName} ({this.props.ccNum}) ?
          </p>
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
            variant="primary"
            onClick={this.handleDelete}
            className="d-flex w-50 text-center justify-content-center"
          >
            DELETE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default DeleteCreditCardModal;
