import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import { FormInput, FormSelectDropDown } from '../form'
import ipRegex from 'ip-regex';

const Container = styled.div `
  padding: 0 40px;
  margin: 50px 0;  
  h3 {
    margin-bottom: 20px;
  }
`

const Field = styled.div `
`

const Button = styled.button `
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
  border: none;
  margin-top: 30px;
  display: block;
`

class Form extends Component {
  state = {
    data : {
      name: false,
      ip_address: false,
      status: false,
    },
    errors: {
      name: true,
      ip_address: true,
      status: true,
    },
    attemptedSubmission: false,
  };

  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.nameRef = React.createRef();
    this.statusRef = React.createRef();
    this.ip_addressRef = React.createRef();
  }

  componentDidUpdate(nextProps) {
    if (typeof nextProps.data !== 'undefined') {
      if (nextProps.data.id !== this.state.data.id) {
        this._updateDataInStateFromProps({
          data: nextProps.data
        });
      }
    }
    
    return false;
  }

  _updateDataInStateFromProps = ({ data }) => {
    const state = Object.assign({}, this.state);
    state.data = data;
    this.setState(state);
  }
  
  _handleChange = event => {
    const { name, value } = event.target;
    const state = Object.assign({}, this.state);
    state.data[name] = value;
    if (this.state.attemptedSubmission) {
      this._checkAllFieldsForErrors();
    }
    this.setState(state);
  };

  _handleSubmit = event => {
    event.preventDefault();
    this._checkAllFieldsForErrors();
    this._handleValidationPassed();
  }

  _handleValidationPassed = () => {
    const { errors } = this.state;
    const validation = JSON.stringify(errors);
    console.log(this.state.data)
    if (!validation.includes('false')) {
      const { onSubmit } = this.props;
      if (onSubmit) return onSubmit({
        items: this.state.data
      });
    }
  }

  _handleClearFormFields = () => {
    console.log('_handleClearFormFields')
    const state = Object.assign({}, this.state);
    state.data.name = '';
    state.data.ip_address = '';
    state.data.status = '';
    this.setState(state);
  }

  _checkAllFieldsForErrors = () => {
    const state = Object.assign({}, this.state);
    const { data, errors } = this.state;
    Object.keys(data).map(key => {
      state.errors[key] = true;
      if (data[key] === false || data[key] === '') {
        state.errors[key] = false;
      }

      if (key === 'ip_address') {
        const isValid = this._handleValidateIpAddress(data[key])
        if (!isValid) state.errors[key] = false;
      }
      return false;
    });
    console.log(errors)
    state.errors = errors;
    this.setState(state);
  }

  _handleValidateIpAddress = (value = false) => {
    if (value) {
      let isIPAddress = ipRegex({ exact: true }).test(value);
      return isIPAddress;
    }
    return false;
  }

  render() {
    const {  errors } = this.state;
    const { name, ip_address, status } = this.state.data;
    const { heading, submitButtonText, loading } = this.props;
    return (
      <Container>
        <h3>{heading}</h3>
        <form ref={this.formRef} onSubmit={this._handleSubmit}>
          <Field>
            <FormInput 
              isRequired 
              name='name'
              ref={this.nameRef}
              onChange={this._handleChange}
              value={name ? name : ''}
              placeholder={loading ? 'Loading printer name' : 'Printer name'} 
              validationMessage='Please enter a printer name'
              valid={errors.name}
            />
          </Field>
          <Field>
            <FormInput 
              isRequired 
              name='ip_address'
              ref={this.ip_addressRef}
              onChange={this._handleChange}
              value={ip_address ? ip_address : ''}
              placeholder={loading ? 'Loading IP address' : 'Printer IP address'} 
              validationMessage='Please enter a valid IP address (accepts IPv4 and IPv6)'
              valid={errors.ip_address}
            />
          </Field>
          <Field>
            <FormSelectDropDown 
              isRequired
              name='status'
              options={[
                'Active',
                'Inactive',
              ]} 
              placeholder={`${loading ? 'Loading printer status' : 'Printer status'}`} 
              onChange={this._handleChange}
              validationMessage='Please select a printer status'
              valid={errors.status} 
              ref={this.statusRef}
              value={status ? status : ''}
            />
          </Field>
          <Button type='submit'>{submitButtonText}</Button>
        </form>
      </Container>
    )
  }
}

export default Form;
