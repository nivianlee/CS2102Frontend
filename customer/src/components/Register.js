import React from "react";
import { Redirect, Link } from "react-router-dom";
import { Row, Col, Container, Form, Button, FormGroup } from "react-bootstrap";
import FormErrors from "./FormErrors.js";

class Register extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      address: "",
      postalCode: "",
      phone: "",
      formErrors: { email: "", password: "" },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      redirect: false
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUserInput = event => {
    const name = event.target.id;
    const value = event.target.value;
    // this.setState({ [name]: value });
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case "email":
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? "" : " is in an invalid format.";
        break;
      case "password":
        passwordValid = value.length >= 7;
        fieldValidationErrors.password = passwordValid ? "" : " must be at least 7 characters long.";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        emailValid: emailValid,
        passwordValid: passwordValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid: this.state.emailValid && this.state.passwordValid
    });
  }

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
    if (this.state.redirect) {
      return <Redirect to="/login-page" />;
    }
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
                    <p>
                      Please fill in your particulars below to get started! All fields are required.
                      {/* // Display error message here */}
                      <FormErrors formErrors={this.state.formErrors} />
                    </p>
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
                        disabled={!this.state.formValid}
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
