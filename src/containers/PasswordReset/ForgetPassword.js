import React from "react";
import {Button, Form, Input} from "antd";
import {connect} from "react-redux";
import IntlMessages from "util/IntlMessages";
import InfoView from "../../components/InfoView";
import {onResetPassword} from "../../appRedux/actions";
import {Link} from "react-router-dom";
import {injectIntl} from "react-intl";
import BackgroundImage from "../../assets/images/bg.png";

const FormItem = Form.Item;

class ForgetPassword extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onResetPassword(values, this.props.history, this);
      }
    });
  };

  render() {
    const {messages} = this.props.intl;
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
                <p><IntlMessages id="app.userAuth.forgetPasswordText"/></p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo-white.png")}/>
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem label={<IntlMessages id="app.userAuth.enterEmailAddress"/>}>
                  {getFieldDecorator('email', {
                    initialValue: "info@homereportscotland.scot",
                    rules: [{
                      required: true, type: 'email', message: messages["validation.message.emailFormat"],
                    }],
                  })(
                    <Input placeholder="Email"/>
                  )}
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.send"/>
                  </Button>
                </FormItem>
              </Form>
              <Link to="/signin"><IntlMessages
                id="app.userAuth.goback"/></Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalPasswordForm = Form.create()(ForgetPassword);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onResetPassword})(injectIntl(WrappedNormalPasswordForm));
