import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import Settings from "./Settings";
import Auth from "./Auth";
import Common from "./Common";
import StaffList from "./StaffList";
import Customers from "./Customers";
import QuoteRequests from "./QuoteRequests";
import HomeReports from "./HomeReports";
import Dashboard from "./Dashboard";


const reducers = combineReducers({
  routing: routerReducer,
  settings: Settings,
  auth: Auth,
  common: Common,
  staff: StaffList,
  customers: Customers,
  quoteRequests: QuoteRequests,
  homeReports: HomeReports,
  dashboard: Dashboard
});

export default reducers;
