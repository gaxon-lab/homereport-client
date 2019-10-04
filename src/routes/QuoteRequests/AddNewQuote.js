import React, {Component} from 'react';
import {Button, Col, Form, Input, Modal, Select} from "antd";
import {connect} from "react-redux";
import {onAddNewQuote, onGetPropertyOptions, onSearchCustomers} from "../../appRedux/actions";

const {Option} = Select;

class AddNewQuote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day_time_tel: "",
      evening_time_tel: "",
      address1: "",
      city: "",
      postcode: "",
      age_id: "",
      price_id: "",
    }
  }

  componentDidMount() {
    this.props.onGetPropertyOptions();
  }

  // handleSearch = (value) => {
  //   this.props.onSearchCustomers(value)
  // };

  // onSelectCustomer = (id) => {
  //   this.setState({customer_id: id});
  // };

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
    const {isAddQuote, onToggleAddQuote, propertyOptions} = this.props;
    const {day_time_tel, evening_time_tel, address1, city, postcode, age_id, price_id} = this.state;

    return (
      <div className="gx-main-layout-content">
        <Modal
          visible={isAddQuote}
          title="Add Quote Request"
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

            {/*<Form.Item label="Customer:">*/}
            {/*  {getFieldDecorator('age_id', {*/}
            {/*    initialValue: customer_id,*/}
            {/*    validateTrigger: 'onBlur',*/}
            {/*    rules: [{required: true, message: 'Please Select Customer!'}],*/}
            {/*  })( <Select*/}
            {/*    style={{width: "100%"}}*/}
            {/*    showSearch*/}
            {/*    placeholder="Type and Select Customer"*/}
            {/*    defaultActiveFirstOption={false}*/}
            {/*    showArrow={false}*/}
            {/*    filterOption={false}*/}
            {/*    onSearch={this.handleSearch}*/}
            {/*    onChange={this.onSelectCustomer}*/}
            {/*    notFoundContent={null}*/}
            {/*  >*/}
            {/*    {customersList.map(customer => {*/}
            {/*      return <Option value={customer.id} style={{minHeight: 33}}*/}
            {/*                     key={customer.id}>*/}
            {/*      <span>{customer.profile_pic && customer.profile_pic.length > 0 ?*/}
            {/*        <Avatar className=" gx-size-30" src={customer.profile_pic[0].src}/> :*/}
            {/*        <Avatar className=" gx-size-30"*/}
            {/*                style={{backgroundColor: '#f56a00'}}>{customer.first_name[0].toUpperCase()}</Avatar>}</span>*/}
            {/*        <span className="gx-mx-2 gx-inline-block">{customer.first_name + " " + customer.last_name}</span>*/}
            {/*        <span>{customer.email}</span>*/}
            {/*      </Option>*/}
            {/*    })}*/}
            {/*  </Select>)}*/}
            {/*</Form.Item>*/}


            <Form.Item label="Address">
              {getFieldDecorator('address1', {
                validateTrigger: 'onBlur',
                initialValue: address1,
                rules: [{required: true, message: "Please enter Property Address"}],
              })(<Input type="text" autoFocus onChange={(e) => {
                this.setState({address1: e.target.value})
              }}/>)}
            </Form.Item>

            <div className="gx-d-flex gx-flex-row">
              <Col sm={12} xs={24} className="gx-pl-0">
                <Form.Item label="city">
                  {getFieldDecorator('city', {
                    initialValue: city,
                    validateTrigger: 'onBlur',
                    rules: [{required: true, message: "Please enter City"}],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({city: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>
              <Col sm={12} xs={24} className="gx-pr-0">
                <Form.Item label="Post Code">
                  {getFieldDecorator('postcode', {
                    initialValue: postcode,
                    validateTrigger: 'onBlur',
                    rules: [
                      {
                        required: true,
                        message: "Please enter Post Code"
                      }
                    ],
                  })(<Input type="text" onChange={(e) => {
                    this.setState({postcode: e.target.value})
                  }}/>)}
                </Form.Item>
              </Col>

            </div>

            <Form.Item label="Property Age:">
              {getFieldDecorator('age_id', {
                initialValue: age_id,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Select Property Age!'}],
              })(<Select className="gx-mb-4"
                         style={{width: '100%'}}
                         placeholder="Select Property Age"
                         onChange={(value) =>this.setState({age_id: value})}
              >
                {propertyOptions.property_age.map(property => {
                  return <Option value={property.id} key={property.id}>{property.name}</Option>
                })}
              </Select>)}
            </Form.Item>

            <Form.Item label="Property Price Range:">
              {getFieldDecorator('price_id', {
                initialValue: price_id,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Select Property Age!'}],
              })(<Select className="gx-mb-4"
                         style={{width: '100%'}}
                         placeholder="Select Property price"
                         onChange={(value) =>this.setState({price_id: value})}
              >
                {propertyOptions.property_price.map(property => {
                  return <Option value={property.id} key={property.id}>{property.name}</Option>
                })}
              </Select>)}
            </Form.Item>

            <Form.Item label="Morning Contact No.">
              {getFieldDecorator('day_time_tel', {
                initialValue: day_time_tel,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Morning Contact number!'},
                  {
                    pattern: /^[0-9\b]+$/,
                    message: "Please enter only numerical values!"
                  }],
              })(<Input type="text" onChange={(e) => {
                this.setState({day_time_tel: e.target.value})
              }}/>)}
            </Form.Item>

            <Form.Item label="Evening Contact No.">
              {getFieldDecorator('evening_time_tel', {
                initialValue: evening_time_tel,
                validateTrigger: 'onBlur',
                rules: [{required: true, message: 'Please Enter Evening Contact number!'},
                  {
                    pattern: /^[0-9\b]+$/,
                    message: "Please enter only numerical values!"
                  }],
              })(<Input type="text" onChange={(e) => {
                this.setState({evening_time_tel: e.target.value})
              }}/>)}
            </Form.Item>

          </Form>
        </Modal>
      </div>
    );
  }
}

AddNewQuote = Form.create({})(AddNewQuote);

const mapStateToProps = ({quoteRequests, customers}) => {
  const {propertyOptions} = quoteRequests;
  const {customersList} = customers;
  return {propertyOptions, customersList}
};

export default connect(mapStateToProps, {onGetPropertyOptions, onSearchCustomers, onAddNewQuote})((AddNewQuote));
