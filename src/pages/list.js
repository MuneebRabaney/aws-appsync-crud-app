import React, {Component} from "react";
import { listPrinters } from "../graphql/queries";
import { deletePrinter } from "../graphql/mutations";
import { Query, withApollo, compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import styled from 'styled-components';
import Printer from '../components/printer';
import Loader from '../components/ui/loading';

const Container = styled.div `
  padding: 0 40px;
`

const Table = styled.table `
  width: 100%;
    thead {
      td {
        font-size: 14px;
        padding: 10px 5px;
      }
    }
    tr {
      text-align: center;
      td {
        border: 1px solid #000;
        font-size: 13px;
      }
    }
  
`

class List extends Component {

  componentDidMount() {
    this._handleFetchPrinters()
  }

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

  _handleFetchPrinters = async () => {
    const { client } = this.props;
    await client.query({
      query: gql(listPrinters),
      refetchQueries: [{ query: gql(listPrinters) }]
    });
  }

  render() {
    const { listPrinters } = this.props.data
    return (
      <Container>
      {
        !listPrinters 
        ? <Loader message="Loading printers..." />
        : ( 
          <Table>
              <thead>
                <tr>
                  <td>Printer Name</td>
                  <td>IP Address</td>
                  <td>Status</td>
                  <td>Controls</td>
                </tr>
              </thead>
              <tbody>
                {(listPrinters.items && listPrinters.items.length > 0) && (
                  listPrinters.items.map(({ name, ip_address, status, id }) => (
                    <Printer
                      id={id} 
                      key={id} 
                      name={name}
                      status={status}
                      ip_address={ip_address}
                      onDelete={ this._handleDeletePrinter }
                      canEdit={true}
                    />
                  ))
                )}
              </tbody>
            </Table>
          )
      }
      </Container>
    )
  }
}

export default compose(
  withApollo,
  graphql(gql(listPrinters))
)(List);
