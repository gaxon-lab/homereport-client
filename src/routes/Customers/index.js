import React, {Component} from 'react';
import {Breadcrumb, Button, Input, Select, Table} from "antd";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import CustomersRow from "./CustomerRow";
import {onGetCustomersList} from "../../appRedux/actions/Customers";
import Widget from "../../components/Widget";
import QuoteRequestModal from "./QuoteRequestModal";
import InfoView from "../../components/InfoView";
import HomeReportsModal from "./HomeReportsModal";
import {onDownloadCustomerList} from "../../appRedux/actions";

const {Option} = Select;
const Search = Input.Search;


class Customers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: "",
      selectedRowKeys: [],
      itemNumbers: 10,
      current: 1,
      isShowQuotes: false,
      isShowHomeRecords: false,
      selectedCustomer: null
    }
  }

  componentDidMount() {
    this.onGetPaginatedData(this.state.current, this.state.itemNumbers, this.state.filterText);
  }

  onGetPaginatedData = (currentPage, itemsPerPage, filterText, updatingContent) => {
    this.props.onGetCustomersList(currentPage, itemsPerPage, filterText, updatingContent);
  };

  onToggleShowQuotes = () => {
    this.setState({isShowQuotes: !this.state.isShowQuotes})
  };

  onShowCustomerQuotes = (record) => {
    this.setState({selectedCustomer: record, isShowQuotes: true})
  };

  onShowCustomerReports = (record) => {
    this.setState({selectedCustomer: record, isShowHomeRecords: true})
  };

  onToggleHomeRecords = () => {
    this.setState({isShowHomeRecords: !this.state.isShowHomeRecords})
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

  onSelectCustomer = record => {
    this.props.history.push(`/customer-detail/${record.id}`);
  };

  render() {
    const {customersList, updatingContent} = this.props;
    const {selectedRowKeys, filterText, itemNumbers, current, isShowQuotes, isShowHomeRecords, selectedCustomer} = this.state;
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
          <h2 className="gx-widget-heading">Customers</h2>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/customers" className="gx-text-primary">Customers</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-between">
            <a href="http://gaxonlab.com/homereport-server/api/customers/export/data" target="_blank"
               rel="noopener noreferrer">
              <Button type="primary" className="gx-btn-lg">
                Export to CSV</Button>
            </a>
            <div className="gx-d-flex">
              <Search
                placeholder="Enter keywords to search Customers"
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
          </div>
          <Table rowKey="id" rowSelection={rowSelection} columns={CustomersRow(this)}
                 dataSource={customersList}
                 loading={updatingContent}
                 pagination={{
                   pageSize: itemNumbers,
                   current: current,
                   total: this.props.totalItems,
                   showTotal: ((total, range) => `Showing ${range[0]}-${range[1]} of ${total} items`),
                   onChange: this.onPageChange
                 }}
                 className="gx-table-responsive"
                 rowClassName="gx-pointer"
                 onRow={(record) => ({
                   onClick: () => this.onSelectCustomer(record)
                 })}
          />
        </Widget>
        {isShowQuotes ? <QuoteRequestModal isShowQuotes={isShowQuotes}
                                           onToggleShowQuotes={this.onToggleShowQuotes}
                                           selectedCustomer={selectedCustomer}
                                           history={this.props.history}
        /> : null}
        {isShowHomeRecords ? <HomeReportsModal isShowHomeRecords={isShowHomeRecords}
                                               onToggleHomeRecords={this.onToggleHomeRecords}
                                               selectedCustomer={selectedCustomer}
                                               history={this.props.history}
        /> : null}
        <InfoView/>
      </div>
    )
  }
}

const mapPropsToState = ({customers, common}) => {
  const {customersList, totalItems} = customers;
  const {updatingContent} = common;
  return {customersList, totalItems, updatingContent};
};

export default connect(mapPropsToState, {
  onGetCustomersList, onDownloadCustomerList
})(Customers);
