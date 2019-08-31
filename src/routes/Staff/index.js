import React, {Component} from "react"
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import {Link} from "react-router-dom";
import Widget from "../../components/Widget";
import StaffRow from "./StaffRow";
import {onAddStaffMember, onDeleteStaff, onEditStaffMember, onGetStaff} from "../../appRedux/actions/StaffList";
import AddNewStaff from "./AddNewStaff";
import InfoView from "../../components/InfoView";
import {fetchError, fetchStart, fetchSuccess, onBulkDeleteStaff} from "../../appRedux/actions";


const ButtonGroup = Button.Group;
const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;

class Staff extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      filterText: "",
      itemNumbers: 10,
      currentPage: 1,
      showAddStaff: false,
      selectedStaff: null,
      isAddStaff: false,
      bulkSelectedStaff: []
    };
  };

  componentDidMount() {
    this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText);
  }

  onGetStaffDataPaginated = (currentPage, itemsPerPage, filterText, updatingContent) => {
    // if (Permissions.canStaffView()) {
    this.props.onGetStaff(currentPage, itemsPerPage, filterText, updatingContent);
    // }
  };

  onToggleAddStaff = () => {
    this.setState({isAddStaff: !this.state.isAddStaff})
  };

  onCurrentIncrement = () => {
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.currentPage < pages) {
      this.setState({currentPage: this.state.currentPage + 1},
        () => {
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
        });
    } else {
      return null;
    }
  };

  onCurrentDecrement = () => {
    if (this.state.currentPage > 1) {
      this.setState({currentPage: this.state.currentPage - 1},
        () => {
          this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
        });
    } else {
      return null;
    }
  };

  onFilterTextChange = (e) => {
    this.setState({filterText: e.target.value}, () => {
      this.onGetStaffDataPaginated(1, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  onAddButtonClick = () => {
    this.setState({isAddStaff: true, selectedStaff: null})
  };

  onEditIconClick = record => {
    this.setState({isAddStaff: true, selectedStaff: record})
  };

  onDeletePopUp = (id) => {
    confirm({
      title: 'Are you sure you want to delete this Staff?',
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        this.props.onDeleteStaff(id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  onEnableStatusPopUp = (staff) => {
    confirm({
      title: "Are you sure to change the Status of selected Staff to ACTIVE?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => {
        staff.status = 1;
        this.props.onEditStaffMember(staff, true);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  onDisableStatusPopUp = (staff) => {
    confirm({
      title: "Are you sure to change the Status of selected Staff to DISABLED?",
      okText: "Yes",
      cancelText: "Cancel",
      onOk: () => {
        staff.status = 0;
        this.props.onEditStaffMember(staff, true);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        {/*<Menu.Item key="1">*/}
        {/*  Archive*/}
        {/*</Menu.Item>*/}
        <Menu.Item key="3" onClick={this.onShowBulkDeleteConfirm}>
          Delete
        </Menu.Item>
      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Bulk Actions <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onShowBulkDeleteConfirm = () => {
    if (this.state.bulkSelectedStaff.length !== 0) {
      confirm({
        title: "Are you sure you want to delete selected Staff(s)?",
        onOk: () => {
          this.props.onBulkDeleteStaff({ids: this.state.bulkSelectedStaff});
          this.setState({selectedRowKeys: [], bulkSelectedStaff: []});
        }
      })
    } else {
      Modal.info({
        title: "Please select staff First!",
        onOk() {
        },
      });
    }
  };

  onPageChange = page => {
    this.setState({
      currentPage: page,
    }, () => {
      this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    });
  };

  onShowItemOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange}>
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onDropdownChange = (value) => {
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetStaffDataPaginated(this.state.currentPage, this.state.itemNumbers, this.state.filterText, true)
    })
  };

  render() {
    const {isAddStaff, selectedRowKeys, selectedStaff} = this.state;
    // const staffList = this.props.staffList;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({bulkSelectedStaff: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Staff</h2>
          <Breadcrumb className="gx-mb-3">
            <Breadcrumb.Item>
              <Link to="/staff/all-members" className="gx-text-primary">Staff</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <div className="gx-d-flex">
              <Button type="primary" className="gx-btn-lg"
                      onClick={this.onAddButtonClick}>
                Add New Staff</Button>
              <span>{this.onSelectOption()}</span>
            </div>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Staff"
                value={this.state.filterText}
                onChange={this.onFilterTextChange}
                style={{width: 350}}
              />
              <div className="gx-ml-3">
                {this.onShowItemOptions()}
              </div>
              <ButtonGroup className="gx-ml-3">
                <Button type="default" onClick={this.onCurrentDecrement}>
                  <i className="icon icon-long-arrow-left"/>
                </Button>
                <Button type="default" onClick={this.onCurrentIncrement}>
                  <i className="icon icon-long-arrow-right"/>
                </Button>
              </ButtonGroup>
            </div>
          </div>
          <Table rowKey="id" rowSelection={rowSelection} columns={StaffRow(this)}
                 dataSource={this.props.staffList}
                 loading={this.props.updatingContent}
                 pagination={{
                   pageSize: this.state.itemNumbers,
                   current: this.state.currentPage,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 onRow={(record) => ({
                   onClick: () => this.onEditIconClick(record)
                 })}
                 className="gx-table-responsive gx-mb-4"/>
          <div className="gx-d-flex gx-flex-row">
          </div>
        </Widget>
        {isAddStaff ? <AddNewStaff isAddStaff={isAddStaff}
                                   onToggleAddStaff={this.onToggleAddStaff}
                                   selectedStaff={selectedStaff}
                                   onAddStaffMember={this.props.onAddStaffMember}
                                   onEditStaffMember={this.props.onEditStaffMember}
                                   fetchError={this.props.fetchError}
                                   fetchSuccess={this.props.fetchSuccess}
                                   fetchStart={this.props.fetchStart}/> : null}
        <InfoView/>
      </div>
    );
  }
}


const mapStateToProps = ({staff, common}) => {
  const {staffList, totalItems} = staff;
  const {updatingContent} = common;
  return {staffList, totalItems, updatingContent};
};


export default connect(mapStateToProps, {
  onGetStaff,
  onAddStaffMember,
  onDeleteStaff,
  onEditStaffMember,
  onBulkDeleteStaff,
  fetchStart,
  fetchSuccess,
  fetchError
})((Staff));

Staff.defaultProps = {
  staffList: [],
  totalItems: null
};

Staff.propTypes = {
  staffList: PropTypes.array,
  totalItems: PropTypes.number,
  onGetStaff: PropTypes.func,
  onSetCurrentStaff: PropTypes.func,
  onBulkDeleteStaff: PropTypes.func,
  onDisableSupportStaff: PropTypes.func
};
