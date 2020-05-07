import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container, Image, Table } from 'react-bootstrap';
import Icofont from 'react-icofont';
import HeadingValue from './common/HeadingValue';
import PageTitle from './common/PageTitle';
import SERVER_PREFIX from './ServerConfig';

class Invoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderId: this.props.location.state == null ? null : this.props.location.state.orderId,
      resName: this.props.location.state == null ? null : this.props.location.state.resName,
      resNum: this.props.location.state == null ? null : this.props.location.state.resNum,
      resAddr: this.props.location.state == null ? null : this.props.location.state.resAddr,
      deliveryAddr: this.props.location.state == null ? null : this.props.location.state.deliveryAddr,
      deliveryDateTime: this.props.location.state == null ? null : this.props.location.state.deliveryDateTime,
      orderPlaceDateTime: this.props.location.state == null ? null : this.props.location.state.orderPlaceDateTime,
      totalCost: this.props.location.state == null ? null : this.props.location.state.totalCost,
      deliveryFee: this.props.location.state == null ? null : this.props.location.state.deliveryFee,
      foodItems: [],
    };
    // console.log('orderID: ', this.state.orderId);
    // console.log('resName: ', this.state.resName);
    // console.log('totalCost: ', this.state.totalCost);+
    // console.log('deliveryFee: ', this.state.deliveryFee);
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/' + localStorage.getItem('loggedInUserId') + '/order/' + this.state.orderId)
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
      1
    );
  }

  render() {
    return (
      <>
        <PageTitle title="Invoice" />
        <section className="section pt-5 pb-5">
          <Container>
            <Row>
              <Col md={8} className="mx-auto">
                <div className="p-5 osahan-invoice bg-white shadow-sm">
                  <Row className="mb-1 pb-3">
                    <Col md={10} xs={11}>
                      <h4 className="mt-0">
                        Thanks for choosing <strong className="text-secondary">{this.state.resName}.</strong>
                      </h4>
                      <br />
                      <h6> Here are your order details: </h6>
                    </Col>
                    <Col md={2} xs={1} className="pl-0 text-right">
                      <Image alt="logo" src="/img/favicon.png" />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <HeadingValue heading="Order No:" value={this.state.orderId} className="text-black" />
                      <HeadingValue heading="Order placed at:" value={this.state.orderPlaceDateTime} />
                      <HeadingValue heading="Order delivered at:" value={this.state.deliveryDateTime} />
                      <HeadingValue heading="Order Status:" value="Delivered" valueClassName="text-success" />
                    </Col>
                    <Col md={4}>
                      <HeadingValue heading="Delivery To:" className="text-black" />
                      <HeadingValue className="text-primary" value={localStorage.getItem('loggedInUserName')} />
                      <HeadingValue heading={this.state.deliveryAddr} />
                    </Col>
                  </Row>
                  <Row className="mt-5">
                    <Col md={12}>
                      <HeadingValue heading="Ordered from:" />
                      <h6 className="mb-1 text-black">
                        <strong>{this.state.resName}</strong>
                      </h6>
                      <HeadingValue heading={this.state.resAddr + ' +65 ' + this.state.resNum} />
                      <Table className="mt-3 mb-0">
                        <thead className="thead-light">
                          <tr>
                            <th className="text-black font-weight-bold" scope="col">
                              Item Name
                            </th>
                            <th className="text-right text-black font-weight-bold" scope="col">
                              Quantity
                            </th>
                            <th className="text-right text-black font-weight-bold" scope="col">
                              Price
                            </th>
                            <th className="text-right text-black font-weight-bold" scope="col">
                              Subtotal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.foodItems.map((item, key) => {
                            return (
                              <tr>
                                <td>{item.fooditemname}</td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">${item.price}</td>
                                <td className="text-right">${item.quantity * item.price}</td>
                              </tr>
                            );
                          })}

                          <tr>
                            <td className="text-right" colSpan="3">
                              Item Total:
                            </td>
                            <td className="text-right"> ${parseFloat(this.state.totalCost).toFixed(2)}</td>
                          </tr>

                          <tr>
                            <td className="text-right" colSpan="3">
                              Delivery Charges:
                            </td>
                            <td className="text-right"> ${this.state.deliveryFee}</td>
                          </tr>
                          <tr>
                            <td className="text-right" colSpan="3">
                              Discount Applied:
                            </td>
                            <td className="text-right"> $XX</td>
                          </tr>
                          <tr>
                            <td className="text-right" colSpan="3">
                              <h6 className="text-success">Grand Total:</h6>
                            </td>
                            <td className="text-right">
                              <h6 className="text-success">
                                ${parseFloat(this.state.totalCost) + parseFloat(this.state.deliveryFee)}
                              </h6>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Invoice;
