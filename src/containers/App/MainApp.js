import React, {Component, Suspense} from "react";
import {Layout} from "antd";

import Sidebar from "../Sidebar/index";

import Topbar from "../Topbar/index";
import {footerText} from "util/config";
import App from "routes/index";
import {connect} from "react-redux";
import CircularProgress from "../../components/CircularProgress";

const {Content, Footer} = Layout;

export class MainApp extends Component {

  render() {
    const {match} = this.props;

    return (
      <Layout className="gx-app-layout">
        <Sidebar/>
        <Layout>
          <Topbar/>
          <Content className="gx-layout-content">
            <Suspense fallback={<CircularProgress/>}>
              <App match={match}/>
            </Suspense>
            <Footer>
              <div className="gx-layout-footer-content">
                {footerText}
              </div>
            </Footer>
          </Content>
        </Layout>
      </Layout>
    )
  }
}

const mapStateToProps = ({settings}) => {
  const {width, navStyle} = settings;
  return {width, navStyle}
};
export default connect(mapStateToProps)(MainApp);

