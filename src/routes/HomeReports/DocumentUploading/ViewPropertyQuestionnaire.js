import React, {Component} from 'react';
import {Modal} from "antd";

class ViewPropertyQuestionnaire extends Component {

  render() {
    const {isViewOpen, onToggleViewBox} = this.props;
    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={isViewOpen}
          title="Property Questionnaire Details"
          maskClosable={false}
          onCancel={() => onToggleViewBox()}
          footer={null}>
          <div>
            This is form
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewPropertyQuestionnaire


