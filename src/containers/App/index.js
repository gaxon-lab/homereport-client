import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {setInitUrl} from "appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "appRedux/actions/Setting";
import axios from 'util/Api';
import ForgetPassword from "../PasswordReset/ForgetPassword";
import VerifyPassword from "../PasswordReset/VerifyPassword";
import {onGetUserPermission} from "../../appRedux/actions";

const RestrictedRoute = ({component: Component, token, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      token
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;


class App extends Component {

  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    if (this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.token;
      this.props.onGetUserPermission(this.props.history)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.token === null && nextProps.token !== this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
      this.props.onGetUserPermission(this.props.history)
    }
  }

  render() {
    const {match, location, locale, initURL, token} = this.props;
    if (location.pathname === '/' || location.pathname === '') {
      if (token === null) {
        return (<Redirect to={'/signin'}/>);
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        return (<Redirect to={'/dashboard'}/>);
      } else {
        return (<Redirect to={initURL}/>);
      }
    }

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <ConfigProvider locale={currentAppLocale.antd}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>

          <Switch>
            <Route exact path='/signin' component={SignIn}/>
            <Route exact path='/signup' component={SignUp}/>
            <Route exact path='/reset-password' component={ForgetPassword}/>
            <Route exact path='/reset/password' component={VerifyPassword}/>
            <RestrictedRoute path={`${match.url}`} token={token}
                             component={MainApp}/>
          </Switch>
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale, navStyle, layoutType} = settings;
  const { initURL, token} = auth;
  return {locale, navStyle, layoutType,  initURL, token}
};
export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  onGetUserPermission
})(App);
