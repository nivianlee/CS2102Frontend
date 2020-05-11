import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Image, Media, Badge } from 'react-bootstrap';
import Icofont from 'react-icofont';
import * as moment from 'moment';
import AddRateRiderModal from '../modals/AddRateRiderModal';
import SERVER_PREFIX from '../ServerConfig';

class OrderCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deliveryDateTime: this.props.deliveredDate == null ? null : moment(this.props.deliveredDate).format('LLLL'),
      orderPlaceDateTime: this.props.orderDate == null ? null : moment(this.props.orderDate).format('LLLL'),
      showRate: false,
      ratings: [],
    };
  }

  componentDidMount() {
    this.loadRating();
  }

  reloadAllData = () => this.loadRating();

  loadRating() {
    setTimeout(
      fetch(
        SERVER_PREFIX +
          '/customers/rider/' +
          localStorage.getItem('loggedInUserId') +
          '/order/' +
          parseInt(this.props.orderNumber)
      )
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              ratings: result,
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
  hideModal = () => this.setState({ showRate: false });

  render() {
    return (
      <>
        <AddRateRiderModal
          reload={this.reloadAllData}
          show={this.state.showRate}
          onHide={this.hideModal}
          orderId={this.props.orderNumber}
        />
        <div className="bg-white card mb-4 order-list shadow-sm">
          <div className="gold-members p-4">
            <Media>
              <Image className="mr-4" src={this.props.image} alt={this.props.imageAlt} />
              <Media.Body>
                {this.state.deliveryDateTime ? (
                  <span className="float-right text-info">
                    Delivered on {this.state.deliveryDateTime}
                    <Icofont icon="check-circled" className="text-success ml-1" />
                  </span>
                ) : (
                  ''
                )}
                <h6 className="mb-2">
                  <Link to={this.props.detailLink} className="text-black">
                    {this.props.orderTitle}{' '}
                  </Link>
                </h6>
                <p className="text-gray mb-1">
                  <Icofont icon="location-arrow" /> Delivery Address: {this.props.address}
                </p>
                <p className="text-gray mb-3">
                  <Icofont icon="list" /> ORDER #{this.props.orderNumber}
                  <Icofont icon="clock-time" className="ml-2" /> Order placed: {this.state.orderPlaceDateTime}
                </p>
                <p className="text-dark">
                  Rider Rating:{' '}
                  <Badge className="text-danger">
                    {this.state.ratings.length === 0
                      ? 'Please rate our rider'
                      : this.state.ratings.map((item) => {
                          return item.rating;
                        })}
                  </Badge>
                  {this.props.orderProducts}
                </p>

                <hr />
                <div className="float-right">
                  {this.state.ratings.length === 0 ? (
                    <Link
                      className="btn btn-sm btn-outline-primary mr-1"
                      to="#"
                      onClick={() => this.setState({ showRate: true, orderId: this.props.orderNumber })}
                    >
                      <Icofont icon="ui-rate-blank" /> Rate Rider
                    </Link>
                  ) : (
                    ''
                  )}

                  <Link
                    className="btn btn-sm btn-primary"
                    to={{
                      pathname: '/invoice',
                      state: {
                        orderId: this.props.orderNumber,
                        resName: this.props.orderTitle,
                        resNum: this.props.resNum,
                        resAddr: this.props.resAddr,
                        deliveryAddr: this.props.address,
                        deliveryDateTime: this.state.deliveryDateTime,
                        orderPlaceDateTime: this.state.orderPlaceDateTime,
                        totalCost: this.props.orderTotal,
                        deliveryFee: this.props.deliveryFee,
                      },
                    }}
                  >
                    <Icofont icon="bill-alt" /> Invoice
                  </Link>
                </div>
                <p className="mb-0 text-black text-primary pt-2">
                  <span className="text-black font-weight-bold"> Total Paid:</span> ${this.props.orderTotal}
                </p>
              </Media.Body>
            </Media>
          </div>
        </div>
      </>
    );
  }
}

OrderCard.propTypes = {
  image: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  orderNumber: PropTypes.string.isRequired,
  orderDate: PropTypes.string.isRequired,
  deliveredDate: PropTypes.string,
  orderTitle: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  orderProducts: PropTypes.string.isRequired,
  helpLink: PropTypes.string.isRequired,
  detailLink: PropTypes.string.isRequired,
  orderTotal: PropTypes.string.isRequired,
};
export default OrderCard;
