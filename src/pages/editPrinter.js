import React, { Component } from 'react';
import { getPrinter } from "../graphql/queries";
import { updatePrinter } from "../graphql/mutations";
import { compose, graphql, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Form } from '../components/form'

class EditPrinter extends Component {
  state = {
    data: {
      name: "",
      ip_address: "",
      status: "",
    },
    loading: true,
    submittigFormValues: false,
  };

  componentWillMount()  {
    this._handleGetPrinter();
  }

  _handleGetPrinter = async () => {
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
      state.data = cleanData;
      state.loading = false;
      this.setState(state);
    }
  }
  
  _handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  _handleSubmit = async ({ items }) => {
    const { id } = this.state.data;
    const { client, history } = this.props;
    const state = Object.assign({}, this.state);
    state.submittigFormValues = true;
    this.setState(state);
    await client.mutate({
      mutation: gql(updatePrinter),
      variables: {  
        input: {
          id,
          ...items
        }
      }
    });
    history.push('/');
  }

  render() { 
    const {  data, submittigFormValues } = this.state;
    return (
      <Form
        ref={this.formRef}
        heading='Edit Printer'
        onSubmit={this._handleSubmit}
        onChange={this._handleChange}
        submitButtonText={`${submittigFormValues ? 'Updating Printer...': 'Update Printer'}`}
        data={data}
      />
      
    )
  }
}

export default compose(
  withApollo,
  graphql(gql(getPrinter), { name: 'getPrinter' }),
  graphql(gql(updatePrinter), { name: 'updatePrinter' })
)(EditPrinter);