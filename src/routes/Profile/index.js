import React, {Component} from "react"
import {Button, Col, Divider, Form, Input, Row} from "antd/lib/index";
import PropTypes from "prop-types";
import Widget from "../../components/Widget";
import {connect} from "react-redux";
import ImageUpload from "./ImageUpload";
import {fetchError, fetchStart, fetchSuccess, getUserProfile, onUpdateUserProfile} from "../../appRedux/actions";


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: "",
      last_name: "",
      email: "",
      profile_pic: null,
      avatar: null

    };
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.authUser) {
      const authUser = nextProps.authUser;
      const {first_name, last_name, email, profile_pic} = authUser;
      if (nextProps.authUser !== this.props.authUser) {
        this.setState({
          first_name: first_name,
          last_name: last_name,
          email: email,
          profile_pic: profile_pic ? profile_pic[0].id : null,
          avatar: profile_pic ? profile_pic : null
        });
      }
    }
  }

  componentDidMount() {
    this.props.getUserProfile();
  }

  goPreviousScreen = () => {
    this.props.history.goBack();
  };

  onSaveProfile = () => {
    this.props.onUpdateUserProfile({...this.state});
  };

  onAddImage = (profile_pic) => {
    console.log("profile_pic", profile_pic)
    this.setState({profile_pic})
  };


  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.onSaveProfile();
      }
    });
  };

  render() {
    console.log("state", this.props.authUser)
    const {getFieldDecorator} = this.props.form;
    const {first_name, last_name, email, avatar} = this.state;

    return (
      <div className="gx-main-layout-content">
        <Widget styleName="gx-card-filter">
          <h2 className="gx-widget-heading">Profile</h2>
          <hr/>
          <Row>
            <Col xl={18} lg={12} md={12} sm={12} xs={24}>
              <Form layout="vertical" style={{width: "60%"}}>
                <Form.Item label="First Name">
                  {getFieldDecorator('first_name', {
                    initialValue: first_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: "Please enter first name"}],
                  })(<Input type="text" autoFocus onChange={(e) => {
                    this.setState({first_name: e.target.value})
                  }}/>)}
                </Form.Item>
                <Form.Item label="Last Name">
                  {getFieldDecorator('last_name', {
                    initialValue: last_name,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: "Please enter last name"}],
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
                          message: "Please enter Email Address"
                        },
                      ],
                    }, {
                      trigger: 'onChange',
                      rules: [
                        {
                          type: 'email',
                          message: "This is not a correct format!"
                        },
                      ],
                    }],
                  })(<Input type="text" readOnly onChange={(e) => {
                    this.setState({email: e.target.value})
                  }}/>)}
                </Form.Item>
              </Form>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <ImageUpload fetchStart={this.props.fetchStart}
                           fetchError={this.props.fetchError}
                           fetchSuccess={this.props.fetchSuccess}
                           onAddImage={this.onAddImage}
                           uploadedImage={avatar}
              />
            </Col>
          </Row>
          <Divider/>
          <div className="gx-d-flex gx-justify-content-between">
            <span>
                <Button type="primary" onClick={this.onValidationCheck} style={{width: 150}}>
                   Save
                </Button>
                <Button onClick={this.goPreviousScreen} style={{width: 150}}>
                   Cancel
                </Button>
            </span>
          </div>
        </Widget>
      </div>
    )
  }
}

Profile = Form.create({})(Profile);

const mapStateToProps = ({auth}) => {
  const {authUser} = auth;
  return {authUser};
};

export default connect(mapStateToProps, {
  getUserProfile, onUpdateUserProfile, fetchStart,
  fetchSuccess,
  fetchError
})(Profile);

Profile.defaultProps = {
  authUser: null,

};

Profile.propTypes = {
  authUser: PropTypes.object
};
