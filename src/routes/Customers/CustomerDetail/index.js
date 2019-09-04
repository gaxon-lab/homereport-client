import React, {Component} from 'react';
import CustomerInfo from "./CustomerInfo";
import CustomerQuoteRequests from "./CustomerQuoteRequests";
import CustomerHomeReports from "./CustomerHomeReports";
import {connect} from "react-redux";
import {onGetCustomerDetail, onNullifyCustomerDetails} from "../../../appRedux/actions";


class CustomerDetail extends Component {

  componentDidMount() {
    const customerId = this.props.match.params.id;
    this.props.onGetCustomerDetail(customerId);
  };

  componentWillUnmount() {
    this.props.onNullifyCustomerDetails();
  };

  onGoBackToList = () => {
    this.props.history.goBack()
  };

  render() {
    const {currentCustomer} = this.props;
    return (
      <div>
        {currentCustomer ?
          <div>
            <CustomerInfo currentCustomer={currentCustomer.customer}
                          onGoBackToList={this.onGoBackToList}/>
            <CustomerQuoteRequests quoteRequests={currentCustomer.quoteRequests}
                                   onSelectRequest={this.onSelectRequest}
                                   history={this.props.history}/>
            <CustomerHomeReports homeReports={currentCustomer.reports}
                                 history={this.props.history}/>
          </div>
          : null}
      </div>
    )
  }
}

const mapPropsToState = ({customers, common}) => {
  const {currentCustomer} = customers;
  const {updatingContent} = common;
  return {currentCustomer, updatingContent};
};

export default connect(mapPropsToState, {
  onGetCustomerDetail, onNullifyCustomerDetails
})(CustomerDetail);
