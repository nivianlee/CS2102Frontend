import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button, FormGroup } from "react-bootstrap";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      address: "",
      postalCode: "",
      phone: ""
    };
    // this.handleChange = this.handleChange.bind(this);
  }

  // handleChange = event => {
  //   let fieldName = event.target.name;
  //   let fleldVal = event.target.value;
  //   this.setState({ newCustomer: { ...this.state.newCustomer, [fieldName]: fleldVal } });
  // };

  handleUserInput = event => {
    const name = event.target.id;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    console.log("name:" + this.state.name);
    console.log("email:" + this.state.email);
    console.log("password:" + this.state.password);
    console.log("address:" + this.state.address);
    console.log("postalCode:" + this.state.postalCode);
    console.log("phone:" + this.state.phone);
    console.log("Yepee! form submitted");
    event.preventDefault();
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
                    <h3 className="login-heading mb-4">Welcome to KinKao!</h3>
                    <Form onSubmit={this.handleSubmit}>
                      <FormGroup controlId="name">
                        <Form.Control
                          type="text"
                          placeholder="Full Name"
                          value={this.state.name}
                          onChange={event => this.handleUserInput(event)}
                          required
                        />
                      </FormGroup>
                      <FormGroup controlId="email">
                        <Form.Control
                          type="email"
                          placeholder="Email address"
                          value={this.state.email}
                          onChange={event => this.handleUserInput(event)}
                          required
                        />
                      </FormGroup>
                      <FormGroup controlId="password">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          value={this.state.password}
                          onChange={event => this.handleUserInput(event)}
                          required
                        />
                      </FormGroup>
                      <FormGroup controlId="address">
                        <Form.Control
                          type="text"
                          placeholder="Address"
                          value={this.state.address}
                          onChange={event => this.handleUserInput(event)}
                          required
                        />
                      </FormGroup>
                      <FormGroup controlId="postalCode">
                        <Form.Control
                          type="text"
                          placeholder="Postal Code"
                          value={this.state.postalCode}
                          onChange={event => this.handleUserInput(event)}
                          required
                        />
                      </FormGroup>
                      <FormGroup controlId="phone">
                        <Form.Control
                          type="text"
                          placeholder="Phone"
                          value={this.state.phone}
                          onChange={event => this.handleUserInput(event)}
                          required
                        />
                      </FormGroup>
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
