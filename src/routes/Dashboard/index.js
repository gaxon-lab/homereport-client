import React, {Component} from 'react';
import {Col, Row} from "antd";
import SummaryDesign from "./SummaryDesign";
import {connect} from "react-redux";
import {onGetDashboardInfo} from "../../appRedux/actions/Dashboard";

class Dashboard extends Component {

  componentDidMount() {
    this.props.onGetDashboardInfo();
  }

  render() {
    const {dashboardData} = this.props;

    return (
      <div className="gx-main-content">
        {dashboardData ?
        <Row>
          <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
            <SummaryDesign icon="orders" iconColor="geekblue" title={dashboardData.total_quote_request}
                           subTitle="Total Quote Requests"/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
            <SummaryDesign icon="tickets" iconColor="geekblue" title={dashboardData.total_report}
                           subTitle="Total Home Reports"/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
            <SummaryDesign icon="signup" iconColor="geekblue" title={dashboardData.total_customer}
                           subTitle="Total Customers"/>
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={12} className="gx-col-full">
            <SummaryDesign icon="contacts" iconColor="geekblue" title={dashboardData.total_staff}
                           subTitle="Total Staff"/>
          </Col>
        </Row> : null}
      </div>
    );
  }
}

const mapPropsToState = ({dashboard, common}) => {
  const {dashboardData} = dashboard;
  const {updatingContent} = common;
  return {dashboardData, updatingContent};
};

export default connect(mapPropsToState, {
  onGetDashboardInfo
})(Dashboard);
