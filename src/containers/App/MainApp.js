import React, {Component} from "react";
import {Layout} from "antd";

import Sidebar from "../Sidebar/index";

import Topbar from "../Topbar/index";
import App from "routes/index";
import {connect} from "react-redux";

const {Content, Footer} = Layout;
const today = new Date();

export class MainApp extends Component {
  render() {
    const {match} = this.props;

    return (
      <Layout className="gx-app-layout">
        <Sidebar/>
        <Layout>
          <Topbar/>
          <Content className="gx-layout-content">
            <App match={match}/>
            <Footer>
              <div className="gx-layout-footer-content">
                Copyright Home Report Scotland © {today.getFullYear()}
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

