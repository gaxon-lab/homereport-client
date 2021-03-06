import React, {Component} from 'react';
import {Avatar, Button, message, Upload} from "antd/lib/index";
import PropTypes from "prop-types";
import {imageUpload} from "../../util/imageUploader";


class ImageUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
    }
  }

  onLogoSelect = () => {
    let file = this.state.fileList[0];
    if (file) {
      imageUpload(file, this.onGetImageId);
    } else {
      message.warning("Please select Image First!")
    }
  };

  onGetImageId = (id) => {
    this.props.onAddImage(id);
    message.success("The profile picture has been uploaded successfully.")
  };

  getImageURL = () => {
    const {uploadedImage} = this.props;
    if (this.state.fileList.length > 0) {
      return URL.createObjectURL(this.state.fileList[0]);
    } else if (uploadedImage && uploadedImage.src) {
      return uploadedImage.src;
    } else {
      return require("assets/images/placeholder.jpg")
    }
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
      <div className="gx-main-layout-content">
        <Upload {...props}>
          <Avatar className="gx-size-200"
                  src={this.getImageURL()}/>
        </Upload>
        <Button type="primary" className="gx-mt-5 gx-ml-4" onClick={this.onLogoSelect}>Upload Image</Button>
      </div>
    )
  }
}

export default ImageUpload;

ImageUpload.defaultProps = {
  imageAvatar: null
};

ImageUpload.propTypes = {
  imageAvatar: PropTypes.object,
  onAddProfileImage: PropTypes.func,
};
