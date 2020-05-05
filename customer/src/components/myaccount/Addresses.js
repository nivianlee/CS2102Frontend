import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import AddAddressModal from '../modals/AddAddressModal';
import EditAddressModal from '../modals/EditAddressModal';
import DeleteAddressModal from '../modals/DeleteAddressModal';
import AddressCard from '../common/AddressCard';
import SERVER_PREFIX from '../ServerConfig';

class Addresses extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showDeleteModal: false,
      showAddressModal: false,
      showEditModal: false,
      error: null,
      isLoaded: false,
      addresses: [],
      currAddress: '',
      currPostalCode: '',
      currAddId: '',
      // reloadNow: false,
    };
  }

  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
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

  hideDeleteModal = () => this.setState({ showDeleteModal: false });
  hideAddressModal = () => this.setState({ showAddressModal: false });
  hideEditModal = () => this.setState({ showEditModal: false });
  reloadAllData = () => this.reloadData();

  render() {
    return (
      <>
        <AddAddressModal
          show={this.state.showAddressModal}
          onHide={this.hideAddressModal}
          reload={this.reloadAllData}
        />
        <EditAddressModal
          addressId={this.state.currAddId}
          address={this.state.currAddress}
          postalCode={this.state.currPostalCode}
          show={this.state.showEditModal}
          onHide={this.hideEditModal}
          reload={this.reloadAllData}
        />
        <DeleteAddressModal
          addressId={this.state.currAddId}
          address={this.state.currAddress}
          postalCode={this.state.currPostalCode}
          show={this.state.showDeleteModal}
          onHide={this.hideDeleteModal}
          reload={this.reloadAllData}
        />
        <div className="p-4 bg-white shadow-sm">
          <Row>
            <Col md={9}>
              <h4 className="font-weight-bold mt-0 mb-3">Manage Addresses</h4>
            </Col>
            <Col md={3}>
              <Button
                onClick={() => this.setState({ showAddressModal: true })}
                type="button"
                variant="primary"
                className="text-center justify-content-center"
              >
                Add New Address
              </Button>
            </Col>
            <Col md={12}>
              {this.state.addresses.map((item, index) => {
                return (
                  <AddressCard
                    boxClass="shadow-sm"
                    title="Recent Address"
                    iconclassName="icofont-3x"
                    key={item.addressid}
                    isSaved={item.issaved}
                    address={item.address}
                    postalCode={item.postalcode}
                    onEditClick={() =>
                      this.setState({
                        showEditModal: true,
                        currAddId: item.addressid,
                        currAddress: item.address,
                        currPostalCode: item.postalcode,
                      })
                    }
                    onDeleteClick={() =>
                      this.setState({
                        showDeleteModal: true,
                        currAddId: item.addressid,
                        currAddress: item.address,
                        currPostalCode: item.postalcode,
                      })
                    }
                  />
                );
              })}
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
export default Addresses;
