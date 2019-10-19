import {Avatar, Divider, Dropdown, Menu} from "antd";
import React from "react";


const onShowRowDropdown = (currentCustomer, context) => {
  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={() => context.onEditIconClick(currentCustomer)}>
        Edit
      </Menu.Item>
      <Menu.Item key="1" onClick={() => context.onSelectCustomer(currentCustomer)}>
        View Profile
      </Menu.Item>
      <Menu.Item key="3" onClick={() => context.onShowCustomerQuotes(currentCustomer)}>
        Quote Requests
      </Menu.Item>
      <Menu.Item key="4" onClick={() => context.onShowCustomerReports(currentCustomer)}>
        Home Reports
      </Menu.Item>
      <Menu.Item key="5" onClick={() => context.onDeletePopUp(currentCustomer.id)}>
       Delete
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <i className="icon icon-ellipse-h"/>
    </Dropdown>
  )
};

const CustomersRow = (context) => {
  return [
    {
      title: "CUSTOMER",
      dataIndex: 'title',
      key: 'customer',
      render: (text, record) => {
        return (<div className="gx-media gx-flex-nowrap gx-align-items-center">
            {record.profile_pic && record.profile_pic.length > 0 ?
              <Avatar className="gx-mr-3 gx-size-50" src={record.profile_pic[0].src}/> :
              <Avatar className="gx-mr-3 gx-size-50"
                      style={{backgroundColor: '#00CED1'}}>{record.first_name[0].toUpperCase()}</Avatar>}
            <div className="gx-media-body">
              <span className="gx-mb-0 gx-text-capitalize">{record.first_name + " " + record.last_name}</span>
            </div>
          </div>
        )
      }
    },
    {
      title: "EMAIL",
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        return <span>{record.email ? record.email : "NA"}</span>
      },
    },
    {
      title: "QUOTE REQUESTS",
      dataIndex: 'quoteRequests',
      key: 'quoteRequests',
      render: (text, record) => {
        return <span onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          context.onShowCustomerQuotes(record)
        }}>
          <span className="gx-link" style={{textDecoration: "underline"}}>Quote Requests</span>
           <span className="gx-link"> [{record.quote_requests_count}]</span>
        </span>
      },
    },
    {
      title: "HOME REPORTS",
      dataIndex: 'homeReports',
      key: 'homeReports',
      render: (text, record) => {
        return <span onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          context.onShowCustomerReports(record)
        }}>
          <span className="gx-link" style={{textDecoration: "underline"}}>Home Reports</span>
           <span className="gx-link"> [{record.reports_count}]</span>
        </span>
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
            {onShowRowDropdown(record, context)}
      </span>
      },
    },
  ];
};

export default CustomersRow;
