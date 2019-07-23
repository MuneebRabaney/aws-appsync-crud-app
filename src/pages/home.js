import React, { Component } from 'react';
import { createPrinter } from "../graphql/mutations";
import { listPrinters } from "../graphql/queries";
import { Mutation } from "react-apollo";
import gql from "graphql-tag"

import CreatePrinter from './createPrinter';

import List from "./list";

class Home extends Component {
  render() {
    return (
      <div className="App">
        hello world :)    
        <div style={{ textAlign: "center" }}>
          <Mutation mutation={gql(createPrinter)}>
            { createPrinterMutation => (
              <CreatePrinter 
                  onSubmit={async (input) => {
                    await createPrinterMutation({ 
                      variables: { 
                        input 
                      },
                      refetchQueries: [{
                        query: gql(listPrinters)
                      }]
                    })
                  }}
                />
              )
            }
          </Mutation>
          <List />
        </div>
      </div>
    );
  }
}

export default Home;
