import React, {Component} from 'react';
import {Button, Col, Icon, Row, Tooltip, Upload} from "antd";
import ViewPropertyQuestionnaire from "./ViewPropertyQuestionnaire";
import {imageUpload} from "../../../util/imageUploader";

class UploaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      isViewOpen: false
    }
  }

  onToggleViewBox = () => {
    this.setState({isViewOpen: !this.state.isViewOpen})
  };

  onClickViewPropertyQuestionnaire = () => {
    if (document) {
      this.setState({isViewOpen: !this.state.isViewOpen})
    }
  };

  handleUpload =  (fileObj) => {
    const file = fileObj.fileList[0].originFileObj;
    imageUpload(file, this.onGetDocumentId);
  };

  onGetDocumentId = (id) => {
    this.props.onUploadDocument(id, this.props.caption);
    this.setState({fileList: []})
  };

  onGetFilePath = () => {
    const {caption, document, token} = this.props;
    if (caption === "property_quest") {
      if (document) {
        return `${process.env.REACT_APP_API_URL}property/quest/${document.id}/download?token=${token}`
      } else {
        return null;
      }
    } else {
      if (document && document.path) {
        return document.path;
      } else {
        return null;
      }
    }
  };

  render() {
    const {fileList, isViewOpen} = this.state;
    const {document, caption} = this.props;
    const filePath = this.onGetFilePath();
    return (
      <div>
        <Row className="gx-d-flex gx-justify-content-around gx-mb-1">
          <Col span={13}>
            {document && document.id ? <Icon type="check" className="gx-text-green"/> : <Icon type="close"/>}
            <span className="gx-ml-3 gx-text-black">{this.props.title}</span>
          </Col>

          <Col span={11} className="gx-d-flex gx-justify-content-between">
            {caption === "property_quest" && filePath ?
              <Tooltip title="View">
                <Icon type="eye" className=" gx-text-black" onClick={this.onClickViewPropertyQuestionnaire}/>
              </Tooltip> :
              <a href={filePath} target="_blank" rel="noopener noreferrer">
                <Tooltip title="View">
                  <Icon type="eye" className=" gx-text-black"/>
                </Tooltip>
              </a>}

            <a href={filePath} download target="_blank" rel="noopener noreferrer">
              <Tooltip title="Download">
                <Icon type="download" className="gx-text-black"/>
              </Tooltip>
            </a>

            {caption !== "property_quest" ?
              <Upload
                fileList={fileList}
                onChange={this.handleUpload}>
                <Button type="primary" ghost>
                  Upload
                </Button>
              </Upload> : <Button style={{opacity: 0, cursor: "default"}} type="primary" ghost>upload</Button>}
          </Col>
        </Row>
        {isViewOpen ? <ViewPropertyQuestionnaire isViewOpen={isViewOpen}
                                                 token={this.props.token}
                                                 onToggleViewBox={this.onToggleViewBox}
                                                 propertyQuestionnaire={this.props.document}/> : null}
      </div>
    );
  }
}

export default UploaderContainer;
