import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import FontAwesome from './common/FontAwesome';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      redirect: false
    };
  }

  handleUserInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    console.log('this.state', this.state);
    fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify({ user: this.state }),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response => response.json())
      .then(data => {
        this.props.setToken(data.sessionToken);
      });
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
        <Container fluid className='bg-white'>
          <Row>
            <Col md={4} lg={6} className='d-none d-md-flex bg-signup'></Col>
            <Col md={8} lg={6}>
              <div className='login d-flex align-items-center py-5'>
                <Container>
                  <Row>
                    <Col md={9} lg={8} className='mx-auto pl-5 pr-5'>
                      <h3 className='login-heading mb-4'>Welcome back!</h3>
                      <Form onSubmit={this.handleSubmit}>
                        <div className='form-label-group'>
                          <Form.Control
                            type='email'
                            name='email'
                            id='inputEmail'
                            placeholder='Email address'
                            class='form-control'
                            onChange={this.handleUserInput}
                            required
                          />
                          <Form.Label htmlFor='inputEmail'>Email address / Mobile</Form.Label>
                        </div>
                        <div className='form-label-group'>
                          <Form.Control
                            type='password'
                            name='password'
                            id='inputPassword'
                            placeholder='Password'
                            onChange={this.handleUserInput}
                          />
                          <Form.Label htmlFor='inputPassword'>Password</Form.Label>
                        </div>
                        <Form.Check
                          className='mb-3'
                          custom
                          type='checkbox'
                          id='custom-checkbox'
                          label='Remember password'
                        />
                        <Button
                          to='/'
                          type='submit'
                          className='btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2'
                        >
                          Sign in
                        </Button>
                        <div className='text-center pt-3'>
                          Don’t have an account?{' '}
                          <Link className='font-weight-bold' to='/register'>
                            Sign Up
                          </Link>
                        </div>
                        <hr className='my-4' />
                        <p className='text-center'>LOGIN WITH</p>
                        <div className='row'>
                          <div className='col pr-2'>
                            <Button
                              className='btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase'
                              type='submit'
                            >
                              <FontAwesome icon='google' className='mr-2' /> Google
                            </Button>
                          </div>
                          <div className='col pl-2'>
                            <Button
                              className='btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase'
                              type='submit'
                            >
                              <FontAwesome icon='facebook' className='mr-2' /> Facebook
                            </Button>
                          </div>
                        </div>
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
