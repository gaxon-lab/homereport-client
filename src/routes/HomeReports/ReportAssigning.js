import React, {Component} from 'react';
import {Avatar, Input, Modal, Pagination, Tag} from "antd";
import PropTypes from "prop-types";


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

  onSelectStaff = (id) => {
    this.props.onAssignStaff(id);
    this.onToggleStaffModal();
  };

  onFilterData = () => {
    return this.props.staffList.filter(staff => {
      const name = staff.first_name.toLowerCase() + " " + staff.last_name.toLowerCase();
      return (name.includes(this.state.filterStaffText.toLowerCase())) ?
        staff : null
    })
  };

  onPageChange = (page) => {
    this.props.onGetStaffList(page, 10, this.state.filterStaffText, true)
  };

  onFilterTextChange = (e) => {
    this.setState({filterStaffText: e.target.value}, () => {
      this.props.onGetStaffList(this.state.current, 10, this.state.filterStaffText, true)
    })
  };

  render() {
    const {showStaffModal, filterStaffText, assignedStaff, current} = this.state;
    const {totalItems} = this.props;
    const staffList = this.onFilterData();

    return (
      <div className="gx-main-layout-content">
        {assignedStaff ?
          <div>
            <div className="gx-d-flex gx-justify-content-between">
              <div className="gx-mb-2">Assigned To</div>
              <div className="gx-link" onClick={this.onToggleStaffModal}>Edit</div>
            </div>
            <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5">
              {assignedStaff.image ?
                <Avatar className="gx-mr-3 gx-size-50" src={assignedStaff.image.src}/> :
                <Avatar className="gx-mr-3 gx-size-50"
                        style={{backgroundColor: '#f56a00'}}>{assignedStaff.name[0].toUpperCase()}</Avatar>}
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
          visible={showStaffModal}
          onCancel={this.onToggleStaffModal}
          footer={null}>
          <div>
            <Search value={filterStaffText} placeholder="Search Staff here"
                    onChange={(e) => this.onFilterTextChange(e)}/>
            {staffList.length > 0 ?
              <div>
                {staffList.map(staff => {
                  return <div className="gx-media gx-flex-nowrap gx-align-items-center gx-mb-lg-5"
                              onClick={() => this.onSelectStaff(staff.id)} key={staff.id}>
                    {staff.avatar ?
                      <Avatar className="gx-mr-3 gx-size-50" src={staff.avatar.src}/> :
                      <Avatar className="gx-mr-3 gx-size-50"
                              style={{backgroundColor: '#f56a00'}}>{staff.first_name[0].toUpperCase()}</Avatar>}
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
