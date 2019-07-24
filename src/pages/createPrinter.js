import React, { Component } from 'react';

class CreatePrinter extends Component {
  state = {
    name: "",
    ip_address: "",
    status: ""
  };

  constructor() {
    super();
    this.formRef = React.createRef();
    this.nameRef = React.createRef();
    this.ipAddressRef = React.createRef();
    this.statusRef = React.createRef();
  }
  
  _handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  _handleSubmit = async event => {
    event.preventDefault();
    if (
      this.nameRef.current.value !== '' &&
      this.statusRef.current.value !== '' &&
      this.ipAddressRef.current.value !== ''
    ) return this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form ref={this.formRef} onSubmit={this._handleSubmit}>
        <h3>Create Printer</h3>
        <div>
          <input
            name="name"
            ref={this.nameRef}
            placeholder="name"
            value={this.state.name}
            onChange={this._handleChange}
          />
        </div>
        <div>
          <input
            name="ip_address"
            ref={this.ipAddressRef}
            placeholder="ip_address"
            value={this.state.ip_address}
            onChange={this._handleChange}
          />
        </div>
        <div>
          <select 
            id="status" 
            name="status" 
            ref={this.statusRef}
            onChange={this._handleChange} 
            value={this.state.status}>
            <option value="">Please select a printer status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit">Save Printer</button>
      </form>
    );
  }
}

export default CreatePrinter;
