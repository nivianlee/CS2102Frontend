import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel3';
import TopSearch from './home/TopSearch';
import ProductBox from './home/ProductBox';
import CardItem from './common/CardItem';
import SectionHeading from './common/SectionHeading';
import FontAwesome from './common/FontAwesome';
import SERVER_PREFIX from './ServerConfig';

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      restaurants: [],
    };
  }

  componentWillMount() {
    fetch(SERVER_PREFIX + '/restaurants')
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            restaurants: result,
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
    return (
      <>
        <section className="section pt-5 pb-5 products-section">
          <Container>
            <SectionHeading
              heading="Welcome to KinKao!"
              subHeading="Top restaurants, cafes, pubs, and bars in Singapore, based on trends"
            />
            <Row>
              <Col md={12}>
                <OwlCarousel nav loop {...options} className="owl-carousel-four owl-theme">
                  {this.state.restaurants.map((item, key) => {
                    return (
                      <div className="item" key={key}>
                        <CardItem
                          title={item.restaurantname}
                          // subTitle="North Indian • American • Pure veg"
                          imageAlt="Product"
                          image={'img/restaurants/restaurant_' + item.restaurantid + '.jpg'}
                          imageClass="img-fluid fixed item-img"
                          // linkUrl="detail"
                          // offerText="65% off | Use Coupon OSAHAN50"
                          // time="20–25 min"
                          // price="$250 FOR TWO"
                          // showPromoted={true}
                          promotedVariant="dark"
                          favIcoIconColor="text-danger"
                          // rating="3.1 (300+)"
                        />
                      </div>
                    );
                  })}
                </OwlCarousel>
              </Col>
            </Row>
          </Container>
        </section>
      </>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 4,
    },
  },

  lazyLoad: true,
  pagination: false.toString(),
  loop: true,
  dots: false,
  autoPlay: 2000,
  nav: true,
  navText: ["<i class='fa fa-chevron-left'></i>", "<i class='fa fa-chevron-right'></i>"],
};

export default Index;
