import {Avatar, Dropdown, Menu, Tag} from "antd";
import React from "react";

const onShowRowDropdown = (staff, context) => {
  const menu = (
    <Menu>
      <Menu.Item key="2" onClick={() => context.onEditIconClick(staff)}>
        Edit
      </Menu.Item>
      <Menu.Item key="3"
                 onClick={() => staff.status === 1 ? context.onDisableStatusPopUp(staff) : context.onEnableStatusPopUp(staff)}>
        {staff.status === 1 ? "Disable" : "Enable"}
      </Menu.Item>
      <Menu.Divider/>
      <Menu.Item key="4" onClick={() => context.onDeletePopUp(staff.id)}>
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

const StaffRow = (context) => {
  return [
    {
      title: 'NAME',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">
             {record.profile_pic.length > 0 ?
               <Avatar className="gx-mr-3 gx-size-50" src={record.profile_pic[0].src}/> :
               <Avatar className="gx-mr-3 gx-size-50"
                       style={{backgroundColor: '#f56a00'}}>{record.first_name[0].toUpperCase()}</Avatar>}
          {record.first_name + " " + record.last_name} </span>
      }
    },
    {
      title: 'EMAIL',
      dataIndex: 'email',
      key: 'email',
      render: (text, record) => {
        return <span className="gx-email gx-d-inline-block gx-mr-2">{record.email}</span>
      },
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (text, record) => {
        return <Tag color={record.status === 1 ? "green" : "red"}>
          {record.status === 1 ? "Active" : "Disabled"}
        </Tag>
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

export default StaffRow
