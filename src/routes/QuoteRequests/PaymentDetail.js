import React, {Component} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, Modal, Select} from "antd";
import {connect} from "react-redux";
import {onAddNewQuote, onGetPropertyOptions, onSearchCustomers} from "../../appRedux/actions";

const {Option} = Select;
const {TextArea} = Input;

class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      billing_address_id: "",
      remark: "",
      payment_date: "",
    }
  }

  componentDidMount() {
    this.props.onGetPropertyOptions();
  }

  onChangeCheckBox = (e) => {
    this.setState({isChecked: e.target.checked})
  };

  onDateChange = (value, dateString) => {
    this.setState({payment_date: dateString})
  };


  onValidationCheck = () => {
    this.props.form.validateFields(err => {
      if (!err) {
        this.props.onAddNewQuote(this.props.selectedCustomer.id, {...this.state});
        this.props.onToggleAddQuote();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {isChecked, remark, billing_address_id, payment_date} = this.state;

    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={isAddQuote}
          title="Payment Details"
          maskClosable={false}
          onCancel={() => onToggleAddQuote()}
          footer={[
            <Button key="cancel" onClick={() => onToggleAddQuote()}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>
          ]}>

          <Form layout="vertical">

            <Form.Item>
              {getFieldDecorator('age_id', {
                initialValue: isChecked,
              })(<Checkbox onChange={(e) => this.onChangeCheckBox(e)}>Address same as Property Address</Checkbox>)}
            </Form.Item>


            <Form.Item label="Select Address">
              {getFieldDecorator('billing_address_id', {
                initialValue: billing_address_id,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Select Property Address!'}],
              })(<Select className="gx-mb-4"
                         style={{width: '100%'}}
                         placeholder="Select Property Address"
                         onChange={(value) => this.setState({billing_address_id: value})}
              >
                {propertyOptions.property_age.map(property => {
                  return <Option value={property.id} key={property.id}>{property.name}</Option>
                })}
              </Select>)}
            </Form.Item>

            <Form.Item label="Remark">
              {getFieldDecorator('remark', {
                initialValue: remark,
              })(<TextArea rows={4} className="gx-form-control-lg" onChange={(e) => {
                this.setState({remark: e.target.value})
              }}/>)}
            </Form.Item>


            <Form.Item label="Payment Date & Time">
              {getFieldDecorator('payment_date', {
                initialValue: payment_date,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Select Payment Date & Time!'}],
              })(<DatePicker showTime placeholder="Select Date & Time"
                             onChange={this.onDateChange}/>)}
            </Form.Item>


          </Form>
        </Modal>
      </div>
    );
  }
}

PaymentDetail = Form.create({})(PaymentDetail);

const mapStateToProps = ({quoteRequests, customers}) => {
  const {propertyOptions} = quoteRequests;
  const {customersList} = customers;
  return {propertyOptions, customersList}
};

export default connect(mapStateToProps, {onGetPropertyOptions, onSearchCustomers, onAddNewQuote})((PaymentDetail));
