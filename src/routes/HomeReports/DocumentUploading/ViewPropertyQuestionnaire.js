import React, {Component} from 'react';
import {Modal} from "antd";
import Iframe from 'react-iframe'

class ViewPropertyQuestionnaire extends Component {

  render() {
    const {isViewOpen, onToggleViewBox, propertyQuestionnaire} = this.props;
    let propertyQuestionnaireFilePath = propertyQuestionnaire && propertyQuestionnaire.id ?
      `${process.env.REACT_APP_API_URL}property/quest/${propertyQuestionnaire.id}/view?token=${this.props.token}`
      : null;
    return (
      <div className="gx-main-layout-content">
        <Modal width="80%"
               visible={isViewOpen}
               title="Property Questionnaire Details"
               maskClosable={false}
               onCancel={() => onToggleViewBox()}
               footer={null}>
          <div>
            <Iframe url={propertyQuestionnaireFilePath}
                    width="100%"
                    height="600px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative"/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default ViewPropertyQuestionnaire


