import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import {THEME_TYPE_LITE} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import {onGetLoggedUserPermission} from "../../appRedux/actions";


class SidebarContent extends Component {

  componentWillMount() {
    if (this.props.authUser && this.props.authUser.id) {
      this.props.onGetLoggedUserPermission();
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.authUser && nextProps.authUser !== this.props.authUser) {
      this.props.onGetLoggedUserPermission();
    }
  }

  render() {
    const {themeType, pathname, loggedUserPermissions} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo/>
        <div className="gx-sidebar-content">
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline">

              <Menu.Item key="dashboard">
                <Link to="/dashboard"><i className="icon icon-dasbhoard"/>
                  Dashboard</Link>
              </Menu.Item>
              {loggedUserPermissions && loggedUserPermissions.filter((key) => key.name === "can access all customers").length > 0 ?
                <Menu.Item key="customers">
                  <Link to="/customers"><i className="icon icon-tag"/>
                    Customers</Link>
                </Menu.Item> : null}

              {loggedUserPermissions && loggedUserPermissions.filter((key) => key.name === "can manage staff").length > 0 ?
                <Menu.Item key="staff">
                  <Link to="/staff"><i className="icon icon-user"/>
                    Staff</Link>
                </Menu.Item> : null}


              <Menu.Item key="quote-requests">
                <Link to="/quote-requests"><i className="icon icon-extra-components"/>
                  Quote Requests</Link>
              </Menu.Item>

              <Menu.Item key="home-reports">
                <Link to="/home-reports"><i className="icon icon-lock-screen"/>
                  Home Reports</Link>
              </Menu.Item>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings, auth}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  const {authUser, loggedUserPermissions} = auth;
  return {navStyle, themeType, locale, pathname, authUser, loggedUserPermissions}
};
export default connect(mapStateToProps, {onGetLoggedUserPermission})(SidebarContent);

