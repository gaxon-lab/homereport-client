import React from "react";
import {Button, Checkbox, Form, Input} from "antd";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import IntlMessages from "util/IntlMessages";
import InfoView from "components/InfoView";

const FormItem = Form.Item;

class SignUp extends React.Component {

  onHandleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("signup");
      }
    });
  };


  componentDidUpdate() {
    if (this.props.token !== null) {
      this.props.history.push('/');
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="gx-app-login-wrap ">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content">
              <div className="gx-app-logo-content-bg">
                <img src='https://via.placeholder.com/272x395' alt='Neature'/>
              </div>
              <div className="gx-app-logo-wid">
                <h1><IntlMessages id="app.userAuth.signUp"/></h1>
                <p><IntlMessages id="app.userAuth.bySigning"/></p>
                <p><IntlMessages id="app.userAuth.getAccount"/></p>
              </div>
              {/*<div className="gx-app-logo">*/}
              {/*  <img alt="example" src={require("assets/images/logo.svg")}/>*/}
              {/*</div>*/}
            </div>

            <div className="gx-app-login-content">
              <Form onSubmit={this.onHandleSubmit} className="gx-signup-form gx-form-row0">
                <FormItem>
                  {getFieldDecorator('first_name', {
                    rules: [{required: true, message: 'Please input your first name!'}],
                  })(
                    <Input placeholder="First Name"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('last_name', {
                    rules: [{required: true, message: 'Please input your last name!'}],
                  })(
                    <Input placeholder="Last Name"/>
                  )}
                </FormItem>

                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{
                      required: true, type: 'email', message: 'The input is not valid E-mail!',
                    }],
                  })(
                    <Input placeholder="Email"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                  })(
                    <Input type="password" placeholder="Password"/>
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                    <Checkbox><IntlMessages id="appModule.iAccept"/></Checkbox>
                  )}
                  <span className="gx-link gx-signup-form-forgot"><IntlMessages
                    id="appModule.termAndCondition"/></span>
                </FormItem>
                <FormItem>
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signUp"/>
                  </Button>
                  <span><IntlMessages id="app.userAuth.or"/></span> <Link to="/signin"><IntlMessages
                  id="app.userAuth.signIn"/></Link>
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

const WrappedSignUpForm = Form.create()(SignUp);

const mapStateToProps = ({auth}) => {
  const {token} = auth;
  return {token}
};

export default connect(mapStateToProps, {})(WrappedSignUpForm);
