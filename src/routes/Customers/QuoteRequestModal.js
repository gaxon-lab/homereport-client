import React, {Component} from 'react';
import {Dropdown, Menu, Modal, Table} from "antd";
import {connect} from "react-redux";
import {onGetCustomerQuotes, onNullifyCustomerQuotes} from "../../appRedux/actions/Customers";
import InfoView from "../../components/InfoView";

class QuoteRequestModal extends Component {

  componentDidMount() {
    console.log("tis.props.selectedCustomer", this.props.selectedCustomer)
    this.props.onGetCustomerQuotes(this.props.selectedCustomer.id)
  }

  componentWillUnmount() {
    this.props.onNullifyCustomerQuotes();
  }

  quoteRow = () => {
    return [
      {
        title: "REF. NO.",
        dataIndex: 'reference',
        key: 'reference',
        render: (text, record) => {
          return <span>{record.reference_no}</span>
        },
      },
      {
        title: "PROPERTY",
        dataIndex: 'property',
        key: 'property',
        render: (text, record) => {
          return <span>Property Address</span>
        },
      },
      {
        title: "ESTIMATED PRICE & AGE",
        dataIndex: 'price',
        key: 'price',
        render: (text, record) => {
          return <div>
            <div>{record.property_price_value}</div>
            <div>{record.property_age_value}</div>
          </div>
        },
      },
      {
        title: "CONTACT",
        dataIndex: 'contact',
        key: 'contact',
        render: (text, record) => {
          return <div>
            {record.day_time_tel ? <div>{record.day_time_tel} Day</div> : null}
            {record.evening_time_tel ? <div>{record.evening_time_tel} Evening</div> : null}
          </div>
        },
      },
      {
        title: "QUOTE",
        dataIndex: 'quote',
        key: 'quote',
        render: (text, record) => {
          return <span>${record.quote_amount}</span>
        },
      },
      {
        title: '',
        dataIndex: '',
        key: 'empty',
        render: (text, record) => {
          return <span className="gx-p-2 gx-cursor-pointer" onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}>
            {this.onShowRowDropdown(record)}
      </span>
        },
      },
    ];
  };

  onShowRowDropdown = (quote) => {
    const menu = (
      <Menu>
        <Menu.Item key="1" onClick={() => this.onSelectRequest(quote)}>
          View Detail
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h"/>
      </Dropdown>
    )
  };

  onSelectRequest = record => {
    this.props.history.push(`/quote-detail/${record.id}`);
  };

  render() {
    const {isShowQuotes, onToggleShowQuotes, updatingContent, customerQuotes} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal width="69%"
               visible={isShowQuotes}
               maskClosable={false}
               onCancel={() => onToggleShowQuotes()}
               footer={null}>
          <h2 className="gx-widget-heading">Quote Requests</h2>
          <Table rowKey="id" columns={this.quoteRow()}
                 dataSource={customerQuotes}
                 loading={updatingContent}
                 pagination={false}
                 className="gx-table-responsive"/>
        </Modal>
        <InfoView/>
      </div>
    );
  }
}

const mapPropsToState = ({customers, common}) => {
  const {customerQuotes} = customers;
  const {updatingContent} = common;
  return {customerQuotes, updatingContent};
};

export default connect(mapPropsToState, {
  onGetCustomerQuotes, onNullifyCustomerQuotes
})(QuoteRequestModal);

