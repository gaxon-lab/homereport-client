import React, {Component} from 'react';
import {Empty} from "antd";

class Dashboard extends Component {
  render() {
    return (
      <div>
      <Empty description={<h1>Stay Tuned, Data coming soon</h1>}/>
      </div>
    );
  }
}

export default Dashboard;