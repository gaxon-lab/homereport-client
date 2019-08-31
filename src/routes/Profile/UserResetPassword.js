import React, {Component} from 'react';
import {Button, Form, Input, Modal} from "antd";
import PropTypes from "prop-types";

class UserResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password_confirmation: "",
      password: ""
    }
  }

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onUpdateUserProfile({
          password: this.state.password,
          password_confirmation: this.state.password_confirmation
        });
        this.props.onTogglePasswordModal();
      }
    });
  };

  handleConfirmBlur = e => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {resetPasswordModal, onTogglePasswordModal} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={resetPasswordModal}
          title="Change Password"
          onCancel={() => onTogglePasswordModal()}
          footer={[
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>,
            <Button key="cancel" onClick={() => onTogglePasswordModal()}>
              Cancel
            </Button>,
          ]}>
          <Form layout="vertical">
            <Form.Item label="New Password" hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: "Please enter new password!",
                  },
                  {
                    validator: this.validateToNextPassword,
                  },
                ],
              })(<Input.Password autoFocus onChange={(e) => this.setState({password: e.target.value})}/>)}
            </Form.Item>
            <Form.Item label="Confirm Password" hasFeedback>
              {getFieldDecorator('password_confirmation', {
                rules: [
                  {
                    required: true,
                    message: "Please re-enter new password!",
                  },
                  {
                    validator: this.compareToFirstPassword,
                  },
                ],
              })(<Input.Password onBlur={this.handleConfirmBlur}
                                 onChange={(e) => this.setState({password_confirmation: e.target.value})}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

UserResetPassword = Form.create({})(UserResetPassword);

export default UserResetPassword;

UserResetPassword.defaultProps = {
  resetPasswordModal: false,
  currentCustomer: null
};

UserResetPassword.propTypes = {
  resetPasswordModal: PropTypes.bool,
  currentCustomer: PropTypes.number
};
