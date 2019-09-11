import React, {Component} from 'react';
import {Table} from "antd/lib/index";
import CustomerReportsRow from "./CustomerReportsRow";
import Widget from "../../../../components/Widget";

class CustomerHomeReports extends Component {

  onSelectReport = record => {
    this.props.history.push(`/report-detail/${record.report_id}`);
  };

  render() {
    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Home Reports</h2>
          <Table rowKey="id" columns={CustomerReportsRow(this)}
                 dataSource={this.props.homeReports}
                 pagination={false}
                 className="gx-table-responsive"
                 />
        </Widget>
      </div>
    )
  }
};

export default CustomerHomeReports;

