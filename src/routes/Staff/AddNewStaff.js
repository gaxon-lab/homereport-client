import React, {Component} from 'react';
import {Avatar, Button, Checkbox, Col, Form, Input, Modal, Radio, Row, Upload} from "antd";
import {connect} from "react-redux";
import {onAddStaffMember, onEditStaffMember, onGetSelectedStaffPermission} from "../../appRedux/actions";
import {imageUpload} from "../../util/imageUploader";

class AddNewStaff extends Component {
  constructor(props) {
    super(props);
    if (props.selectedStaff === null) {
      this.state = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        fileList: [],
        status: 1,
        profile_pic_id: null,
        permissions: [],
        mobile_no: "",
        qualification: ""
      }
    } else {
      const imageId = props.selectedStaff.profile_pic.length > 0 ? props.selectedStaff.profile_pic[0].id : null;
      this.state = {...props.selectedStaff, fileList: [], profile_pic_id: imageId, permissions: []}
    }
  }

  componentDidMount() {
    if (this.props.selectedStaff) {
      if (this.props.loggedUserPermissions && this.props.loggedUserPermissions.filter((key) => key.name === "can manage roles & permissions").length > 0) {
        this.props.onGetSelectedStaffPermission(this.props.selectedStaff.id);
      }
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.requestSuccess) {
      this.props.onToggleAddStaff();
    }

    if (this.props.selectedStaff) {
      if (nextProps.selectedStaffPermissions && nextProps.selectedStaffPermissions !== this.props.selectedStaffPermissions) {
        const permissions = nextProps.selectedStaffPermissions.map(permission => permission.name);
        this.setState({permissions: permissions});
      }
    }
  };

  onSelectStaffPermissions = checkedList => {
    this.setState({permissions: checkedList})
  };

  onSubmitForm = () => {
    if (this.state.fileList.length > 0) {
      this.onImageSelect();
    } else {
      this.onStaffAdd();
    }
  };

  onStaffAdd = () => {
    if (this.props.selectedStaff === null) {
      this.props.onAddStaffMember({...this.state})
    } else {
      this.props.onEditStaffMember({...this.state});
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
      this.onStaffAdd();
      this.setState({fileList: []})
    })
  };

  getImageURL = () => {
    if (this.state.fileList.length > 0) {
      return URL.createObjectURL(this.state.fileList[0]);
    } else {
      if (this.props.selectedStaff && this.props.selectedStaff.profile_pic.length > 0) {
        return this.props.selectedStaff.profile_pic[0].src
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
    const {isAddStaff, onToggleAddStaff, userPermissions, loggedUserPermissions} = this.props;
    const {first_name, last_name, email, password, fileList, status, permissions, mobile_no, qualification} = this.state;
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
          visible={isAddStaff}
          title={this.props.selectedStaff === null ? "Add Staff" : "Edit Staff Details"}
          maskClosable={false}
          onCancel={() => onToggleAddStaff()}
          footer={[
            <Button key="cancel" onClick={() => onToggleAddStaff()}>
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
                           extra={this.props.selectedStaff === null ? "" :
                             "Note: Leave it blank if you don't want to update password."}>
                  {this.props.selectedStaff === null ?
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

                <Form.Item label="Phone no.">
                  {getFieldDecorator('mobile_no', {
                    initialValue: mobile_no,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: 'Please Enter Mobile number!'},
                      {
                        pattern: /^[0-9\b]+$/,
                        message: "Please enter only numerical values!"
                      }],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({mobile_no: e.target.value})
                  }}/>)}
                </Form.Item>

                <Form.Item label="Qualification">
                  {getFieldDecorator('qualification', {
                    initialValue: qualification
                  })(<Input type="text" onChange={(e) => {
                    this.setState({qualification: e.target.value})
                  }}/>)}
                </Form.Item>

                <Form.Item label="Status">
                  <Radio.Group value={status} onChange={(e) => {
                    this.setState({status: e.target.value})
                  }}>
                    <Radio value={1}>Active</Radio>
                    <Radio value={0}>Disabled</Radio>
                  </Radio.Group>
                </Form.Item>
                {loggedUserPermissions && loggedUserPermissions.filter((key) => key.name === "can manage roles & permissions").length > 0 ?
                  <Form.Item label="Permissions">
                    <Checkbox.Group style={{width: '100%'}}
                                    onChange={this.onSelectStaffPermissions}
                                    value={permissions}>

                      {userPermissions.map(permission => {
                        return <div className="gx-mb-2" key={permission.id}>
                          <Checkbox value={permission.name}>{permission.name}</Checkbox>
                        </div>
                      })
                      }

                    </Checkbox.Group>
                  </Form.Item> : null}
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

AddNewStaff = Form.create({})(AddNewStaff);


const mapStateToProps = ({staff, auth, common}) => {
  const {message} = common;
  const {selectedStaffPermissions} = staff;
  const {userPermissions, loggedUserPermissions} = auth;
  return {selectedStaffPermissions, userPermissions, loggedUserPermissions, requestSuccess: message};
};


export default connect(mapStateToProps, {
  onAddStaffMember,
  onEditStaffMember,
  onGetSelectedStaffPermission
})((AddNewStaff));
