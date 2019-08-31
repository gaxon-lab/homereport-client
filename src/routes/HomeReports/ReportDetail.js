import React, {Component} from 'react';
import Widget from "../../components/Widget";
import {Breadcrumb, Button, Col, Divider, Input, Row, Upload} from "antd";
import {Link} from "react-router-dom";
import ReportAssigning from "./ReportAssigning";
import {connect} from "react-redux";
import {onGetStaff} from "../../appRedux/actions/StaffList";
import {onGetReportDetail, onNullifyCurrentReport} from "../../appRedux/actions/HomeReports";
import {onAssignStaffToReport} from "../../appRedux/actions";


const {TextArea} = Input;


class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      message: ''
    }
  }

  componentDidMount() {
    const reportId = this.props.match.params.id;
    this.props.onGetReportDetail(reportId);
    this.onGetStaffList();
  }

  onGetStaffList = (currentPage, itemsPerPage, filterText, updatingContent) => {
    this.props.onGetStaff(currentPage, itemsPerPage, filterText, updatingContent);
  };

  onAssignStaff = (userId) => {
    this.props.onAssignStaffToReport(this.props.currentReport.report_id, userId)
  };

  onMessageEnter = (e) => {
    this.setState({message: e.target.value})
  };

  onSubmitMessage = () => {
    if (this.state.fileList.length > 0) {
      this.handleUpload();
    } else {
      this.onSendMessage();
    }
  };

  onSendMessage = () => {
    // const currentTicket = this.props.currentTicket;
    // const attachments = this.state.attachments;
    // if (this.state.message !== '') {
    //   this.props.onSendNewMessage(currentTicket.id, {
    //     message: this.state.message,
    //     attachments: attachments
    //   }, this);
    //   setTimeout(() =>
    //     this.setState({message: '', attachments: []}), 20)
    // }
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
    console.log("currentReport", this.props.currentReport)
    const {staffList, currentReport, totalItems} = this.props;
    const {fileList, message} = this.state;
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
    if(currentReport && currentReport.assigned_user_id) {
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
                  <Col span={6}>
                    <div className="gx-text-grey">Reference No.</div>
                    <div className="gx-text-blue gx-mt-2 gx-font-weight-medium">{currentReport.reference_no}</div>
                  </Col>
                  <Col span={18}>
                    <div className="gx-text-grey">Quote Amount</div>
                    <div className="gx-mt-2 gx-font-weight-bold">${currentReport.quote_amount}</div>
                  </Col>
                </Row>
                <Row className="gx-mt-4">
                  <Col span={6}>
                    <div className="gx-text-grey">Customer Detail</div>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.customer_name ? currentReport.customer_name : "NA"}</div>
                  </Col>
                  <Col span={18}>
                    <div className="gx-text-grey">Contact Detail</div>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.day_time_tel} Day</div>
                    <div className="gx-mt-1 gx-font-weight-medium">{currentReport.evening_time_tel} Evening</div>
                  </Col>
                </Row>
                <Row className="gx-my-4">
                  <Col span={6}>
                    <div className="gx-text-grey">Property</div>
                    <div className="gx-mt-2">
                      <p className="gx-mb-1 gx-font-weight-medium">{currentReport.address1}</p>
                      <p
                        className="gx-mb-1 gx-font-weight-medium">{currentReport.city}, Scotland</p>
                      <p className="gx-mb-1 gx-font-weight-medium"> Zip -{currentReport.postcode}</p>
                    </div>
                  </Col>
                  <Col span={18}>
                    <p className="gx-text-grey">Estimated Price & Age</p>
                    <div className=" gx-mt-2 gx-font-weight-medium">{currentReport.property_price_value}</div>
                    <div className=" gx-font-weight-medium">{currentReport.property_age_value}</div>
                  </Col>
                </Row>
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
                <div className="gx-py-3">
                  <h3 className="gx-mb-0 gx-mb-sm-1">Messages</h3>
                </div>
                {/*{ticketMessages.map((conversation, index) =>*/}
                {/*  <ConversationCell key={index} conversation={conversation}/>*/}
                {/*)}*/}
                <div className="gx-py-3">
                  <h3 className="gx-mb-0 gx-mb-sm-1">Update Report</h3>
                </div>
                <div className="gx-flex-column">
                  <label className="gx-mr-2">Enter Details</label>
                  <TextArea row={4} value={message} onKeyPress={(event) => {
                    if (event.charCode === 13 && !event.shiftKey) {
                      this.onSubmitMessage()
                    }
                  }} className="gx-form-control-lg gx-my-3"
                            onChange={(e) => this.onMessageEnter(e)}/>
                </div>
                <div className="gx-flex-column">
                  <label>Upload Attachments</label>
                  <Upload {...props} >
                    <Input placeholder="Add Files here" className="gx-my-3"
                           prefix={<i className="icon gx-icon-attachment"/>}/>
                  </Upload>
                </div>
                <Button type="primary" className="gx-my-3" onClick={this.onSubmitMessage}
                        disabled={message === ""}>Update Report</Button>
              </div> : null}
          </Widget> : null}
      </div>
    )
  }
}

const mapStateToProps = ({staff, homeReports}) => {
  const {staffList} = staff;
  const {currentReport} = homeReports;
  return {staffList, currentReport};
};

export default connect(mapStateToProps, {onGetStaff, onGetReportDetail, onNullifyCurrentReport, onAssignStaffToReport})(ReportDetail);

