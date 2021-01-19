import React from "react";
import {Route, Switch} from "react-router-dom";
import asyncComponent from "../util/asyncComponent";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('./Dashboard'))}/>
      <Route path={`${match.url}staff`} component={asyncComponent(() => import('./Staff'))}/>
      <Route path={`${match.url}customers`} component={asyncComponent(() => import('./Customers'))}/>
      <Route path={`${match.url}customer-detail/:id`}
             component={asyncComponent(() => import('./Customers/CustomerDetail'))}/>
      <Route path={`${match.url}quote-requests`} component={asyncComponent(() => import('./QuoteRequests'))}/>
      <Route path={`${match.url}quote-detail/:id`}
             component={asyncComponent(() => import('./QuoteRequests/QuoteDetail'))}/>
      <Route path={`${match.url}home-reports`} component={asyncComponent(() => import('./HomeReports'))}/>
      <Route path={`${match.url}report-detail/:id`}
             component={asyncComponent(() => import('./HomeReports/ReportDetail'))}/>
      <Route path={`${match.url}profile`} component={asyncComponent(() => import('./Profile/index'))}/>
    </Switch>
  </div>
);

export default App;
