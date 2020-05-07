import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PageTitle from './common/PageTitle';
import CouponCard from './common/CouponCard';
import SERVER_PREFIX from './ServerConfig';

class Offers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promotions: [],
      copied: false,
    };
  }

  componentDidMount() {
    this.loadPromotions();
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

  render() {
    return (
      <>
        <PageTitle title="Offers for you" subTitle="Explore top deals and offers exclusively for you!" />
        <section className="section pt-5 pb-5">
          <Container>
            <Row>
              <Col md={12}>
                <h4 className="font-weight-bold mt-0 mb-3">Available Coupons</h4>
              </Col>
              {this.state.promotions.map((item, index) => {
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
              })}
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

export default Offers;
