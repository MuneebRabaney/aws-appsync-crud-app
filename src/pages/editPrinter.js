import React, { Component } from 'react';
import { getPrinter } from "../graphql/queries";
import { updatePrinter } from "../graphql/mutations";
import { compose, graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";

class EditPrinter extends Component {
  state = {
    name: "",
    ip_address: "",
    status: ""
  };

  componentWillMount()  {
    this._handleSaveDataFromQueryToState();
  }

  _handleSaveDataFromQueryToState = async () => {
    const { match, client } = this.props;
    const id = match.params.id
    const { data } = await client.query({
      query: gql(getPrinter),
      variables: { id }
    });
    if (data.getPrinter) {
      let cleanData = Object.assign({}, data.getPrinter);
      delete cleanData.__typename;
      let state = Object.assign({}, this.state);
      state = cleanData;
      this.setState(state);
    }
  }
  
  _handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  _handleSubmit = async event => {
    event.preventDefault()
    const { client, history } = this.props;
    await client.mutate({
      mutation: gql(updatePrinter),
      variables: {  
        input: this.state
      }
    });
    history.push('/');
  }

  render() { 
    return (
      <form onSubmit={this._handleSubmit}>
        <h3>Edit Printer</h3>
        <div>
          <input
            name="name"
            placeholder="name"
            defaultValue={this.state.name}
            onChange={this._handleChange}
          />
        </div>
        <div>
          <input
            name="ip_address"
            placeholder="ip_address"
            defaultValue={this.state.ip_address}
            onChange={this._handleChange}
          />
        </div>
        <div>
          <input
            name="status"
            placeholder="status"
            defaultValue={this.state.status}
            onChange={this._handleChange}
          />
        </div>
        <button type="submit">update</button>
      </form>
    )
  }
}

export default compose(
  withApollo,
  graphql(gql(getPrinter), { name: 'getPrinter' }),
  graphql(gql(updatePrinter), { name: 'updatePrinter' })
)(EditPrinter);