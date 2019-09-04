import React, {Component} from 'react';
import {Button, Col, Icon, Row, Upload} from "antd";
import axios from 'util/Api'

class PropertyQuestionareDocument extends Component {
  constructor(props){
    super(props);
    this.state={
      fileList: []
    }
  }

  handleUpload = () => {
    const file = this.state.fileList[0];
    let formData = new FormData();
    formData.append('file', file);
    formData.append('title', "Property Questionnaire");
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
        this.props.onUploadDocument(data.data)
        this.setState({fileList: []})
      }
      else {
        this.props.fetchError(data.errors[0])
      }
    }).catch(function (error) {
      this.props.fetchError(error.message)
    });
  };

  render() {
    const {fileList} = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice(-1);
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        if (fileList.length > 0) {
          props.onRemove(fileList[0])
        }
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Row className="gx-d-flex gx-justify-content-around gx-mb-3">
          <Col span={13} className="gx-font-weight-medium" style={{fontSize: 18}}>
            <Icon type="check" className="gx-text-green"/>
            <span className="gx-ml-1">Property Questionnaire</span>
          </Col>
          <Col span={11} className="gx-d-flex gx-justify-content-between">
            <Icon type="eye" className=" gx-text-cyan"/>
            <Icon type="download" className="gx-text-cyan"/>
            <Upload {...props} onChange={this.handleUpload}>
              <Button className="gx-badge-cyan gx-text-white">
                <Icon type="upload"/> Upload
              </Button>
            </Upload>
          </Col>
        </Row>
      </div>
    );
  }
}

export default PropertyQuestionareDocument;
