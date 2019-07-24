import React, { Component } from 'react';
import { Formik } from 'formik';

class Form extends Component {
  state = {
    name: "",
    ip_address: "",
    status: ""
  };
  
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async event => {
    event.preventDefault()
    const { onSubmit } = this.props
    if (onSubmit) return onSubmit(this.state);
    
  }

  render() {
    const { heading, submitButtonText } = this.props;
    const { name, ip_address, status } = this.state;
    return (
      <Formik>
        {({ isSubmitting }) => (
          <form onSubmit={this.handleSubmit}>
            <h3>{heading}</h3>
            <div>
              <input
                name="name"
                placeholder="name"
                value={name}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                name="ip_address"
                placeholder="ip_address"
                value={ip_address}
                onChange={this.handleChange}
              />
            </div>
            <div>
              <input
                name="status"
                placeholder="status"
                value={status}
                onChange={this.handleChange}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>{submitButtonText}</button>
            
          </form>
        )}
      </Formik>
    );
  }
}

export default Form;
