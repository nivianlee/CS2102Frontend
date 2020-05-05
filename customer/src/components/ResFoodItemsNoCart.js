import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Form, InputGroup, Button, Tab, Nav, Image, Badge, Spinner } from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from './common/GalleryCarousel';
import CheckoutItem from './common/CheckoutItem';
import BestSeller from './common/BestSeller';
import QuickBite from './common/QuickBite';
import StarRating from './common/StarRating';
import RatingBar from './common/RatingBar';
import Review from './common/Review';
import Icofont from 'react-icofont';
import SERVER_PREFIX from './ServerConfig';

class ResFoodItems extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      foodItems: [],
      resName: '',
      resAddr: '',
      resPostalCode: '',
      resContactNum: '',
      category: '',
      isLoaded: false,
      showAddressModal: false,
      users: [
        {
          name: 'Osahan Singh',
          image: '/img/user/5.png',
          url: '#',
        },
        {
          name: 'Gurdeep Osahan',
          image: '/img/user/2.png',
          url: '#',
        },
        {
          name: 'Askbootstrap',
          image: '/img/user/3.png',
          url: '#',
        },
        {
          name: 'Osahan Singh',
          image: '/img/user/4.png',
          url: '#',
        },
      ],
    };
  }

  hideAddressModal = () => this.setState({ showAddressModal: false });
  getQty = ({ id, quantity }) => {
    //console.log(id);
    //console.log(quantity);
  };
  getStarValue = ({ value }) => {
    console.log(value);
    //console.log(quantity);
  };

  componentDidMount() {
    const { resID } = this.props.match.params;
    console.log('resID: ' + resID);

    fetch(SERVER_PREFIX + '/fooditems/' + resID)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            foodItems: result,
            category: result[0].category,
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
      );

    fetch(SERVER_PREFIX + '/restaurants/' + resID)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            resName: result[0].restaurantname,
            resAddr: result[0].address,
            resPostalCode: result[0].postalcode,
            resContactNum: result[0].contactNum,
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
      );
  }

  render() {
    for (var i = 0; i < this.state.foodItems.length; i++) {
      var obj = this.state.foodItems[i];

      console.log('fooditemid: ' + obj.fooditemid);
    }
    const { error, isLoaded, foodItems } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return (
        <div>
          <Col md={12} className="text-center load-more">
            <Button variant="primary" type="button" disabled="">
              <Spinner animation="grow" size="sm" className="mr-1" />
              Loading...
            </Button>
          </Col>
        </div>
      );
    } else {
      return (
        <>
          <section className="restaurant-detailed-banner">
            <div className="text-center">
              <Image fluid className="cover" src="/img/mall-dedicated-banner.png" />
            </div>
            <div className="restaurant-detailed-header">
              <Container>
                <Row className="d-flex align-items-end">
                  <Col md={8}>
                    <div className="restaurant-detailed-header-left">
                      <Image fluid className="mr-3 float-left" alt="osahan" src="/img/1.jpg" />
                      <h2 className="text-white">{this.state.resName}</h2>
                      <p className="text-white mb-1">
                        <Icofont icon="location-pin" /> {this.state.resAddr + ' (' + this.state.resPostalCode + ')'}{' '}
                        <Badge variant="success">OPEN</Badge>
                      </p>
                      <p className="mb-2 text-white">
                        <Icofont icon="phone-circle mr-2" /> +65 {this.state.resContactNum}
                        <Icofont icon="food-cart" /> {this.state.category}
                      </p>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="restaurant-detailed-header-right text-right">
                      <Button variant="success" type="button">
                        <Icofont icon="clock-time" /> 25–35 min
                      </Button>
                      <h6 className="text-white mb-0 restaurant-detailed-ratings">
                        <span className="generator-bg rounded text-white">
                          <Icofont icon="star" /> 3.1
                        </span>{' '}
                        23 Ratings
                        <Icofont icon="speech-comments" className="ml-3" /> 91 reviews
                      </h6>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>

          <Tab.Container defaultActiveKey="first">
            <section className="offer-dedicated-nav bg-white border-top-0 shadow-sm">
              <Container>
                <Row>
                  <Col md={12}>
                    <Nav id="pills-tab">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Order Online</Nav.Link>
                      </Nav.Item>
                      {/* <Nav.Item>
                        <Nav.Link eventKey="third">Restaurant Info</Nav.Link>
                      </Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link eventKey="fifth">Ratings & Reviews</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
              </Container>
            </section>
            <section className="offer-dedicated-body pt-2 pb-2 mt-4 mb-4">
              <Container>
                <Row>
                  <Col md={12}>
                    <div className="offer-dedicated-body-left">
                      <Tab.Content className="h-100">
                        <Tab.Pane eventKey="first">
                          {/* <h5 className='mb-4'>Recommended</h5>
                          <Form className='explore-outlets-search mb-4'>
                            <InputGroup>
                              <Form.Control type='text' placeholder='Search for dishes...' />
                              <InputGroup.Append>
                                <Button type='button' variant='link'>
                                  <Icofont icon='search' />
                                </Button>
                              </InputGroup.Append>
                            </InputGroup>
                          </Form> */}
                          <h5 className="mb-3">
                            Discount Foods{' '}
                            <Badge variant="success">
                              {' '}
                              <Icofont icon="tags" /> 15% Off All Items{' '}
                            </Badge>
                          </h5>
                          <ItemsCarousel />

                          <Row>
                            <h5 className="mb-4 mt-3 col-md-12">Best Sellers</h5>
                            {foodItems.map((item, index) => {
                              return (
                                <Col md={4} sm={6} className="mb-4">
                                  <BestSeller
                                    id={1}
                                    title={item.fooditemname}
                                    subTitle={item.category}
                                    imageAlt="Product"
                                    image={'img/foodItems/FoodItemID_' + item.fooditemid + '.png'}
                                    imageClass="img-fluid item-img"
                                    price={item.price}
                                    priceUnit="$"
                                    isNew={false}
                                    showPromoted={false}
                                    promotedVariant="dark"
                                    favIcoIconColor="text-danger"
                                    rating="3.1 (300+)"
                                    getValue={this.getQty}
                                    maxValue={item.maxnumoforders}
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                          <div className="position-relative">
                            <GalleryCarousel />
                          </div>
                        </Tab.Pane>

                        {/* <Tab.Pane eventKey="fourth">
                          <div
                            id="book-a-table"
                            className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
                          >
                            <h5 className="mb-4">Book A Table</h5>
                            <Form>
                              <Row>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Full Name" />
                                  </Form.Group>
                                </Col>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Email address" />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Row>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Mobile number</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Mobile number" />
                                  </Form.Group>
                                </Col>
                                <Col sm={6}>
                                  <Form.Group>
                                    <Form.Label>Date And Time</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Date And Time" />
                                  </Form.Group>
                                </Col>
                              </Row>
                              <Form.Group className="text-right">
                                <Button variant="primary" type="button">
                                  {' '}
                                  Submit{' '}
                                </Button>
                              </Form.Group>
                            </Form>
                          </div>
                        </Tab.Pane> */}
                        <Tab.Pane eventKey="fifth">
                          <div
                            id="ratings-and-reviews"
                            className="bg-white rounded shadow-sm p-4 mb-4 clearfix restaurant-detailed-star-rating"
                          >
                            <div className="star-rating float-right">
                              <StarRating fontSize={26} star={5} getValue={this.getStarValue} />
                            </div>
                            <h5 className="mb-0 pt-1">Rate this Place</h5>
                          </div>
                          <div className="bg-white rounded shadow-sm p-4 mb-4 clearfix graph-star-rating">
                            <h5 className="mb-0 mb-4">Ratings and Reviews</h5>
                            <div className="graph-star-rating-header">
                              <div className="star-rating">
                                <StarRating fontSize={18} disabled={true} star={5} getValue={this.getStarValue} />
                                <b className="text-black ml-2">334</b>
                              </div>
                              <p className="text-black mb-4 mt-2">Rated 3.5 out of 5</p>
                            </div>
                            <div className="graph-star-rating-body">
                              <RatingBar leftText="5 Star" barValue={56} />
                              <RatingBar leftText="4 Star" barValue={23} />
                              <RatingBar leftText="3 Star" barValue={11} />
                              <RatingBar leftText="2 Star" barValue={6} />
                              <RatingBar leftText="1 Star" barValue={4} />
                            </div>
                            <div className="graph-star-rating-footer text-center mt-3 mb-3">
                              <Button type="button" variant="outline-primary" size="sm">
                                Rate and Review
                              </Button>
                            </div>
                          </div>
                          <div className="bg-white rounded shadow-sm p-4 mb-4 restaurant-detailed-ratings-and-reviews">
                            <Link to="#" className="btn btn-outline-primary btn-sm float-right">
                              Top Rated
                            </Link>
                            <h5 className="mb-1">All Ratings and Reviews</h5>
                            <Review
                              image="/img/user/1.png"
                              ImageAlt=""
                              ratingStars={5}
                              Name="Singh Osahan"
                              profileLink="#"
                              reviewDate="Tue, 20 Mar 2020"
                              reviewText="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classNameical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classNameical literature, discovered the undoubtable source. Lorem Ipsum comes from sections"
                              likes="856M"
                              dislikes="158K"
                              otherUsers={this.state.users}
                            />
                            <hr />
                            <Review
                              image="/img/user/6.png"
                              ImageAlt=""
                              ratingStars={5}
                              Name="Gurdeep Osahan"
                              profileLink="#"
                              reviewDate="Tue, 20 Mar 2020"
                              reviewText="It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English."
                              likes="88K"
                              dislikes="1K"
                              otherUsers={this.state.users}
                            />
                            <hr />
                            <Link className="text-center w-100 d-block mt-4 font-weight-bold" to="#">
                              See All Reviews
                            </Link>
                          </div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Tab.Container>
        </>
      );
    }
  }
}
export default ResFoodItems;
