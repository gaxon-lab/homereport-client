import React, {Component} from 'react';
import {Breadcrumb, Button, Input, Select, Table} from "antd";
import Widget from "../../components/Widget";
import {Link} from "react-router-dom";
import InfoView from "../../components/InfoView";
import {connect} from "react-redux";
import QuotesRow from "./QuotesRow";
import {onGetQuotesList} from "../../appRedux/actions/QuoteRequests";

const {Option} = Select;
const Search = Input.Search;

// const confirm = Modal.confirm;

class QuoteRequests extends Component {
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
    this.props.onGetQuotesList(currentPage, itemsPerPage, filterText, updatingContent);
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

  onSelectRequest = record => {
    console.log("record", record.id);
    this.props.history.push(`/quote-detail/${record.quote_request_id}`);
  };

  render() {
    const {quotesList, updatingContent} = this.props;
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
          <h2 className="gx-widget-heading">Quote Requests</h2>
          <Breadcrumb className="gx-mb-4">
            <Breadcrumb.Item>
              <Link to="/quote-requests" className="gx-text-primary">Quote Requests</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="gx-d-flex gx-justify-content-end">
            <Search
              placeholder="Enter keywords to search Quotes"
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
          <Table rowKey="id" rowSelection={rowSelection} columns={QuotesRow(this)}
                 dataSource={quotesList}
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

const mapPropsToState = ({quoteRequests, common}) => {
  const {quotesList, totalItems} = quoteRequests;
  const {updatingContent} = common;
  return {quotesList, totalItems, updatingContent};
};

export default connect(mapPropsToState, {
  onGetQuotesList
})(QuoteRequests);
