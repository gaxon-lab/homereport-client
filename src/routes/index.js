import React, {lazy} from "react";
import {Route, Switch} from "react-router-dom";

const App = ({match}) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}dashboard`} component={lazy(() => import('./Dashboard'))}/>
      <Route path={`${match.url}staff`} component={lazy(() => import('./Staff'))}/>
      <Route path={`${match.url}customers`} component={lazy(() => import('./Customers'))}/>
      <Route path={`${match.url}customer-detail/:id`} component={lazy(() => import('./Customers/CustomerDetail'))}/>
      <Route path={`${match.url}quote-requests`} component={lazy(() => import('./QuoteRequests'))}/>
      <Route path={`${match.url}quote-detail/:id`} component={lazy(() => import('./QuoteRequests/QuoteDetail'))}/>
      <Route path={`${match.url}home-reports`} component={lazy(() => import('./HomeReports'))}/>
      <Route path={`${match.url}report-detail/:id`} component={lazy(() => import('./HomeReports/ReportDetail'))}/>
      <Route path={`${match.url}profile`} component={lazy(() => import('./Profile/index'))}/>
    </Switch>
  </div>
);

export default App;
