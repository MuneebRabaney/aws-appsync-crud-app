import React, { Component } from 'react';

class CreatePrinter extends Component {
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
    this.props.onSubmit(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create Printer</h3>
        <div>
          <input
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            name="ip_address"
            placeholder="ip_address"
            value={this.state.ip_address}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            name="status"
            placeholder="status"
            value={this.state.status}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit">Save Printer</button>
      </form>
    );
  }
}

export default CreatePrinter;
