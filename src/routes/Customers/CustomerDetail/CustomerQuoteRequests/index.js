import React, {Component} from 'react';
import {Button, Table} from "antd/lib/index";
import CustomerQuotesRow from "./CustomerQuotesRow";
import Widget from "../../../../components/Widget";
import PaymentDetail from "../../../QuoteRequests/PaymentDetail";

class CustomerQuoteRequests extends Component {

  state = {
    isPaymentShow: false,
    selectedQuote: null
  };

  onOpenPaymentModal = (quote) => {
    this.setState({isPaymentShow: true, selectedQuote: quote})
  };

  onToggleShowPayment = () => {
    this.setState({isPaymentShow: !this.state.isPaymentShow})
  };

  onSelectRequest = record => {
    this.props.history.push(`/quote-detail/${record.quote_request_id}`);
  };

  render() {
    const {isPaymentShow, selectedQuote} = this.state;
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Quote Requests</h2>
          <Table rowKey="quote_request_id" columns={CustomerQuotesRow(this)}
                 dataSource={this.props.quoteRequests}
                 pagination={false}
                 className="gx-table-responsive"
          />
        </Widget>
        {isPaymentShow ?
          <PaymentDetail isPaymentShow={isPaymentShow} onToggleShowPayment={this.onToggleShowPayment}
                         selectedQuote={selectedQuote}/> : null}
      </div>
    )
  };
}

export default CustomerQuoteRequests;
