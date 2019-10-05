import React, {Component} from 'react';
import CustomerInfo from "./CustomerInfo";
import CustomerQuoteRequests from "./CustomerQuoteRequests";
import CustomerHomeReports from "./CustomerHomeReports";
import {connect} from "react-redux";
import {onGetCustomerDetail, onNullifyCustomerDetails} from "../../../appRedux/actions";
import InfoView from "../../../components/InfoView";


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
                          quoteRequests={currentCustomer.quoteRequests}
                          homeReports={currentCustomer.reports}
                          onGoBackToList={this.onGoBackToList}/>

            <CustomerQuoteRequests quoteRequests={currentCustomer.quoteRequests}
                                   history={this.props.history}
                                   customerId={this.props.match.params.id}
                                   onToggleAddQuote={this.onToggleAddQuote}/>

            <CustomerHomeReports homeReports={currentCustomer.reports}
                                 history={this.props.history}/>
          </div>
          : null}
        <InfoView/>
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
