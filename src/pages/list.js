import React, {Component} from "react";
import { listPrinters } from "../graphql/queries";
import { deletePrinter } from "../graphql/mutations";
import { Query, withApollo, compose } from "react-apollo";
import gql from "graphql-tag";

import Printer from '../components/printer';
import Loader from '../components/ui/loading';

class List extends Component {

  _handleDeletePrinter = async ({ id }) => {
    const { client } = this.props;
    await client.mutate({
      mutation: gql(deletePrinter),
      variables: {  
        input: { id }
      },
      refetchQueries: [{ query: gql(listPrinters) }]
    });
  }

  render() {
    return (
      <Query query={gql(listPrinters)} fetchPolicy="no-cache">
      { ({ data, loading, error }) => {
        if (loading) return <Loader />;

        if (error || !data || !data.listPrinters || !data.listPrinters.items) return null;
        
        const { items } = data.listPrinters;
        return items.map(({ name, ip_address, status, id }) => (
          <Printer
            id={id} 
            key={id} 
            name={name}
            status={status}
            ip_address={ip_address}
            onDelete={ this._handleDeletePrinter }
            canEdit={true}
          />
        ));
      }}
      </Query>      
    );
  }
}

export default compose(
  withApollo,
)(List);
