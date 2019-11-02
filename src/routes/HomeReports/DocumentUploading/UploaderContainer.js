import React, {Component} from 'react';
import {Button, Col, Icon, Row, Tooltip, Upload} from "antd";
import axios from 'util/Api'
import ViewPropertyQuestionnaire from "./ViewPropertyQuestionnaire";

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

  handleUpload = (fileObj) => {
    const file = fileObj.fileList[0].originFileObj
    let formData = new FormData();
    formData.append('file', file);
    formData.append('title', file.name);
    this.imageUpload(formData);
  };

  imageUpload = (file) => {
    this.props.fetchStart();
    axios.post("/uploads/temporary/media", file, {
      headers: {
        'Content-Type': "multipart/form-data"
      }
    }).then(({data}) => {
      if (data.success) {
        console.log("image uploaded successfully", data)
        this.props.fetchSuccess();
        this.props.onUploadDocument(data.data, this.props.caption)
        this.setState({fileList: []})
      } else {
        this.props.fetchError(data.errors[0])
      }
    }).catch((error) => {
      console.log("error",)
      this.props.fetchError(error)
    });
  };

  render() {
    const {fileList, isViewOpen} = this.state;
    const {document, caption} = this.props;
    const filePath = document && document.path ? document.path : null;
    let propertyQuestionnaireFilePath;
    if (document) {
      propertyQuestionnaireFilePath =
        `http://homereport.wearebauercreate.design/homereport-server/public/api/property/quest/${document.id}/download?token=${this.props.token}`
    }
    return (
      <div>
        <Row className="gx-d-flex gx-justify-content-around gx-mb-1">
          <Col span={13}>
            {document && document.id ? <Icon type="check" className="gx-text-green"/> : <Icon type="close"/>}
            <span className="gx-ml-3 gx-text-black">{this.props.title}</span>
          </Col>

          <Col span={11} className="gx-d-flex gx-justify-content-between">
            {caption === "property_quest" ?
              <Tooltip title="View">
                <Icon type="eye" className=" gx-text-black" onClick={this.onToggleViewBox}/>
              </Tooltip> :
              <a href={filePath} target="_blank" rel="noopener noreferrer">
                <Tooltip title="View">
                  <Icon type="eye" className=" gx-text-black"/>
                </Tooltip>
              </a>}
            {caption === "property_quest" ?
              <a href={propertyQuestionnaireFilePath} download target="_blank" rel="noopener noreferrer">
                <Tooltip title="Download">
                  <Icon type="download" className="gx-text-black"/>
                </Tooltip>
              </a> :
              <a href={filePath} download target="_blank" rel="noopener noreferrer">
                <Tooltip title="Download">
                  <Icon type="download" className="gx-text-black"/>
                </Tooltip>
              </a>}
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
                                                 propertyQuestionnaire={this.props.propertyQuestionnaire}/> : null}
      </div>
    );
  }
}

export default UploaderContainer;
