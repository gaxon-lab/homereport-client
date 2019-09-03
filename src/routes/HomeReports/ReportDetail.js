import React, {Component} from 'react';
import Widget from "../../components/Widget";
import {Breadcrumb, Button, Col, Divider, Input, Row, Upload} from "antd";
import {Link} from "react-router-dom";
import ReportAssigning from "./ReportAssigning";
import {connect} from "react-redux";
import {onGetStaff} from "../../appRedux/actions/StaffList";
import {onGetReportDetail, onNullifyCurrentReport} from "../../appRedux/actions/HomeReports";
import {onAddNewComment, onAssignStaffToReport, onGetReportComments} from "../../appRedux/actions";
import InfoView from "../../components/InfoView";
import ConversationCell from "./ConversationCell";
import moment from "moment";


const {TextArea} = Input;


class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      comment: ''
    }
  }

  componentDidMount() {
    const reportId = this.props.match.params.id;
    this.props.onGetReportDetail(reportId);
    this.onGetStaffList(1, 10);
    this.props.onGetReportComments(reportId);
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
    if (this.state.fileList.length > 0) {
      this.handleUpload();
    } else {
      this.onSendMessage();
    }
  };

  onSendMessage = () => {
    const currentReport = this.props.currentReport;
    const comment = this.state.comment;
    if (this.state.comment !== '') {
      this.props.onAddNewComment(currentReport.report_id, {
        comment: comment});
      setTimeout(() =>
        this.setState({comment: '', fileList: []}), 20)
    }
  };


  handleUpload = () => {
    let formData = new FormData();
    this.state.fileList.map(file => {
      formData = new FormData();
      formData.append('file', file);
      formData.append('title', file.name);
      this.imageUpload(formData);
      return file;
    });
  };

  imageUpload = (file) => {
    this.onSendMessage();
    // this.props.fetchStart();
    // axios.post("/uploads/temporary/media", file, {
    //   headers: {
    //     'Content-Type': "multipart/form-data"
    //   }
    // }).then(({data}) => {
    //   if (data.success) {
    //     this.props.fetchSuccess();
    //     this.setState({attachments: this.state.attachments.concat(data.data)}, () => {
    //       if (this.state.attachments.length === this.state.fileList.length) {
    //         this.onSendMessage();
    //         this.setState({fileList: []})
    //       }
    //     })
    //   }
    //   else {
    //     this.props.fetchError(data.errors[0])
    //   }
    // }).catch(function (error) {
    //   this.props.fetchError(error.message)
    // });
  };

  componentWillUnmount() {
    this.props.onNullifyCurrentReport();
  }

  render() {
    const {staffList, currentReport, totalItems, reportComments} = this.props;
    const {fileList, comment} = this.state;
    const props = {
      multiple: true,
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }))
        return false;
      },
      fileList,
    };
    let assignedTo = null;
    if (currentReport && currentReport.assigned_user_id) {
      assignedTo = {
        id: currentReport.assigned_user_id,
        image: currentReport.assigned_user_image,
        name: currentReport.assigned_user_name,
        email: currentReport.customer_email
      }
    }

    return (
      <div className="gx-main-layout-content">
        {currentReport ?
          <Widget styleName="gx-card-filter">
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
              <Col xl={16} lg={12} md={12} sm={12} xs={24}>
                <Row>
                  <Col span={8}>
                    <div className="gx-text-grey">Reference No.</div>
                    <div className="gx-text-blue gx-mt-2 gx-font-weight-medium">{currentReport.reference_no}</div>
                  </Col>
                  <Col span={16}>
                    <div className="gx-text-grey">Quote Amount</div>
                    <div className="gx-mt-2 gx-font-weight-bold">${currentReport.quote_amount}</div>
                  </Col>
                </Row>
                <Row className="gx-mt-4">
                  <Col span={8}>
                    <div className="gx-text-grey">Customer Detail</div>
                    <div
                      className=" gx-mt-2 gx-font-weight-medium">{currentReport.customer_name ? currentReport.customer_name : "NA"}</div>
                  </Col>
                  <Col span={16}>
                    <div className="gx-text-grey">Contact Detail</div>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.day_time_tel} Day</div>
                    <div className="gx-mt-1 gx-font-weight-medium">{currentReport.evening_time_tel} Evening</div>
                  </Col>
                </Row>
                <Row className="gx-my-4">
                  <Col span={8}>
                    <div className="gx-text-grey">Property</div>
                    <div className="gx-mt-2">
                      <p className="gx-mb-1 gx-font-weight-medium">{currentReport.address1}</p>
                      <p
                        className="gx-mb-1 gx-font-weight-medium">{currentReport.city}, Scotland</p>
                      <p className="gx-mb-1 gx-font-weight-medium"> Zip -{currentReport.postcode}</p>
                    </div>
                  </Col>
                  <Col span={16}>
                    <p className="gx-text-grey">Estimated Price & Age</p>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.property_price_value}</div>
                    <div className=" gx-font-weight-medium">{currentReport.property_age_value}</div>
                  </Col>
                </Row>
                <div className=""><i className="gx-font-weight-medium">Payment Date</i> : {moment(currentReport.report_created_at).format('LL')}</div>
              </Col>
              <Col xl={8} lg={12} md={12} sm={12} xs={24}>
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
                <div className="gx-flex-column">
                  {/*<label>Upload Attachments</label>*/}
                  <Upload {...props} >
                    <Input placeholder="Add Files here" className="gx-my-3" readOnly
                           prefix={<i className="icon gx-icon-attachment"/>}/>
                  </Upload>
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
  const {currentReport, reportComments} = homeReports;
  return {staffList, totalItems, currentReport, reportComments};
};

export default connect(mapStateToProps, {
  onGetStaff,
  onGetReportDetail,
  onNullifyCurrentReport,
  onAssignStaffToReport,
  onGetReportComments,
  onAddNewComment
})(ReportDetail);

