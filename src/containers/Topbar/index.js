import React, {Component} from "react";
import {Layout} from "antd";
import {Link} from "react-router-dom";
import {toggleCollapsedSideNav} from "../../appRedux/actions/Setting";
import UserInfo from "components/UserInfo";
import Auxiliary from "util/Auxiliary";


import {NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE} from "../../constants/ThemeSetting";
import {connect} from "react-redux";
import UserProfile from "../Sidebar/UserProfile";

const {Header} = Layout;

class Topbar extends Component {

  state = {
    searchText: '',
  };


  render() {
    const {width, navCollapsed, navStyle} = this.props;
    return (
      <Auxiliary>
        <Header>
          {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ?
            <div className="gx-linebar gx-mr-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   this.props.toggleCollapsedSideNav(!navCollapsed);
                 }}
              />
            </div> : null}
          <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer">
            <img alt="" src={require("assets/images/w-logo.png")}/></Link>

          <ul className="gx-header-notifications gx-ml-auto">
            <li className="gx-language gx-py-3">
              <UserProfile/>
            </li>
            {width >= TAB_SIZE ? null :
              <Auxiliary>
                <li className="gx-user-nav"><UserInfo/></li>
              </Auxiliary>
            }
          </ul>
        </Header>
      </Auxiliary>
    );
  }
}

const mapStateToProps = ({settings}) => {
  const {locale, navStyle, navCollapsed, width} = settings;
  return {locale, navStyle, navCollapsed, width}
};

export default connect(mapStateToProps, {toggleCollapsedSideNav})(Topbar);
