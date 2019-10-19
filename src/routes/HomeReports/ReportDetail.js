import React, {Component} from 'react';
import Widget from "../../components/Widget";
import {Avatar, Breadcrumb, Button, Col, DatePicker, Icon, Input, message, Row, Select, Tag} from "antd";
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
  onGetReportDocuments,
  onSetSurveyDate
} from "../../appRedux/actions";
import InfoView from "../../components/InfoView";
import ConversationCell from "./ConversationCell";
import DocumentUploading from "./DocumentUploading/index";
import moment from "moment";


const {TextArea} = Input;
const {Option} = Select;


class ReportDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      isShowDatePicker: false,
      inspection_date: null,
      inspection_time: "",
    }
  }

  componentDidMount() {
    const reportId = this.props.match.params.id;
    this.props.onGetReportDetail(reportId);
    if (this.props.loggedUserPermissions && this.props.loggedUserPermissions.filter((key) => key.name === "can manage staff").length > 0) {
      this.onGetStaffList(1, 10);
    }
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

  onOpenDatePicker = () => {
    this.setState({isShowDatePicker: !this.state.isShowDatePicker, inspection_date: "", inspection_time: ""});
  };

  onDateChange = (value, dateString) => {
    this.setState({inspection_date: dateString})
  };

  onSelectTimeSlot = value => {
    this.setState({inspection_time: value});
  };

  onSelectDateTime = () => {
    const currentReport = this.props.currentReport;
    const {inspection_date, inspection_time} = this.state;
    if (inspection_date === "") {
      message.error("Please select date first!")
    } else if (inspection_time === "") {
      message.error("Please select time slot first")
    } else {
      this.props.onSetSurveyDate(currentReport.report_id, {inspection_date, inspection_time});
      this.setState({isShowDatePicker: false});
    }
  };

  onDisabledDate = (current) => {
    return current && current < moment().subtract(1, 'days');
  };

  render() {
    const {staffList, currentReport, totalItems, reportComments, reportDocuments, authUser, loggedUserPermissions} = this.props;
    const {comment, isShowDatePicker, inspection_time} = this.state;
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

            <div className="gx-mb-3 gx-border gx-rounded-circle gx-size-24 gx-d-flex gx-justify-content-center"
                 style={{borderColor: "black"}}>
              <i className="icon icon-arrow-left gx-link gx-text-black" onClick={this.onGoBackToList}/>
            </div>

            <h2 className="gx-text gx-mb-2">Home Report Detail</h2>

            <Breadcrumb className="gx-mb-4">
              <Breadcrumb.Item>
                <Link to="/home-reports">Home Reports</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/report-detail/${currentReport.report_id}`}
                      className="gx-text-primary">{currentReport.reference_no}</Link>
              </Breadcrumb.Item>
            </Breadcrumb>

            <Row>

              <Col xl={15} lg={12} md={12} sm={12} xs={24}>
                <div className="gx-pr-4">

                  <div className="gx-mb-4">
                    <div className="gx-text-grey">Reference No.</div>
                    <div className="gx-mt-2 gx-text-black">{currentReport.reference_no}</div>
                  </div>

                  <div className="gx-mb-4">
                    <div className="gx-text-grey">Property</div>
                    <div className="gx-mt-2">
                      <p className="gx-mb-1 gx-text-black">{currentReport.address1}</p>
                      <p className="gx-mb-1 gx-text-black">{currentReport.city}, Scotland</p>
                      <p className="gx-mb-1 gx-text-black"> Zip -{currentReport.postcode}</p>
                    </div>
                  </div>

                  <div className="gx-d-flex gx-mb-4">
                    <div className="gx-mr-5">
                      <div className="gx-text-grey">Estimated Price</div>
                      <div className="gx-mt-2 gx-text-black">{currentReport.property_price_value}</div>
                    </div>
                    <div>
                      <div className="gx-text-grey">Property Age</div>
                      <div className=" gx-mt-2 gx-text-black">{currentReport.property_age_value}</div>
                    </div>
                  </div>

                  <div style={{backgroundColor: "#eee"}} className="gx-px-5 gx-py-3 gx-mb-5">

                    <DocumentUploading onUploadDocument={this.onUploadDocument}
                                       reportDocuments={reportDocuments}
                                       fetchError={this.props.fetchError}
                                       fetchSuccess={this.props.fetchSuccess}
                                       fetchStart={this.props.fetchStart}/>

                  </div>
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
                      <div className="gx-d-flex">
                        {authUser && authUser.profile_pic && authUser.profile_pic.length > 0 ?
                          <Avatar className="gx-mr-3 gx-size-40" src={authUser.profile_pic[0].src}/> :
                          <Avatar className="gx-mr-3 gx-size-40"
                                  style={{backgroundColor: '#00CED1'}}>{authUser.first_name[0].toUpperCase()}</Avatar>}
                        <TextArea row={4} placeholder="Add a comment..." value={comment} onKeyPress={(event) => {
                          if (event.charCode === 13 && !event.shiftKey) {
                            this.onSubmitMessage()
                          }
                        }} className="gx-form-control-lg gx-mt-3"
                                  onChange={(e) => this.onMessageEnter(e)}/>
                      </div>
                      <Button type="primary" className=" gx-mt-2 gx-mx-5" onClick={this.onSubmitMessage}
                              disabled={comment === ""}>Send</Button>
                    </div>

                    : null}
                </div>
              </Col>

              <Col xl={9} lg={12} md={12} sm={12} xs={24}>
                <div className="gx-border-left gx-p-3">

                  <div className="gx-mb-4">
                    <div className="gx-text-grey gx-mb-2">Customer</div>
                    <div className="gx-media gx-flex-nowrap gx-align-items-center">
                      {currentReport.customer_profile_image ?
                        <Avatar className="gx-mr-3 gx-size-40" src={currentReport.customer_profile_image}/> :
                        <Avatar className="gx-mr-3 gx-size-40"
                                style={{backgroundColor: '#00CED1'}}>{currentReport.customer_name[0].toUpperCase()}</Avatar>}

                      <div className="gx-media-body gx-mt-2">
              <span
                className="gx-mb-0 gx-text-capitalize gx-text-black">{currentReport.customer_name}</span>
                        <div className="gx-mb-2">{currentReport.customer_email}</div>
                      </div>
                    </div>
                  </div>

                  <div className="gx-mb-4">
                    <div className="gx-text-grey">Contact Detail</div>
                    <Row className=" gx-mt-2 ">
                      <Col span={10}>
                        <div>{currentReport.day_time_tel}</div>
                      </Col>
                      <Col span={14}>
                        <Tag style={{borderRadius: 20}}>Day</Tag>
                      </Col>
                    </Row>

                    <Row className=" gx-mt-1 ">
                      <Col span={10}>
                        <div>{currentReport.evening_time_tel}</div>
                      </Col>
                      <Col span={14}>
                        <Tag style={{borderRadius: 20}}>Evening</Tag>
                      </Col>
                    </Row>
                  </div>

                  <ReportAssigning staffList={staffList}
                                   totalItems={totalItems}
                                   onAssignStaff={this.onAssignStaff}
                                   onGetStaffList={this.onGetStaffList}
                                   assignedTo={assignedTo}
                                   loggedUserPermissions={loggedUserPermissions}/>

                  <div className="gx-p-4 gx-my-4" style={{backgroundColor: "#eee"}}>

                    <div className="gx-d-flex">

                      <div className="gx-text-grey">Survey Date</div>

                      {loggedUserPermissions && loggedUserPermissions.filter((key) => key.name === "can manage staff").length > 0 ?

                        <div className="gx-ml-auto">
                          {!isShowDatePicker ?

                            <div className="gx-link" onClick={this.onOpenDatePicker}><Icon type="edit"/>
                              {currentReport.inspection_date && currentReport.inspection_time ? "Change" : "Select"}
                            </div>
                            :
                            <div className="gx-flex-column">

                              <DatePicker placeholder="Select Date" disabledDate={(value) => this.onDisabledDate(value)}
                                          onChange={this.onDateChange} onOk={this.onSelectDateTime}/>

                              <Select className="gx-my-2" placeholder="Inserted are removed" value={inspection_time}
                                      onChange={this.onSelectTimeSlot}>
                                <Option value="9am - 11am">9am - 11am</Option>
                                <Option value="11am - 1pm">11am - 1pm</Option>
                                <Option value="1pm - 3pm">1pm - 3pm</Option>
                                <Option value="3pm - 5pm">3pm - 5pm</Option>
                                <Option value="5pm - 7pm">5pm - 7pm</Option>
                              </Select>

                              <div className="gx-d-flex">
                                <Button onClick={this.onSelectDateTime}>Save</Button>
                                <Button onClick={this.onOpenDatePicker}>Cancel</Button>
                              </div>

                            </div>}

                        </div> : null}
                    </div>
                    <div className="gx-mt-2 gx-text-black">
                      {currentReport.inspection_date && currentReport.inspection_time ?
                        currentReport.inspection_date + ", " + currentReport.inspection_time : "NA"}</div>
                  </div>

                  <div className="gx-p-4" style={{backgroundColor: "#eee"}}>
                    <div className="gx-text-grey">Payment Date & Time</div>
                    <div className="gx-mt-2 gx-text-black">
                      {currentReport.payment_date ? currentReport.payment_date : "NA"}
                    </div>
                  </div>

                  <div className="gx-p-4 gx-my-4" style={{backgroundColor: "#eee"}}>
                    <div className="gx-text-grey">Terms & Conditions Accepted</div>
                    <div className="gx-mt-2 gx-text-black">
                      {currentReport.accept_term_date ? currentReport.accept_term_date : "NA"}
                    </div>
                  </div>

                </div>

              </Col>

            </Row>

          </Widget> : null}

        <InfoView/>

      </div>
    )
  }
}

const mapStateToProps = ({staff, homeReports, auth}) => {
  const {authUser, loggedUserPermissions} = auth;
  const {staffList, totalItems} = staff;
  const {currentReport, reportComments, reportDocuments} = homeReports;
  return {staffList, totalItems, currentReport, reportComments, reportDocuments, authUser, loggedUserPermissions};
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
  onGetReportDocuments,
  onSetSurveyDate
})(ReportDetail);

