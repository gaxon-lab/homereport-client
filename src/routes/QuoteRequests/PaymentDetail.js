import React, {Component} from 'react';
import {Button, Checkbox, DatePicker, Form, Input, Modal, Select} from "antd";
import {connect} from "react-redux";
import {onGetCustomerAddress, onUpdatePaymentDetail} from "../../appRedux/actions";

const {Option} = Select;
const {TextArea} = Input;

class PaymentDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: true,
      billing_address_id: props.selectedQuote.id,
      remark: "",
      payment_date: null,
      transaction_id: "",
    }
  }

  componentDidMount() {
    this.props.onGetCustomerAddress(this.props.selectedQuote.customer_id, "billing");
  }

  onChangeCheckBox = (e) => {
    this.setState({isChecked: e.target.checked}, () => {
      if (this.state.isChecked) {
        this.setState({billing_address_id: this.props.selectedQuote.id})
      } else {
        this.setState({billing_address_id: null})
      }
    })
  };

  onDateChange = (value, dateString) => {
    this.setState({payment_date: dateString})
  };

  onSelectDateTime = () => {
    console.log("date & time", this.state.payment_date)
  };

  onValidationCheck = () => {
    const selectedQuote = this.props.selectedQuote;
    this.props.form.validateFields(err => {
      if (!err) {
        if (this.state.transaction_id === "") {
          this.props.onUpdatePaymentDetail(selectedQuote.quote_request_id, {
            ...this.state,
            payment_status: "completed",
            transaction_id: "city_12345678"
          }, selectedQuote.customer_id);
        } else {
          this.props.onUpdatePaymentDetail(selectedQuote.quote_request_id, {
            ...this.state,
            payment_status: "completed"
          }, selectedQuote.customer_id);
        }
        this.props.onToggleShowPayment();
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const {isChecked, remark, billing_address_id, payment_date, transaction_id} = this.state;
    const {isPaymentShow, onToggleShowPayment, customerAddresses, selectedQuote} = this.props;
    return (

      <div className="gx-main-layout-content">
        <Modal width="60%"
          visible={isPaymentShow}
          title={`Add Payment Details for Quote Reference no. ${selectedQuote.reference_no}`}
          maskClosable={false}
          onCancel={() => onToggleShowPayment()}
          footer={[
            <Button key="cancel" onClick={() => onToggleShowPayment()}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" onClick={this.onValidationCheck}>
              Save
            </Button>
          ]}>

          <Form layout="vertical">

            <Form.Item>
              <Checkbox checked={isChecked} onChange={(e) => this.onChangeCheckBox(e)}>Address same as Property
                Address</Checkbox>
            </Form.Item>

            {isChecked ?
              <div className="gx-mb-5">
                <div className="gx-text-grey">Address</div>
                <div className="gx-mt-2">
                  <p className="gx-mb-1 gx-font-weight-medium">{selectedQuote.address1}</p>
                  {selectedQuote.address1 ?
                    <p className="gx-mb-1 gx-font-weight-medium">{selectedQuote.address1}</p> : null}
                  <p className="gx-mb-1 gx-font-weight-medium">{selectedQuote.city}, Scotland</p>
                  <p className="gx-mb-1 gx-font-weight-medium"> Zip -{selectedQuote.postcode}</p>
                </div>
              </div> : <Form.Item label="Select Address">
                {getFieldDecorator('billing_address_id', {
                  initialValue: billing_address_id,
                  validateTrigger: 'onBlur',
                  rules: [{required: true, message: 'Please Select Property Address!'}],
                })(<Select className="gx-mb-4"
                           style={{width: '100%'}}
                           placeholder="Select Property Address"
                           onChange={(value) => this.setState({billing_address_id: value})}
                >
                  {customerAddresses.map(address => {
                    return <Option value={address.id}
                                   key={address.id}>{`${address.address1}, ${address.address2}, ${address.city}, Scotland - ${address.postcode}`}</Option>
                  })}
                </Select>)}
              </Form.Item>}

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
                rules: [{required: true, message: 'Please Select Payment Date & Time!'}],
              })(<DatePicker showTime placeholder="Select Date & Time"
                             onChange={this.onDateChange} onOk={this.onSelectDateTime}/>)}
            </Form.Item>

            <Form.Item label="Transaction Id.">
              {getFieldDecorator('transaction_id', {
                initialValue: transaction_id,
              })(<Input onChange={(e) => this.setState({transaction_id: e.target.value})}/>)}
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}

PaymentDetail = Form.create({})(PaymentDetail);

const mapStateToProps = ({customers}) => {
  const {customerAddresses} = customers;
  return {customerAddresses}
};

export default connect(mapStateToProps, {onGetCustomerAddress, onUpdatePaymentDetail})((PaymentDetail));
