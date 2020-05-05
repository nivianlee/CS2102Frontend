import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Media } from 'react-bootstrap';
import PropTypes from 'prop-types';
import * as Icon from 'react-bootstrap-icons';

class ChooseCreditCard extends React.Component {
  render() {
    return (
      <Card className={'bg-white addresses-item mb-4 ' + this.props.boxClass}>
        <div className="gold-members p-4">
          <Media>
            <div className="mr-3">
              <Icon.CreditCard size={30} />
            </div>
            <div className="media-body">
              <h6 className="mb-1">Card Name: {this.props.name}</h6>
              {this.props.name ? <div>Card Number: {this.props.title} </div> : ''}
              {this.props.subTitle ? <p>{this.props.subTitle}</p> : ''}
              <p className="mb-0 text-black font-weight-bold">
                <Link className="btn btn-sm btn-success mr-2" to="#" onClick={this.props.onCCHereClick}>
                  {' '}
                  SELECT{' '}
                </Link>
              </p>
            </div>
          </Media>
        </div>
      </Card>
    );
  }
}

ChooseCreditCard.propTypes = {
  title: PropTypes.string.isRequired,
  icoIcon: PropTypes.string.isRequired,
  iconclassName: PropTypes.string,
  address: PropTypes.string,
  onDeliverHere: PropTypes.func,
  onAddNewClick: PropTypes.func,
  type: PropTypes.string.isRequired,
};

ChooseCreditCard.defaultProps = {
  type: 'hasAddress',
};

export default ChooseCreditCard;
