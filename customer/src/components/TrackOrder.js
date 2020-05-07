import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import Icofont from 'react-icofont';
import CartDropdownItem from './cart/CartDropdownItem';
import SERVER_PREFIX from './ServerConfig';
import * as moment from 'moment';
import { Image } from 'react-bootstrap';

class TrackOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: '',
      resName: '',
      resAddr: '',
      resPC: '',
      totalCost: '',
      orderPlacedTime: '',
      deliveryAddr: '',
      isCash: '',
      specialReq: '',
      deliveryFee: '',
      riderPickUpDT: '',
      riderArr: '',
      order: [],
      foodItems: [],
    };
  }

  componentDidMount() {
    this.reloadData();
    console.log('order', this.state.order);
  }

  reloadData() {
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/currentorders/' + localStorage.getItem('loggedInUserId'))
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.length !== 0) {
              this.setState({
                isLoaded: true,
                orderId: result[0].orderid,
                resName: result[0].restaurantname,
                resAddr: result[0].address,
                resPC: result[0].postalcode,
                totalCost: result[0].totalcostoforder,
                orderPlacedTime: result[0].orderplacedtimestamp,
                deliveryAddr: result[0].deliveryaddress,
                isCash: result[0].usecash,
                specialReq: result[0].specialrequest,
                deliveryFee: result[0].deliveryfeeamount,
                riderPickUpDT: result[0].ridercollectordertimestamp,
                riderArr: result[0].riderarriveatrestimestamp,
                order: result,
              });
            } else {
              this.setState({ order: result });
            }
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

    console.log('isCash: ', this.state.isCash);
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/' + localStorage.getItem('loggedInUserId') + '/order/91')
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              foodItems: result,
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
      2
    );
    console.log('foodItems: ', this.state.foodItems);
  }

  render() {
    return (
      <section className="section bg-white osahan-track-order-page position-relative">
        <Container className="pt-5 pb-5">
          {this.state.order.length === 0 ? (
            <Row className="d-flex align-items-center">
              <Col md={12}>
                <div className="bg-white p-4 shadow-lg mb-2">
                  <div className="mb-2">
                    <h5 className="text-center">There is no existing order.</h5>
                  </div>
                </div>
              </Col>
            </Row>
          ) : (
            <Row className="d-flex align-items-center">
              <Col md={12}>
                <div className="bg-white p-4 shadow-lg mb-2">
                  <div className="mb-2">
                    <small>Order #{this.state.orderId}</small>
                  </div>
                  <h5 className="mb-1 mt-1">
                    <Link to="/detail" className="text-black">
                      {this.state.resName}
                    </Link>
                  </h5>
                  <p className="text-gray mb-0">
                    <Icofont icon="clock-time" /> Estimate delivery Time:{' '}
                    {moment(this.state.orderPlacedTime).add(45, 'minutes').format('LLLL')}
                  </p>
                </div>
                <div className="bg-white p-4 shadow-lg">
                  <div className="osahan-track-order-detail po">
                    <h5 className="mt-0 mb-3">Order Details</h5>
                    <Row>
                      <Col md={5}>
                        <small>FROM</small>
                        <h6 className="mb-1 mt-1">
                          <Link to="/detail" className="text-black">
                            <Icofont icon="food-cart" /> {this.state.resName}
                          </Link>
                        </h6>
                        <p className="text-gray mb-5">
                          {this.state.resAddr} {this.state.resPC}
                        </p>
                        <small>DELIVER TO</small>
                        <h6 className="mb-1 mt-1">
                          <span className="text-black">
                            <Icofont icon="map-pins" /> {localStorage.getItem('loggedInUserName')}
                          </span>
                        </h6>
                        <p className="text-gray mb-0">{this.state.deliveryAddr}</p>
                      </Col>
                      <Col md={7}>
                        <div className="mb-2">
                          <small>
                            <Icofont icon="list" /> ITEMS
                          </small>
                        </div>
                        {this.state.order.map((item) => {
                          return (
                            <CartDropdownItem
                              icoIcon="ui-press"
                              iconClass="text-danger food-item"
                              title={item.fooditemname + ' x ' + item.quantity}
                              price={'$' + (item.quantity * parseFloat(item.price)).toFixed(2)}
                            />
                          );
                        })}

                        <hr />
                        <p className="text-black mb-0">
                          Deliver Fee:<span className="float-right text-secondary"> ${this.state.deliveryFee}</span>
                        </p>
                        <hr />
                        <p className="text-black mb-0">Special Request: {this.state.specialReq}</p>

                        <br />
                        <p className="mb-0 font-weight-bold text-black">
                          TOTAL BILL <span className="float-right text-secondary">${this.state.totalCost}</span>
                        </p>
                        <p className="mb-0 text-info">
                          <small>
                            {this.state.isCash === true ? 'Paid via Cash' : 'Paid via Credit/Debit card'}
                            <span className="float-right text-danger">$$$ OFF</span>
                          </small>
                        </p>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="bg-white p-4 shadow-lg mt-2">
                  <Row className="text-center">
                    <Col>
                      <Icofont icon="tasks" className="icofont-3x text-info" />
                      <p className="mt-1 font-weight-bold text-dark mb-0">Order Received</p>
                      <small className="text-info mb-0">{this.state.orderPlacedTime !== null ? 'YES' : ''}</small>
                    </Col>
                    <Col>
                      <Icofont icon="lunch" className="icofont-3x text-success" />
                      <p className="mt-1 font-weight-bold text-dark mb-0">Driver Arrived</p>
                      {this.state.riderArr !== null ? (
                        <small className="text-success mb-0">YES</small>
                      ) : (
                        <small className="text-danger mb-0">NO</small>
                      )}
                    </Col>
                    <Col>
                      <Icofont icon="delivery-time" className="icofont-3x text-primary" />
                      <p className="mt-1 font-weight-bold text-dark mb-0">Order Picked Up</p>
                      {this.state.riderPickUpDT !== null ? (
                        <small className="text-primary mb-0">YES</small>
                      ) : (
                        <small className="text-danger mb-0">NO</small>
                      )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    );
  }
}

export default TrackOrder;
