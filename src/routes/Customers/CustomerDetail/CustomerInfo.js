import React from 'react';
import Widget from "../../../components/Widget";
import {Avatar, Col, Divider, Row} from "antd";

const CustomerInfo = ({currentCustomer, onGoBackToList}) => {
  return (
    <div className="gx-main-layout-content">
      <Widget styleName="gx-card-filter">
        <div className="gx-mb-3 gx-border gx-rounded-circle gx-size-24 gx-d-flex gx-justify-content-center"
             style={{borderColor: "black"}}>
          <i className="icon icon-arrow-left gx-link gx-text-black" onClick={() => onGoBackToList()}/>
        </div>
        <h2 className="gx-widget-heading">Customer Detail</h2>
        <div className="gx-mt-3">
          <Row>
            <Col span={6}>
              <div className="gx-media gx-flex-nowrap gx-align-items-center">
                {currentCustomer.profile_pic.length > 0 ?
                  <Avatar className="gx-mr-3 gx-size-50" src={currentCustomer.profile_pic[0].src}/> :
                  <Avatar className="gx-mr-3 gx-size-50"
                          style={{backgroundColor: '#00CED1'}}>{currentCustomer.first_name[0].toUpperCase()}</Avatar>}
                <div className="gx-media-body">
                  <span
                    className="gx-mb-0 gx-text-capitalize">{currentCustomer.first_name + " " + currentCustomer.last_name}</span>
                </div>
              </div>
            </Col>
            <Col span={18}>
              <Row>
                <Col span={6}>
                  Email
                </Col>
                <Col span={18}>
                  {currentCustomer.email}
                </Col>
                <Divider/>
              </Row>
              <Row>
                <Col span={6}>
                  Phone
                </Col>
                <Col span={18}>
                  {currentCustomer.phone ? currentCustomer.phone : "NA"}
                </Col>
                <Divider/>
              </Row>
              <Row>
                <Col span={6}>
                  Address
                </Col>
                <Col span={18}>
                  {currentCustomer.billing_info && currentCustomer.billing_info.length > 0 ?
                    <div>{`${currentCustomer.billing_info[0].address1}, ${currentCustomer.billing_info[0].city}, Scotland - ${currentCustomer.billing_info[0].postcode}`}</div>
                    : "NA"}
                </Col>
                <Divider/>
              </Row>
            </Col>
          </Row>
        </div>
      </Widget>
    </div>
  )
};

export default CustomerInfo;
