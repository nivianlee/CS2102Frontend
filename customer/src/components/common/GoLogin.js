import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Image } from 'react-bootstrap';

class GoLogin extends React.Component {
  render() {
    return (
      <section className='section pt-5 pb-5 osahan-not-found-page'>
        <Container>
          <Row>
            <Col md={12} className='text-center pt-5 pb-5'>
              <Image className='img-fluid' src='/img/sad.png' alt='404' />
              <h1 className='mt-2 mb-2'>Not Authorised!</h1>
              <p className='mb-5'>Please log in before you can access this page.</p>
              <Link className='btn btn-primary btn-lg' to='/login'>
                Login
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default GoLogin;
