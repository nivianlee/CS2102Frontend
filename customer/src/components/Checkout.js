import React from 'react';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Button,
  Tab,
  Nav,
  Image,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import ChooseCreditCard from './common/ChooseCreditCard';
import ChooseAddressCard from './common/ChooseAddressCard';
import CheckoutItem from './common/CheckoutItem';
import AddAddressModal from './modals/AddAddressModal';
import AddCreditCardModal from './modals/AddCreditCardModal';
import Icofont from 'react-icofont';
import SERVER_PREFIX from './ServerConfig';
import CouponCard from './common/CouponCard';

class Checkout extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddressModal: false,
      showAddCCModal: false,
      addresses: [],
      creditCards: [],
      promotions: [],
      selectedAdd: '',
      selectedPostalCode: '',
      selectedCCNum: '',
      selectedCCName: '',
      selectedCCExpMM: '',
      selectedCCExpYYYY: '',
      specialReq: '',
      useCash: false,
      useCreditCard: false,
      promotionId: '',
      promoDescription: '',
      promoDetails: '',
      percentageAmount: '',
      absoluteAmount: '',
      deliveryAmount: '',
      myCart: [],
      totalCart: 0,
      totalCartQty: 0,
      deliveryId: '',
      deliveryFee: '',
    };
  }
  componentDidMount() {
    this.reloadAddresses();
    this.reloadCreditCards();
    this.loadPromotions();
    this.calculateCart();
  }

  reloadAddresses() {
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/addresses/' + localStorage.getItem('loggedInUserId'))
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              addresses: result,
            });
          },
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

  reloadCreditCards() {
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/creditcards/' + localStorage.getItem('loggedInUserId'))
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              creditCards: result,
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

  loadPromotions() {
    setTimeout(
      fetch(SERVER_PREFIX + '/promotions/customer')
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
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
        ),
      1
    );
  }

  getQty = ({ id, name, price, maxValue, quantity }) => {
    let tempArr = [];
    for (var i = 0; i < this.state.myCart.length; i++) {
      tempArr[i] = this.state.myCart[i].fooditemid;
    }
    console.log('tempArr: ', tempArr);
    console.log('id', id);
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
      console.log('come here?');
      this.setState({ ...this.state.myCart });
      this.calculateCart();
    }

    if (quantity === 0) {
      console.log('quantity is 0 !!!');
      this.forceUpdate();
    }

    localStorage.setItem('cart', JSON.stringify(this.state.myCart));
    // console.log('Handle Add to Cart: localStorage: ', JSON.parse(localStorage.getItem('cart')));
  };

  calculateCart() {
    let totalSum = 0;
    let totalQty = 0;
    for (let i = 0; i < this.state.myCart.length; i++) {
      console.log('im here? i: ', i);
      totalSum += this.state.myCart[i].subTotal;
      totalQty += this.state.myCart[i].quantity;

      console.log('componentDidMount totalSum: ', totalSum);
      console.log('componentDidMount totalCartQty: ', totalQty);
      this.setState({ totalCart: totalSum, totalCartQty: totalQty });
      this.setState({ ...this.state.totalCart });
      this.setState({ ...this.state.totalCartQty });
    }

    if (totalQty <= 10) {
      this.setState({ deliveryId: 1, deliveryFee: 4 });
    } else if (totalQty > 10 && totalQty <= 15) {
      this.setState({ deliveryId: 2, deliveryFee: 10 });
    } else {
      this.setState({ deliveryId: 3, deliveryFee: 15 });
    }
  }

  hideCloseModal = () => this.setState({ showAddressModal: false, showAddCCModal: false });

  handleAddress = (item) => {
    this.setState({
      selectedAdd: item.address,
      selectedPostalCode: item.postalcode,
    });
  };

  handleCreditCard = (item) => {
    this.setState({
      useCash: false,
      useCreditCard: true,
      selectedCCNum: item.creditcardnumber,
      selectedCCName: item.creditcardname,
      selectedCCExpMM: item.expirymonth,
      selectedCCExpYYYY: item.expiryyear,
    });
  };

  handlePromo = (item) => {
    this.setState({
      promotionId: item.promotionid,
      promoDescription: item.promodescription,
      promoDetails: item.promotiondetails,
      percentageAmount: item.percentageamount,
      absoluteAmount: item.absoluteamount,
      deliveryAmount: item.deliveryamount,
    });
  };

  handleUserInput = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  componentWillMount() {
    // Initialize Cart
    this.setState({ myCart: JSON.parse(localStorage.getItem('cart')) });

    // console.log('Checkout: localStorage: ', JSON.parse(localStorage.getItem('cart')));
    // console.log(JSON.parse(localStorage.getItem('cart')));
  }

  render() {
    localStorage.setItem('cart', JSON.stringify(this.state.myCart));
    console.log('Checkout: localStorage: ', JSON.parse(localStorage.getItem('cart')));

    return (
      <section className="offer-dedicated-body mt-4 mb-4 pt-2 pb-2">
        <AddAddressModal
          show={this.state.showAddressModal}
          onHide={this.hideCloseModal}
          reload={() => {
            this.reloadAddresses();
          }}
        />
        <AddCreditCardModal
          show={this.state.showAddCCModal}
          onHide={this.hideCloseModal}
          reload={() => this.reloadCreditCards()}
        />
        <Container>
          <Row>
            <Col md={8}>
              <div className="offer-dedicated-body-left">
                <div className="pt-2"></div>
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <Row>
                    <Col md={8}>
                      <h4 className="mb-1">Choose a delivery address</h4>
                      <br />
                    </Col>
                    <Col md={4}>
                      <Button
                        type="button"
                        variant="primary"
                        className="text-center float-right justify-content-center"
                        onClick={() => this.setState({ showAddressModal: true })}
                      >
                        Add New Address
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    {this.state.addresses.map((item, key) => {
                      return (
                        <Col md={6} key={key}>
                          <ChooseAddressCard
                            boxclassName="border border-success"
                            title="Recent Address"
                            icoIcon="briefcase"
                            iconclassName="icofont-3x"
                            key={key}
                            address={item.address}
                            addrId={item.addressid}
                            onDeliverHereClick={() => this.handleAddress(item)}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
                <div className="pt-2"></div>
                <div className="bg-white rounded shadow-sm p-4 osahan-payment">
                  <h4 className="mb-1">Choose payment method</h4>
                  <br />
                  <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row>
                      <Col sm={4} className="pr-0">
                        <Nav variant="pills" className="flex-column">
                          <Nav.Link eventKey="first">
                            <Icofont icon="credit-card" /> Credit/Debit Cards
                          </Nav.Link>
                          <Nav.Link eventKey="second">
                            <Icofont icon="money" /> Pay on Delivery
                          </Nav.Link>
                        </Nav>
                      </Col>
                      <Col sm={8} className="pl-0">
                        <Tab.Content className="h-100">
                          <Tab.Pane eventKey="first">
                            <Row>
                              <Col md={7}></Col>
                              <Col md={5}>
                                <Button
                                  onClick={() => this.setState({ showAddCCModal: true })}
                                  type="button"
                                  variant="primary"
                                  className="text-center justify-content-center"
                                >
                                  Add Credit Card
                                </Button>
                              </Col>
                            </Row>
                            <br />
                            <Row>
                              <Col md={12}>
                                {this.state.creditCards.map((item, key) => {
                                  return (
                                    <ChooseCreditCard
                                      boxclassName="border border-success"
                                      title={item.creditcardnumber}
                                      name={item.creditcardname}
                                      iconclassName="icofont-3x"
                                      imageclassName="mr-3"
                                      subTitle={'Valid Until: ' + item.expirymonth + '/' + item.expiryyear}
                                      key={key}
                                      onCCHereClick={() => this.handleCreditCard(item)}
                                    />
                                  );
                                })}
                              </Col>
                            </Row>
                          </Tab.Pane>
                          <Tab.Pane eventKey="second">
                            <h6 className="mb-3 mt-0 mb-3">Cash</h6>
                            <p>Please keep exact change handy to help us serve you better</p>
                            <hr />
                            <Form>
                              <Button
                                className="btn btn-success btn-block btn-lg"
                                onClick={() => {
                                  this.setState({
                                    useCash: true,
                                    selectedCCNum: '',
                                    selectedCCName: '',
                                    selectedCCExpMM: '',
                                    selectedCCExpYYYY: '',
                                  });
                                }}
                              >
                                Use Cash
                                <Icofont icon="long-arrow-right" />
                              </Button>
                            </Form>
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </div>
                <div className="pt-4"></div>
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                  <h4 className="mb-1">Choose a promotion</h4>
                  <br />
                  <Row>
                    {this.state.promotions.map((item, index) => {
                      return (
                        <Col key={index} md={6}>
                          <CouponCard
                            title={item.promodescription}
                            // logoImage="img/bank/1.png"
                            subTitle="Please select one of the promotions."
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
                            noBorder={false}
                            selectButton={true}
                            onPromoClick={() => this.handlePromo(item)}
                          />
                        </Col>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className="generator-bg rounded shadow-sm mb-4 p-4 osahan-cart-item">
                <div className="d-flex mb-4 osahan-cart-item-profile">
                  <Image fluid className="mr-3 rounded-pill" alt="osahan" src="/img/2.jpg" />
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-white">Spice Hut Indian Restaurant</h6>
                    <p className="mb-0 text-white">
                      <Icofont icon="location-pin" /> 2036 2ND AVE, NEW YORK, NY 10029
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded shadow-sm p-2 mb-2 ">
                  {this.state.myCart === null || this.state.myCart.length === 0 ? (
                    <p className="text-danger">Please add items to cart!</p>
                  ) : (
                    this.state.myCart.map((item, key) => {
                      return (
                        <CheckoutItem
                          key={key}
                          itemName={item.name}
                          price={parseFloat(item.price).toFixed(2)}
                          priceUnit="$"
                          id={item.fooditemid}
                          qty={item.quantity}
                          show={true}
                          minValue={0}
                          maxValue={item.maxValue}
                          getValue={this.getQty}
                        />
                      );
                    })
                  )}
                </div>
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  Deliver To: <p>{localStorage.getItem('loggedInUserName')}</p>
                  Selected Address:{' '}
                  {this.state.selectedPostalCode === '' ? (
                    <p className="text-danger">Please select an address.</p>
                  ) : (
                    <p>{this.state.selectedAdd + ' (' + this.state.selectedPostalCode + ')'}</p>
                  )}
                  <InputGroup className="mb-0">
                    <InputGroup.Prepend>
                      <InputGroup.Text>
                        <Icofont icon="comment" />
                      </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="textarea"
                      name="specialReq"
                      placeholder="Any special request?..."
                      value={this.state.specialReq}
                      onChange={this.handleUserInput}
                      aria-label="With textarea"
                    />
                  </InputGroup>
                </div>
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  Selected Promotion:
                  {this.state.promoDescription === '' ? (
                    <p className="text-danger">Please select a promotion.</p>
                  ) : (
                    <p className="text-success">{this.state.promoDescription}</p>
                  )}
                </div>
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  Payment method:{' '}
                  {(() => {
                    if (this.state.useCash) {
                      return <p>Pay by Cash</p>;
                    } else if (this.state.useCreditCard) {
                      return (
                        <div>
                          <p>Pay by Credit Card</p>
                          Credit Card Name:{' '}
                          {this.state.selectedCCName === '' ? '-' : <p>{this.state.selectedCCName}</p>}
                          Credit Card No: {this.state.selectedCCNum === '' ? '-' : <p>{this.state.selectedCCNum}</p>}
                        </div>
                      );
                    } else {
                      return <p className="text-danger">Please select payment method.</p>;
                    }
                  })()}
                </div>
                <div className="mb-2 bg-white rounded p-2 clearfix">
                  <p className="mb-1">
                    Item Total{' '}
                    <span className="float-right text-dark">
                      ${this.state.myCart.length === 0 ? '0.00' : parseFloat(this.state.totalCart).toFixed(2)}
                    </span>
                  </p>
                  {/* <p className="mb-1">
                    Restaurant Charges <span className="float-right text-dark">$62.8</span>
                  </p> */}
                  <p className="mb-1">
                    Delivery Fee
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={<Tooltip id="tooltip-top">Total discount breakup</Tooltip>}
                    >
                      <span className="text-info ml-1">
                        <Icofont icon="info-circle" />
                      </span>
                    </OverlayTrigger>
                    <span className="float-right text-dark">${this.state.deliveryFee}</span>
                  </p>
                  <p className="mb-1">
                    Total Discount
                    <span className="float-right text-success">$0</span>
                  </p>
                  <hr />
                  <h6 className="font-weight-bold mb-0">
                    TO PAY <span className="float-right">$1329</span>
                  </h6>
                </div>
                <Link to="/thanks" className="btn btn-success btn-block btn-lg">
                  PAY $1329
                  <Icofont icon="long-arrow-right" />
                </Link>
              </div>
              {/* <div className="pt-2"></div>
              <div className="alert alert-success" role="alert">
                You have saved <strong>$1,884</strong> on the bill
              </div> */}
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Checkout;
