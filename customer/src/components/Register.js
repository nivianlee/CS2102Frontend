import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      newCustomer: {
        name: "",
        email: "",
        password: "",
        address: "",
        postalCode: "",
        phone: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = event => {
    let fieldName = event.target.name;
    let fleldVal = event.target.value;
    this.setState({ newCustomer: { ...this.state.newCustomer, [fieldName]: fleldVal } });
  };

  render() {
    return (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex bg-signup"></Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4">Welcome to DabaoFood!</h3>
                    <Form>
                      <div className="form-label-group">
                        <Form.Control
                          type="email"
                          id="inputEmail"
                          placeholder="Email address"
                          defaultValue={this.state.email}
                          onChange={this.handleChange}
                          required
                        />
                        <Form.Label htmlFor="inputEmail">Email address</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="password"
                          id="inputPassword"
                          placeholder="Password"
                          defaultValue={this.state.password}
                          onChange={this.handleChange}
                          required
                        />
                        <Form.Label htmlFor="inputPassword">Password</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="inputAddress"
                          placeholder="Address"
                          defaultValue={this.state.address}
                          onChange={this.handleChange}
                          required
                        />
                        <Form.Label htmlFor="inputAddress">Address</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="inputPostalCode"
                          placeholder="PostalCode"
                          defaultValue={this.state.postalCode}
                          onChange={this.handleChange}
                          required
                        />
                        <Form.Label htmlFor="inputPostalCode">Postal Code</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="inputPhone"
                          placeholder="Phone"
                          defaultValue={this.state.phone}
                          onChange={this.handleChange}
                          required
                        />
                        <Form.Label htmlFor="inputPhone">Mobile Number</Form.Label>
                      </div>

                      <Button
                        type="submit"
                        to="/login"
                        className="btn btn-lg btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign Up
                      </Button>
                      <div className="text-center pt-3">
                        Already have an account?{" "}
                        <Link className="font-weight-bold" to="/login">
                          Sign In
                        </Link>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
