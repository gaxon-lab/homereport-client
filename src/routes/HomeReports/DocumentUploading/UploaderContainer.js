import React, {Component} from 'react';
import {Button, Col, Icon, Row, Tooltip, Upload} from "antd";
import axios from 'util/Api'

class UploaderContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: []
    }
  }

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
    const {fileList} = this.state;
    const {document} = this.props;
    const filePath = document ? document.src : null

    return (
      <div>
        <Row className="gx-d-flex gx-justify-content-around gx-mb-3">
          <Col span={13} className="gx-font-weight-medium">
            {document ? <Icon type="check" className="gx-text-green"/> : <Icon type="close-circle"/>}
            <span className="gx-ml-1">{this.props.title}</span>
          </Col>
          <Col span={11} className="gx-d-flex gx-justify-content-between">
            <a href={filePath} target="_blank">
              <Tooltip title="View">
                <Icon type="eye" className=" gx-text-cyan"/>
              </Tooltip>
            </a>
            <a href={filePath} download target="_blank">
              <Tooltip title="Download">
                <Icon type="download" className="gx-text-cyan"/>
              </Tooltip>
            </a>
            <Upload
              fileList={fileList}
              onChange={this.handleUpload}
            >
              <Button style={{marginBottom: 0}} className="gx-badge-cyan gx-text-white gx-mb-0">
                <Icon type="upload"/> Upload
              </Button>
            </Upload>
          </Col>
        </Row>
      </div>
    );
  }
}

export default UploaderContainer;