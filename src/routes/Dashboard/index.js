import React, {Component} from 'react';
import {Empty} from "antd";

class Dashboard extends Component {
  render() {
    return (
      <div>
      <Empty description={<span>Stay Tuned, Data coming soon</span>}/>
      </div>
    );
  }
}

export default Dashboard;
