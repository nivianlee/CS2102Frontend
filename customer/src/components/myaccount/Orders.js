import React from 'react';
import OrderCard from '../common/OrderCard';
import SERVER_PREFIX from '../ServerConfig';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      orders: [],
      ordersLength: 0,
    };
  }

  componentWillMount() {
    this.reloadData();
  }

  reloadData() {
    console.log(localStorage.getItem('loggedInUserId'));
    fetch(SERVER_PREFIX + '/customers/' + localStorage.getItem('loggedInUserId') + '/orders')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            orders: result,
            ordersLength: result.length,
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
    const { error, isLoaded, orders, ordersLength } = this.state;

    console.log('ordersLength: ' + ordersLength);

    return (
      <>
        <div className="p-4 bg-white shadow-sm">
          <h4 className="font-weight-bold mt-0 mb-4">Past Orders</h4>

          {orders.map((item, index) => {
            return (
              <OrderCard
                image="/img/3.jpg"
                imageAlt=""
                orderNumber={item.orderid}
                orderDate={item.orderplacedtimestamp}
                deliveredDate={item.riderdeliverordertimestamp}
                orderTitle={item.restaurantname}
                address={item.deliveryaddress}
                resNum={item.contactnum}
                orderTotal={item.totalcost}
                resAddr={item.address}
                deliveryFee={item.deliveryfeeamount}
                detailLink={'/restaurants/foods/'}
              />
            );
          })}
        </div>
      </>
    );
  }
}
export default Orders;
