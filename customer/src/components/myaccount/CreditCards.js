import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import PaymentCard from '../common/PaymentCard';
import DeleteCreditCardModal from '../modals/DeleteCreditCardModal';
import AddCreditCardModal from '../modals/AddCreditCardModal';
import EditCreditCardModal from '../modals/EditCreditCardModal';
import SERVER_PREFIX from '../ServerConfig';

class CreditCards extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      showAddModal: false,
      showDeleteModal: false,
      showEditModal: false,
      creditCards: [],
      currCCNum: '',
      currCCName: '',
      currCCExpMth: '',
      currCCExpYear: '',
    };
  }
  componentDidMount() {
    this.reloadData();
  }

  reloadData() {
    setTimeout(
      fetch(SERVER_PREFIX + '/customers/creditcards/' + localStorage.getItem('loggedInUserId'))
        .then((res) => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              creditCards: result,
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

  hideCloseModal = () => this.setState({ showAddModal: false, showEditModal: false, showDeleteModal: false });
  reloadAllData = () => this.reloadData();

  render() {
    return (
      <>
        <AddCreditCardModal show={this.state.showAddModal} onHide={this.hideCloseModal} reload={this.reloadAllData} />
        <EditCreditCardModal
          ccName={this.state.currCCName}
          ccNum={this.state.currCCNum}
          ccExpMM={this.state.currCCExpMth}
          ccExpYYYY={this.state.currCCExpYear}
          show={this.state.showEditModal}
          onHide={this.hideCloseModal}
          reload={this.reloadAllData}
        />
        <DeleteCreditCardModal
          ccName={this.state.currCCName}
          ccNum={this.state.currCCNum}
          show={this.state.showDeleteModal}
          onHide={this.hideCloseModal}
          reload={this.reloadAllData}
        />

        <div className="p-4 bg-white shadow-sm">
          <Row>
            <Col md={9}>
              <h4 className="font-weight-bold mt-0 mb-3">Credit Cards</h4>
            </Col>
            <Col md={3}>
              <Button
                onClick={() => this.setState({ showAddModal: true })}
                type="button"
                variant="primary"
                className="text-center justify-content-center"
              >
                Add Credit Card
              </Button>
            </Col>
            <Col md={12}>
              {this.state.creditCards.map((item) => {
                return (
                  <PaymentCard
                    title={item.creditcardnumber}
                    name={item.creditcardname}
                    imageclassName="mr-3"
                    iconclassName="icofont-3x"
                    subTitle={'Valid Until: ' + item.expirymonth + '/' + item.expiryyear}
                    // onClick={() => this.setState({ showDeleteModal: true })}
                    onEditClick={() =>
                      this.setState({
                        showEditModal: true,
                        currCCNum: item.creditcardnumber,
                        currCCName: item.creditcardname,
                        currCCExpMth: item.expirymonth,
                        currCCExpYear: item.expiryyear,
                      })
                    }
                    onDeleteClick={() =>
                      this.setState({
                        showDeleteModal: true,
                        currCCNum: item.creditcardnumber,
                        currCCName: item.creditcardname,
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
export default CreditCards;
