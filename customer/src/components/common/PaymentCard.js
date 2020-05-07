import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Media } from 'react-bootstrap';
import Icofont from 'react-icofont';
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';

class PaymentCard extends React.Component {
  render() {
    return (
      <Card className={'bg-white addresses-item mb-4 ' + this.props.boxClass}>
        <div className="gold-members p-4">
          <Media>
            {/* <Image src={this.props.logoImage} alt={this.props.imageAlt} className={this.props.imageclassName} /> */}
            <div className="mr-3">
              <Icon.CreditCard size={30} />
            </div>

            <Media.Body>
              <h6 className="mb-1">Card Name: {this.props.name}</h6>
              {this.props.name ? <div>Card Number: {this.props.title} </div> : ''}
              {this.props.subTitle ? <p>{this.props.subTitle}</p> : ''}
              <p className="mb-0 text-black font-weight-bold">
                <Link className="text-primary mr-3" to="#" onClick={this.props.onEditClick}>
                  <Icofont icon="ui-edit" /> EDIT
                </Link>
                <Link className="text-danger" to="#" onClick={this.props.onDeleteClick}>
                  <Icofont icon="ui-delete" /> DELETE
                </Link>
              </p>
            </Media.Body>
          </Media>
        </div>
      </Card>
    );
  }
}

PaymentCard.propTypes = {
  title: PropTypes.string.isRequired,
  // logoImage: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  // imageAlt: PropTypes.string,
  // imageclassName: PropTypes.string,
  // onClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};
PaymentCard.defaultProps = {
  subTitle: '',
  // imageAlt: '',
  // imageclassName: '',
};

export default PaymentCard;
