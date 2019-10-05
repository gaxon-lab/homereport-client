import React, {Component} from 'react';
import CustomerInfo from "./CustomerInfo";
import CustomerQuoteRequests from "./CustomerQuoteRequests";
import CustomerHomeReports from "./CustomerHomeReports";
import {connect} from "react-redux";
import {onGetCustomerDetail, onNullifyCustomerDetails} from "../../../appRedux/actions";
import AddNewQuote from "../../QuoteRequests/AddNewQuote";
import InfoView from "../../../components/InfoView";


class CustomerDetail extends Component {

  state = {
    isAddQuote: false
  };

  componentDidMount() {
    const customerId = this.props.match.params.id;
    this.props.onGetCustomerDetail(customerId);
  };

  componentWillUnmount() {
    this.props.onNullifyCustomerDetails();
  };

  onToggleAddQuote = () => {
    this.setState({isAddQuote: !this.state.isAddQuote})
  };

  onGoBackToList = () => {
    this.props.history.goBack()
  };

  render() {
    console.log("currentCustomer", this.props.currentCustomer)
    const {isAddQuote} = this.state;
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
        {isAddQuote ? <AddNewQuote isAddQuote={isAddQuote} onToggleAddQuote={this.onToggleAddQuote}
                                   selectedCustomer={currentCustomer.customer}/> : null}
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
