import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Button, Tab, Nav, Image, Badge, Spinner } from 'react-bootstrap';
import ItemsCarousel from './common/ItemsCarousel';
import GalleryCarousel from './common/GalleryCarousel';
import BestSeller from './common/BestSeller';
import StarRating from './common/StarRating';
import RatingBar from './common/RatingBar';
import Review from './common/Review';
import Icofont from 'react-icofont';
import SERVER_PREFIX from './ServerConfig';
import CouponCard from './common/CouponCard';

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
      resID: '',
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
      myCart: [],
      totalCart: 0,
      promotions: [],
    };
  }

  hideAddressModal = () => this.setState({ showAddressModal: false });

  getQty = ({ id, name, price, maxValue, quantity }) => {
    // console.log(id);
    // console.log(quantity);
    let tempArr = [];
    for (var i = 0; i < this.state.myCart.length; i++) {
      tempArr[i] = this.state.myCart[i].fooditemid;
    }

    if (this.state.myCart.length === 0) {
      this.setState({
        myCart: [
          {
            fooditemid: id,
            name: name,
            price: price,
            maxValue: maxValue,
            quantity: quantity,
            subTotal: price * quantity,
          },
        ],
      });
    } else {
      // Check for duplicate items
      // console.log('this.state.myCart.length: ', this.state.myCart.length);
      if (tempArr.includes(id)) {
        let tempIndex = tempArr.indexOf(id);

        if (quantity === 0) {
          let tempArrTwo = [...this.state.myCart];
          tempArrTwo.splice(tempIndex, 1);
          this.setState({ myCart: tempArrTwo });
        } else {
          this.setState({
            ...(this.state.myCart[tempIndex].quantity = quantity),
            ...(this.state.myCart[tempIndex].subTotal = price * quantity),
          });
        }
      } else {
        this.setState({
          myCart: [
            ...this.state.myCart,
            {
              fooditemid: id,
              name: name,
              price: price,
              maxValue: maxValue,
              quantity: quantity,
              subTotal: price * quantity,
            },
          ],
        });
      }
    }
    localStorage.setItem('cart', JSON.stringify(this.state.myCart));
    console.log('Handle Add to Cart: localStorage: ', JSON.parse(localStorage.getItem('cart')));

    const { resID } = this.props.match.params;
    localStorage.setItem('resId', resID);
    console.log('resId after adding cart: ' + localStorage.getItem('resId'));
  };

  getStarValue = ({ value }) => {
    console.log(value);
    //console.log(quantity);
  };

  componentWillMount() {
    // Initialize Cart
    if (localStorage.getItem('cart') === null || typeof localStorage.getItem('cart') === undefined) {
      var myCart = {};
      localStorage.setItem('cart', JSON.stringify(myCart));
    } else {
      this.setState({ myCart: JSON.parse(localStorage.getItem('cart')) });
    }

    console.log('Handle Add to Cart: localStorage: ', JSON.parse(localStorage.getItem('cart')));
    // console.log(JSON.parse(localStorage.getItem('cart')));
  }

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
            resID: result[0].restaurantid,
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

    fetch(SERVER_PREFIX + '/promotions/restaurant/' + resID)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            promotions: result,
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

  handleQty = (foodItemId) => {
    var obj = JSON.parse(localStorage.getItem('cart'));

    let tempArr = [];
    for (var i = 0; i < obj.length; i++) {
      tempArr[i] = obj[i].fooditemid;
    }

    if (tempArr.includes(foodItemId)) {
      let tempIndex = tempArr.indexOf(foodItemId);
      let qty = obj[tempIndex].quantity;
      return qty;
    } else return 0;
  };

  render() {
    // for (var i = 0; i < this.state.foodItems.length; i++) {
    //   var obj = this.state.foodItems[i];

    //   console.log('fooditemid: ' + obj.fooditemid);
    // }

    // console.log(this.state.myCart);
    localStorage.setItem('cart', JSON.stringify(this.state.myCart));
    // console.log('Cart Contains: localStorage: ', JSON.parse(localStorage.getItem('cart')));
    // console.log(JSON.parse(localStorage.getItem('cart')));

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
              <Image fluid className="cover" src={'/img/restaurants/restaurant_' + this.state.resID + '.jpg'} />
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
                      <Nav.Item>
                        <Nav.Link eventKey="third">Restaurant Offers</Nav.Link>
                      </Nav.Item>
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
                          <Row>
                            <h5 className="mb-4 mt-3 col-md-12">Best Sellers</h5>
                            {foodItems.map((item, index) => {
                              return (
                                <Col key={index} md={4} sm={6} className="mb-4">
                                  <BestSeller
                                    id={item.fooditemid}
                                    title={item.fooditemname}
                                    subTitle={item.category}
                                    imageAlt="Product"
                                    image={'img/foodItems/FoodItemID_' + item.fooditemid + '.png'}
                                    imageClass="img-fluid item-img"
                                    price={parseFloat(item.price)}
                                    priceUnit="$"
                                    isNew={false}
                                    showPromoted={false}
                                    promotedVariant="dark"
                                    favIcoIconColor="text-danger"
                                    rating="3.1 (300+)"
                                    getValue={this.getQty}
                                    maxValue={item.maxnumoforders}
                                    qty={this.handleQty(item.fooditemid)}
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

                        <Tab.Pane eventKey="third">
                          <section className="section pt-5 pb-5">
                            <Container>
                              <Row>
                                <Col md={12}>
                                  <h5>Available Coupons</h5>
                                </Col>
                              </Row>
                              <br />
                              <Row>
                                <Col md={12}>
                                  {this.state.promotions.length === 0 ? (
                                    <p className="text-danger">There is no offers</p>
                                  ) : (
                                    this.state.promotions.map((item, index) => {
                                      return (
                                        <Col key={index} md={4}>
                                          <CouponCard
                                            title={item.promodescription}
                                            // logoImage="img/bank/1.png"
                                            subTitle="Please remember to redeem during check out."
                                            // copyBtnText=""
                                            couponCode={(() => {
                                              if (item.promotiondetails !== null) {
                                                return <div>{item.promotiondetails}</div>;
                                              } else if (item.absoluteamount !== null) {
                                                return <div>${item.absoluteamount} OFF!</div>;
                                              } else if (item.deliveryamount !== null) {
                                                return <div>${item.deliveryamount} OFF!</div>;
                                              } else {
                                                return <div>{item.percentageamount}% OFF!</div>;
                                              }
                                            })()}
                                          />
                                        </Col>
                                      );
                                    })
                                  )}
                                </Col>
                              </Row>
                            </Container>
                          </section>
                        </Tab.Pane>
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
