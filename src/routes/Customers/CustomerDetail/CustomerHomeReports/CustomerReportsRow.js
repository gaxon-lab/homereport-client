import {Dropdown, Menu} from "antd";
import React from "react";

const CustomerReportsRow = (context) => {
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
        return  <div>
          <div className="gx-mb-1">{record.address1}</div>
          <div>{record.city}, Scotland - {record.postcode}</div>
        </div>
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
            {onShowRowDropdown(record, context)}
      </span>
      },
    },
  ];
};

const onShowRowDropdown = (quote, context) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => context.onSelectReport(quote)}>
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

export default CustomerReportsRow;
