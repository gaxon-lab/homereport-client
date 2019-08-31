import React, {Component} from "react";
import {Menu} from "antd";
import {Link} from "react-router-dom";

import CustomScrollbars from "util/CustomScrollbars";
import SidebarLogo from "./SidebarLogo";

import Auxiliary from "util/Auxiliary";
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE
} from "../../constants/ThemeSetting";
import {connect} from "react-redux";


class SidebarContent extends Component {

  getNoHeaderClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      return "gx-no-header-notifications";
    }
    return "";
  };
  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return "gx-no-header-submenu-popup";
    }
    return "";
  };

  render() {
    const {themeType, pathname} = this.props;
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo/>
        <div className="gx-sidebar-content">
          {/*<div className={`gx-sidebar-notifications ${this.getNoHeaderClass(navStyle)}`}>*/}
          {/*  /!*<UserProfile/>*!/*/}
          {/*  /!*<AppsNavigation/>*!/*/}
          {/*</div>*/}
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

              <Menu.Item key="customers">
                <Link to="/customers"><i className="icon icon-tag"/>
                  Customers</Link>
              </Menu.Item>

              <Menu.Item key="staff">
                <Link to="/staff"><i className="icon icon-user"/>
                  Staff</Link>
              </Menu.Item>

              <Menu.Item key="quote">
                <Link to="/quote-requests"><i className="icon icon-lock-screen"/>
                  Quote Requests</Link>
              </Menu.Item>

              <Menu.Item key="reports">
                <Link to="/home-reports"><i className="icon icon-lock-screen"/>
                  Home Reports</Link>
              </Menu.Item>

              <Menu.Item key="roles-permissions">
                <Link to="/roles-permissions/all"><i className="icon icon-lock-screen"/>
                  Roles & Permissions</Link>
              </Menu.Item>

            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({settings}) => {
  const {navStyle, themeType, locale, pathname} = settings;
  return {navStyle, themeType, locale, pathname}
};
export default connect(mapStateToProps)(SidebarContent);

