import React, {Component} from 'react';
import Widget from "../../components/Widget";
import {Breadcrumb, Button, Col, Divider, Input, Row} from "antd";
import {Link} from "react-router-dom";
import ReportAssigning from "./ReportAssigning";
import {connect} from "react-redux";
import {onGetStaff} from "../../appRedux/actions/StaffList";
import {onGetReportDetail, onNullifyCurrentReport} from "../../appRedux/actions/HomeReports";
import {
  fetchError,
  fetchStart,
  fetchSuccess,
  onAddNewComment,
  onAddReportDocument,
  onAssignStaffToReport,
  onGetReportComments,
  onGetReportDocuments
} from "../../appRedux/actions";
import InfoView from "../../components/InfoView";
import ConversationCell from "./ConversationCell";
import moment from "moment";
import DocumentUploading from "./DocumentUploading/index";


const {TextArea} = Input;


class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    }
  }

  componentDidMount() {
    const reportId = this.props.match.params.id;
    this.props.onGetReportDetail(reportId);
    this.onGetStaffList(1, 10);
    this.props.onGetReportComments(reportId);
    this.props.onGetReportDocuments(reportId);
    this.timeInterval = setInterval(() => this.props.onGetReportComments(reportId), 30000)
  }

  onGetStaffList = (currentPage, itemsPerPage, filterText, updatingContent) => {
    this.props.onGetStaff(currentPage, itemsPerPage, filterText, updatingContent);
  };

  onAssignStaff = (userId) => {
    this.props.onAssignStaffToReport(this.props.currentReport.report_id, userId)
  };

  onMessageEnter = (e) => {
    this.setState({comment: e.target.value})
  };

  onSubmitMessage = () => {
    this.onSendMessage();
  };

  onSendMessage = () => {
    const currentReport = this.props.currentReport;
    const comment = this.state.comment;
    if (this.state.comment !== '') {
      this.props.onAddNewComment(currentReport.report_id, {
        comment: comment
      });
      setTimeout(() =>
        this.setState({comment: ''}), 20)
    }
  };

  onUploadDocument = (documentId, documentName) => {
    console.log("documentName", documentName)
    const document = {media_id: documentId, caption: documentName}
    this.props.onAddReportDocument(this.props.currentReport.report_id, document)
  };

  onGoBackToList = () => {
    this.props.history.goBack()
  };

  componentWillUnmount() {
    this.props.onNullifyCurrentReport();
    clearInterval(this.timeInterval);
  }

  render() {
    const {staffList, currentReport, totalItems, reportComments, reportDocuments} = this.props;
    const {comment} = this.state;
    let assignedTo = null;
    if (currentReport && currentReport.assigned_user_id) {
      assignedTo = {
        id: currentReport.assigned_user_id,
        image: currentReport.assigned_user_image,
        name: currentReport.assigned_user_name,
        email: currentReport.assigned_user_email
      }
    }

    return (
      <div className="gx-main-layout-content">
        {currentReport ?
          <Widget styleName="gx-card-filter">
            <i className="icon icon-arrow-left gx-mb-3" onClick={this.onGoBackToList}/>
            <h2 className="gx-text">Home Report Detail</h2>
            <Breadcrumb className="gx-mb-4">
              <Breadcrumb.Item>
                <Link to="/home-reports">Home Reports</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/report-detail/${currentReport.id}`}
                      className="gx-text-primary">{currentReport.reference_no}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>
            <Row>
              <Col xl={11} lg={12} md={12} sm={12} xs={24}>
                <Row>
                  <Col span={14}>
                    <div className="gx-text-grey">Reference No.</div>
                    <div className="gx-text-blue gx-mt-2 gx-font-weight-medium">{currentReport.reference_no}</div>
                  </Col>
                  <Col span={10}>
                    <div className="gx-text-grey">Quote Amount</div>
                    <div className="gx-mt-2 gx-font-weight-bold">${currentReport.quote_amount}</div>
                  </Col>
                </Row>
                <Row className="gx-mt-4">
                  <Col span={14}>
                    <div className="gx-text-grey">Customer Detail</div>
                    <div
                      className=" gx-mt-2 gx-font-weight-medium">{currentReport.customer_name ? currentReport.customer_name : "NA"}</div>
                  </Col>
                  <Col span={10}>
                    <div className="gx-text-grey">Contact Detail</div>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.day_time_tel} Day</div>
                    <div className="gx-mt-1 gx-font-weight-medium">{currentReport.evening_time_tel} Evening</div>
                  </Col>
                </Row>
                <Row className="gx-my-4">
                  <Col span={14}>
                    <div className="gx-text-grey">Property</div>
                    <div className="gx-mt-2">
                      <p className="gx-mb-1 gx-font-weight-medium">{currentReport.address1}</p>
                      <p className="gx-mb-1 gx-font-weight-medium">{currentReport.city}, Scotland</p>
                      <p className="gx-mb-1 gx-font-weight-medium"> Zip -{currentReport.postcode}</p>
                    </div>
                  </Col>
                  <Col span={10}>
                    <p className="gx-text-grey">Estimated Price & Age</p>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.property_price_value}</div>
                    <div className=" gx-font-weight-medium">{currentReport.property_age_value}</div>
                  </Col>
                </Row>
                <div className="gx-mb-4"><i className="gx-font-weight-medium">Payment
                  Date and Time</i> : {moment(currentReport.report_created_at).format('MMMM Do YYYY, h:mm:ss a')}</div>
              </Col>
              <Col xl={13} lg={12} md={12} sm={12} xs={24}>
                <DocumentUploading onUploadDocument={this.onUploadDocument}
                                   reportDocuments={reportDocuments}
                                   fetchError={this.props.fetchError}
                                   fetchSuccess={this.props.fetchSuccess}
                                   fetchStart={this.props.fetchStart}/>
                <ReportAssigning staffList={staffList}
                                 totalItems={totalItems}
                                 onAssignStaff={this.onAssignStaff}
                                 onGetStaffList={this.onGetStaffList}
                                 assignedTo={assignedTo}/>
              </Col>
            </Row>
            <Divider/>
            {currentReport.assigned_user_id ?
              <div>
                <div className="gx-py-1">
                  <h3 className="gx-mb-0 gx-mb-sm-1">Comments</h3>
                </div>
                {reportComments.length > 0 ?
                  <div>
                    {reportComments.map((conversation, index) =>
                      <ConversationCell key={index} conversation={conversation}/>
                    )}
                  </div> : "No Comment yet, Write first comment!"}

                <div className="gx-flex-column">
                  <TextArea row={4} placeholder="Add a comment..." value={comment} onKeyPress={(event) => {
                    if (event.charCode === 13 && !event.shiftKey) {
                      this.onSubmitMessage()
                    }
                  }} className="gx-form-control-lg gx-my-3"
                            onChange={(e) => this.onMessageEnter(e)}/>
                </div>
                <Button type="primary" className="gx-my-3" onClick={this.onSubmitMessage}
                        disabled={comment === ""}>Send Message</Button>
              </div> : null}
          </Widget> : null}
        <InfoView/>
      </div>
    )
  }
}

const mapStateToProps = ({staff, homeReports}) => {
  const {staffList, totalItems} = staff;
  const {currentReport, reportComments, reportDocuments} = homeReports;
  return {staffList, totalItems, currentReport, reportComments, reportDocuments};
};

export default connect(mapStateToProps, {
  onGetStaff,
  onGetReportDetail,
  onNullifyCurrentReport,
  onAssignStaffToReport,
  onGetReportComments,
  onAddNewComment,
  fetchStart,
  fetchSuccess,
  fetchError,
  onAddReportDocument,
  onGetReportDocuments
})(ReportDetail);

