import React, {Component} from "react";
import { getPrinter } from "../graphql/queries";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Printer from '../components/printer';
import Loader from '../components/ui/loading';

class Single extends Component {

  render() {
    const { params } = this.props.match
    return (
      <Query 
        query={gql(getPrinter)} 
        variables={{ id: params.id }}
      >
      { ({ data, loading, error }) => {

          if (loading) return <Loader />;

          if (error || !data || !data.getPrinter) return null;

          const { name, ip_address, status, id } = data.getPrinter

          return (
            <Printer
              key={id}
              id={id}
              name={name}
              status={status}
              ip_address={ip_address}
            />
          );
      } }
      </Query>      
    );
  }
  
}

export default Single;
