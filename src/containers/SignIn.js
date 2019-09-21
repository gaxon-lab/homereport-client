import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {connect} from "react-redux";
import {onUserSignIn} from "../appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import InfoView from "../components/InfoView";
import {injectIntl} from "react-intl";
import BackgroundImage from "../assets/images/bg.png";

const FormItem = Form.Item;

class SignIn extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onUserSignIn(values);
      }
    });
  };

  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push('/dashboard');
    }
  }

  onForgetPassword = () => {
    this.props.history.push('/reset-password');
  };

  render() {
    console.log("process.env.NODE_ENV", process.env.REACT_APP_API_URL)
    const {messages} = this.props.intl;
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="gx-app-login-wrap" style={{backgroundColor:"#2ba7b7",backgroundImage:`url(${BackgroundImage})`, backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'}}>


        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                {/*<img src={require("../assets/images/bg.png")} alt='Nature'/>*/}
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signIn"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p className="gx-pointer" onClick={this.onForgetPassword} style={{textDecoration: 'underline'}}>"Forgot
                  your password? Recover Now"</p>
              </div>
              <div className="gx-app-logo">
                <img alt="example" src={require("assets/images/logo-white.png")}/>
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form onSubmit={this.handleSubmit} className="gx-signin-form gx-form-row0">
                <FormItem>
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
                  {getFieldDecorator('password', {
                    initialValue: "",
                    rules: [{required: true, message: messages["validation.message.inputPassword"]}],
                  })(
                    <Input type="password" placeholder="Password"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox>Remember me on this computer</Checkbox>
                  )}

                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn"/>
                  </Button>
                </FormItem>
              </Form>
            </div>
          </div>
        </div>
        <InfoView/>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {onUserSignIn})(injectIntl(WrappedNormalLoginForm));
