import React, {Component} from 'react';
import {Col, Form, Input,Button} from "antd";


class AddCustomerAddress extends Component {

  onValidateFields = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAddAddress(values)
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div>
        <Form layout="vertical">
          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
          <Form.Item label="Address line 1">
            {getFieldDecorator('address1', {
              validateTrigger: 'onBlur',
              initialValue: "",
              rules: [{required: true, message:"Please enter address line 1"}],
            })(<Input type="text" autoFocus/>)}
          </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Address line 1">
                {getFieldDecorator('address2', {
                  validateTrigger: 'onBlur',
                  initialValue: "",
                })(<Input type="text"/>)}
              </Form.Item>
            </Col>
          </div>

          <div className="gx-d-flex gx-flex-row">
            <Col sm={12} xs={24} className="gx-pl-0">
              <Form.Item label="City">
                {getFieldDecorator('city', {
                  validateTrigger: 'onBlur',
                  initialValue: "",
                  rules: [{required: true, message:"Please enter City"}],
                })(<Input type="text"/>)}
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="gx-pr-0">
              <Form.Item label="Post Code">
                {getFieldDecorator('postcode', {
                  validateTrigger: 'onBlur',
                  initialValue: "",
                  rules: [{required: true, message:"Please enter Post Code"}],
                })(<Input type="text"/>)}
              </Form.Item>
            </Col>
          </div>
          <Button type="primary" onClick={this.onValidateFields}>Save</Button>
        </Form>
      </div>
    )
  }
}

AddCustomerAddress = Form.create({})(AddCustomerAddress);

export default AddCustomerAddress;
