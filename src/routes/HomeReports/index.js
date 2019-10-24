import React, {Component} from 'react';
import {Breadcrumb, Button, Dropdown, Icon, Input, Menu, Modal, Select, Table} from "antd";
import Widget from "../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../components/InfoView";
import {connect} from "react-redux";
import {onGetReportsList} from "../../appRedux/actions/HomeReports";
import ReportsRow from "./ReportsRow";
import {onChangeReportStatus, onDeleteHomeReport} from "../../appRedux/actions";

const {Option} = Select;
const Search = Input.Search;
const confirm = Modal.confirm;


class HomeReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      selectedReports: [],
      filterOption: ""
    }
  }

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, updatingContent, status) => {
    this.props.onGetReportsList(currentPage, itemsPerPage, filterText, updatingContent, status);
  };

  onFilterTextChange = (e) => {
    const {itemNumbers} = this.state;
    this.setState({filterText: e.target.value}, () => {
      this.onGetPaginatedData(1, itemNumbers, this.state.filterText, true)
    })
  };

  onDropdownChange = (value) => {
    const {filterText} = this.state;
    this.setState({itemNumbers: value, current: 1}, () => {
      this.onGetPaginatedData(this.state.current, this.state.itemNumbers, filterText, true)
    });
  };

  onCurrentIncrement = () => {
    const {filterText, itemNumbers} = this.state;
    const pages = Math.ceil(this.props.totalItems / this.state.itemNumbers);
    if (this.state.current < pages) {
      this.setState({current: this.state.current + 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, true)
      });
    }
  };

  onCurrentDecrement = () => {
    const {filterText, itemNumbers} = this.state;
    if (this.state.current > 1) {
      this.setState({current: this.state.current - 1}, () => {
        this.onGetPaginatedData(this.state.current, itemNumbers, filterText, true)
      });
    }
  };

  onGetCustomersShowOptions = () => {
    return <Select defaultValue={10} onChange={this.onDropdownChange} className="gx-mx-2">
      <Option value={10}>10</Option>
      <Option value={25}>25</Option>
      <Option value={50}>50</Option>
    </Select>
  };

  onPageChange = page => {
    const {filterText, itemNumbers} = this.state;
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, itemNumbers, filterText, true)
    });
  };

  onSelectReport = record => {
    this.props.history.push(`/report-detail/${record.report_id}`);
  };

  onSelectOption = () => {
    const menu = (
      <Menu>
        <Menu.Item key="4" onClick={() => this.onSelectFilterOption("")}>
          All
        </Menu.Item>

        <Menu.Item key="1" onClick={() => this.onSelectFilterOption("completed")}>
          Completed
        </Menu.Item>

        <Menu.Item key="2" onClick={() => this.onSelectFilterOption("in-progress")}>
          In Progress
        </Menu.Item>

        <Menu.Item key="3" onClick={() => this.onSelectFilterOption("pending")}>
          Pending
        </Menu.Item>

        <Menu.Item key="4" onClick={() => this.onSelectFilterOption("cancelled")}>
          Cancelled
        </Menu.Item>

      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Filter By Status <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onSelectFilterOption = filter => {
    this.setState({filterOption: filter}, () => {
      this.onGetPaginatedData(1, this.state.itemNumbers, this.state.filterText, true, this.state.filterOption)
    })
  };

  onChangeStatus = () => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => this.onChangeStatusPopUp("completed")}>
          Completed
        </Menu.Item>

        <Menu.Item key="2" onClick={() => this.onChangeStatusPopUp("in-progress")}>
          In Progress
        </Menu.Item>

        <Menu.Item key="3" onClick={() => this.onChangeStatusPopUp("pending")}>
          Pending
        </Menu.Item>

        <Menu.Item key="4" onClick={() => this.onChangeStatusPopUp("cancelled")}>
          Cancelled
        </Menu.Item>

      </Menu>
    );
    return <Dropdown overlay={menu} trigger={['click']}>
      <Button>
        Change Status <Icon type="down"/>
      </Button>
    </Dropdown>
  };

  onChangeStatusPopUp = (name) => {
    confirm({
      title: `Are you sure you want to Change the status to "${name}"`,
      okText: "Change",
      cancelText: "Cancel",
      onOk: () => {
        this.props.onChangeReportStatus({report_ids: this.state.selectedReports, status: name})
      }
    });
  };

  onDeletePopUp = (id) => {
    confirm({
      title: 'Are you sure you want to delete this Report?',
      okText: "Delete",
      cancelText: "Cancel",
      onOk: () => {
        this.props.onDeleteHomeReport(id);
        this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText, true)
      }
    });
  };

  render() {
    const {reportsList, updatingContent} = this.props;
    const {selectedRowKeys, filterText, itemNumbers, current, selectedReports} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.report_id
        });
        this.setState({selectedReports: ids, selectedRowKeys: selectedRowKeys})
      }
    };

    return (
      <div className="gx-main-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Home Reports</h2>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/quote-requests" className="gx-text-primary">Home Reports</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-end">
            {selectedReports.length > 0 ? this.onChangeStatus() : null}
            {this.onSelectOption()}
            <Search
              placeholder="Enter keywords to search Home Reports"
              value={filterText}
              onChange={this.onFilterTextChange}
              style={{width: 350}}/>
            {this.onGetCustomersShowOptions()}
            <Button.Group>
              <Button type="default" onClick={this.onCurrentDecrement}>
                <i className="icon icon-long-arrow-left"/>
              </Button>
              <Button type="default" onClick={this.onCurrentIncrement}>
                <i className="icon icon-long-arrow-right"/>
              </Button>
            </Button.Group>
          </div>
          <Table rowKey="report_id" rowSelection={rowSelection} columns={ReportsRow(this)}
                 dataSource={reportsList}
                 loading={updatingContent}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"
          />
        </Widget>
        <InfoView/>
      </div>
    )
  }
}

const mapPropsToState = ({homeReports, common}) => {
  const {reportsList, totalItems} = homeReports;
  const {updatingContent} = common;
  return {totalItems, reportsList, updatingContent};
};

export default connect(mapPropsToState, {
  onGetReportsList, onChangeReportStatus, onDeleteHomeReport
})(HomeReports);
