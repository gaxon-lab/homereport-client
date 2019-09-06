import React, {Component} from 'react';
import {Table} from "antd/lib/index";
import CustomerQuotesRow from "./CustomerQuotesRow";
import Widget from "../../../../components/Widget";

class CustomerQuoteRequests extends Component {

  onSelectRequest = record => {
    this.props.history.push(`/quote-detail/${record.quote_request_id}`);
  };

  render() {

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Quote Requests</h2>
          <Table rowKey="quote_request_id" columns={CustomerQuotesRow(this)}
                 dataSource={this.props.quoteRequests}
                 pagination={false}
                 className="gx-table-responsive"
                 rowClassName="gx-text-black"/>
        </Widget>
      </div>
    )
  };
}

export default CustomerQuoteRequests;
