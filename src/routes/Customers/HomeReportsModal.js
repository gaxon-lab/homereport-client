import React, {Component} from 'react';
import {Dropdown, Menu, Modal, Table, Tag} from "antd";
import {connect} from "react-redux";
import {onGetCustomerReports, onNullifyCustomerReports} from "../../appRedux/actions/Customers";
import InfoView from "../../components/InfoView";

class HomeReportsModal extends Component {

  componentDidMount() {
    this.props.onGetCustomerReports(this.props.selectedCustomer.id)
  }

  componentWillUnmount() {
    this.props.onNullifyCustomerReports();
  }

  homeReportsRow = () => {
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
        <Menu.Item key="1" onClick={() => this.onSelectReport(quote)}>
          View Detail
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <i className="icon icon-ellipse-h gx-pointer"/>
      </Dropdown>
    )
  };

  onSelectReport = record => {
    this.props.history.push(`/report-detail/${record.report_id}`);
  };

  render() {
    const {isShowHomeRecords, onToggleHomeRecords, updatingContent, customerReports} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal width="69%"
               visible={isShowHomeRecords}
               maskClosable={false}
               onCancel={() => onToggleHomeRecords()}
               footer={null}>
          <h2 className="gx-widget-heading">Home Reports</h2>
          <Table rowKey="id" columns={this.homeReportsRow()}
                 dataSource={customerReports}
                 loading={updatingContent}
                 pagination={false}
                 className="gx-table-responsive"
                 />
        </Modal>
        <InfoView/>
      </div>
    );
  }
}

const mapPropsToState = ({customers, common}) => {
  const {customerReports} = customers;
  const {updatingContent} = common;
  return {customerReports, updatingContent};
};

export default connect(mapPropsToState, {
  onGetCustomerReports, onNullifyCustomerReports
})(HomeReportsModal);
