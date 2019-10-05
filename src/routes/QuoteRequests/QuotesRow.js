import {Dropdown, Menu, Tag} from "antd";
import React from "react";

const onShowRowDropdown = (quote, context) => {
  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => context.onSelectRequest(quote)}>
        View Details
      </Menu.Item>
      <Menu.Item key="2" onClick={() => context.onOpenPaymentModal(quote)}>
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

const QuotesRow = (context) => {
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
      title: "CUSTOMER",
      dataIndex: 'customer',
      key: 'customer',
      render: (text, record) => {
        return <div>
          <div className="gx-text-nowrap">{record.customer_name}</div>
          <Tag className={`gx-mt-1 gx-text-white ${record.is_guest === 1 ? "gx-badge-red" : "gx-badge-cyan"}`}>{record.is_guest === 1 ? "Guest" : "Customer"}</Tag>
        </div>
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
          <div className="gx-mb-1">{record.property_price_value}</div>
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
          {record.day_time_tel ? <div className="gx-mb-1">{record.day_time_tel} <Tag
            style={{borderRadius: 20}}>Day</Tag></div> : null}
          {record.evening_time_tel ? <div>{record.evening_time_tel} <Tag
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
            {onShowRowDropdown(record, context)}
      </span>
      },
    },
  ];
};

export default QuotesRow;
