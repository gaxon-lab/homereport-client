import React, {Component} from 'react';
import {Breadcrumb, Button, Input, Select, Table} from "antd";
import Widget from "../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../components/InfoView";
import {connect} from "react-redux";
import {onGetReportsList} from "../../appRedux/actions/HomeReports";
import ReportsRow from "./ReportsRow";

const {Option} = Select;
const Search = Input.Search;

class HomeReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
    }
  }

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, updatingContent) => {
    this.props.onGetReportsList(currentPage, itemsPerPage, filterText, updatingContent);
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

  // onShowBulkDeleteConfirm = () => {
  //   const {messages} = this.props.intl;
  //   const {selectedCustomers} = this.state;
  //   if (selectedCustomers.length !== 0) {
  //     confirm({
  //       title: messages["customers.message.delete"],
  //       onOk: () => {
  //         const obj = {
  //           ids: selectedCustomers
  //         };
  //         this.props.onDeleteCustomers(obj, this);
  //         this.setState({selectedRowKeys: [], selectedCustomers: []});
  //       }
  //     })
  //   } else {
  //     Modal.info({
  //       title: messages["customers.message.selectFirst"],
  //       onOk() {
  //       },
  //     });
  //   }
  // };

  onPageChange = page => {
    const {filterText, itemNumbers} = this.state;
    this.setState({current: page}, () => {
      this.onGetPaginatedData(this.state.current, itemNumbers, filterText, true)
    });
  };

  onSelectReport = record => {
    console.log("record", record.id);
    this.props.history.push(`/report-detail/${record.report_id}`);
  };

  render() {
    const {reportsList, updatingContent} = this.props;
    console.log("reportsList", reportsList)
    const {selectedRowKeys, filterText, itemNumbers, current} = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        const ids = selectedRows.map(selectedRow => {
          return selectedRow.id
        });
        this.setState({selectedCustomers: ids, selectedRowKeys: selectedRowKeys})
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
          <Table rowKey="id" rowSelection={rowSelection} columns={ReportsRow(this)}
                 dataSource={reportsList}
                 loading={updatingContent}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"/>
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
  onGetReportsList
})(HomeReports);