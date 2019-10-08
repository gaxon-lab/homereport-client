import React, {Component} from 'react';
import {Button, Dropdown, Menu, Modal, Table, Tag} from "antd";
import {connect} from "react-redux";
import {onGetCustomerQuotes, onNullifyCustomerQuotes} from "../../appRedux/actions/Customers";
import InfoView from "../../components/InfoView";

class QuoteRequestModal extends Component {

  state = {
    isPaymentShow: false,
    selectedQuote: null
  };

  componentDidMount() {
    this.props.onGetCustomerQuotes(this.props.selectedCustomer.id)
  }

  componentWillUnmount() {
    this.props.onNullifyCustomerQuotes();
  }

  onOpenPaymentModal = (quote) => {
    this.setState({isPaymentShow: true, selectedQuote: quote}, () => {
      this.props.onToggleShowQuotes()
    })
  };

  onToggleShowPayment = () => {
    this.setState({isPaymentShow: !this.state.isPaymentShow})
  };

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
          return <div>
            <div className="gx-mb-1">{record.address1}</div>
            <div className="gx-text-nowrap">{record.city}, Scotland</div>
            <div className="gx-text-nowrap">Postcode - {record.postcode}</div>
          </div>
        },
      },
      {
        title: <div className="gx-text-nowrap">ESTIMATED PRICE & AGE</div>,
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
            {record.day_time_tel ? <div className="gx-mb-1 gx-text-nowrap">{record.day_time_tel} <Tag
              style={{borderRadius: 20}}>Day</Tag></div> : null}
            {record.evening_time_tel ? <div className="gx-text-nowrap">{record.evening_time_tel} <Tag
              style={{borderRadius: 20}}>Evening</Tag></div> : null}
          </div>
        },
      },
      {
        title: "QUOTE",
        dataIndex: 'quote',
        key: 'quote',
        render: (text, record) => {
          return <span>£ {record.quote_amount}</span>
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
            {this.onShowRowDropdown(record)}o
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
        <Menu.Item key="2" onClick={() => this.props.onOpenPaymentModal(quote)}>
          Add Payment Detail
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h gx-pointer"/>
      </Dropdown>
    )
  };

  onSelectRequest = record => {
    this.props.history.push(`/quote-detail/${record.quote_request_id}`);
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
          {customerQuotes && customerQuotes.length > 0 ?
            <div>
              <h2 className="gx-widget-heading">Quote Requests</h2>
              <div className="gx-d-flex gx-justify-content-end">
                <Button type="primary" className="gx-btn-lg" onClick={() => this.props.onRaiseNewQuote()}>
                  Raise New Quote</Button>
              </div>
              <Table rowKey="quote_request_id" columns={this.quoteRow()}
                     dataSource={customerQuotes}
                     loading={updatingContent}
                     pagination={false}
                     className="gx-table-responsive"
              />
            </div>
            :
            <div className="gx-main-layout-content">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div className="gx-mt-4">No Record Found</div>
                <h3 className="gx-font-weight-bold gx-my-4">You have not raised any Quote Request</h3>
                <Button type="primary" onClick={() => this.props.onRaiseNewQuote()}>Request New Quote</Button>
              </div>
            </div>}
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

