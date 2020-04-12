import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import Navbar from 'react-bootstrap/Navbar';
//import localStorage from 'local-storage';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false,
      user: []
    };
  }

  handleUserInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    let values = {
      customerEmail: this.state.email,
      customerPassword: this.state.password
    };
    console.log('values:', values);

    fetch('http://localhost:3000/customer/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => {
        console.log('response.status: ' + response.status);

        if (response.status === 200) {
          // console.log('SUCCESSS');

          Swal.fire({
            icon: 'success',
            title: 'Login Successful!',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 500
          });

          return response.json();
        } else {
          console.log('SOMETHING WENT WRONG');
          Swal.fire({
            icon: 'error',
            title: 'Login Failed!',
            timerProgressBar: true,
            showConfirmButton: false,
            timer: 500
          });
        }
      })
      .then(data => {
        // Put UserId into Local Storage
        console.log();
        console.log(data[0].customerid);
        localStorage.setItem('loggedInUserId', data[0].customerid);
        localStorage.setItem('loggedInUserEmail', data[0].customeremail);
        localStorage.setItem('loggedInUserName', data[0].customername);
        localStorage.setItem('loggedInUserPhone', data[0].customerphone);
        localStorage.setItem('loggedInUserRewardPt', data[0].rewardpoints);
        localStorage.setItem('loggedInUserPassword', data[0].customerpassword);
        console.log('getItem[loggedInUserId]: ' + localStorage.getItem('loggedInUserId'));
        console.log('getItem[loggedInUserEmail]: ' + localStorage.getItem('loggedInUserEmail'));
        console.log('getItem[loggedInUserName]: ' + localStorage.getItem('loggedInUserName'));
        console.log('getItem[loggedInUserPhone]: ' + localStorage.getItem('loggedInUserPhone'));
        console.log('getItem[loggedInUserRewardPt]: ' + localStorage.getItem('loggedInUserRewardPt'));
        console.log('getItem[loggedInUserPassword]: ' + localStorage.getItem('loggedInUserPassword'));

        // Set loggedIn localStorage variable to True
        localStorage.setItem('isLoggedIn', JSON.stringify('true'));
        console.log('getItem[isLoggedIn]: ' + localStorage.getItem('isLoggedIn'));

        // Login success, redirect to landing page
        this.setState({ redirect: true });
      })
      .catch(console.log);
    event.preventDefault();
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: '/landing-page',
            isLoggedIn: true
          }}
        />
      );
    }

    return (
      <div>
        <Container fluid className="bg-white">
          <Row>
            <Col md={4} lg={6} className="d-none d-md-flex bg-signup"></Col>
            <Col md={8} lg={6}>
              <div className="login d-flex align-items-center py-5">
                <Container>
                  <Row>
                    <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                      <Navbar.Brand href="#home">Welcome back!</Navbar.Brand>
                      <Form onSubmit={this.handleSubmit}>
                        <div className="form-label-group">
                          <Form.Control
                            type="email"
                            name="email"
                            id="inputEmail"
                            placeholder="Email address"
                            class="form-control"
                            onChange={this.handleUserInput}
                            required
                          />
                          <Form.Label htmlFor="inputEmail">Email address / Mobile</Form.Label>
                        </div>
                        <div className="form-label-group">
                          <Form.Control
                            type="password"
                            name="password"
                            id="inputPassword"
                            placeholder="Password"
                            onChange={this.handleUserInput}
                          />
                          <Form.Label htmlFor="inputPassword">Password</Form.Label>
                        </div>
                        <Form.Check
                          className="mb-3"
                          custom
                          type="checkbox"
                          id="custom-checkbox"
                          label="Remember password"
                        />
                        <Button
                          to="/"
                          type="submit"
                          className="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2"
                        >
                          Sign in
                        </Button>
                        <div className="text-center pt-3">
                          Don’t have an account?{' '}
                          <Link className="font-weight-bold" to="/register">
                            Sign Up
                          </Link>
                        </div>
                        <hr className="my-4" />
                      </Form>
                    </Col>
                  </Row>
                </Container>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
