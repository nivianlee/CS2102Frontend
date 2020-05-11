import React from 'react';
import { Form, FormGroup, Modal, Button, ControlLabel, FormControl } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SERVER_PREFIX from '../ServerConfig';
import FormErrors from '../FormErrors.js';

class AddRateRiderModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rateRider: '',
      fooditems: [],
    };
  }
  componentDidMount() {
    this.loadRider();
  }

  loadRider() {
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/' + localStorage.getItem('loggedInUserId') + '/order/' + this.props.orderId)
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              fooditems: result,
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error,
            });
          }
        ),
      1
    );
  }

  handleSubmit = (event) => {
    console.log('this.props.orderId: ', this.props.orderId);
    console.log('this.state.rateRider: ', this.state.rateRider);
    console.log('this.state.riderid: this.state.fooditems[0].riderid: ', this.state.fooditems[0].riderid);
    let values = {
      orderid: this.props.orderId,
      riderid: this.state.fooditems[0].riderid,
      rating: this.state.rateRider,
    };

    fetch(SERVER_PREFIX + '/customers/rider/' + localStorage.getItem('loggedInUserId'), {
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
            title: 'Rider has been rated successfully',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 1000,
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
      rateRider: '',
    });
    // console.log('handleSubmit is clicked! ');
    event.preventDefault();
  };

  render() {
    console.log('this.state.fooditems: ', this.state.fooditems);
    return (
      <Modal show={this.props.show} onHide={this.props.onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="add-address">
            Rate Rider
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <p>{this.state.fooditems[0].riderid}</p> */}
          <Form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <Form>
                {['radio'].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="1"
                      type={type}
                      id={`inline-${type}-1`}
                      onClick={() => this.setState({ rateRider: 1 })}
                    />
                    <Form.Check
                      inline
                      label="2"
                      type={type}
                      id={`inline-${type}-2`}
                      onClick={() => this.setState({ rateRider: 2 })}
                    />
                    <Form.Check
                      inline
                      label="3"
                      type={type}
                      id={`inline-${type}-3`}
                      onClick={() => this.setState({ rateRider: 3 })}
                    />
                    <Form.Check
                      inline
                      label="4"
                      type={type}
                      id={`inline-${type}-4`}
                      onClick={() => this.setState({ rateRider: 4 })}
                    />
                    <Form.Check
                      inline
                      label="5"
                      type={type}
                      id={`inline-${type}-5`}
                      onClick={() => this.setState({ rateRider: 5 })}
                    />
                  </div>
                ))}
              </Form>
            </div>
            <br />
            <div className="form-row">
              <Button
                type="button"
                onClick={this.props.onHide}
                variant="outline-primary"
                className="d-flex w-50 text-center justify-content-center"
              >
                CANCEL
              </Button>
              <Button type="submit" variant="primary" className="d-flex w-50 text-center justify-content-center">
                SUBMIT
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
export default AddRateRiderModal;
