import React, {Component} from 'react';
import Widget from "../../components/Widget";
import {Breadcrumb, Col, Row} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {onGetQuoteRequestDetail, onNullifyCurrentQuote} from "../../appRedux/actions/QuoteRequests";
import InfoView from "../../components/InfoView";

class QuoteDetail extends Component {

  componentDidMount() {
    const requestId = this.props.match.params.id;
    this.props.onGetQuoteRequestDetail(requestId);
  }

  componentWillUnmount() {
    this.props.onNullifyCurrentQuote();
  }

  onGoBackToList = () => {
    this.props.history.goBack()
  };

  render() {
    const {currentQuote} = this.props;
    return (
      <div className="gx-main-layout-content">
        {currentQuote ?
          <Widget styleName="gx-card-filter">
            <i className="icon icon-arrow-left gx-mb-3" onClick={this.onGoBackToList}/>
            <h2 className="gx-text">Quote Requests</h2>
            <Breadcrumb className="gx-mb-4">
              <Breadcrumb.Item>
                <Link to="/quote-requests">Quote Requests</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/quote-detail/${currentQuote.id}`}
                      className="gx-text-primary">{currentQuote.reference_no}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div>
              <Row>
                <Col span={6}>
                  <div className="gx-text-grey">Reference No.</div>
                  <div className="gx-text-blue gx-mt-2 gx-font-weight-medium">{currentQuote.reference_no}</div>
                </Col>
                <Col span={18}>
                  <div className="gx-text-grey">Quote Amount</div>
                  <div className="gx-mt-2 gx-font-weight-bold">${currentQuote.quote_amount}</div>
                </Col>
              </Row>
              <Row className="gx-mt-4">
                <Col span={6}>
                  <div className="gx-text-grey">Customer Detail</div>
                  <div
                    className=" gx-mt-2 gx-font-weight-medium">{currentQuote.customer_name ? currentQuote.customer_name : "NA"}</div>
                </Col>
                <Col span={18}>
                  <div className="gx-text-grey">Contact Detail</div>
                  <div className=" gx-mt-2 gx-font-weight-medium">{currentQuote.day_time_tel} Day</div>
                  <div className="gx-mt-1 gx-font-weight-medium">{currentQuote.evening_time_tel} Evening</div>
                </Col>
              </Row>
              <Row className="gx-my-4">
                <Col span={6}>
                  <div className="gx-text-grey">Property</div>
                  <div className="gx-mt-2">
                    <p className="gx-mb-1 gx-font-weight-medium">{currentQuote.address1}</p>
                    <p className="gx-mb-1 gx-font-weight-medium">{currentQuote.city}, Scotland</p>
                    <p className="gx-mb-1 gx-font-weight-medium"> Zip -{currentQuote.postcode}</p>
                  </div>
                </Col>
                <Col span={18}>
                  <p className="gx-text-grey">Estimated Price & Age</p>
                  <div className=" gx-mt-2 gx-font-weight-medium">{currentQuote.property_price_value}</div>
                  <div className=" gx-font-weight-medium">{currentQuote.property_age_value}</div>
                </Col>
              </Row>
            </div>
          </Widget> : null}
        <InfoView/>
      </div>
    )
  }
}

const mapPropsToState = ({quoteRequests}) => {
  const {currentQuote} = quoteRequests;
  return {currentQuote};
};

export default connect(mapPropsToState, {
  onGetQuoteRequestDetail, onNullifyCurrentQuote
})(QuoteDetail);

