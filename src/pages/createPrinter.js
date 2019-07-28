import React, { Component, Fragment } from 'react';
import { createPrinter } from "../graphql/mutations";
import { listPrinters } from "../graphql/queries";
import gql from "graphql-tag";
import Form from '../components/form/layout';
import { withApollo, compose, graphql } from "react-apollo";
import { Loader } from '../components/ui';

class CreatePrinter extends Component {
  state = {
    data: {
      name: "",
      ip_address: "",
      status: "",
    },
    resetForm: false,
    showMessage: false,
    saving: false,
  }

  componentDidUpdate(nextProps) {
    const { items } = this.props.data.listPrinters
    if (items.length > nextProps.data.listPrinters.items.length) {
      this._handleSavePrinter();
    }
    return false;
  }

  _handleResetFormFields = () => {
    const state = Object.assign({}, this.state);
    state.resetForm = true;
    this.setState(state);
  }

  _handleSavePrinter = () => {
    const state = Object.assign({}, this.state);
    state.saving = !this.state.saving;
    this.setState(state);
  }

  _handleCreatePrinter = async ({ items }) => {
    const { client } = this.props;
    this._handleSavePrinter();
    await client.mutate({
      mutation: gql(createPrinter),
      variables: {  
        input: items
      },
      // optimisticResponse: {
      //   listPrinters: {
      //     items: {
      //       id: '9',
      //       ...items,
      //       __typename: "Printers",
      //     }
          
      //   }
      // },
      // update: (store, { data: { createPrinter } }) => {
      //   const response = store.readQuery({ 
      //     query: gql(listPrinters)
      //   });
      //   const { items } = response.listPrinters 
      //   // console.log(createPrinter)
      //   // items.push(createPrinter)

      //   const n = store.writeQuery({
      //     query: gql(listPrinters),
      //     data: {
      //       items: [...items, createPrinter]
      //     },
          
      //   });
      //   console.log(n)
      // },
      refetchQueries: [{
        query: gql(listPrinters)
      }],
    });
  }
  
  _handleShowMessage = () => {
    const state = Object.assign({}, this.state);
    state.showMessage = true;
    this.setState(state);
    
  }

  render() {
    const { saving } = this.state;
    return (
      <Fragment>  
        <Form
          heading="Create Printer"
          ref={this.formRef}
          resetForm={this.state.resetForm}
          onSubmit={this._handleCreatePrinter}
          submitButtonText={`${saving ?  'Saving Printer...' : 'Save Printer'}`}
        />
      </Fragment>  
    );
  }
}

export default compose(
  withApollo,
  graphql(gql(listPrinters))
)(CreatePrinter);
