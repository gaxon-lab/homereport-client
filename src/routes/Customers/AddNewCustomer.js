import React, {Component} from 'react';
import {Avatar, Button, Col, Form, Input, Modal, Radio, Row, Upload} from "antd";
import {connect} from "react-redux";
import {onAddNewCustomer, onEditCustomerDetails} from "../../appRedux/actions";
import {imageUpload} from "../../util/imageUploader";

class AddNewCustomer extends Component {
  constructor(props) {
    super(props);
    if (props.selectedCustomer === null) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        fileList: [],
        profile_pic_id: null,
        status: 1
      }
    } else {
      const imageId = props.selectedCustomer.profile_pic.length > 0 ? props.selectedCustomer.profile_pic[0].id : null;
      this.state = {...props.selectedCustomer, fileList: [], profile_pic_id: imageId}
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.requestSuccess) {
      this.props.onToggleAddCustomer();
    }
  }

  onSubmitForm = () => {
    if (this.state.fileList.length > 0) {
      this.onImageSelect();
    } else {
      this.onCustomerAdd();
    }
  };

  onCustomerAdd = () => {
    if (this.props.selectedCustomer === null) {
      this.props.onAddNewCustomer({...this.state})
    } else {
      this.props.onEditCustomerDetails({...this.state});
    }
  };

  onImageSelect = () => {
    let file = this.state.fileList[0];
    if (file) {
      imageUpload(file, this.onGetImageId);
    }
  };

  onGetImageId = (id) => {
    this.setState({profile_pic_id: id}, () => {
      this.onCustomerAdd();
      this.setState({fileList: []})
    })
  };

  getImageURL = () => {
    if (this.state.fileList.length > 0) {
      return URL.createObjectURL(this.state.fileList[0]);
    } else {
      if (this.props.selectedCustomer && this.props.selectedCustomer.profile_pic.length > 0) {
        return this.props.selectedCustomer.profile_pic[0].src
      } else {
        return require("assets/images/placeholder.jpg")
      }
    }
  };

  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSubmitForm();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {isAddCustomer, onToggleAddCustomer} = this.props;
    const {first_name, last_name, email, password, fileList, status} = this.state;
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
        <Modal
          visible={isAddCustomer}
          title={this.props.selectedCustomer === null ? "Add Customer" : "Edit Customer Details"}
          maskClosable={false}
          onCancel={() => onToggleAddCustomer()}
          footer={[
            <Button key="cancel" onClick={() => onToggleAddCustomer()}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>
          ]}>
          <Row>
            <Col xl={14} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical">
                <Form.Item label="First Name">
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter First Name!'}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter Last Name!'}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({last_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Email Address">
                  {getFieldDecorator('email', {
                    initialValue: email,
                    validate: [{
                      trigger: 'onBlur',
                      rules: [
                        {
                          required: true,
                          message: "Please enter Email Address!"
                        },
                      ],
                    }, {
                      trigger: 'onChange',
                      rules: [
                        {
                          type: 'email',
                          message: "This is not a correct email format!"
                        },
                      ],
                    }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Password"
                           extra={this.props.selectedCustomer === null ? "" :
                             "Note: Leave it blank if you don't want to update password."}>
                  {this.props.selectedCustomer === null ?
                    getFieldDecorator('password', {
                      initialValue: password,
                      rules: [{
                        required: true,
                        message: "Please enter Password!"
                      },
                        {
                          min: 8,
                          message: "Password should contain at least 8 characters",
                        }],
                    })(<Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>) :
                    <Input.Password type="text" onChange={(e) => {
                      this.setState({password: e.target.value})
                    }}/>}
                </Form.Item>

                <Form.Item label="Status">
                  <Radio.Group value={status} onChange={(e) => {
                    this.setState({status: e.target.value})
                  }}>
                    <Radio value={1}>Active</Radio>
                    <Radio value={0}>Disabled</Radio>
                  </Radio.Group>
                </Form.Item>

              </Form>
            </Col>
            <Col xl={10} lg={12} md={12} sm={12} xs={24}>
              <Upload {...props}>
                <Avatar className="gx-mr-3 gx-mb-5 gx-size-150 gx-pointer" src={this.getImageURL()}/>
              </Upload>
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

AddNewCustomer = Form.create({})(AddNewCustomer);

const mapStateToProps = ({common}) => {
  const {message} = common;
  return {requestSuccess: message};
}
export default connect(mapStateToProps, {
  onAddNewCustomer,
  onEditCustomerDetails
})((AddNewCustomer));
