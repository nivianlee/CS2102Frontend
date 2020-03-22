import React from 'react';
import OrderCard from '../common/OrderCard';
import SERVER_PREFIX from '../ServerConfig';

class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      orders: []
    };
  }

  componentWillMount() {
    console.log(localStorage.getItem('loggedInUserId'));
    fetch(SERVER_PREFIX + '/orders/' + localStorage.getItem('loggedInUserId'))
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            orders: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  render() {
    const { error, isLoaded, orders } = this.state;
    return (
      <>
        <div className='p-4 bg-white shadow-sm'>
          <h4 className='font-weight-bold mt-0 mb-4'>Past Orders</h4>
          {orders.map((item, index) => {
            return (
              <OrderCard
                image='/img/3.jpg'
                imageAlt=''
                orderNumber='25102589748'
                orderDate='Mon, Nov 12, 6:26 PM'
                deliveredDate='Mon, Nov 12, 7:18 PM'
                orderTitle="Gus's World Famous Fried Chicken"
                address='730 S Mendenhall Rd, Memphis, TN 38117, USA'
                orderProducts='Veg Masala Roll x 1, Veg Burger x 1, Veg Penne Pasta in Red Sauce x 1'
                orderTotal='$300'
                helpLink='#'
                detailLink='/detail'
              />
            );
          })}
        </div>
      </>
    );
  }
}
export default Orders;
