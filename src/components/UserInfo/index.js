import React, {Component} from "react";
import {connect} from "react-redux";
import {Popover} from "antd";


class UserInfo extends Component {

  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li>My Account</li>
        <li>Connections</li>
        <li onClick={() => this.props.userSignOut()}>Logout
        </li>
      </ul>
    );

    return (
      <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
               trigger="click">
      </Popover>
    )

  }
}

export default connect(null, {})(UserInfo);
