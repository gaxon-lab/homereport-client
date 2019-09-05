import React, {Component} from 'react';
import {Avatar, Icon, Input, Modal, Pagination, Tag} from "antd";
import PropTypes from "prop-types";

const confirm = Modal.confirm;


const Search = Input.Search;

class ReportAssigning extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStaffModal: false,
      selectedStaff: null,
      filterStaffText: "",
      current: 1,
      assignedStaff: props.assignedTo ? props.assignedTo : null
    };
  };

  onToggleStaffModal = () => {
    this.setState({showStaffModal: !this.state.showStaffModal})
  };

  onCloseModal = () => {
    this.setState({filterStaffText: ""},
      () => this.props.onGetStaffList(this.state.current, 10, this.state.filterStaffText, true))
  };

  onClickOnStaff = (staff) => {
    confirm({
      title: `You have selected ${staff.first_name + " " + staff.last_name}, click on YES to confirm!`,
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => {
        this.onSelectStaff(staff.id);
      }
    });
  };

  onSelectStaff = (id) => {
    const staff = this.props.staffList.find(staff => staff.id === id);
    staff.name = staff.first_name + " " + staff.last_name;
    staff.image = staff.profile_pic.length > 0 ? staff.profile_pic[0].src : null;
    this.setState({assignedStaff: staff});
    this.props.onAssignStaff(id);
    this.onToggleStaffModal();
  };

  onPageChange = (page) => {
    this.setState({current: page}, () => {
      this.props.onGetStaffList(this.state.current, 10, this.state.filterStaffText, true)
    })
  };

  onFilterTextChange = (e) => {
    this.setState({filterStaffText: e.target.value}, () => {
      this.props.onGetStaffList(this.state.current, 10, this.state.filterStaffText, true)
    })
  };

  render() {
    const {showStaffModal, filterStaffText, assignedStaff, current} = this.state;
    const {totalItems, staffList} = this.props;

    return (
      <div className="gx-main-layout-content">
        {assignedStaff ?
          <div>
            <div className="gx-d-flex">
              <div className="gx-mb-2 gx-mr-4">Assigned To</div>
              <div className="gx-link" onClick={this.onToggleStaffModal}><Icon type="edit" /> Change</div>
            </div>
            <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
              {assignedStaff.image ?
                <Avatar className="gx-mr-3 gx-size-50" src={assignedStaff.image}/> :
                <Avatar className="gx-mr-3 gx-size-50"
                        style={{backgroundColor: '#00CED1'}}>{assignedStaff.name[0].toUpperCase()}</Avatar>}
              <div className="gx-media-body gx-mt-2">
              <span
                className="gx-mb-0 gx-text-capitalize">{assignedStaff.name}</span>
                <div className="gx-mb-2">{assignedStaff.email}</div>
              </div>
            </div>
          </div> :
          <div>
            <div>Assign To</div>
            <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5" onClick={this.onToggleStaffModal}>
              <Avatar className="gx-mr-3 gx-size-50" src={require("assets/images/placeholder.jpg")}/>
              <div className="gx-media-body gx-mt-2">
                <span className="gx-mb-0 gx-text-capitalize">Currently Unassigned</span>
                <div className="gx-mt-2">
                  <Tag>
                    Click to Assign
                  </Tag>
                </div>
              </div>
            </div>
          </div>}
        <Modal
          title="Select Staff"
          centered
          afterClose={this.onCloseModal}
          visible={showStaffModal}
          onCancel={this.onToggleStaffModal}
          footer={null}>
          <div>
            <Search value={filterStaffText} placeholder="Search Staff here"
                    onChange={(e) => this.onFilterTextChange(e)}/>
            {staffList.length > 0 ?
              <div>
                {staffList.map(staff => {
                  return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-3"
                              onClick={() => this.onClickOnStaff(staff)} key={staff.id}>
                    {staff.profile_pic.length > 0 ?
                      <Avatar className="gx-mr-3 gx-size-50" src={staff.profile_pic[0].src}/> :
                      <Avatar className="gx-mr-3 gx-size-50"
                              style={{backgroundColor: '#00CED1'}}>{staff.first_name[0].toUpperCase()}</Avatar>}
                    <div className="gx-media-body">
                      <span className="gx-mb-0 gx-text-capitalize">{staff.first_name + " " + staff.last_name}</span>
                      <div>{staff.email}</div>
                    </div>

                  </div>
                })}
                <Pagination current={current} total={totalItems} onChange={(page) => this.onPageChange(page)}/>
              </div> : <div className="gx-d-flex gx-justify-content-center">No Staff Members found</div>}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ReportAssigning;

ReportAssigning.defaultProps = {
  staffList: [],
  assignedTo: null,
  ticketId: null
};

ReportAssigning.propTypes = {
  staffList: PropTypes.array,
  assignedTo: PropTypes.object,
  ticketId: PropTypes.number
};
