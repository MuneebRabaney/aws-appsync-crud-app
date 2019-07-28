import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: relative;
  padding: 10px 0px;
  border: 1px solid;
  border-color: #000;
`

const InputField = styled.div`
  
  width: 100%;
  
  ${({ hasErrors }) => hasErrors && `border-color: #bf1515`}
  select {
    font-family: Roboto;
    font-size: 14px;
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    color: #000;
    &:focus {
      outline: none;
    }
    option {
      border-raduis: 0;
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
  bottom: -15px;
`

class FormSelectDropDown extends Component {

  state = {
    value: ''
  }

  componentWillMount() {
    const state = Object.assign({}, this.state);
    state.value = this.props;
    this.setState(state);
  }
  
  _handleChange = event => {
    const { onChange } = this.props
    if (onChange) return onChange(event)
    
  }

  render() {
    const {
      name,
      value,
      valid,
      isRequired,
      placeholder,
      validationMessage,
    } = this.props;
    return (
      
      <Container> 
        <InputField hasErrors={isRequired && !valid}>
          <select value={value} name={name} onChange={this._handleChange}>
            <option value={false}>{placeholder}</option>
            {this.props.options.map((value, key) => (
              <option key={++key} value={value.toLowerCase()}>{value}</option>
            ))}
          </select>    
        </InputField>
        { (isRequired && !valid) && <ErrorMessage>{validationMessage}</ErrorMessage>}
      </Container>
    );
  }
} 

export default FormSelectDropDown;
