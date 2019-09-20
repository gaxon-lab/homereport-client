import React from "react";
import {Button, Form, Input, message} from "antd";
import {connect} from "react-redux";
import IntlMessages from "util/IntlMessages";
import {onSetNewPassword} from "../../appRedux/actions";
import {injectIntl} from "react-intl";
import BackgroundImage from "../../assets/images/bg.png";
import ReactCodeInput from "react-code-input";

class VerifyPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password_confirmation: "",
      password: "",
      pin: ""
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const {pin} = this.state;
        if (pin.length === 6) {
          this.props.onSetNewPassword(pin, {...this.state}, this.props.history);
        } else {
          return message.error('The length of Pin should be 6 digits');
        }
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
    return (
      <div className="gx-app-login-wrap" style={{
        backgroundColor: "#2ba7b7", backgroundImage: `url(${BackgroundImage})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.resetPassword"/></h1>
                <p><IntlMessages id="app.userAuth.ResetPasswordText"/></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo-white.png")}/>
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <Form.Item label="Pin">
                  <ReactCodeInput type='password' fields={6} onChange={(pin) => {
                    this.setState({pin})
                  }}/>
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        validator: this.validateToNextPassword,
                      },
                    ],
                  })(<Input.Password onChange={(e) => this.setState({password: e.target.value})}/>)}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input.Password onBlur={this.handleConfirmBlur}
                                     onChange={(e) => this.setState({password_confirmation: e.target.value})}/>)}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.resetPassword"/>
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedVerifyPasswordForm = Form.create()(VerifyPassword);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onSetNewPassword})(injectIntl(WrappedVerifyPasswordForm));
