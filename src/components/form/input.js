import React, { Component } from 'react';
import styled from 'styled-components';

const InputField = styled.div`
  margin-bottom: 30px;
  position: relative;
  padding: 0 17px 0 0px;
  input {
    font-family: Roboto;
    border: 1px solid;
    border-color: #000;
    padding: 10px 7px;
    ${({ hasErrors }) => hasErrors && `border-color: #bf1515`}
    font-size: 14px;
    color: #000;  
    width: 100%;
    height: 100%;
    background-color: transparent;
    &:placeholder {
      color: #000;

    }
    &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
      color: #000;

    }
    &::-moz-placeholder { /* Firefox 19+ */
      color: #000;

    }
    &:-ms-input-placeholder { /* IE 10+ */
      color: #000;

    }
    &:-moz-placeholder { /* Firefox 18- */
      color: #000;

    }
    &:focus {
      outline: none;
    }
  }
`

const ErrorMessage = styled.span `
  color: #bf1515;
  display: block;
  padding-top: 5px;
  font-size: 12px;
  text-align: left;
  position: absolute;
  left: 0;
`

class FormInput extends Component {

  _handleChange = event => {
    const { onChange } = this.props
    if (onChange) return onChange(event)
  }

  render() {
    const {
      name, valid, isRequired, value,
      placeholder, validationMessage
    } = this.props;
    return (
      <InputField hasErrors={isRequired && !valid}>
        <input defaultValue={value} name={name} onChange={this._handleChange} type="text" placeholder={placeholder} />
        { (isRequired && !valid) && <ErrorMessage>{validationMessage}</ErrorMessage>}
      </InputField>
    );
  }
} 

export default FormInput;