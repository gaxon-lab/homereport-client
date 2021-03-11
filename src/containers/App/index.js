import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect, Route, Switch} from "react-router-dom";
import {ConfigProvider} from "antd";
import {IntlProvider} from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import axios from 'util/Api';
import ForgetPassword from "../PasswordReset/ForgetPassword";
import VerifyPassword from "../PasswordReset/VerifyPassword";
import {
  getUserProfile,
  onGetLoggedUserPermission,
  onLayoutTypeChange,
  onNavStyleChange,
  setInitUrl,
  setThemeType,
  updateAuthUser
} from "../../appRedux/actions";
import CircularProgress from "../../components/CircularProgress";
import Permissions from "../../util/Permissions";

const RestrictedRoute = ({component: Component, authUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: props.location}
          }}
        />}
  />;


class App extends Component {

  componentDidMount() {
    if (this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + this.props.token;
      this.props.getUserProfile();
      this.props.onGetLoggedUserPermission();
    } else {
      this.props.updateAuthUser(null);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.token === null && nextProps.token !== this.props.token) {
      axios.defaults.headers.common['Authorization'] = "Bearer " + nextProps.token;
      this.props.onGetLoggedUserPermission();
    }
  }

  render() {
    const {match, location, locale, authUser, loadUser, initURL} = this.props;

    if (!loadUser) {
      return <CircularProgress/>;
    }

    if (location.pathname === '/' || location.pathname === '') {
      if (initURL) {
        return (<Redirect to={initURL}/>);
      }
      return (<Redirect to={Permissions.canAccessDashboard() ? '/dashboard' : '/profile'}/>);
    } else if (authUser && (location.pathname === '/signin' || location.pathname === '/signup' || location.pathname === '/reset-password' || location.pathname === '/reset/password')) {
      if (initURL && location.pathname !== '/signin' && location.pathname !== '/signup' && location.pathname !== '/reset-password' && location.pathname !== '/reset/password') {
        return (<Redirect to={initURL}/>);
      }

      return (<Redirect to={Permissions.canAccessDashboard() ? '/dashboard' : '/profile'}/>);
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
            <RestrictedRoute path={`${match.url}`} authUser={authUser} component={MainApp}/>
          </Switch>
        </IntlProvider>
      </ConfigProvider>
    )
  }
}

const mapStateToProps = ({settings, auth}) => {
  const {locale, navStyle, layoutType} = settings;
  const {authUser, loadUser, initURL, token} = auth;
  return {locale, navStyle, layoutType, authUser, loadUser, initURL, token}
};
export default connect(mapStateToProps, {
  setInitUrl,
  setThemeType,
  onNavStyleChange,
  onLayoutTypeChange,
  getUserProfile,
  updateAuthUser,
  onGetLoggedUserPermission
})(App);
