import React, {Component} from 'react';
import {Table} from "antd/lib/index";
import CustomerQuotesRow from "./CustomerQuotesRow";
import Widget from "../../../../components/Widget";
import PaymentDetail from "../../../QuoteRequests/PaymentDetail";

class CustomerQuoteRequests extends Component {

  state = {
    isPaymentShow: false,
    selectedQuote: null,
    quoteRequests: this.props.currentCustomer.quoteRequests
  };

  onOpenPaymentModal = (quote) => {
    this.setState({isPaymentShow: true, selectedQuote: quote})
  };

  onToggleShowPayment = () => {
    this.setState({isPaymentShow: !this.state.isPaymentShow})
  };

  onFilterQuoteRequest = (quoteId) => {
    this.setState({quoteRequests: this.state.quoteRequests.filter(quote => quote.quote_request_id !== quoteId)})
  };

  onSelectRequest = record => {
    this.props.history.push(`/quote-detail/${record.quote_request_id}`);
  };

  render() {
    const {isPaymentShow, selectedQuote, quoteRequests} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Quote Requests</h2>
          <Table rowKey="quote_request_id" columns={CustomerQuotesRow(this)}
                 dataSource={quoteRequests}
                 pagination={false}
                 className="gx-table-responsive"
          />
        </Widget>
        {isPaymentShow ?
          <PaymentDetail isPaymentShow={isPaymentShow} onToggleShowPayment={this.onToggleShowPayment}
                         selectedQuote={selectedQuote} onFilterQuoteRequest={this.onFilterQuoteRequest}/> : null}
      </div>
    )
  };
}

export default CustomerQuoteRequests;
