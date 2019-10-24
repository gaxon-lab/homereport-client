import {Dropdown, Menu, Tag} from "antd";
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
        return <span className="gx-text-nowrap">£ {record.quote_amount}</span>
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
      <i className="icon icon-ellipse-h gx-pointer"/>
    </Dropdown>
  )
};

export default CustomerReportsRow;
