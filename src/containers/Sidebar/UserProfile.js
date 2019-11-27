import React, {Component} from "react";
import {connect} from "react-redux";
import {Avatar, Popover} from "antd";
import {onUpdateUserProfile, onUserSignOut} from "../../appRedux/actions";
import UserResetPassword from "../../routes/Profile/UserResetPassword";
import {withRouter} from "react-router-dom";

class UserProfile extends Component {
  state = {
    resetPasswordModal: false
  };

  onTogglePasswordModal = () => {
    this.setState({resetPasswordModal: !this.state.resetPasswordModal})
  };

  getImageURL = () => {
    if(this.props.authUser) {
      const authUser = this.props.authUser;
      if ( authUser.profile_pic && authUser.profile_pic.length > 0 && authUser.profile_pic[0].src) {
        return authUser.profile_pic[0].src;
      } else {
        return require("assets/images/placeholder.jpg")
      }
    }
  };

  render() {
    const {authUser} = this.props;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.history.push("/profile")}>My Account</li>
        <li onClick={this.onTogglePasswordModal}>Change Password</li>
        <li onClick={() => this.props.onUserSignOut()}>Logout
        </li>
      </ul>
    );
    return (

      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        {authUser ?
          <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
            <Avatar src={this.getImageURL()}
                    className="gx-size-40 gx-pointer gx-mr-3" alt=""/>
            <span className="gx-avatar-name">{authUser.first_name + " " + authUser.last_name}<i
              className="icon icon-chevron-down gx-fs-xxs gx-ml-2"/></span>
          </Popover> : null}
        {this.state.resetPasswordModal ?
          <UserResetPassword onTogglePasswordModal={this.onTogglePasswordModal}
                             resetPasswordModal={this.state.resetPasswordModal}
                             onUpdateUserProfile={this.props.onUpdateUserProfile}/>
          : null}
      </div>

    )

  }
}

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser};
};

export default connect(mapStateToProps, {onUserSignOut, onUpdateUserProfile})(withRouter(UserProfile));
