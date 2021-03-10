import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import {THEME_TYPE_LITE} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import {onGetLoggedUserPermission} from "../../appRedux/actions";
import Permissions from "../../util/Permissions";

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
    const {themeType, pathname} = this.props;
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

              {
                Permissions.canAccessDashboard() &&
                <Menu.Item key="dashboard">
                  <Link to="/dashboard"><i className="icon icon-dasbhoard"/>
                    <span>Dashboard</span></Link>
                </Menu.Item>
              }

              {
                Permissions.canAccessCustomers() &&
                <Menu.Item key="customers">
                  <Link to="/customers"><i className="icon icon-tag"/>
                    <span>Customers</span></Link>
                </Menu.Item>
              }

              {
                Permissions.canManageStaff() &&
                <Menu.Item key="staff">
                  <Link to="/staff"><i className="icon icon-user"/>
                    <span>Staff</span></Link>
                </Menu.Item>
              }


              <Menu.Item key="quote-requests">
                <Link to="/quote-requests"><i className="icon icon-extra-components"/>
                  <span>Quote Requests</span></Link>
              </Menu.Item>

              {
                Permissions.canAccessAssignedHomeReports() &&
                <Menu.Item key="home-reports">
                  <Link to="/home-reports"><i className="icon icon-lock-screen"/>
                    <span>Home Reports</span></Link>
                </Menu.Item>
              }

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

